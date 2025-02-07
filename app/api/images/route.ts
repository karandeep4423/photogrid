import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "@/middleware/mongodb";
import Images from "@/modals/images-schema";
import { uploadFileToS3, deleteFileFromS3 } from "@/utility/s3Utils";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const images = formData.getAll("images");
    const imageName = formData.getAll("imageName");
    const imageCategory = formData.get("imageCategory");
    const imageLanguage = formData.get("imageLanguage");
    if (!images.length || !imageCategory || !imageLanguage) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    await connectToDb();
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        if (!(image instanceof Blob)) {
          return NextResponse.json(
            { error: "Invalid image provided." },
            { status: 400 }
          );
        }
        const buffer = Buffer.from(await image.arrayBuffer());
        const bufferResize = await sharp(buffer)
          .resize({ height: 1400, width: 1134, fit: "inside" })
          .webp({ quality: 10 })
          .toBuffer();
        const s3Url = await uploadFileToS3(
          bufferResize,
          imageName.toString(),
          imageCategory.toString()
        );
        return {
          image: s3Url,
          imageName: imageName.toString(),
          imageCategory: imageCategory.toString(),
          imageLanguage: imageLanguage.toString(),
        };
      })
    );

    const savedImages = await Images.insertMany(uploadedImages);

    return NextResponse.json({ message: "success", images: savedImages });
  } catch (err) {
    return NextResponse.json({ message: "Error saving images", error: err });
  }
}

// Extract filename from S3 URL
function extractFilenameFromS3Url(url: string): string {
  try {
    const afterDomain = url.split("amazonaws.com/")[1] || "";
    return afterDomain.split("/").slice(1).join("/") || "";
  } catch (error) {
    throw new Error("Invalid S3 URL format");
  }
}

// API route handler
export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const { _id, image } = await req.json();

    if (!_id || !image) {
      return NextResponse.json(
        { error: "Missing required fields: _id or imageName" },
        { status: 400 }
      );
    }

    // Extract the filename from the full S3 URL if needed
    const filename = extractFilenameFromS3Url(image);

    // Try to delete from S3 first
    const s3DeleteSuccess = await deleteFileFromS3(filename);

    if (!s3DeleteSuccess) {
      return NextResponse.json(
        { error: "Failed to delete file from S3" },
        { status: 500 }
      );
    }

    // If S3 deletion was successful, delete from database
    await connectToDb();
    const deletedImage = await Images.findByIdAndDelete(_id);

    if (!deletedImage) {
      return NextResponse.json(
        { error: "Image not found in database" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Image deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const GET = async (req: NextRequest) => {
  const urlSearchParams = req.nextUrl.searchParams;
  const key = urlSearchParams.get("params");

  await connectToDb();
  try {
    let images;
    if (key !== null) {
      images = await Images.find({
        $or: [
          { imageCategory: key },
          { imageName: key },
          { imageLanguage: key },
        ],
      }).sort({
        createdAt: -1,
      });
    } else {
      images = await Images.find().sort({
        createdAt: -1,
      });
    }
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
};
