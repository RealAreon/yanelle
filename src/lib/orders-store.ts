import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export type StoredOrder = {
  id: string;
  createdAt: string;
  status: "awaiting_payment" | "cod_pending";
  paymentMethod: "online" | "cod";
  shippingMethod?: "nova_poshta";
  paymentNote?: string;
  locale: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    postal: string;
    notes: string;
  };
  items: Array<{
    productId: string;
    slug: string;
    name: string;
    image: string;
    priceUAH: number;
    variantId: string;
    size?: string;
    color: string;
    quantity: number;
  }>;
  totalUAH: number;
};

const dataDirectory = path.join(process.cwd(), "data");
const ordersFile = path.join(dataDirectory, "orders.json");
let writeQueue = Promise.resolve();

export async function readOrders(): Promise<StoredOrder[]> {
  try {
    const contents = await readFile(ordersFile, "utf8");
    const parsed: unknown = JSON.parse(contents);
    return Array.isArray(parsed) ? (parsed as StoredOrder[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export function saveOrder(order: StoredOrder): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    await mkdir(dataDirectory, { recursive: true });
    const orders = await readOrders();
    orders.unshift(order);
    const temporaryFile = `${ordersFile}.tmp`;
    await writeFile(temporaryFile, JSON.stringify(orders, null, 2), "utf8");
    await rename(temporaryFile, ordersFile);
  });
  return writeQueue;
}
