import { Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function OrderSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { locale } = await params;
  const { orderId } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("order");
  return (
    <div className="page-gutter flex min-h-[70svh] items-center justify-center py-20 text-center">
      <div className="max-w-xl">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-champagne"><Check /></span>
        <p className="mt-8 text-[10px] uppercase tracking-[0.24em] text-champagne">Order confirmed</p>
        <h1 className="mt-4 font-heading text-6xl">{t("successTitle")}</h1>
        <p className="mt-6 text-sm leading-7 text-muted-foreground">{t("successBody")}</p>
        {orderId && <p className="mt-6 text-xs uppercase tracking-[0.16em]">{t("orderNumber")}: {orderId}</p>}
        <Link href="/" className="mt-9 inline-block border-b border-champagne pb-1 text-xs uppercase tracking-[0.18em]">{t("backHome")}</Link>
      </div>
    </div>
  );
}
