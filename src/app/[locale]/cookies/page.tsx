import { setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/legal/legal-document";

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument locale={locale} page="cookies" />;
}
