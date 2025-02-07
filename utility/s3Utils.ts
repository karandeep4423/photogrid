import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import ShortUniqueId from "short-unique-id";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

export async function uploadFileToS3(
  file: Buffer,
  folderName: string,
  fileName: string
): Promise<string> {
  const uid = new ShortUniqueId({ length: 10 });
  const shortId = uid.rnd();

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
    Key: `${folderName}/${fileName}/${fileName}-${shortId}.jpg`,
    Body: file,
    ContentType: "image/jpg",
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    const s3Url = `https://s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}/${folderName}/${fileName}/${fileName}-${shortId}.jpg`;
    return s3Url;
  } catch (error) {
    throw new Error("Failed to upload to S3");
  }
}


export async function deleteFileFromS3(s3FolderNameAndfilename: string): Promise<boolean> {
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      Key: s3FolderNameAndfilename,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    return false;
  }
}