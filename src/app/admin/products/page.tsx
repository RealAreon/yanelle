import Image from "next/image";
import { products } from "@/data/products";
import { formatMoney } from "@/lib/currency";

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="font-serif text-5xl">Products</h1>
      <div className="mt-8 overflow-x-auto border bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead><tr className="border-b bg-[#eee7dd]/50 text-xs uppercase tracking-wider"><th className="p-4">Product</th><th>Category</th><th>Price</th><th>Tags</th><th>Stock</th></tr></thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="flex items-center gap-4 p-4">
                  <div className="relative aspect-[3/4] w-12 bg-neutral-100"><Image src={product.images[0]} alt="" fill sizes="48px" className="object-cover" /></div>
                  <div><strong className="font-medium">{product.name.en}</strong><span className="block text-xs text-neutral-500">{product.id}</span></div>
                </td>
                <td>{product.category}</td>
                <td>{formatMoney(product.priceUAH, "UAH", "uk-UA")}</td>
                <td>{product.tags.join(", ") || "—"}</td>
                <td>{product.variants.reduce((sum, variant) => sum + variant.stock, 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
