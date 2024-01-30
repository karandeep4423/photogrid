import mongoose, { Document, Schema } from "mongoose";

export interface AdminLogin extends Document {
  username: string;
  password: string;
}

const adminSchema = new Schema<AdminLogin>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin =
  (mongoose.models.Admin as mongoose.Model<AdminLogin>) ||
  mongoose.model<AdminLogin>("Admin", adminSchema);

export default Admin;
