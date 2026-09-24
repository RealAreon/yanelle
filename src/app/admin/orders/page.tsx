import { OrdersTable } from "@/components/admin/orders-table";

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="font-serif text-5xl">Orders</h1>
      <p className="mt-3 text-sm text-neutral-500">Demo orders persisted to data/orders.json.</p>
      <OrdersTable />
    </div>
  );
}
