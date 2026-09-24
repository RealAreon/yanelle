import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { collections, getCollectionBySlug } from "@/data/collections";
import { products } from "@/data/products";
import { tLocal } from "@/lib/locale-text";
import { ProductCard } from "@/components/store/product-card";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();
  const items = products.filter((product) => collection.productIds.includes(product.id));

  return (
    <div>
      <section className="relative min-h-[65svh] overflow-hidden text-white">
        <Image src={collection.image} alt={tLocal(collection.name, locale)} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="page-gutter relative flex min-h-[65svh] flex-col items-center justify-center text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/75">YANÈLLE Collection</p>
          <h1 className="mt-4 font-heading text-6xl sm:text-8xl">{tLocal(collection.name, locale)}</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/85">{tLocal(collection.description, locale)}</p>
        </div>
      </section>
      <section className="page-gutter py-16 lg:py-24">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {items.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
        </div>
      </section>
    </div>
  );
}
