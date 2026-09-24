import { getTranslations, setRequestLocale } from "next-intl/server";
import { products } from "@/data/products";
import { CatalogClient } from "@/components/store/catalog-client";

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; category?: string; tag?: string }>;
}) {
  const { locale } = await params;
  const filters = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("catalog");

  return (
    <div className="page-gutter py-14 lg:py-20">
      <div className="mb-14 border-b border-border/70 pb-10">
        <p className="text-[10px] uppercase tracking-[0.24em] text-champagne">The complete edit</p>
        <h1 className="mt-3 font-heading text-4xl sm:text-6xl lg:text-7xl">{t("title")}</h1>
      </div>
      <CatalogClient
        products={products}
        locale={locale}
        initialQuery={filters.q}
        initialCategory={filters.category}
        initialTag={filters.tag}
      />
    </div>
  );
}
