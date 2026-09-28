import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { collections } from "@/data/collections";
import {
  arrivalNotes,
  journalPosts,
  testimonials,
} from "@/data/editorial";
import { Link } from "@/i18n/navigation";
import { tLocal } from "@/lib/locale-text";
import { getCatalogProducts } from "@/lib/shopify";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductCard } from "@/components/store/product-card";
import { TestimonialsCarousel } from "@/components/store/testimonials-carousel";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const products = await getCatalogProducts();
  const featuredTagged = products.filter((product) => product.featured);
  const featured = (featuredTagged.length ? featuredTagged : products).slice(0, 4);
  const limitedTagged = products.filter((product) => product.limited);
  const limited = (limitedTagged.length ? limitedTagged : products.slice(0, 3)).slice(0, 3);
  const newestTagged = products.filter((product) => product.tags.includes("new"));
  const newest = (newestTagged.length ? newestTagged : products).slice(0, 4);

  return (
    <>
      <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden text-white lg:min-h-[calc(100svh-5rem)]">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2400&q=90"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/10" />
        <div className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-end px-5 pb-12 text-center sm:px-8 sm:pb-16 lg:min-h-[calc(100svh-5rem)] lg:pb-20">
          <FadeIn className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
            <p className="brand-lettering font-heading text-[clamp(1.55rem,6.2vw,7rem)] leading-none">
              ＹＡＮÈＬＬＥ
            </p>
            <h1 className="mt-5 max-w-xl px-1 font-heading text-[1.65rem] font-normal leading-snug text-balance sm:mt-8 sm:text-4xl lg:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mx-auto mt-3 max-w-md px-1 text-[13px] leading-6 text-white/85 sm:mt-4 sm:max-w-xl sm:text-sm sm:leading-7">
              {t("heroSubtitle")}
            </p>
            <div className="mt-7 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/shop"
                className="border border-beige bg-beige px-5 py-3 text-center text-[11px] uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-transparent hover:text-beige sm:px-7 sm:text-xs sm:tracking-[0.16em]"
              >
                {t("ctaShop")}
              </Link>
              <Link
                href="/lookbook"
                className="border border-beige/70 px-5 py-3 text-center text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 hover:bg-beige hover:text-ink sm:px-7 sm:text-xs sm:tracking-[0.16em]"
              >
                {t("ctaLookbook")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="page-gutter bg-muted/55 py-20 lg:py-28">
        <FadeIn>
          <div className="section-heading-row mb-10">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl">
              {t("featured")}
            </h2>
            <Link
              href="/shop"
              className="text-[10px] uppercase tracking-[0.14em] underline decoration-champagne underline-offset-8 sm:shrink-0 sm:text-xs sm:tracking-[0.15em]"
            >
              {t("ctaShop")}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="bg-grain border-y border-border/50 bg-secondary/70">
        <div className="page-gutter grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-24">
          <FadeIn>
            <p className="text-[10px] uppercase tracking-[0.25em] text-champagne">
              {t("arrivalsEyebrow")}
            </p>
            <h2 className="mt-4 font-heading text-4xl sm:text-5xl">
              {t("arrivalsTitle")}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              {t("arrivalsSubtitle")}
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="divide-y divide-border/70 border-y border-border/70">
              {arrivalNotes.map((note) => (
                <article key={note.id} className="grid gap-2 py-7 sm:grid-cols-[7rem_1fr] sm:gap-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-champagne">
                    {tLocal(note.label, locale)}
                  </p>
                  <div>
                    <h3 className="font-heading text-2xl">
                      {tLocal(note.title, locale)}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {tLocal(note.body, locale)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <Link
              href={{ pathname: "/shop", query: { tag: "new" } }}
              className="mt-8 inline-block text-xs uppercase tracking-[0.16em] underline decoration-champagne underline-offset-8"
            >
              {t("arrivalsCta")}
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="grid lg:grid-cols-3">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={{
              pathname: "/collections/[slug]",
              params: { slug: collection.slug },
            }}
            className="group relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src={collection.image}
              alt={tLocal(collection.name, locale)}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <p className="font-heading text-4xl">
                {tLocal(collection.name, locale)}
              </p>
              <span className="mt-4 inline-block border-b border-champagne pb-1 text-[10px] uppercase tracking-[0.2em]">
                {t("collections")}
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="bg-grain bg-journal-lux page-gutter py-20 lg:py-28">
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.25em] text-champagne">
              {t("journalEyebrow")}
            </p>
            <h2 className="mt-4 font-heading text-4xl sm:text-5xl">
              {t("journalTitle")}
            </h2>
            <div className="gold-line mt-5 h-px w-24" />
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              {t("journalSubtitle")}
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
            {journalPosts.map((post, index) => (
              <article
                key={post.id}
                className={`group ${index === 1 ? "md:mt-10" : ""}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-beige-deep/40 ring-1 ring-foreground/[0.06]">
                  <Image
                    src={post.image}
                    alt={tLocal(post.title, locale)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent opacity-60" />
                </div>
                <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-champagne">
                  {tLocal(post.category, locale)}
                </p>
                <h3 className="mt-3 font-heading text-2xl leading-snug transition-colors duration-300 group-hover:text-champagne">
                  {tLocal(post.title, locale)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {tLocal(post.excerpt, locale)}
                </p>
              </article>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="bg-background page-gutter py-20 lg:py-28">
        <FadeIn>
          <div className="mx-auto max-w-7xl">
            <p className="text-[10px] uppercase tracking-[0.25em] text-champagne">
              Atelier edition
            </p>
            <h2 className="mt-4 font-heading text-4xl sm:text-6xl">
              {t("limited")}
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-7">
              {limited.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="page-gutter py-20 lg:py-28">
        <FadeIn>
          <div className="mb-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-champagne">
              {t("testimonialsEyebrow")}
            </p>
            <h2 className="mt-4 font-heading text-4xl sm:text-5xl">
              {t("testimonialsTitle")}
            </h2>
          </div>
          <TestimonialsCarousel items={testimonials} locale={locale} />
        </FadeIn>
      </section>

      <section className="relative min-h-[70vh] overflow-hidden lg:min-h-[78vh]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=2000&q=85"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/45 to-ink/25" />
        </div>
        <div className="page-gutter relative flex min-h-[70vh] flex-col justify-end py-16 text-white lg:min-h-[78vh] lg:py-24">
          <FadeIn className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne sm:text-xs">
              {t("craftEyebrow")}
            </p>
            <h2 className="mt-5 font-heading text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05]">
              {t("craftTitle")}
            </h2>
            <div className="gold-line mt-6 h-px w-28 opacity-80" />
            <p className="mt-6 max-w-xl text-base leading-8 text-white/90 sm:text-lg sm:leading-9">
              {t("craftBody")}
            </p>
            <Link
              href="/about"
              className="mt-10 inline-block border-b border-champagne pb-1.5 text-xs uppercase tracking-[0.2em] text-beige transition-opacity duration-300 hover:opacity-80 sm:text-sm"
            >
              {t("craftCta")}
            </Link>
          </FadeIn>
        </div>
      </section>

      {newest.length > 0 && (
        <section className="page-gutter bg-muted/50 py-20 lg:py-28">
          <FadeIn>
            <div className="section-heading-row mb-10">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl">
                {t("newArrivals")}
              </h2>
              <Link
                href={{ pathname: "/shop", query: { tag: "new" } }}
                className="text-[10px] uppercase tracking-[0.14em] underline decoration-champagne underline-offset-8 sm:shrink-0 sm:text-xs sm:tracking-[0.15em]"
              >
                {t("ctaShop")}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
              {newest.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={locale}
                />
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      <section className="bg-grain relative overflow-hidden border-y border-border/40 bg-secondary/45 py-14 text-center sm:py-16 lg:py-20">
        <FadeIn className="relative mx-auto max-w-xl px-4">
          <p className="brand-lettering font-heading text-sm tracking-[0.35em] text-champagne">
            ＹＡＮÈＬＬＥ
          </p>
          <div className="gold-line mx-auto mt-4 h-px w-14" />
          <h2 className="mt-5 font-heading text-3xl sm:text-4xl">
            {t("newsletterTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            {t("newsletterSubtitle")}
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="#footer"
              className="inline-flex min-w-[11rem] items-center justify-center border border-ink bg-ink px-7 py-3 text-xs uppercase tracking-[0.18em] text-beige transition-colors duration-300 hover:bg-transparent hover:text-ink"
            >
              {t("newsletterCta")}
            </a>
            <Link
              href="/lookbook"
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground underline decoration-champagne underline-offset-8 transition-colors duration-300 hover:text-champagne"
            >
              Lookbook
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
