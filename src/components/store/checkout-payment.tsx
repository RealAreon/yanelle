"use client";

import { useMemo, useState } from "react";
import {
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";

function PaymentForm({
  orderId,
  onBack,
}: {
  orderId: string;
  onBack: () => void;
}) {
  const t = useTranslations("checkout");
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const clear = useCart((state) => state.clear);
  const [paying, setPaying] = useState(false);

  async function finalize(paymentIntentId: string) {
    const confirm = await fetch("/api/stripe/confirm-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, paymentIntentId }),
    });
    if (!confirm.ok) throw new Error(t("paymentFailed"));
    clear();
    router.push({ pathname: "/order/success", query: { orderId } });
  }

  async function pay() {
    if (!stripe || !elements) return;
    setPaying(true);
    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: `${window.location.origin}/order/success?orderId=${encodeURIComponent(orderId)}`,
        },
      });
      if (result.error) {
        toast.error(result.error.message || t("paymentFailed"));
        return;
      }
      const intent = result.paymentIntent;
      if (intent?.status === "succeeded") {
        await finalize(intent.id);
      } else {
        toast.error(t("paymentFailed"));
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("paymentFailed"));
    } finally {
      setPaying(false);
    }
  }

  return (
    <div className="space-y-6">
      <ExpressCheckoutElement
        onConfirm={async (event) => {
          if (!stripe || !elements) {
            event.paymentFailed({ reason: "fail" });
            return;
          }
          setPaying(true);
          try {
            const result = await stripe.confirmPayment({
              elements,
              redirect: "if_required",
              confirmParams: {
                return_url: `${window.location.origin}/order/success?orderId=${encodeURIComponent(orderId)}`,
              },
            });
            if (result.error) {
              event.paymentFailed({ reason: "fail" });
              toast.error(result.error.message || t("paymentFailed"));
              return;
            }
            if (result.paymentIntent?.status === "succeeded") {
              await finalize(result.paymentIntent.id);
            } else {
              event.paymentFailed({ reason: "fail" });
            }
          } catch {
            event.paymentFailed({ reason: "fail" });
            toast.error(t("paymentFailed"));
          } finally {
            setPaying(false);
          }
        }}
        options={{
          paymentMethodOrder: ["applePay", "googlePay", "link", "card"],
          buttonHeight: 48,
        }}
      />

      <div className="relative py-2 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="relative z-10 bg-background px-3">{t("orPayWithCard")}</span>
        <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
      </div>

      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          className="h-12 flex-1 rounded-none"
          onClick={onBack}
          disabled={paying}
        >
          {t("backToDetails")}
        </Button>
        <Button
          type="button"
          className="h-12 flex-1 rounded-none"
          onClick={pay}
          disabled={!stripe || !elements || paying}
        >
          {paying ? t("paying") : t("payNow")}
        </Button>
      </div>
    </div>
  );
}

export function CheckoutPayment({
  clientSecret,
  publishableKey,
  orderId,
  onBack,
}: {
  clientSecret: string;
  publishableKey: string;
  orderId: string;
  onBack: () => void;
}) {
  const t = useTranslations("checkout");
  const stripePromise = useMemo(
    () => loadStripe(publishableKey),
    [publishableKey],
  );

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#2b1d1d",
        colorBackground: "#faf3e6",
        colorText: "#2b1d1d",
        colorDanger: "#b54a3f",
        fontFamily: "Montserrat, system-ui, sans-serif",
        borderRadius: "0px",
        spacingUnit: "4px",
      },
      rules: {
        ".Input": {
          border: "1px solid #e4d4bc",
          boxShadow: "none",
          backgroundColor: "#faf3e6",
        },
        ".Input:focus": {
          border: "1px solid #c9a56a",
          boxShadow: "none",
        },
        ".Tab": {
          border: "1px solid #e4d4bc",
          boxShadow: "none",
        },
        ".Tab--selected": {
          border: "1px solid #c9a56a",
          boxShadow: "none",
        },
      },
    },
  };

  return (
    <div className="space-y-5">
      <PaymentMethodBadges />
      <p className="text-sm leading-6 text-muted-foreground">{t("paySecureHint")}</p>
      <Elements stripe={stripePromise} options={options}>
        <PaymentForm orderId={orderId} onBack={onBack} />
      </Elements>
    </div>
  );
}

export function PaymentMethodBadges() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Visa</Badge>
      <Badge>Mastercard</Badge>
      <Badge>Apple Pay</Badge>
      <Badge>Google Pay</Badge>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center border border-border/80 bg-beige-deep/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-foreground/80">
      {children}
    </span>
  );
}
