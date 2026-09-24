import type { LocalizedString } from "@/data/products";

export function tLocal(value: LocalizedString, locale: string): string {
  return value[locale as keyof LocalizedString] ?? value.en;
}
