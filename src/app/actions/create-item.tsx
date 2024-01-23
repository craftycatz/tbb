"use server";
import { items } from "@/db/schema";
import { uploadFileToS3 } from "./upload-file-s3";
import { db } from "@/db/client";
import { redirect } from "next/navigation";

export async function createItem(formData: FormData) {
  try {
    const file = formData.get("image") as File;
    if (file.size === 0 || !file) {
      return { error: "No file selected", data: null };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const res = await uploadFileToS3(buffer, file.name);
    if (res?.error) {
      return { error: "Could not upload image", data: null };
    }

    const { name, type, volume } = Object.fromEntries(formData.entries());

    const result = await db.insert(items).values({
      name: name as string,
      type: type as "event" | "beverage",
      volume: volume as string,
      image: res?.data?.url as string,
      active: true,
    });

    return redirect(`/app/admin/products`);
  } catch (error) {
    return { error: (error as Error).message, data: null };
  }
}
