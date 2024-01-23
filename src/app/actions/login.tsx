"use server";
import { z } from "zod";
import { LoginSchema } from "@/app/schemas/auth";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

/**
 * Logs in a user with the provided login credentials.
 * @param values - The login credentials.
 * @param callbackUrl - The URL to redirect to after successful login.
 * @returns An object with the login result.
 *          If there is an error, the object will contain the error message.
 *          If the login is successful, the object will contain the redirect URL.
 */
export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedValues = LoginSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid login credentials" };
  }

  const { email, password } = validatedValues.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "/app/beverages",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
      }
    }
  }

  return {
    error: undefined,
    success: { redirect: callbackUrl ?? "/app/beverages" },
  };
};
