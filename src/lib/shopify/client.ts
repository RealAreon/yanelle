import {
  getShopifyStorefrontEndpoint,
  getShopifyStorefrontToken,
  isShopifyConfigured,
} from "./config";

export class ShopifyError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ShopifyError";
  }
}

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  tags,
  revalidate = 60,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  if (!isShopifyConfigured()) {
    throw new ShopifyError("Shopify Storefront is not configured");
  }

  const endpoint = getShopifyStorefrontEndpoint();
  const token = getShopifyStorefrontToken();
  if (!endpoint || !token) {
    throw new ShopifyError("Shopify Storefront is not configured");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next:
      revalidate === false
        ? { tags }
        : { revalidate, tags },
  });

  if (!response.ok) {
    throw new ShopifyError(
      `Shopify Storefront HTTP ${response.status}`,
      response.status,
    );
  }

  const json = (await response.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new ShopifyError(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new ShopifyError("Shopify Storefront returned empty data");
  }
  return json.data;
}
