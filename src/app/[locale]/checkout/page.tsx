import { setRequestLocale } from "next-intl/server";
import { CheckoutClient } from "@/components/store/checkout-client";

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="page-gutter mx-auto max-w-6xl py-16 lg:py-24">
      <h1 className="font-heading text-6xl">Checkout</h1>
      <div className="mt-12"><CheckoutClient locale={locale} /></div>
    </div>
  );
}
