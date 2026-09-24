import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { lookbook } from "@/data/lookbook";
import { tLocal } from "@/lib/locale-text";
import { FadeIn } from "@/components/ui/fade-in";

export default async function LookbookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="page-gutter py-14 lg:py-20">
      <FadeIn className="mb-16 text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-champagne">
          Editorial 01
        </p>
        <h1 className="mt-4 font-heading text-7xl sm:text-9xl">Lookbook</h1>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted-foreground">
          {lookbook.length} looks · quiet proportion, considered light
        </p>
      </FadeIn>
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:gap-8">
        {lookbook.map((look, index) => (
          <FadeIn
            key={look.id}
            delay={(index % 4) * 0.05}
            className={index % 5 === 0 ? "md:col-span-2" : undefined}
          >
            <figure>
              <div
                className={`relative overflow-hidden bg-muted ${index % 5 === 0 ? "aspect-[16/9]" : "aspect-[3/4]"}`}
              >
                <Image
                  src={look.image}
                  alt={tLocal(look.title, locale)}
                  fill
                  sizes={index % 5 === 0 ? "100vw" : "50vw"}
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
              <figcaption className="flex items-center justify-between border-b border-border/70 py-4">
                <span className="font-heading text-2xl">
                  {tLocal(look.title, locale)}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Look {String(index + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
