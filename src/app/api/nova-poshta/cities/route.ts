import { searchNpCities, isNovaPoshtaConfigured } from "@/lib/nova-poshta";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isNovaPoshtaConfigured()) {
    return Response.json(
      { configured: false, cities: [], error: "Nova Poshta API key missing" },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) {
    return Response.json({ configured: true, cities: [] });
  }

  try {
    const cities = await searchNpCities(q);
    return Response.json({ configured: true, cities });
  } catch (error) {
    return Response.json(
      {
        configured: true,
        cities: [],
        error: error instanceof Error ? error.message : "Nova Poshta error",
      },
      { status: 502 },
    );
  }
}
