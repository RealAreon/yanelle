"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { convertFromUAH, formatMoney } from "@/lib/currency";
import { useHydrated } from "@/lib/use-hydrated";
import { useCart } from "@/store/cart";
import { usePreferences } from "@/store/preferences";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const [listRef] = useAutoAnimate();
  const storedItems = useCart((state) => state.items);
  const setQuantity = useCart((state) => state.setQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const subtotal = useCart((state) => state.subtotalUAH());
  const preferredCurrency = usePreferences((state) => state.currency);
  const hydrated = useHydrated();
  const items = hydrated ? storedItems : [];
  const currency = hydrated ? preferredCurrency : "UAH";
  const open = usePreferences((state) => state.cartOpen);
  const setOpen = usePreferences((state) => state.setCartOpen);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/70 px-7 py-6">
          <SheetTitle className="font-heading text-3xl font-normal tracking-wide">
            {t("title")}
          </SheetTitle>
          <SheetDescription className="text-[11px] uppercase tracking-[0.18em] text-champagne">
            {t("freeShipping")}
          </SheetDescription>
        </SheetHeader>
        <div ref={listRef} className="flex-1 overflow-y-auto px-7">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 px-4 text-center">
              <p className="font-heading text-2xl">{t("empty")}</p>
              <Button
                nativeButton={false}
                render={<Link href="/shop" onClick={() => setOpen(false)} />}
                variant="outline"
                className="rounded-none border-ink px-6"
              >
                {t("continue")}
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.variantId}
                className="flex gap-4 border-b border-border/60 py-6"
              >
                <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={{
                      pathname: "/product/[slug]",
                      params: { slug: item.slug },
                    }}
                    onClick={() => setOpen(false)}
                    className="font-heading text-lg transition-colors duration-300 hover:text-champagne"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {[item.color, item.size].filter(Boolean).join(" · ")}
                  </p>
                  <p className="mt-2 text-sm">
                    {formatMoney(
                      convertFromUAH(item.priceUAH, currency),
                      currency,
                      locale,
                    )}
                  </p>
                  <div className="mt-3 flex items-center gap-1">
                    <Button
                      size="icon-sm"
                      variant="outline"
                      aria-label="Decrease quantity"
                      className="rounded-none"
                      onClick={() =>
                        setQuantity(item.variantId, item.quantity - 1)
                      }
                    >
                      <Minus />
                    </Button>
                    <span className="w-9 text-center text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      size="icon-sm"
                      variant="outline"
                      aria-label="Increase quantity"
                      className="rounded-none"
                      onClick={() =>
                        setQuantity(item.variantId, item.quantity + 1)
                      }
                    >
                      <Plus />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      className="ml-auto"
                      aria-label={t("remove")}
                      onClick={() => removeItem(item.variantId)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <SheetFooter className="border-t border-border/70 px-5 py-5 sm:px-7 sm:py-6">
            <div className="mb-4 flex items-baseline justify-between gap-3 text-sm tracking-wide">
              <span className="uppercase tracking-[0.14em] text-muted-foreground">
                {t("subtotal")}
              </span>
              <strong className="shrink-0 text-right">
                {formatMoney(
                  convertFromUAH(subtotal, currency),
                  currency,
                  locale,
                )}
              </strong>
            </div>
            <Button
              nativeButton={false}
              size="lg"
              className="h-12 w-full min-w-0 shrink rounded-none px-3 text-[11px] uppercase tracking-[0.06em] whitespace-normal sm:px-4 sm:text-xs sm:tracking-[0.12em]"
              render={
                <Link href="/checkout" onClick={() => setOpen(false)} />
              }
            >
              {t("checkout")}
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
