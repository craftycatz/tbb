"use client";
import * as React from "react";
import { DataTable } from "../data-table";
import { columns } from "@/components/admin/area/columns";
import { useAreaStore } from "@/app/state/area";
import { areas } from "@/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { CreateAreaButton } from "../area/create-area";

interface StateWrapperProps {
  data: InferSelectModel<typeof areas>[];
}

export const StateWrapper = ({ data }: StateWrapperProps) => {
  const areaStore = useAreaStore();
  React.useEffect(() => {
    areaStore.setAreas(data);
    // we just want to make sure the component is mounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex justify-end w-full">
        <CreateAreaButton />
      </div>
      <DataTable
        columns={columns}
        data={areaStore.getAreass()}
        searchTerm="name"
      />
    </>
  );
};
