import { config as cfg } from "@/lib/auth";
import NextAuth from "next-auth";

export default NextAuth(cfg).auth;

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
