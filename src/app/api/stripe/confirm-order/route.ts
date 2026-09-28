import { z } from "zod";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { readOrders, saveOrder, type StoredOrder } from "@/lib/orders-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  orderId: z.string().min(3),
  paymentIntentId: z.string().min(3),
});

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return Response.json({ error: "Stripe is not configured" }, { status: 503 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const stripe = getStripe();
  const intent = await stripe.paymentIntents.retrieve(parsed.data.paymentIntentId);
  if (intent.status !== "succeeded") {
    return Response.json(
      { error: "Payment not completed", status: intent.status },
      { status: 402 },
    );
  }
  if (intent.metadata.orderId !== parsed.data.orderId) {
    return Response.json({ error: "Order mismatch" }, { status: 400 });
  }

  const orders = await readOrders();
  const order = orders.find((item) => item.id === parsed.data.orderId);
  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  const updated: StoredOrder = {
    ...order,
    status: "paid",
    stripePaymentIntentId: intent.id,
    paymentNote: `Paid via Stripe (${intent.payment_method_types?.join(", ") || "card/wallet"}).`,
  };
  await saveOrder(updated, { replaceId: order.id });

  return Response.json({ id: order.id, status: "paid" });
}
