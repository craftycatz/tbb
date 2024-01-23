import { db } from "@/db/client";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as z from "zod";
import * as bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email required",
  }),
  password: z.string().min(1, {
    message: "Password required",
  }),
});

export const config = {
  trustHost: true,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async authorized({ request, auth }) {
      const url = request.nextUrl;
      const isLoggedIn = !!auth?.user;

      if(url.pathname === "/") {
        return true;
      }

      if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/", url));
      }

      if(!auth?.user?.email) {
        return NextResponse.redirect(new URL("/", url));
      }

      const res = await fetch(`${url.origin}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: auth.user.email,
        }),
      });

      if (res.status === 400) {
        return NextResponse.redirect(new URL("/", url));
      }

      const user = await res.json();

      if (!user) {
        return NextResponse.redirect(new URL("/", url));
      }

      if (url.pathname.startsWith("/app/admin") && user.role !== "admin") {
        return NextResponse.redirect(new URL("/app/beverages", url));
      }

      if (
        url.pathname.startsWith("/app/event") &&
        user.role !== "eventUser" &&
        user.role !== "admin"
      ) {
        return NextResponse.redirect(new URL("/app/beverages", url));
      }

      return true;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = LoginSchema.parse(credentials);
        const user = await db.query.User.findFirst({
          where: (User, { eq }) => eq(User.email, email),
          with: {
            areas: true,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...config,
});
