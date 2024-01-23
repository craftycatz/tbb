"use client";

import { MoreHorizontal } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProduct } from "@/app/actions/delete-product";
import React from "react";
import { useAreaStore } from "@/app/state/area";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // @ts-ignore - TData doesn't know its own type lol
  const areaId = row.original.id;
  const areaStore = useAreaStore();
  const [isPending, startTransition] = React.useTransition();

  const deleteFromDb = async (itemId: string) => {
    startTransition(async () => {
      const { error, success } = await deleteProduct({ id: itemId });
      if (error) {
        console.log(error);
      }
      if (success) {
        areaStore.deleteArea(areaId);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => deleteFromDb(areaId)}
          disabled={isPending}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => deleteFromDb(areaId)}
          disabled={isPending}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
