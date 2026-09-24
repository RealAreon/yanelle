import { getTranslations, setRequestLocale } from "next-intl/server";
import { PackageCheck, RotateCcw, Truck } from "lucide-react";

export default async function ShippingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("shipping");
  return (
    <div className="page-gutter mx-auto max-w-5xl py-20 lg:py-32">
      <h1 className="font-heading text-6xl sm:text-8xl">{t("title")}</h1>
      <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
        <section className="bg-muted/70 p-7">
          <Truck className="text-champagne" strokeWidth={1.3} />
          <h2 className="mt-8 font-heading text-3xl">Delivery</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{t("delivery")}</p>
        </section>
        <section className="bg-muted/70 p-7">
          <PackageCheck className="text-champagne" strokeWidth={1.3} />
          <h2 className="mt-8 font-heading text-3xl">Complimentary</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{t("complimentary")}</p>
        </section>
        <section className="bg-muted/70 p-7">
          <RotateCcw className="text-champagne" strokeWidth={1.3} />
          <h2 className="mt-8 font-heading text-3xl">Returns</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{t("returns")}</p>
        </section>
      </div>
      <p className="mt-8 border-l border-champagne pl-5 text-xs leading-6 text-muted-foreground">{t("returnsVideo")}</p>
    </div>
  );
}
