import { getTranslations, setRequestLocale } from "next-intl/server";
import { products } from "@/data/products";
import { WishlistClient } from "@/components/store/wishlist-client";

export default async function WishlistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("wishlist");
  return (
    <div className="page-gutter py-16 lg:py-24">
      <h1 className="font-heading text-6xl sm:text-7xl">{t("title")}</h1>
      <div className="mt-12"><WishlistClient products={products} locale={locale} /></div>
    </div>
  );
}
