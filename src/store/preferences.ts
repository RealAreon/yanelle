"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Currency } from "@/data/products";

type PreferencesState = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      currency: "UAH",
      setCurrency: (currency) => set({ currency }),
      cartOpen: false,
      setCartOpen: (cartOpen) => set({ cartOpen }),
    }),
    {
      name: "yanelle-preferences",
      partialize: (s) => ({ currency: s.currency }),
    },
  ),
);
