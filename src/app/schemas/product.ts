import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const ProductSchema = z.object({
  name: z.string().min(1, {
    message: "Name required",
  }),
  volume: z.string().min(1, {
    message: "Volume required",
  }),
  type: z.enum(["beverage", "event"]),
  // validate image file
  image: z
    .any()
    .refine((files) => files?.length != 0, "Image is required.")
    .optional(),
});
