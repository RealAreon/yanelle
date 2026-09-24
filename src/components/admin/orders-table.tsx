"use client";

import { useEffect, useState } from "react";
import type { StoredOrder } from "@/lib/orders-store";
import { formatMoney } from "@/lib/currency";

export function OrdersTable() {
  const [orders, setOrders] = useState<StoredOrder[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/orders", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load orders");
        setOrders(await response.json() as StoredOrder[]);
      })
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Unable to load orders"));
  }, []);

  if (error) return <p className="mt-8 text-red-700">{error}</p>;
  if (!orders) return <p className="mt-8 text-sm text-neutral-500">Loading orders…</p>;
  if (orders.length === 0) return <p className="mt-8 border bg-white p-8">No orders yet.</p>;
  return (
    <div className="mt-8 overflow-x-auto border bg-white">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead><tr className="border-b bg-[#eee7dd]/50 text-xs uppercase tracking-wider"><th className="p-4">Order</th><th>Customer</th><th>Date</th><th>Shipping</th><th>Payment</th><th>Status</th><th>Total</th></tr></thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b align-top">
              <td className="p-4 font-medium">{order.id}<span className="block text-xs font-normal text-neutral-500">{order.items.length} line item(s)</span></td>
              <td>
                {order.customer.name}
                <span className="block text-xs text-neutral-500">{order.customer.email}</span>
                <span className="block text-xs text-neutral-500">{order.customer.phone}</span>
                <span className="mt-1 block text-xs text-neutral-500">{order.customer.city} · {order.customer.address}</span>
              </td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td className="uppercase">{order.shippingMethod === "nova_poshta" ? "Nova Poshta" : (order.shippingMethod ?? "—")}</td>
              <td className="uppercase">{order.paymentMethod}{order.paymentNote ? <span className="mt-1 block normal-case text-xs text-neutral-500">{order.paymentNote}</span> : null}</td>
              <td>{order.status.replaceAll("_", " ")}</td>
              <td>{formatMoney(order.totalUAH, "UAH", "uk-UA")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
