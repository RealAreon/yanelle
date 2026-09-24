"use client";

import { useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { clothingSizeChart } from "@/data/size-charts";
import { tLocal } from "@/lib/locale-text";
import { useHydrated } from "@/lib/use-hydrated";
import { useWishlist } from "@/store/wishlist";
import { AddToCartButton } from "./add-to-cart-button";
import { Price } from "./price";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProductPurchase({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) {
  const [size, setSize] = useState(product.sizes?.[0]);
  const [colorHex, setColorHex] = useState(product.colors[0]?.hex);
  const [quantity, setQuantity] = useState(1);
  const ids = useWishlist((state) => state.ids);
  const toggle = useWishlist((state) => state.toggle);
  const wished = useHydrated() && ids.includes(product.id);

  return (
    <div className="lg:sticky lg:top-28">
      <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {product.category}
      </p>
      <h1 className="mt-3 font-heading text-5xl leading-none">{tLocal(product.name, locale)}</h1>
      <div className="mt-5 text-lg">
        <Price amountUAH={product.priceUAH} locale={locale} />
      </div>
      <p className="mt-6 text-sm leading-7 text-muted-foreground">
        {tLocal(product.description, locale)}
      </p>

      {product.sizes && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.18em]">Size</span>
            <Dialog>
              <DialogTrigger render={<button className="cursor-pointer text-xs underline decoration-champagne underline-offset-4" />}>
                Size guide
              </DialogTrigger>
              <DialogContent className="max-w-2xl rounded-none p-7">
                <DialogHeader>
                  <DialogTitle className="font-heading text-3xl">Size guide</DialogTitle>
                  <DialogDescription>Measurements are in centimetres.</DialogDescription>
                </DialogHeader>
                <div className="overflow-x-auto">
                  <table className="mt-4 w-full text-left text-xs">
                    <thead><tr className="border-b">{["Size", "EU", "UA", "Bust", "Waist", "Hips"].map((label) => <th key={label} className="py-3 font-medium">{label}</th>)}</tr></thead>
                    <tbody>{clothingSizeChart.map((row) => <tr key={row.label} className="border-b"><td className="py-3">{row.label}</td><td>{row.eu}</td><td>{row.ua}</td><td>{row.bustCm}</td><td>{row.waistCm}</td><td>{row.hipsCm}</td></tr>)}</tbody>
                  </table>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={size === item}
                onClick={() => setSize(item)}
                className="min-w-12 cursor-pointer border px-3 py-2 text-xs aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-beige"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-7">
        <span className="text-[10px] uppercase tracking-[0.18em]">Color</span>
        <div className="mt-3 flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <button
              type="button"
              key={color.hex}
              onClick={() => setColorHex(color.hex)}
              aria-label={tLocal(color.name, locale)}
              aria-pressed={colorHex === color.hex}
              className="size-10 cursor-pointer rounded-full border-4 border-background ring-1 ring-border aria-pressed:ring-2 aria-pressed:ring-ink"
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center gap-1">
        <Button variant="outline" size="icon-lg" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus /></Button>
        <span className="w-10 text-center text-sm">{quantity}</span>
        <Button variant="outline" size="icon-lg" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus /></Button>
      </div>
      <div className="mt-5 flex gap-2">
        <AddToCartButton product={product} locale={locale} size={size} colorHex={colorHex} quantity={quantity} className="h-12 flex-1 rounded-none" />
        <Button
          variant="outline"
          size="icon-lg"
          className="size-12 rounded-none"
          onClick={() => toggle(product.id)}
          aria-label="Toggle wishlist"
        >
          <Heart className={wished ? "fill-ink" : ""} />
        </Button>
      </div>
      <p className="mt-4 text-center text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        Безкоштовна доставка
      </p>
      <div className="mt-9 divide-y border-y text-sm">
        <details className="py-4"><summary className="cursor-pointer">Materials</summary><p className="pt-3 leading-6 text-muted-foreground">{tLocal(product.materials, locale)}</p></details>
        <details className="py-4"><summary className="cursor-pointer">Care</summary><p className="pt-3 leading-6 text-muted-foreground">{tLocal(product.care, locale)}</p></details>
      </div>
    </div>
  );
}
