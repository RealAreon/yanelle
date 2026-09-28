import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { tLocal } from "@/lib/locale-text";
import {
  getCatalogProductBySlug,
  getCatalogProducts,
} from "@/lib/shopify";
import { ProductGallery } from "@/components/store/product-gallery";
import { ProductPurchase } from "@/components/store/product-purchase";
import { ProductCard } from "@/components/store/product-card";

export async function generateStaticParams() {
  const products = await getCatalogProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const [product, products] = await Promise.all([
    getCatalogProductBySlug(slug),
    getCatalogProducts(),
  ]);
  if (!product) notFound();
  const related = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);

  return (
    <div className="page-gutter py-8 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,.55fr)] lg:gap-16">
        <ProductGallery
          images={product.images}
          alt={tLocal(product.name, locale)}
        />
        <ProductPurchase product={product} locale={locale} />
      </div>
      {related.length > 0 && (
        <section className="py-20 lg:py-28">
          <h2 className="font-heading text-4xl">You may also like</h2>
          <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {related.map((item) => <ProductCard key={item.id} product={item} locale={locale} />)}
          </div>
        </section>
      )}
    </div>
  );
}
