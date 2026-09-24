"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SocialIconProps = { size?: number };

function MailIcon({ size = 17 }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  );
}

function InstagramIcon({ size = 17 }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 17 }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 8h2.5V5H14a4 4 0 0 0-4 4v2H7.5v3H10v7h3v-7h2.4l.6-3H13V9a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function PinterestIcon({ size = 17 }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 15.5 11 8.5h2.2c1.4 0 2.3.8 2.3 2 0 1.4-1 2.3-2.4 2.3H11.7l-.5 2.7" />
    </svg>
  );
}

function TelegramIcon({ size = 17 }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 5 3.5 11.5 9 13.5l1.5 5.5L13 15l5 3.5L21 5Z" />
      <path d="m9 13.5 10-7" />
    </svg>
  );
}

function WhatsAppIcon({ size = 17 }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7.5 19.5 5 21l.8-3.2A8.5 8.5 0 1 1 12 20.5a8.4 8.4 0 0 1-4.5-1Z" />
      <path d="M9.5 10.5c.3 1.6 1.6 3 3.2 3.4.4.1.8 0 1-.3l.6-1 .9.3c.4.1.7.5.6.9l-.2.7c-.1.4-.5.7-.9.8-2.2.4-4.7-.8-6.2-2.8-1.4-1.8-1.6-4-.7-5.6.2-.3.5-.5.9-.5l.7-.1c.4-.1.8.2.9.6l.3.9c.1.4 0 .8-.3 1Z" />
    </svg>
  );
}

const socials = [
  { label: "Email", href: "mailto:hello@yanelle.com", Icon: MailIcon },
  { label: "Instagram", href: "https://instagram.com/yanelle", Icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com/yanelle", Icon: FacebookIcon },
  { label: "Pinterest", href: "https://pinterest.com/yanelle", Icon: PinterestIcon },
  { label: "Telegram", href: "https://t.me/yanelle", Icon: TelegramIcon },
  { label: "WhatsApp", href: "https://wa.me/380000000000", Icon: WhatsAppIcon },
] as const;

export function SiteFooter() {
  const nav = useTranslations("nav");
  const home = useTranslations("home");
  const footer = useTranslations("footer");

  return (
    <footer id="footer" className="border-t border-white/10 bg-ink text-beige">
      <div className="page-gutter grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1.3fr] lg:py-20">
        <div>
          <Link
            href="/"
            className="brand-lettering font-heading text-2xl text-champagne"
          >
            ＹＡＮÈＬＬＥ
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-7 text-beige/65">
            Quiet forms, honest materials, considered proportions.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                aria-label={label}
                className="inline-flex size-10 items-center justify-center border border-champagne/35 text-champagne transition-colors duration-300 hover:border-champagne hover:bg-champagne/10"
              >
                <Icon />
              </a>
            ))}
          </div>
          <a
            href="mailto:hello@yanelle.com"
            className="mt-5 inline-block text-sm tracking-wide text-beige/65 transition-colors duration-300 hover:text-champagne"
          >
            hello@yanelle.com
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-champagne/80">
              Explore
            </p>
            <Link href="/shop" className="text-beige/80 hover:text-champagne">
              {nav("shop")}
            </Link>
            <Link
              href="/collections"
              className="text-beige/80 hover:text-champagne"
            >
              {nav("collections")}
            </Link>
            <Link href="/lookbook" className="text-beige/80 hover:text-champagne">
              {nav("lookbook")}
            </Link>
            <Link href="/about" className="text-beige/80 hover:text-champagne">
              {nav("about")}
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-champagne/80">
              Service
            </p>
            <Link href="/contact" className="text-beige/80 hover:text-champagne">
              {nav("contact")}
            </Link>
            <Link href="/shipping" className="text-beige/80 hover:text-champagne">
              {nav("shipping")}
            </Link>
            <Link href="/wishlist" className="text-beige/80 hover:text-champagne">
              {nav("wishlist")}
            </Link>
            <Link href="/cart" className="text-beige/80 hover:text-champagne">
              {nav("cart")}
            </Link>
          </div>
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-champagne/80">
              {footer("policies")}
            </p>
            <Link href="/terms" className="text-beige/80 hover:text-champagne">
              {footer("terms")}
            </Link>
            <Link href="/privacy" className="text-beige/80 hover:text-champagne">
              {footer("privacy")}
            </Link>
            <Link href="/cookies" className="text-beige/80 hover:text-champagne">
              {footer("cookies")}
            </Link>
          </div>
        </div>
        <div>
          <h2 className="font-heading text-3xl text-beige">
            {home("newsletterTitle")}
          </h2>
          <p className="mt-3 text-sm leading-6 text-beige/65">
            {home("newsletterSubtitle")}
          </p>
          <form
            className="mt-6 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              toast.success("Thank you for subscribing.");
              event.currentTarget.reset();
            }}
          >
            <Input
              type="email"
              required
              aria-label="Email"
              placeholder={home("newsletterPlaceholder")}
              className="h-11 rounded-none border-champagne/30 bg-white/5 text-beige placeholder:text-beige/40"
            />
            <Button
              type="submit"
              className="h-11 rounded-none bg-champagne px-5 text-ink hover:bg-champagne/85"
            >
              {home("newsletterCta")}
            </Button>
          </form>
        </div>
      </div>
      <div className="page-gutter flex flex-col items-center justify-between gap-3 border-t border-white/10 py-5 text-center text-[10px] uppercase tracking-[0.14em] text-beige/50 sm:flex-row sm:text-left">
        <p>{footer("rights", { year: new Date().getFullYear() })}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link href="/terms" className="hover:text-champagne">
            {footer("terms")}
          </Link>
          <Link href="/privacy" className="hover:text-champagne">
            {footer("privacy")}
          </Link>
          <Link href="/cookies" className="hover:text-champagne">
            {footer("cookies")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
