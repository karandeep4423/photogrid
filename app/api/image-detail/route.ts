import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "@/middleware/mongodb";
import ImageDetail from "@/modals/image-detail-schema";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method Not Allowed" });
  }

  try {
    await connectToDb();
    const {
      imageName,
      imageLanguage,
      imageTitle,
      imageDescription,
      imageContent,
      imageAlt
    } = await req.json();
    const newImage: any = new ImageDetail({
      imageName,
      imageLanguage,
      imageTitle,
      imageDescription,
      imageContent,
      imageAlt
    });

    const savedImage = await newImage.save();
    return NextResponse.json({ message: "success", savedImage });
  } catch (err) {
    return NextResponse.json({ message: "Error saving image", err });
  }
}

export const PUT = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "PUT") {
    return NextResponse.json({ message: "Method Not Allowed" });
  }

  await connectToDb();

  const {
    id,
    imageName,
    imageLanguage,
    imageTitle,
    imageDescription,
    imageContent,
    imageAlt
  } = await req.json();

  try {
    const updatedImageDetail = await ImageDetail.findByIdAndUpdate(
      id,
      {
        imageName,
        imageLanguage,
        imageTitle,
        imageDescription,
        imageContent,
        imageAlt
      },
      { new: true }
    );

    if (!updatedImageDetail) {
      return NextResponse.json({ message: "updated Image detail not found" });
    }

    return NextResponse.json({ message: "success", updatedImageDetail });
  } catch (error) {
    console.error("Error updating image:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
};

export async function DELETE(req: NextRequest, res: NextResponse) {
  if (req.method === "DELETE") {
    try {
      const { id } = await req.json();
      if (!id) {
        return NextResponse.json({ message: "Error: Empty request body" });
      }
      await connectToDb();
      let img = await ImageDetail.findByIdAndDelete(id);
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
      images = await ImageDetail.find({
        $or: [
          { imageCategory: key },
          { imageName: key },
          { imageLanguage: key },
        ],
      }).sort({
        createdAt: -1,
      });
    } else {
      images = await ImageDetail.find().sort({
        createdAt: -1,
      });
    }
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
};
