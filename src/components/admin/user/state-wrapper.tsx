"use client";
import * as React from "react";
import { DataTable } from "../data-table";
import { CreateUserButton } from "./create-user-button";
import { columns } from "@/components/admin/user/columns";
import { useUserStore } from "@/app/state/user";
import { User } from "@/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { CreateAreaButton } from "../area/create-area";

interface StateWrapperProps {
  data: InferSelectModel<typeof User>[];
  areasData: any[];
}

export const StateWrapper = ({ data, areasData }: StateWrapperProps) => {
  const userStore = useUserStore();
  React.useEffect(() => {
    userStore.setUsers(data);
    // we just want to make sure the component is mounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex justify-end w-full">
        <CreateUserButton areasData={areasData} />
      </div>
      <DataTable
        columns={columns}
        data={userStore.getUsers()}
        searchTerm="email"
      />
    </>
  );
};
