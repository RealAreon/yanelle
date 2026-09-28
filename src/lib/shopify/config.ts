export function getShopifyStoreDomain(): string | null {
  const raw =
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
    "";
  const cleaned = raw
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  return cleaned || null;
}

export function getShopifyStorefrontToken(): string | null {
  const token =
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    "";
  return token.trim() || null;
}

export function isShopifyConfigured(): boolean {
  return Boolean(getShopifyStoreDomain() && getShopifyStorefrontToken());
}

export function getShopifyStorefrontEndpoint(): string | null {
  const domain = getShopifyStoreDomain();
  if (!domain) return null;
  return `https://${domain}/api/2025-01/graphql.json`;
}
