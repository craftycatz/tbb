import * as z from "zod";

export const UserSchema = z.object({
  email: z.string().email({
    message: "Email required",
  }),
  fname: z.string().min(1, {
    message: "First name required",
  }),
  lname: z.string().min(1, {
    message: "Last name required",
  }),
  areaId: z.string().min(1, {
    message: "Area required",
  }),
  role: z.enum(["admin", "user", "eventUser"]),
});

export const EditUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "user", "eventUser"]),
  area: z.string().min(1),
});
