import { create } from "zustand";
import { User } from "@/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { persist } from "zustand/middleware";

type UserStore = {
  users: InferSelectModel<typeof User>[];
  setUser: (user: InferSelectModel<typeof User>) => void;
  setUsers: (users: InferSelectModel<typeof User>[]) => void;
  deleteUser: (userId: string) => void;
  getUsers: () => InferSelectModel<typeof User>[];
  clearUser: () => void;
};

/**
 * User store hook that provides state management for users.
 */
export const useUserStore = create<UserStore>()((set, get) => ({
  /**
   * Array of users.
   */
  users: [],

  /**
   * Sets the users array.
   * @param users - The new array of users.
   */
  setUsers: (users) => {
    set({
      users: users,
    });
  },

  /**
   * Sets a user in the users array.
   * If the user already exists, it updates the user's properties.
   * If the user doesn't exist, it adds the user to the array.
   * @param user - The user object to set or update.
   */
  setUser: (user) => {
    const { users } = get();
    set({
      users: users.some((i) => i.id === user.id)
        ? users.map((i) => (i.id === user.id ? { ...i, ...user } : i))
        : [...users, user],
    });
  },

  /**
   * Deletes a user from the users array.
   * @param userId - The ID of the user to delete.
   */
  deleteUser: (userId) => {
    const { users } = get();
    set({
      users: users.filter((i) => i.id !== userId),
    });
  },

  /**
   * Clears the users array.
   */
  clearUser: () => {
    set({
      users: [],
    });
  },

  /**
   * Returns the current users array.
   * @returns The array of users.
   */
  getUsers: () => {
    const { users } = get();
    return users;
  },
}));
