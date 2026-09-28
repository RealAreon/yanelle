import { z } from "zod";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { readOrders, saveOrder, type StoredOrder } from "@/lib/orders-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  orderId: z.string().min(3),
});

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return Response.json(
      {
        error:
          "Stripe is not configured. Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.",
      },
      { status: 503 },
    );
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const orders = await readOrders();
  const order = orders.find((item) => item.id === parsed.data.orderId);
  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }
  if (order.status === "paid") {
    return Response.json({ error: "Order already paid" }, { status: 409 });
  }

  const amount = Math.round(order.totalUAH * 100);
  if (amount < 50) {
    return Response.json({ error: "Amount too small" }, { status: 400 });
  }

  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "uah",
    automatic_payment_methods: { enabled: true },
    receipt_email: order.customer.email,
    metadata: {
      orderId: order.id,
      locale: order.locale,
    },
    description: `ＹＡＮÈＬＬＥ order ${order.id}`,
    shipping: {
      name: order.customer.name,
      phone: order.customer.phone,
      address: {
        line1: order.customer.address,
        city: order.customer.city,
        postal_code: order.customer.postal || undefined,
        country: "UA",
      },
    },
  });

  const updated: StoredOrder = {
    ...order,
    stripePaymentIntentId: paymentIntent.id,
    paymentNote: "Stripe PaymentIntent created — awaiting card / wallet payment.",
  };
  await saveOrder(updated, { replaceId: order.id });

  return Response.json({
    clientSecret: paymentIntent.client_secret,
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    orderId: order.id,
    amount: order.totalUAH,
  });
}
