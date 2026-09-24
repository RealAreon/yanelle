import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { collections } from "@/data/collections";
import {
  arrivalNotes,
  journalPosts,
  testimonials,
} from "@/data/editorial";
import { products } from "@/data/products";
import { Link } from "@/i18n/navigation";
import { tLocal } from "@/lib/locale-text";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductCard } from "@/components/store/product-card";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const limited = products.filter((product) => product.limited).slice(0, 3);
  const newest = products
    .filter((product) => product.tags.includes("new"))
    .slice(0, 4);

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
        <div className="page-gutter relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-end pb-12 text-center sm:pb-16 lg:min-h-[calc(100svh-5rem)] lg:pb-20">
          <FadeIn className="w-full max-w-2xl">
            <p className="brand-lettering mx-auto font-heading text-[clamp(1.55rem,6.2vw,7rem)] leading-none">
              ＹＡＮÈＬＬＥ
            </p>
            <h1 className="mt-5 px-1 font-heading text-[1.65rem] font-normal leading-snug text-balance sm:mt-8 sm:text-4xl lg:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mx-auto mt-3 max-w-md px-1 text-[13px] leading-6 text-white/85 sm:mt-4 sm:max-w-xl sm:text-sm sm:leading-7">
              {t("heroSubtitle")}
            </p>
            <div className="mt-7 flex w-full flex-col items-stretch justify-center gap-3 px-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:px-0">
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

      <section className="border-y border-border/50 bg-secondary/70">
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

      <section className="page-gutter bg-beige-deep/55 py-20 lg:py-28">
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.25em] text-champagne">
              {t("journalEyebrow")}
            </p>
            <h2 className="mt-4 font-heading text-4xl sm:text-5xl">
              {t("journalTitle")}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {t("journalSubtitle")}
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {journalPosts.map((post) => (
              <article key={post.id} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-beige-deep">
                  <Image
                    src={post.image}
                    alt={tLocal(post.title, locale)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-champagne">
                  {tLocal(post.category, locale)}
                </p>
                <h3 className="mt-3 font-heading text-2xl leading-snug">
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

      <section className="bg-mist/70 page-gutter py-20 lg:py-28">
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
          <div className="mb-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-champagne">
              {t("testimonialsEyebrow")}
            </p>
            <h2 className="mt-4 font-heading text-4xl sm:text-5xl">
              {t("testimonialsTitle")}
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote
                key={item.id}
                className="border border-border/70 bg-muted/80 px-7 py-9"
              >
                <p className="font-heading text-xl leading-8 text-foreground/90">
                  “{tLocal(item.quote, locale)}”
                </p>
                <footer className="mt-8 border-t border-border/60 pt-5">
                  <cite className="not-italic text-sm font-medium tracking-wide">
                    {item.name}
                  </cite>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {tLocal(item.role, locale)}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=2000&q=85"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/55" />
        </div>
        <div className="page-gutter relative grid gap-10 py-24 text-white lg:grid-cols-2 lg:items-end lg:py-32">
          <FadeIn>
            <p className="text-[10px] uppercase tracking-[0.25em] text-champagne">
              {t("craftEyebrow")}
            </p>
            <h2 className="mt-4 max-w-lg font-heading text-4xl sm:text-5xl">
              {t("craftTitle")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-md text-sm leading-7 text-white/85">
              {t("craftBody")}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block border-b border-champagne pb-1 text-xs uppercase tracking-[0.16em]"
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

      <section className="page-gutter bg-secondary/45 py-24 text-center lg:py-32">
        <FadeIn>
          <h2 className="font-heading text-4xl sm:text-5xl">{t("newsletterTitle")}</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
            {t("newsletterSubtitle")}
          </p>
          <a
            href="#footer"
            className="mt-7 inline-block border-b border-champagne pb-1 text-xs uppercase tracking-[0.18em]"
          >
            {t("newsletterCta")}
          </a>
        </FadeIn>
      </section>
    </>
  );
}
