"use client";
import * as React from "react";
import { DataTable } from "../data-table";
import { columns } from "@/components/admin/products/columns";
import { useItemStore } from "@/app/state/item";
import { items } from "@/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { CreateProdcutButton } from "../products/create-product";

interface StateWrapperProps {
  data: InferSelectModel<typeof items>[];
}

export const StateWrapper = ({ data }: StateWrapperProps) => {
  const itemStore = useItemStore();
  React.useEffect(() => {
    itemStore.setItems(data);
    // we just want to make sure the component is mounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex justify-end w-full">
        <CreateProdcutButton />
      </div>
      <DataTable
        columns={columns}
        data={itemStore.getItems()}
        searchTerm="name"
      />
    </>
  );
};
