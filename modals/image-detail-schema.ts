import mongoose, { Document, Schema } from "mongoose";

export interface ImageDocumentDetail extends Document {
  imageName: string;
  imageLanguage: string;
  imageTitle: string;
  imageDescription: string;
  imageContent: string;
  imageAlt: string;
}

const imageDetail = new Schema<ImageDocumentDetail>(
  {
    imageName: { type: String, required: true },
    imageLanguage: { type: String, required: true },
    imageTitle: { type: String, required: true },
    imageDescription: { type: String, required: true },
    imageContent: { type: String, required: true },
    imageAlt: { type: String, required: true },
  },
  { timestamps: true }
);

const ImageDetail =
  (mongoose.models.ImageDetail as mongoose.Model<ImageDocumentDetail>) ||
  mongoose.model<ImageDocumentDetail>("ImageDetail", imageDetail);

export default ImageDetail;
