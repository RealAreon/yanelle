"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import type { Currency } from "@/data/products";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useHydrated } from "@/lib/use-hydrated";
import { useCart } from "@/store/cart";
import { usePreferences } from "@/store/preferences";
import { useWishlist } from "@/store/wishlist";
import { Button } from "@/components/ui/button";
import { ElegantSelect } from "@/components/layout/elegant-select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const nav = [
  ["/shop", "shop"],
  ["/collections", "collections"],
  ["/lookbook", "lookbook"],
  ["/about", "about"],
] as const;

type StaticPath =
  | "/"
  | "/shop"
  | "/collections"
  | "/lookbook"
  | "/about"
  | "/contact"
  | "/shipping"
  | "/cart"
  | "/checkout"
  | "/wishlist"
  | "/order/success"
  | "/terms"
  | "/privacy"
  | "/cookies";

const localeOptions = routing.locales.map((item) => ({
  value: item,
  label: item.toUpperCase(),
}));

const currencyOptions = (["UAH", "USD", "EUR"] as Currency[]).map((item) => ({
  value: item,
  label: item,
}));

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const routeParams = useParams<{ slug?: string }>();
  const router = useRouter();
  const preferredCurrency = usePreferences((state) => state.currency);
  const setCurrency = usePreferences((state) => state.setCurrency);
  const setCartOpen = usePreferences((state) => state.setCartOpen);
  const storedCartCount = useCart((state) => state.itemCount());
  const storedWishlistCount = useWishlist((state) => state.ids.length);
  const hydrated = useHydrated();
  const currency = hydrated ? preferredCurrency : "UAH";
  const cartCount = hydrated ? storedCartCount : 0;
  const wishlistCount = hydrated ? storedWishlistCount : 0;

  function changeLocale(nextLocale: string) {
    if (pathname === "/product/[slug]" && routeParams.slug) {
      router.replace(
        { pathname: "/product/[slug]", params: { slug: routeParams.slug } },
        { locale: nextLocale },
      );
      return;
    }
    if (pathname === "/collections/[slug]" && routeParams.slug) {
      router.replace(
        { pathname: "/collections/[slug]", params: { slug: routeParams.slug } },
        { locale: nextLocale },
      );
      return;
    }
    router.replace(pathname as StaticPath, { locale: nextLocale });
  }

  const controls = (
    <div className="flex items-center gap-4">
      <ElegantSelect
        ariaLabel="Language"
        value={locale}
        options={localeOptions}
        onChange={changeLocale}
        className="text-ink/75 hover:text-champagne"
      />
      <ElegantSelect
        ariaLabel="Currency"
        value={currency}
        options={currencyOptions}
        onChange={(value) => setCurrency(value as Currency)}
        className="text-ink/75 hover:text-champagne"
      />
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-[#e8dccb] text-ink backdrop-blur-md">
      <div className="page-gutter grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-20">
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary navigation"
        >
          {nav.map(([href, key]) => (
            <Link
              key={href}
              href={href}
              className="text-[11px] uppercase tracking-[0.14em] text-ink/80 underline-offset-8 decoration-champagne transition-colors duration-300 hover:text-ink hover:underline"
            >
              {t(key)}
            </Link>
          ))}
        </nav>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              aria-label="Menu"
              className="inline-flex size-10 cursor-pointer items-center justify-center text-ink transition-opacity duration-300 hover:opacity-70"
            >
              <Menu size={20} strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full max-w-sm border-r border-border/70 bg-beige px-8 text-foreground duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <SheetHeader className="px-0 py-8">
                <SheetTitle className="brand-lettering text-lg tracking-[0.35em] text-ink">
                  <SheetClose
                    render={
                      <Link
                        href="/"
                        className="transition-opacity duration-300 hover:opacity-70"
                      />
                    }
                  >
                    ＹＡＮÈＬＬＥ
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col border-t border-border/70">
                {nav.map(([href, key]) => (
                  <SheetClose
                    key={href}
                    render={
                      <Link
                        href={href}
                        className="border-b border-border/70 py-5 font-heading text-3xl transition-colors duration-300 hover:text-champagne"
                      />
                    }
                  >
                    {t(key)}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-10">{controls}</div>
            </SheetContent>
          </Sheet>
        </div>

        <Link
          href="/"
          className="brand-lettering max-w-[46vw] justify-self-center overflow-hidden text-ellipsis whitespace-nowrap font-heading text-[0.95rem] font-medium text-ink transition-opacity duration-300 hover:opacity-80 sm:max-w-none sm:text-lg lg:text-xl"
        >
          ＹＡＮÈＬＬＥ
        </Link>

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <div className="mr-2 hidden xl:block">{controls}</div>
          <Link
            href={{ pathname: "/shop", query: { q: "" } }}
            aria-label={t("search")}
            className="inline-flex size-10 items-center justify-center text-ink transition-opacity duration-300 hover:opacity-70"
          >
            <Search size={18} strokeWidth={1.5} />
          </Link>
          <Link
            href="/wishlist"
            aria-label={`${t("wishlist")} (${wishlistCount})`}
            className="hidden size-10 items-center justify-center text-ink transition-opacity duration-300 hover:opacity-70 sm:inline-flex"
          >
            <Heart size={18} strokeWidth={1.5} />
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            aria-label={`${t("cart")} (${cartCount})`}
            onClick={() => setCartOpen(true)}
            className="relative text-ink transition-opacity duration-300 hover:bg-ink/5 hover:opacity-70 hover:text-ink"
          >
            <ShoppingBag />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-ink text-[9px] text-beige">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
