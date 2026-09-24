"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useHydrated } from "@/lib/use-hydrated";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Price } from "./price";

export function CartPageClient({ locale }: { locale: string }) {
  const storedItems = useCart((state) => state.items);
  const setQuantity = useCart((state) => state.setQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const subtotal = useCart((state) => state.subtotalUAH());
  const items = useHydrated() ? storedItems : [];

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-heading text-4xl">Your bag is empty.</p>
        <Button nativeButton={false} render={<Link href="/shop" />} className="mt-8 rounded-none">Continue shopping</Button>
      </div>
    );
  }
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
      <div>
        {items.map((item) => (
          <div key={item.variantId} className="flex gap-5 border-b py-6">
            <div className="relative aspect-[3/4] w-28 shrink-0 bg-muted">
              <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col">
              <h2 className="font-heading text-2xl">{item.name}</h2>
              <p className="mt-2 text-xs text-muted-foreground">{item.color} · {item.size}</p>
              <Price amountUAH={item.priceUAH} locale={locale} className="mt-3 text-sm" />
              <div className="mt-auto flex items-center gap-1">
                <Button variant="outline" size="icon-sm" onClick={() => setQuantity(item.variantId, item.quantity - 1)}><Minus /></Button>
                <span className="w-9 text-center">{item.quantity}</span>
                <Button variant="outline" size="icon-sm" onClick={() => setQuantity(item.variantId, item.quantity + 1)}><Plus /></Button>
                <Button variant="ghost" size="icon-sm" className="ml-auto" onClick={() => removeItem(item.variantId)}><Trash2 /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <aside className="h-fit border p-6 lg:sticky lg:top-28">
        <div className="flex justify-between text-sm"><span>Subtotal</span><Price amountUAH={subtotal} locale={locale} /></div>
        <p className="mt-4 border-t pt-4 text-xs text-muted-foreground">Безкоштовна доставка</p>
        <Button nativeButton={false} render={<Link href="/checkout" />} className="mt-6 h-12 w-full rounded-none">Checkout</Button>
      </aside>
    </div>
  );
}
