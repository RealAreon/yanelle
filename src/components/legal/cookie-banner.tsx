"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useHydrated } from "@/lib/use-hydrated";
import { useCookieConsent } from "@/store/cookie-consent";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const hydrated = useHydrated();
  const decided = useCookieConsent((s) => s.decided);
  const panelOpen = useCookieConsent((s) => s.panelOpen);
  const preferences = useCookieConsent((s) => s.preferences);
  const acceptAll = useCookieConsent((s) => s.acceptAll);
  const rejectNonEssential = useCookieConsent((s) => s.rejectNonEssential);
  const saveCustom = useCookieConsent((s) => s.saveCustom);
  const closePanel = useCookieConsent((s) => s.closePanel);

  const [customize, setCustomize] = useState(false);
  const [functional, setFunctional] = useState(preferences.functional);
  const [analytics, setAnalytics] = useState(preferences.analytics);

  useEffect(() => {
    if (panelOpen) {
      setCustomize(true);
      setFunctional(preferences.functional);
      setAnalytics(preferences.analytics);
    }
  }, [panelOpen, preferences.functional, preferences.analytics]);

  if (!hydrated) return null;

  const visible = !decided || panelOpen;
  if (!visible) return null;

  function handleSaveCustom() {
    saveCustom({ functional, analytics });
    setCustomize(false);
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border/80 bg-beige/95 p-5 shadow-[0_-12px_40px_rgba(43,29,29,0.08)] backdrop-blur-md sm:p-7"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
        <div>
          <p
            id="cookie-banner-title"
            className="font-heading text-2xl sm:text-3xl"
          >
            {t("title")}
          </p>
          <p
            id="cookie-banner-desc"
            className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground"
          >
            {t("description")}{" "}
            <Link
              href="/cookies"
              className="underline decoration-champagne underline-offset-4 hover:text-foreground"
            >
              {t("policyLink")}
            </Link>
          </p>
        </div>

        {customize && (
          <div className="grid gap-3 border border-border/70 bg-beige-deep/30 p-4 sm:grid-cols-3">
            <Category
              title={t("necessaryTitle")}
              body={t("necessaryBody")}
              checked
              locked
              lockedLabel={t("alwaysOn")}
            />
            <Category
              title={t("functionalTitle")}
              body={t("functionalBody")}
              checked={functional}
              onChange={setFunctional}
            />
            <Category
              title={t("analyticsTitle")}
              body={t("analyticsBody")}
              checked={analytics}
              onChange={setAnalytics}
            />
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
          {customize ? (
            <>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-none"
                onClick={() => {
                  if (panelOpen && decided) {
                    closePanel();
                    setCustomize(false);
                  } else {
                    setCustomize(false);
                  }
                }}
              >
                {t("back")}
              </Button>
              <Button
                type="button"
                className="h-11 rounded-none"
                onClick={handleSaveCustom}
              >
                {t("savePreferences")}
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-none"
                onClick={() => {
                  rejectNonEssential();
                  setCustomize(false);
                }}
              >
                {t("reject")}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-none"
                onClick={() => {
                  setFunctional(preferences.functional);
                  setAnalytics(preferences.analytics);
                  setCustomize(true);
                }}
              >
                {t("customize")}
              </Button>
              <Button
                type="button"
                className="h-11 rounded-none"
                onClick={() => {
                  acceptAll();
                  setCustomize(false);
                }}
              >
                {t("acceptAll")}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Category({
  title,
  body,
  checked,
  onChange,
  locked,
  lockedLabel,
}: {
  title: string;
  body: string;
  checked: boolean;
  onChange?: (value: boolean) => void;
  locked?: boolean;
  lockedLabel?: string;
}) {
  return (
    <label className="flex cursor-pointer flex-col gap-2">
      <span className="flex items-center justify-between gap-3">
        <span className="text-[11px] uppercase tracking-[0.16em]">{title}</span>
        {locked ? (
          <span className="text-[10px] uppercase tracking-[0.14em] text-champagne">
            {lockedLabel}
          </span>
        ) : (
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            className="size-4 accent-ink"
          />
        )}
      </span>
      <span className="text-xs leading-5 text-muted-foreground">{body}</span>
    </label>
  );
}
