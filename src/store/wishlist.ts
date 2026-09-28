"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
  pruneTo: (validIds: string[]) => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) =>
        set((state) => ({
          ids: state.ids.includes(productId)
            ? state.ids.filter((id) => id !== productId)
            : [...state.ids, productId],
        })),
      has: (productId) => get().ids.includes(productId),
      clear: () => set({ ids: [] }),
      pruneTo: (validIds) => {
        const allowed = new Set(validIds);
        set((state) => {
          const next = state.ids.filter((id) => allowed.has(id));
          return next.length === state.ids.length ? state : { ids: next };
        });
      },
    }),
    {
      name: "yanelle-wishlist-v2",
      version: 2,
      migrate: () => ({ ids: [] }),
    },
  ),
);
