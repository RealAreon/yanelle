"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { Link } from "@/i18n/navigation";
import { tLocal } from "@/lib/locale-text";
import { useHydrated } from "@/lib/use-hydrated";
import { useWishlist } from "@/store/wishlist";
import { Badge } from "@/components/ui/badge";
import { Price } from "./price";

const tagLabels = {
  new: "New",
  sale: "Sale",
  limited: "Limited",
};

export function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) {
  const ids = useWishlist((state) => state.ids);
  const toggle = useWishlist((state) => state.toggle);
  const wished = useHydrated() && ids.includes(product.id);

  return (
    <article className="group relative">
      <Link
        href={{ pathname: "/product/[slug]", params: { slug: product.slug } }}
        className="block overflow-hidden bg-beige-deep"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={tLocal(product.name, locale)}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-none border border-white/40 bg-beige/90 text-[10px] uppercase tracking-[0.15em]"
              >
                {tagLabels[tag]}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wished}
        onClick={() => toggle(product.id)}
        className="absolute right-2 top-2 flex size-11 cursor-pointer items-center justify-center bg-beige/80 transition-colors hover:bg-beige"
      >
        <Heart className={wished ? "fill-ink" : ""} size={18} strokeWidth={1.5} />
      </button>
      <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-3 sm:py-4">
        <div className="min-w-0">
          <Link
            href={{ pathname: "/product/[slug]", params: { slug: product.slug } }}
            className="font-heading text-base leading-tight underline-offset-4 decoration-champagne hover:underline sm:text-lg"
          >
            {tLocal(product.name, locale)}
          </Link>
          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]">
            {product.category}
          </p>
        </div>
        <div className="shrink-0 text-sm sm:text-right">
          <Price amountUAH={product.priceUAH} locale={locale} />
          {product.compareAtUAH && (
            <Price
              amountUAH={product.compareAtUAH}
              locale={locale}
              className="ml-2 text-xs text-muted-foreground line-through"
            />
          )}
        </div>
      </div>
    </article>
  );
}
