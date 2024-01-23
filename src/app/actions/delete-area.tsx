"use server";
import { z } from "zod";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import { User, areas } from "@/db/schema";
import { revalidatePath, revalidateTag } from "next/cache";

const deleteAreaSchema = z.object({
  id: z.string(),
});

/**
 * Deletes an area based on the provided values.
 * @param values - The values to delete the area.
 * @returns An object indicating the success or failure of the deletion.
 */
export const deleteArea = async (values: z.infer<typeof deleteAreaSchema>) => {
    const validatedValues = deleteAreaSchema.safeParse(values);
    if (!validatedValues.success) {
        return { error: "Invalid area id" };
    }

    const { id } = validatedValues.data;
    try {
        await db.delete(areas).where(eq(areas.id, id));
        return { error: undefined, success: true };
    } catch (error) {
        return { error: "Error deleting user", success: false };
    }
};
