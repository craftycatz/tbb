import { NextResponse } from "next/server";
import { db } from "@/db/client";

export async function GET(req: Request) {
  try {
    const areas = await db.query.areas.findMany();
    return NextResponse.json(areas);
  } catch (err) {
    return NextResponse.json({ error: "could not get areas" }, { status: 400 });
  }
}
