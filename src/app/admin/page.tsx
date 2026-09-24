import Link from "next/link";
import { Package, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";

export default function AdminPage() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-[#9b7b4c]">Demo dashboard</p>
      <h1 className="mt-3 font-serif text-5xl">Overview</h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/admin/products" className="border bg-white p-7 transition-colors hover:bg-[#eee7dd]">
          <Package />
          <p className="mt-8 text-4xl font-light">{products.length}</p>
          <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">Catalog products</p>
        </Link>
        <Link href="/admin/orders" className="border bg-white p-7 transition-colors hover:bg-[#eee7dd]">
          <ShoppingBag />
          <p className="mt-8 font-serif text-3xl">View orders</p>
          <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">Stored demo submissions</p>
        </Link>
      </div>
    </div>
  );
}
