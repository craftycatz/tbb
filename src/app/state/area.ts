import { create } from "zustand";
import { areas } from "@/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { persist } from "zustand/middleware";

type UserStore = {
  areas: InferSelectModel<typeof areas>[];
  setArea: (area: InferSelectModel<typeof areas>) => void;
  setAreas: (area: InferSelectModel<typeof areas>[]) => void;
  deleteArea: (areaId: string) => void;
  getAreass: () => InferSelectModel<typeof areas>[];
  clearAreas: () => void;
};

/**
 * Custom hook for managing the state of areas.
 *
 * @returns An object with methods to manage the areas state.
 */
export const useAreaStore = create<UserStore>()((set, get) => ({
  areas: [],
  /**
   * Sets the areas state to the specified array of areas.
   *
   * @param areas - The array of areas to set.
   */
  setAreas: (areas) => {
    set({
      areas: areas,
    });
  },
  /**
   * Sets the specified area in the areas state.
   * If the area already exists in the state, it updates the existing area.
   * If the area does not exist, it adds the area to the state.
   *
   * @param area - The area to set or add.
   */
  setArea: (area) => {
    const { areas } = get();
    // if item already exists in cart, do nothing else add item to cart
    set({
      areas: areas.some((i) => i.id === area.id)
        ? areas.map((i) => (i.id === area.id ? { ...i, ...area } : i))
        : [...areas, area],
    });
  },
  /**
   * Deletes the area with the specified ID from the areas state.
   *
   * @param areaId - The ID of the area to delete.
   */
  deleteArea: (areaId) => {
    const { areas } = get();

    set({
      areas: areas.filter((i) => i.id !== areaId),
    });
  },
  /**
   * Clears the areas state, removing all areas.
   */
  clearAreas: () => {
    set({
      areas: [],
    });
  },
  /**
   * Retrieves the current array of areas from the areas state.
   *
   * @returns The current array of areas.
   */
  getAreass: () => {
    const { areas } = get();
    return areas;
  },
}));
