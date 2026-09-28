const NP_URL = "https://api.novaposhta.ua/v2.0/json/";

export function isNovaPoshtaConfigured() {
  return Boolean(process.env.NOVA_POSHTA_API_KEY?.trim());
}

type NpResponse<T> = {
  success: boolean;
  data: T[];
  errors?: string[];
};

async function npCall<T>(
  modelName: string,
  calledMethod: string,
  methodProperties: Record<string, unknown>,
): Promise<T[]> {
  const apiKey = process.env.NOVA_POSHTA_API_KEY?.trim();
  if (!apiKey) throw new Error("NOVA_POSHTA_API_KEY is not configured");

  const response = await fetch(NP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey,
      modelName,
      calledMethod,
      methodProperties,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Nova Poshta HTTP ${response.status}`);
  }

  const json = (await response.json()) as NpResponse<T>;
  if (!json.success) {
    throw new Error(json.errors?.join("; ") || "Nova Poshta request failed");
  }
  return json.data ?? [];
}

export type NpCity = {
  Ref: string;
  Present: string;
  MainDescription: string;
  Area: string;
  DeliveryCity: string;
};

export type NpWarehouse = {
  Ref: string;
  Description: string;
  ShortAddress: string;
  Number: string;
  CityDescription: string;
};

export async function searchNpCities(query: string): Promise<
  Array<{ ref: string; label: string; cityRef: string }>
> {
  const q = query.trim();
  if (q.length < 2) return [];

  type SettlementRow = {
    Addresses?: Array<{
      Ref: string;
      Present: string;
      MainDescription: string;
      Area: string;
      DeliveryCity: string;
    }>;
  };

  const rows = await npCall<SettlementRow>("Address", "searchSettlements", {
    CityName: q,
    Limit: 12,
  });

  return (rows[0]?.Addresses ?? []).map((item) => ({
    ref: item.Ref,
    cityRef: item.DeliveryCity || item.Ref,
    label: item.Present || item.MainDescription,
  }));
}

export async function searchNpWarehouses(
  cityRef: string,
  query = "",
): Promise<Array<{ ref: string; label: string }>> {
  if (!cityRef) return [];

  const rows = await npCall<NpWarehouse>("Address", "getWarehouses", {
    CityRef: cityRef,
    FindByString: query.trim() || undefined,
    Limit: 40,
  });

  return rows.map((item) => ({
    ref: item.Ref,
    label:
      item.Description ||
      `${item.ShortAddress}${item.Number ? ` №${item.Number}` : ""}`,
  }));
}
