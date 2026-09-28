"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CookiePreferences = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
};

type CookieConsentState = {
  decided: boolean;
  preferences: CookiePreferences;
  panelOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  saveCustom: (prefs: Omit<CookiePreferences, "necessary">) => void;
  openPanel: () => void;
  closePanel: () => void;
  canUseFunctional: () => boolean;
  canUseAnalytics: () => boolean;
};

const defaultPrefs: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
};

export const COOKIE_CONSENT_STORAGE_KEY = "yanelle-cookie-consent-v1";

function clearAnalyticsArtifacts() {
  if (typeof window === "undefined") return;
  try {
    const keys = Object.keys(window.localStorage);
    for (const key of keys) {
      if (key.startsWith("_ga") || key.startsWith("ga_") || key.includes("analytics")) {
        window.localStorage.removeItem(key);
      }
    }
    // Expire common GA cookies on this host
    const expire = "Thu, 01 Jan 1970 00:00:00 GMT";
    for (const raw of document.cookie.split(";")) {
      const name = raw.split("=")[0]?.trim();
      if (!name) continue;
      if (name.startsWith("_ga") || name === "_gid" || name === "_gat") {
        document.cookie = `${name}=; expires=${expire}; path=/`;
      }
    }
  } catch {
    /* ignore */
  }
}

export const useCookieConsent = create<CookieConsentState>()(
  persist(
    (set, get) => ({
      decided: false,
      preferences: defaultPrefs,
      panelOpen: false,
      acceptAll: () =>
        set({
          decided: true,
          panelOpen: false,
          preferences: {
            necessary: true,
            functional: true,
            analytics: true,
          },
        }),
      rejectNonEssential: () => {
        clearAnalyticsArtifacts();
        set({
          decided: true,
          panelOpen: false,
          preferences: defaultPrefs,
        });
      },
      saveCustom: (prefs) => {
        if (!prefs.analytics) clearAnalyticsArtifacts();
        set({
          decided: true,
          panelOpen: false,
          preferences: {
            necessary: true,
            functional: prefs.functional,
            analytics: prefs.analytics,
          },
        });
      },
      openPanel: () => set({ panelOpen: true }),
      closePanel: () => set({ panelOpen: false }),
      canUseFunctional: () => get().decided && get().preferences.functional,
      canUseAnalytics: () => get().decided && get().preferences.analytics,
    }),
    {
      name: COOKIE_CONSENT_STORAGE_KEY,
      partialize: (state) => ({
        decided: state.decided,
        preferences: state.preferences,
      }),
    },
  ),
);
