"use client";

import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { tLocal } from "@/lib/locale-text";
import { useCart } from "@/store/cart";
import { usePreferences } from "@/store/preferences";
import { Button } from "@/components/ui/button";
import { flyToCart } from "./fly-to-cart";

export function AddToCartButton({
  product,
  locale,
  size,
  colorHex,
  quantity = 1,
  className,
}: {
  product: Product;
  locale: string;
  size?: string;
  colorHex?: string;
  quantity?: number;
  className?: string;
}) {
  const addItem = useCart((state) => state.addItem);
  const setCartOpen = usePreferences((state) => state.setCartOpen);
  const variant =
    product.variants.find(
      (item) =>
        (!size || item.size === size) &&
        (!colorHex || item.colorHex === colorHex),
    ) ?? product.variants[0];

  return (
    <Button
      type="button"
      size="lg"
      className={className}
      disabled={!variant || variant.stock < 1}
      onClick={(event) => {
        if (!variant) return;
        flyToCart(event.currentTarget);
        addItem(
          {
            productId: product.id,
            slug: product.slug,
            name: tLocal(product.name, locale),
            image: product.images[0],
            priceUAH: product.priceUAH,
            variantId: variant.id,
            size: variant.size,
            color: tLocal(variant.color, locale),
          },
          quantity,
        );
        window.setTimeout(() => setCartOpen(true), 520);
        toast.success(
          locale === "uk" ? "Додано до кошика" : "Added to your bag",
        );
      }}
    >
      <ShoppingBag />
      {locale === "uk" ? "Додати до кошика" : "Add to bag"}
    </Button>
  );
}
