"use server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION ?? "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "test",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "test",
  },
  endpoint: process.env.AWS_ENDPOINT ?? "http://localhost:4567",
  forcePathStyle: true,
});

export async function uploadFileToS3(fileBuffer: Buffer, filename: string) {
  try {

    const filename = randomUUID();

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME ?? "tbb",
      Key: filename + ".png",
      Body: fileBuffer,
      ContentType: "image/png",
    };

    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    if (response) {
      return { error: null, data: {url: `http://localhost:4567/tbb/${filename}.png`} };
    }
  } catch (error) {
    return { error: true, data: null };
  }
}

