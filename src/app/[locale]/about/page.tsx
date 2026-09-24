import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FadeIn } from "@/components/ui/fade-in";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="grid min-h-[75svh] lg:grid-cols-2">
      <div className="relative min-h-[55svh]">
        <Image
          src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1400&q=85"
          alt="YANÈLLE atelier"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex items-center px-8 py-16 sm:px-14 lg:px-20 xl:px-24">
        <FadeIn className="max-w-xl">
          <p className="text-[10px] uppercase tracking-[0.28em] text-champagne">
            {t("eyebrow")}
          </p>
          <h1 className="mt-5 font-heading text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="brand-lettering mt-6 font-heading text-xl text-champagne sm:text-2xl">
            ＹＡＮÈＬＬＥ
          </p>
          <div className="my-8 h-px w-16 bg-champagne/70" />
          <p className="text-sm leading-8 text-muted-foreground">{t("body")}</p>
        </FadeIn>
      </div>
    </div>
  );
}
