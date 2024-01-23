"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CartItem, useCartStore } from "@/app/state/cart";
import { Separator } from "@/components/ui/separator";
import { OrderButton } from "./order-button";
import { ScrollArea } from "./ui/scroll-area";
import { XIcon } from "lucide-react";
import { usePathname } from "next/navigation";

type CartContentProps = {
  areaOrders: any[];
  areaId: string;
};

export function CartContent({ areaOrders, areaId }: CartContentProps) {
  const path = usePathname();
  const cart = useCartStore();
  const { items } = cart;

  if (!path.includes("event")) {
    //TODO: implement event cart
  }

  return (
    <div className="min-w-full">
      {items.length > 0 ? (
        <div className="space-y-4">
          <Table className="w-full">
            <ScrollArea className="h-[23rem] p-2">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Item</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full max-h-10">
                {items.map((item: CartItem, idx: number) => (
                  <TableRow key={item.beverage.id}>
                    <TableCell className="font-medium text-nowrap text-left w-1/2">
                      {item.beverage.name}
                    </TableCell>
                    <TableCell className="text-right w-1/2">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right w-1/2">
                      <button
                        className="hover:text-red-500"
                        onClick={() => cart.removeItem(item)}
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </ScrollArea>
          </Table>
          <OrderButton items={items} areaId={areaId} className="w-full" />
        </div>
      ) : (
        <div>
          <p className="text-center text-lg font-semibold">
            Your cart is empty
          </p>
        </div>
      )}
      <Separator className="my-2" />
      {areaOrders.length > 0 ? (
        <>
          <h1>Already Ordered</h1>
          <Table className="w-full">
            <ScrollArea className="h-[23rem] p-2">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Item</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full max-h-10">
                {areaOrders.map((item: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-nowrap text-left w-1/2">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-right w-1/2">
                      {item.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </ScrollArea>
          </Table>
        </>
      ) : (
        <div>
          <p className="text-center text-lg font-semibold">No orders yet</p>
        </div>
      )}
    </div>
  );
}
