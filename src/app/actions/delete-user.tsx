"use server";
import { z } from "zod";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import { User } from "@/db/schema";
import { revalidatePath, revalidateTag } from "next/cache";

const deleteUserSchema = z.object({
  id: z.string(),
});

/**
 * Deletes a user from the database.
 * @param values - The values to delete the user.
 * @returns An object with the result of the deletion operation.
 *          If the deletion is successful, the object will have `success` set to `true`.
 *          If there is an error, the object will have `error` set to the error message.
 */
export const deleteUser = async (values: z.infer<typeof deleteUserSchema>) => {
  const validatedValues = deleteUserSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid user id" };
  }

  const { id } = validatedValues.data;
  try {
    await db.delete(User).where(eq(User.id, id));
    revalidateTag("users");
    return { error: undefined, success: true };
  } catch (error) {
    return { error: "Error deleting user", success: false };
  }
};
