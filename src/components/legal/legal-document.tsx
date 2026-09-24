import { getTranslations } from "next-intl/server";

type LegalKey = "terms" | "privacy" | "cookies";

export async function LegalDocument({
  locale,
  page,
}: {
  locale: string;
  page: LegalKey;
}) {
  const t = await getTranslations({ locale, namespace: "legal" });
  const sections = t.raw(`${page}.sections`) as Array<{
    title: string;
    body: string;
  }>;

  return (
    <article className="page-gutter mx-auto max-w-3xl py-16 lg:py-28">
      <p className="text-[10px] uppercase tracking-[0.25em] text-champagne">
        {t("eyebrow")}
      </p>
      <h1 className="mt-4 font-heading text-4xl sm:text-5xl lg:text-6xl">
        {t(`${page}.title`)}
      </h1>
      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {t("updated", { date: t(`${page}.updated`) })}
      </p>
      <p className="mt-8 text-sm leading-7 text-muted-foreground">
        {t(`${page}.intro`)}
      </p>
      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-heading text-2xl sm:text-3xl">{section.title}</h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
