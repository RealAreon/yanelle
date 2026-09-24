import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getProductBySlug, products } from "@/data/products";
import { tLocal } from "@/lib/locale-text";
import { ProductPurchase } from "@/components/store/product-purchase";
import { ProductCard } from "@/components/store/product-card";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);

  return (
    <div className="page-gutter py-8 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,.55fr)] lg:gap-16">
        <div className="grid gap-3 sm:grid-cols-2">
          {product.images.map((image, index) => (
            <div key={image} className={`relative aspect-[3/4] overflow-hidden bg-muted ${index === 0 && product.images.length > 2 ? "sm:col-span-2" : ""}`}>
              <Image
                src={image}
                alt={`${tLocal(product.name, locale)} ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
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
