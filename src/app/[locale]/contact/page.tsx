import { getTranslations, setRequestLocale } from "next-intl/server";
import { Camera, Mail, MessageCircle, Send } from "lucide-react";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const contacts = [
    [Mail, t("email"), "mailto:hello@yanelle.example"],
    [Camera, t("instagram"), "#"],
    [Send, t("telegram"), "#"],
    [MessageCircle, t("whatsapp"), "#"],
  ] as const;
  return (
    <div className="page-gutter mx-auto max-w-5xl py-20 lg:py-32">
      <p className="text-[10px] uppercase tracking-[0.25em] text-champagne">Client service</p>
      <h1 className="mt-4 font-heading text-6xl sm:text-8xl">{t("title")}</h1>
      <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">{t("subtitle")}</p>
      <div className="mt-16 grid border-t sm:grid-cols-2">
        {contacts.map(([Icon, label, href]) => (
          <a key={label} href={href} className="flex min-h-32 items-center justify-between border-b p-6 transition-colors hover:bg-beige-deep/50 sm:odd:border-r">
            <span className="font-heading text-2xl">{label}</span>
            <Icon size={20} strokeWidth={1.4} />
          </a>
        ))}
      </div>
    </div>
  );
}
