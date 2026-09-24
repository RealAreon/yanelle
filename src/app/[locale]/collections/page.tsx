import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { collections } from "@/data/collections";
import { Link } from "@/i18n/navigation";
import { tLocal } from "@/lib/locale-text";

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div>
      <div className="page-gutter py-16 text-center lg:py-24">
        <p className="text-[10px] uppercase tracking-[0.25em] text-champagne">Seasonless chapters</p>
        <h1 className="mt-4 font-heading text-6xl sm:text-8xl">Collections</h1>
      </div>
      <div className="grid lg:grid-cols-3">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={{ pathname: "/collections/[slug]", params: { slug: collection.slug } }}
            className="group relative aspect-[4/5] overflow-hidden"
          >
            <Image src={collection.image} alt={tLocal(collection.name, locale)} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <h2 className="font-heading text-4xl">{tLocal(collection.name, locale)}</h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">{tLocal(collection.description, locale)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
