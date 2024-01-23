import {z} from "zod";

export const AreaSchema = z.object({
    name: z.string().min(1, {
        message: "Name required",
    }),
});