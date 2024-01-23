"use server";
import { z } from "zod";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import { items } from "@/db/schema";

const deleteItemSchema = z.object({
  id: z.string(),
});

/**
 * Deletes a product from the database.
 * @param values - The values to delete the product.
 * @returns An object indicating the success or failure of the deletion operation.
 */
export const deleteProduct = async (values: z.infer<typeof deleteItemSchema>) => {
    const validatedValues = deleteItemSchema.safeParse(values);
    if (!validatedValues.success) {
        return { error: "Invalid item id" };
    }

    const { id } = validatedValues.data;
    try {
        await db.delete(items).where(eq(items.id, id));
        return { error: undefined, success: true };
    } catch (error) {
        return { error: "Error deleting item", success: false };
    }
};
