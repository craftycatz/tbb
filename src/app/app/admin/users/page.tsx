import * as React from "react";
import { MainNav } from "@/components/admin/admin-nav";
import { db } from "@/db/client";
import { User, areas } from "@/db/schema";
import { Metadata } from "next";
import { StateWrapper } from "@/components/admin/user/state-wrapper";

export const metadata: Metadata = {
  title: "TBeverage - Admin - Users",
  description: "Manage users",
};


export default async function UsersPage() {
  const users = await db.select().from(User);
  const areasData = await db.select().from(areas);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 space-y-6">
      <div className="w-full space-y-6">
        <MainNav page="users" />
        <StateWrapper data={users} areasData={areasData} />
      </div>
    </main>
  );
}
