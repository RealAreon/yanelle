import { defineRouting } from "next-intl/routing";
import { pathnames } from "./pathnames";

export const routing = defineRouting({
  locales: ["uk", "en", "pl", "fr", "de", "es"],
  defaultLocale: "uk",
  localePrefix: "always",
  pathnames,
});

export type Locale = (typeof routing.locales)[number];
