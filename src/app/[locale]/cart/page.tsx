import { setRequestLocale } from "next-intl/server";
import { CartPageClient } from "@/components/store/cart-page-client";

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="page-gutter mx-auto max-w-6xl py-16 lg:py-24">
      <h1 className="font-heading text-6xl">Shopping bag</h1>
      <div className="mt-10"><CartPageClient locale={locale} /></div>
    </div>
  );
}
