"use client";

import { AnimatePresence, motion } from "framer-motion";
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

  if (!hydrated) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse bg-muted/60" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-[12rem]">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        <AnimatePresence mode="popLayout">
          {items.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} locale={locale} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {items.length === 0 && (
          <motion.div
            key="empty"
            className="py-20 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <p className="font-heading text-4xl">Your wishlist is empty.</p>
            <Button
              nativeButton={false}
              render={<Link href="/shop" />}
              className="mt-8 rounded-none"
            >
              Discover the collection
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
