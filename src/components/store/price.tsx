"use client";

import { convertFromUAH, formatMoney } from "@/lib/currency";
import { useHydrated } from "@/lib/use-hydrated";
import { usePreferences } from "@/store/preferences";

export function Price({
  amountUAH,
  locale,
  className,
}: {
  amountUAH: number;
  locale: string;
  className?: string;
}) {
  const preferredCurrency = usePreferences((state) => state.currency);
  const currency = useHydrated() ? preferredCurrency : "UAH";
  return (
    <span className={className} suppressHydrationWarning>
      {formatMoney(convertFromUAH(amountUAH, currency), currency, locale)}
    </span>
  );
}
