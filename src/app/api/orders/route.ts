import { randomUUID } from "node:crypto";
import { z } from "zod";
import { readOrders, saveOrder, type StoredOrder } from "@/lib/orders-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const orderSchema = z.object({
  customer: z.object({
    name: z.string().trim().min(2).max(120),
    email: z.email(),
    phone: z.string().trim().min(6).max(40),
    city: z.string().trim().min(2).max(100),
    address: z.string().trim().min(2).max(240),
    postal: z.string().trim().max(30).optional().default(""),
    notes: z.string().trim().max(1000).optional().default(""),
  }),
  shippingMethod: z.literal("nova_poshta").default("nova_poshta"),
  paymentMethod: z.enum(["online", "cod"]),
  locale: z.string().trim().min(2).max(5),
  items: z
    .array(
      z.object({
        productId: z.string(),
        slug: z.string(),
        name: z.string(),
        image: z.url(),
        priceUAH: z.number().nonnegative(),
        variantId: z.string(),
        size: z.string().optional(),
        color: z.string(),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1),
});

export async function GET() {
  return Response.json(await readOrders(), {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const result = orderSchema.safeParse(await request.json().catch(() => null));
  if (!result.success) {
    return Response.json(
      { error: "Invalid order", issues: z.flattenError(result.error).fieldErrors },
      { status: 400 },
    );
  }
  const paymentMethod = result.data.paymentMethod;
  const order: StoredOrder = {
    ...result.data,
    shippingMethod: "nova_poshta",
    id: `YN-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: paymentMethod === "online" ? "awaiting_payment" : "cod_pending",
    paymentNote:
      paymentMethod === "cod"
        ? "Nova Poshta · cash on delivery (накладений платіж)."
        : "Online card gateway will be connected; demo order accepted.",
    totalUAH: result.data.items.reduce(
      (sum, item) => sum + item.priceUAH * item.quantity,
      0,
    ),
  };
  await saveOrder(order);
  return Response.json(
    {
      id: order.id,
      paymentMethod: order.paymentMethod,
      shippingMethod: order.shippingMethod,
      paymentNote: order.paymentNote,
    },
    { status: 201 },
  );
}
