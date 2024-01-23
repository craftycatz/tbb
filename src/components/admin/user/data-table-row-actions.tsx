"use client";

import { MoreHorizontal } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteUser } from "@/app/actions/delete-user";
import { useRouter } from "next/navigation";
import React from "react";
import { useUserStore } from "@/app/state/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import EditUserForm from "./edit-user-form";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // @ts-ignore - TData doesn't know its own type lol
  const userId = row.original.id;
  // @ts-ignore - TData doesn't know its own type lol
  const userEmail = row.original.email;
  // @ts-ignore - TData doesn't know its own type lol
  const userRole = row.original.role;
  const userStore = useUserStore();
  const [isPending, startTransition] = React.useTransition();

  const deleteFromDb = async (userId: string) => {
    startTransition(async () => {
      const { success, error } = await deleteUser({ id: userId });
      if (error) {
        console.error(error);
      }
      if (success) {
        userStore.deleteUser(userId);
        //router.push("/app/admin/user");
      }
    });
  };

  const editUser = async (
    userId: string,
    areaId: string,
    role: "user" | "admin" | "eventUser"
  ) => {};

  return (
    <Dialog>
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
            onClick={() => deleteFromDb(userId)}
            disabled={isPending}
          >
            Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger className="w-full">
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>Edit the users area and role.</DialogDescription>
        <EditUserForm userEmail={userEmail} userRole={userRole} />
      </DialogContent>
    </Dialog>
  );
}
