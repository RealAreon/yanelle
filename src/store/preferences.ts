"use client";

import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";
import type { Currency } from "@/data/products";
import { useCookieConsent } from "@/store/cookie-consent";

type PreferencesState = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

const memory = new Map<string, string>();

/** Persist currency only when functional cookies are allowed. */
const consentAwareStorage: StateStorage = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    const { decided, preferences } = useCookieConsent.getState();
    if (!decided || !preferences.functional) {
      return memory.get(name) ?? null;
    }
    return window.localStorage.getItem(name) ?? memory.get(name) ?? null;
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") return;
    memory.set(name, value);
    const { decided, preferences } = useCookieConsent.getState();
    if (decided && preferences.functional) {
      window.localStorage.setItem(name, value);
    } else {
      window.localStorage.removeItem(name);
    }
  },
  removeItem: (name) => {
    memory.delete(name);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(name);
    }
  },
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
      storage: createJSONStorage(() => consentAwareStorage),
      partialize: (s) => ({ currency: s.currency }),
    },
  ),
);

useCookieConsent.subscribe((state, prev) => {
  if (
    state.decided &&
    !state.preferences.functional &&
    prev.preferences.functional
  ) {
    try {
      window.localStorage.removeItem("yanelle-preferences");
    } catch {
      /* ignore */
    }
  }
});
