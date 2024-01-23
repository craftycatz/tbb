"use server";

import { db } from "@/db/client";

export async function getUser({ id }: { id: string }) {
  const user = await db.query.User.findFirst({
    where: (User, { eq }) => eq(User.id, id),
  });

  return user;
}
