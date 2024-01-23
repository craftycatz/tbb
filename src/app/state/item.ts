import { create } from "zustand";
import { items } from "@/db/schema";
import { type InferSelectModel } from "drizzle-orm";

type UserStore = {
  items: InferSelectModel<typeof items>[];
  setItem: (area: InferSelectModel<typeof items>) => void;
  setItems: (area: InferSelectModel<typeof items>[]) => void;
  deleteItem: (areaId: string) => void;
  getItems: () => InferSelectModel<typeof items>[];
  clearItems: () => void;
};

/**
 * A custom hook that creates a store for managing items.
 * @returns An object containing various methods for manipulating items.
 */
export const useItemStore = create<UserStore>()((set, get) => ({
  items: [],
  /**
   * Sets the items in the store.
   * @param items - The new array of items.
   */
  setItems: (items) => {
    set({
      items: items,
    });
  },
  /**
   * Sets a single item in the store.
   * If the item already exists in the store, it updates the existing item.
   * If the item does not exist in the store, it adds the item to the store.
   * @param item - The item to set or update.
   */
  setItem: (item) => {
    const { items } = get();
    set({
      items: items.some((i) => i.id === item.id)
        ? items.map((i) => (i.id === item.id ? { ...i, ...item } : i))
        : [...items, item],
    });
  },
  /**
   * Deletes an item from the store.
   * @param itemId - The ID of the item to delete.
   */
  deleteItem: (itemId) => {
    const { items } = get();
    set({
      items: items.filter((i) => i.id !== itemId),
    });
  },
  /**
   * Clears all items from the store.
   */
  clearItems: () => {
    set({
      items: [],
    });
  },
  /**
   * Retrieves all items from the store.
   * @returns An array of items.
   */
  getItems: () => {
    const { items } = get();
    return items;
  },
}));
