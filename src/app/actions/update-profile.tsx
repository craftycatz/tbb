"use server";
import { z } from "zod";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import { User} from "@/db/schema";

const profileSchema = z.object({
  email: z.string().email(),
  area: z.string({
    required_error: "Please select an area to order.",
  }),
  role: z.enum(["admin", "user", "eventUser"]),
});

/**
 * Deletes an area based on the provided values.
 * @param values - The values to delete the area.
 * @returns An object indicating the success or failure of the deletion.
 */
export const updateProfile = async (values: z.infer<typeof profileSchema>) => {
  const validatedValues = profileSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid data" };
  }

  const { email, role, area } = validatedValues.data;
  try {
    await db
      .update(User)
      .set({
        email: email,
        role: role,
        areaId: area,
      })
      .where(eq(User.email, email));
    return { error: undefined, success: true };
  } catch (error) {
    return { error: "Error updating user", success: false };
  }
};
