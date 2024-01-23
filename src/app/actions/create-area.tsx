"use server";
import { db } from "@/db/client";
import { areas } from "@/db/schema";
import { z } from "zod";
import { AreaSchema } from "../schemas/area";

/**
 * Creates an area with the provided values.
 * @param values The values to create the area with.
 * @returns An object containing the result of the area creation.
 */
export async function createArea(values: z.infer<typeof AreaSchema>) {
    const validatedValues = AreaSchema.safeParse(values);
    if (!validatedValues.success) {
        return { error: "Invalid user data", success: false };
    }

    const { name } = validatedValues.data;

    const area = await db
        .insert(areas)
        .values({
            name,
        })
        .returning();

    return {
        error: false,
        success: { area: area[0] },
    };
}

