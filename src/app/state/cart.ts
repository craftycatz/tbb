import { create } from "zustand";
import { items } from "@/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { persist } from "zustand/middleware";

export type CartItem = {
  beverage: Partial<InferSelectModel<typeof items>>;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
};

/**
 * Represents the cart store.
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      /**
       * The items in the cart.
       */
      items: [],
      /**
       * Adds an item to the cart.
       * @param item - The item to be added.
       */
      addItem: (item) => {
        const { items } = get();
        // if item already exists in cart, increment quantity else add item to cart
        set({
          items: items.some((i) => i.beverage.id === item.beverage.id)
            ? items.map((i) =>
                i.beverage.id === item.beverage.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            : [...items, item],
        });
      },
      /**
       * Removes an item from the cart.
       * @param item - The item to be removed.
       */
      removeItem: (item) => {
        const { items } = get();

        set({
          items: items.filter((i) => i.beverage.id !== item.beverage.id),
        });
      },
      /**
       * Clears the cart.
       */
      clearCart: () => {
        set({
          items: [],
        });
      },
    }),
    {
      name: "cart",
    }
  )
);
