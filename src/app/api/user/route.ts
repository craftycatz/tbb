import { NextResponse } from "next/server";
import { db } from "@/db/client";


export async function POST(req: Request) {
  // get userId and token from request body
  const { email } = await req.json();
  try {
    if (!email)
      return NextResponse.json({ error: "email required" }, { status: 400 });

    const user = await db.query.User.findFirst({
      where: (User, { eq }) => eq(User.email, email),
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "could not get user" }, { status: 400 });
  }
}
