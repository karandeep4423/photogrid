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
          .resize({ height: 1400, width: 1134, fit: "fill" })
          .jpeg({ quality: 80, mozjpeg: true })
          .toBuffer();
        const s3Url = await uploadFileToS3(bufferResize, imageCategory.toString());
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
export async function DELETE(req: NextRequest, res: NextResponse) {
  if (req.method === "DELETE") {
    try {
      const { _id, imageName } = await req.json();
      if (!_id || !imageName) {
        return NextResponse.json({ message: "Error: Empty request body" });
      }
      const s3FolderNameAndfilename = `${imageName}.jpg`;
      await deleteFileFromS3(s3FolderNameAndfilename);
      await connectToDb();
      let img = await Images.findByIdAndDelete(_id);
      return NextResponse.json({ message: "success", img });
    } catch (err) {
      return NextResponse.json({ message: "Error saving image", err });
    }
  } else {
    NextResponse.json({ error: "Method Not Allowed" });
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
