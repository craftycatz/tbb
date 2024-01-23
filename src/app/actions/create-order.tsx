"use server";
import { CartItem } from "@/app/state/cart";
import { db } from "@/db/client";
import { itemOrders, orders } from "@/db/schema";
import { redirect } from "next/navigation";
/**
 * Creates a beverage order with the given items and area ID.
 * @param items - An array of CartItem objects representing the items to be ordered.
 * @param areaId - The ID of the area where the order is being placed.
 * @returns A Promise that resolves to void.
 */
export const createBeverageOrder = async (
  items: CartItem[],
  areaId: string
) => {
  const order = await db
    .insert(orders)
    .values({
      areaId,
      status: "pending",
    })
    .returning();

  for (const item of items) {
    await db.insert(itemOrders).values({
      itemId: item.beverage.id,
      orderId: order[0].id,
      amount: item.quantity,
    });
  }

  return redirect(`/app/beverages`);
};
