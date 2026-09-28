import {
  isNovaPoshtaConfigured,
  searchNpWarehouses,
} from "@/lib/nova-poshta";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isNovaPoshtaConfigured()) {
    return Response.json(
      {
        configured: false,
        warehouses: [],
        error: "Nova Poshta API key missing",
      },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const cityRef = searchParams.get("cityRef")?.trim() ?? "";
  const q = searchParams.get("q")?.trim() ?? "";
  if (!cityRef) {
    return Response.json({ configured: true, warehouses: [] });
  }

  try {
    const warehouses = await searchNpWarehouses(cityRef, q);
    return Response.json({ configured: true, warehouses });
  } catch (error) {
    return Response.json(
      {
        configured: true,
        warehouses: [],
        error: error instanceof Error ? error.message : "Nova Poshta error",
      },
      { status: 502 },
    );
  }
}
