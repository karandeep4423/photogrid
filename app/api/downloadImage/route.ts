import { NextResponse, NextRequest } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

export const GET = async (req: NextRequest) => {
  const urlSearchParams = req.nextUrl.searchParams;
  const key = urlSearchParams.get("params");
  const command = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: key as string,
  };
  const url = new GetObjectCommand(command);
  const resUrl = await getSignedUrl(s3Client, url);
  return NextResponse.json(resUrl);
};
