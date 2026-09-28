"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";

/** Drops stale wishlist/cart rows left from demo catalog or removed Shopify products. */
export function CatalogStoreSync({ productIds }: { productIds: string[] }) {
  const pruneWishlist = useWishlist((state) => state.pruneTo);
  const pruneCart = useCart((state) => state.pruneTo);

  useEffect(() => {
    // Drop legacy demo-catalog keys that caused ghost wishlist/cart badges.
    try {
      window.localStorage.removeItem("yanelle-wishlist");
      window.localStorage.removeItem("yanelle-cart");
    } catch {
      /* ignore */
    }
    if (productIds.length === 0) return;
    pruneWishlist(productIds);
    pruneCart(productIds);
  }, [productIds, pruneWishlist, pruneCart]);

  return null;
}
