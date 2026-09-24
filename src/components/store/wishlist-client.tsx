"use client";

import type { Product } from "@/data/products";
import { Link } from "@/i18n/navigation";
import { useHydrated } from "@/lib/use-hydrated";
import { useWishlist } from "@/store/wishlist";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";

export function WishlistClient({
  products,
  locale,
}: {
  products: Product[];
  locale: string;
}) {
  const ids = useWishlist((state) => state.ids);
  const hydrated = useHydrated();
  const items = hydrated
    ? products.filter((product) => ids.includes(product.id))
    : [];
  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-heading text-4xl">Your wishlist is empty.</p>
        <Button nativeButton={false} render={<Link href="/shop" />} className="mt-8 rounded-none">Discover the collection</Button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {items.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
    </div>
  );
}
