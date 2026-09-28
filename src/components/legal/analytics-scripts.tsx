"use client";

import Script from "next/script";
import { useHydrated } from "@/lib/use-hydrated";
import { useCookieConsent } from "@/store/cookie-consent";

/**
 * Loads analytics only after explicit consent.
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXX to enable Google Analytics.
 */
export function AnalyticsScripts() {
  const hydrated = useHydrated();
  const allowed = useCookieConsent((s) => s.canUseAnalytics());
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  if (!hydrated || !allowed || !measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="yanelle-ga" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'update', { analytics_storage: 'granted' });
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
