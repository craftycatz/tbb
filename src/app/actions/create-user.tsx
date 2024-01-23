"use server";
import { UserSchema } from "../schemas/user";
import { db } from "@/db/client";
import { User } from "@/db/schema";
import { z } from "zod";
import * as bcrypt from "bcryptjs";

/**
 * Creates a new user with the provided values.
 * @param values - The user data to be validated and used for creating the user.
 * @returns An object with the result of the user creation operation.
 *          If successful, it contains the created user object.
 *          If unsuccessful, it contains an error message.
 */
export async function createUser(values: z.infer<typeof UserSchema>) {
  const validatedValues = UserSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid user data", success: false };
  }

  const { email, fname, lname, areaId } = validatedValues.data;

  // random password 8-12 characters, 1 uppercase, 1 lowercase, 1 number, one special character at least
  const randomPassword = Math.random()
    .toString(36)
    .slice(-8)
    .replace(/[^a-z0-9]+/gi, "")
    .replace(/[a-z]/g, (x) => x.toUpperCase())
    .replace(/\d(?=\d{2})/, "$&$&");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(randomPassword, salt);

  const user = await db
    .insert(User)
    .values({
      email,
      fname,
      lname,
      areaId,
      settings: {},
      password: hash,
      role: "user",
    })
    .returning();

  return {
    error: false,
    success: { user: user[0] },
  };
}
