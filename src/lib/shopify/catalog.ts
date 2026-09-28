import {
  products as localProducts,
  getProductBySlug as getLocalProductBySlug,
  type Product,
} from "@/data/products";
import {
  collections as localCollections,
  getCollectionBySlug as getLocalCollectionBySlug,
  type Collection,
} from "@/data/collections";
import { shopifyFetch } from "./client";
import { isShopifyConfigured } from "./config";
import { mapShopifyProduct } from "./map-product";
import {
  COLLECTION_BY_HANDLE_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
} from "./queries";
import type { ShopifyCollection, ShopifyProduct } from "./types";

const emptyL = (value: string) => ({
  uk: value,
  en: value,
  pl: value,
  fr: value,
  de: value,
  es: value,
});

type ProductsPage = {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: ShopifyProduct[];
  };
};

async function fetchAllShopifyProducts(): Promise<Product[]> {
  const items: Product[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data: ProductsPage = await shopifyFetch<ProductsPage>({
      query: PRODUCTS_QUERY,
      variables: { first: 50, after },
      tags: ["shopify", "products"],
      revalidate: 60,
    });

    items.push(...data.products.nodes.map(mapShopifyProduct));
    hasNextPage = data.products.pageInfo.hasNextPage;
    after = data.products.pageInfo.endCursor;
  }

  return items;
}

export async function getCatalogProducts(): Promise<Product[]> {
  if (!isShopifyConfigured()) return localProducts;
  try {
    const products = await fetchAllShopifyProducts();
    return products.length > 0 ? products : localProducts;
  } catch (error) {
    console.error("[shopify] getCatalogProducts failed", error);
    return localProducts;
  }
}

export async function getCatalogProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  if (!isShopifyConfigured()) return getLocalProductBySlug(slug);

  try {
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle: slug },
      tags: ["shopify", "products", `product:${slug}`],
      revalidate: 60,
    });
    if (data.product) return mapShopifyProduct(data.product);
  } catch (error) {
    console.error("[shopify] getCatalogProductBySlug failed", error);
  }

  return getLocalProductBySlug(slug);
}

export async function getCatalogProductById(
  id: string,
): Promise<Product | undefined> {
  const products = await getCatalogProducts();
  return products.find((product) => product.id === id);
}

function mapShopifyCollection(collection: ShopifyCollection): {
  collection: Collection;
  products: Product[];
} {
  const products = collection.products.nodes.map(mapShopifyProduct);
  return {
    collection: {
      id: collection.id,
      slug: collection.handle,
      name: emptyL(collection.title),
      description: emptyL(collection.description || collection.title),
      productIds: products.map((p) => p.id),
      image:
        collection.image?.url ||
        products[0]?.images[0] ||
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
    },
    products,
  };
}

export async function getCatalogCollectionBySlug(slug: string): Promise<{
  collection: Collection;
  products: Product[];
} | null> {
  if (isShopifyConfigured()) {
    try {
      const data = await shopifyFetch<{
        collection: ShopifyCollection | null;
      }>({
        query: COLLECTION_BY_HANDLE_QUERY,
        variables: { handle: slug, first: 50 },
        tags: ["shopify", "collections", `collection:${slug}`],
        revalidate: 60,
      });
      if (data.collection) return mapShopifyCollection(data.collection);
    } catch (error) {
      console.error("[shopify] getCatalogCollectionBySlug failed", error);
    }
  }

  const local = getLocalCollectionBySlug(slug);
  if (!local) return null;
  const products = (await getCatalogProducts()).filter((product) =>
    local.productIds.includes(product.id),
  );
  // If Shopify products use different IDs, fall back to local demo products for this collection
  if (products.length === 0) {
    return {
      collection: local,
      products: localProducts.filter((product) =>
        local.productIds.includes(product.id),
      ),
    };
  }
  return { collection: local, products };
}

export async function getCatalogCollections(): Promise<Collection[]> {
  return localCollections;
}

export function shopifyEnabled(): boolean {
  return isShopifyConfigured();
}
