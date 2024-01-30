import mongoose, { Document, Schema } from "mongoose";

export interface ImageDocument extends Document {
  image: string;
  imageName: string;
  imageCategory: string;
  imageLanguage: string;
}

const imageSchema = new Schema<ImageDocument>(
  {
    image: { type: String, required: true },
    imageName: { type: String, required: true },
    imageCategory: { type: String, required: true },
    imageLanguage: { type: String, required: true },
  },
  { timestamps: true }
);

const Images =
  (mongoose.models.Images as mongoose.Model<ImageDocument>) ||
  mongoose.model<ImageDocument>("Images", imageSchema);

export default Images;
