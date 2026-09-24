import type { Currency } from "@/data/products";

/** Approximate FX rates from UAH (base). */
export const FX = {
  UAH: 1,
  USD: 0.024,
  EUR: 0.022,
} as const satisfies Record<Currency, number>;

export function convertFromUAH(
  amountUAH: number,
  currency: Currency,
): number {
  return amountUAH * FX[currency];
}

function formatNumber(value: number, fractionDigits: number): string {
  const fixed = value.toFixed(fractionDigits);
  const [intPart, decPart] = fixed.split(".");
  const withSpaces = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  return fractionDigits > 0 ? `${withSpaces}.${decPart}` : withSpaces;
}

/** Deterministic formatting — avoids SSR/CSR hydration mismatches from Intl. */
export function formatMoney(
  amount: number,
  currency: Currency,
  _locale?: string,
): string {
  if (currency === "UAH") {
    return `${formatNumber(Math.round(amount), 0)} ₴`;
  }
  const rounded = Math.round(amount * 100) / 100;
  const formatted = formatNumber(rounded, 2);
  return currency === "USD" ? `$${formatted}` : `€${formatted}`;
}
