"use client";
import { Button } from "./ui/button";
import { CartItem } from "@/app/state/cart";
import { createBeverageOrder } from "@/app/actions/create-order";
import { useTransition } from "react";
import { useCartStore } from "@/app/state/cart";

interface OrderButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  items: CartItem[];
  areaId: string;
}

export const OrderButton = ({ items, areaId, className }: OrderButtonProps) => {
  const cart = useCartStore();
  const [isPending, startTransition] = useTransition();

  const createOrder = () => {
    startTransition(() => {
      createBeverageOrder(items, areaId).then(() => {
        cart.clearCart();
      });
    });
  };

  return (
    <Button
      className={className}
      onClick={() => createOrder()}
      disabled={isPending}
    >
      Order
    </Button>
  );
};
