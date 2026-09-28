"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useHydrated } from "@/lib/use-hydrated";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutPayment, PaymentMethodBadges } from "./checkout-payment";
import { Price } from "./price";

type PaymentSession = {
  clientSecret: string;
  publishableKey: string;
  orderId: string;
};

export function CheckoutClient({ locale }: { locale: string }) {
  const t = useTranslations("checkout");
  const storedItems = useCart((state) => state.items);
  const subtotal = useCart((state) => state.subtotalUAH());
  const items = useHydrated() ? storedItems : [];
  const [submitting, setSubmitting] = useState(false);
  const [payment, setPayment] = useState<PaymentSession | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0) return toast.error(t("emptyBag"));
    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    const payload = {
      customer: {
        name: String(form.get("name")),
        email: String(form.get("email")),
        phone: String(form.get("phone")),
        city: String(form.get("city")),
        address: String(form.get("address")),
        postal: String(form.get("postal") ?? ""),
        notes: String(form.get("notes") ?? ""),
      },
      shippingMethod: "nova_poshta",
      paymentMethod: "online",
      locale,
      items,
    };
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(t("submitError"));
      const order = (await response.json()) as { id: string };

      const intentRes = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id }),
      });
      const intentBody = (await intentRes.json()) as {
        clientSecret?: string;
        publishableKey?: string;
        error?: string;
      };
      if (!intentRes.ok || !intentBody.clientSecret || !intentBody.publishableKey) {
        throw new Error(intentBody.error || t("paymentSetupError"));
      }

      setPayment({
        clientSecret: intentBody.clientSecret,
        publishableKey: intentBody.publishableKey,
        orderId: order.id,
      });
      toast.success(t("continueToPayment"));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("submitError"));
    } finally {
      setSubmitting(false);
    }
  }

  if (payment) {
    return (
      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-champagne">
              {t("payment")}
            </p>
            <h2 className="mt-3 font-heading text-4xl">{t("paySecureTitle")}</h2>
          </div>
          <CheckoutPayment
            clientSecret={payment.clientSecret}
            publishableKey={payment.publishableKey}
            orderId={payment.orderId}
            onBack={() => setPayment(null)}
          />
        </div>
        <aside className="h-fit bg-beige-deep/50 p-6 lg:sticky lg:top-28">
          <h2 className="font-heading text-3xl">{t("orderSummary")}</h2>
          <div className="mt-5 divide-y">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="flex justify-between gap-4 py-4 text-sm"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <Price amountUAH={item.priceUAH * item.quantity} locale={locale} />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t pt-5 font-medium">
            <span>{t("total")}</span>
            <Price amountUAH={subtotal} locale={locale} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t("freeShipping")}</p>
        </aside>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-12 lg:grid-cols-[1fr_380px]">
      <div className="space-y-10">
        <fieldset>
          <legend className="font-heading text-3xl">{t("contact")}</legend>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field name="name" label={t("name")} required />
            <Field name="phone" label={t("phone")} type="tel" required />
            <Field
              name="email"
              label={t("email")}
              type="email"
              required
              className="sm:col-span-2"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-heading text-3xl">{t("shipping")}</legend>
          <div className="mt-5 border border-border/80 bg-beige-deep/30 p-4 sm:p-5">
            <p className="text-sm font-medium">{t("novaPoshta")}</p>
            <p className="mt-1 text-xs leading-6 text-muted-foreground">
              {t("novaPoshtaHint")}
            </p>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field name="city" label={t("city")} required />
            <Field
              name="address"
              label={t("novaPoshtaBranch")}
              required
              className="sm:col-span-2"
              placeholder={t("novaPoshtaBranchPlaceholder")}
            />
            <label className="sm:col-span-2">
              <Label htmlFor="notes">{t("notes")}</Label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder={t("notesPlaceholder")}
                className="mt-2 w-full resize-none rounded-none border bg-transparent p-3 text-sm outline-none focus:border-champagne"
              />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-heading text-3xl">{t("payment")}</legend>
          <div className="mt-5 space-y-4 border border-border/80 p-4 text-sm">
            <PaymentMethodBadges />
            <div>
              <strong className="block">{t("payOnline")}</strong>
              <p className="mt-1 text-muted-foreground">{t("payOnlineHint")}</p>
            </div>
          </div>
        </fieldset>
      </div>

      <aside className="h-fit bg-beige-deep/50 p-6 lg:sticky lg:top-28">
        <h2 className="font-heading text-3xl">{t("orderSummary")}</h2>
        <div className="mt-5 divide-y">
          {items.map((item) => (
            <div
              key={item.variantId}
              className="flex justify-between gap-4 py-4 text-sm"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <Price amountUAH={item.priceUAH * item.quantity} locale={locale} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t pt-5 font-medium">
          <span>{t("total")}</span>
          <Price amountUAH={subtotal} locale={locale} />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{t("freeShipping")}</p>
        <Button
          type="submit"
          disabled={submitting || items.length === 0}
          className="mt-7 h-12 w-full rounded-none"
        >
          {submitting ? t("placing") : t("placeOrder")}
        </Button>
      </aside>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  className,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}) {
  return (
    <label className={className}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 h-11 rounded-none"
      />
    </label>
  );
}
