"use server";
import { signOut } from "@/lib/auth";

/**
 * Logs out the user.
 */
export const LogOut = async () => {
  await signOut({
    redirectTo: "/",
  });
};
