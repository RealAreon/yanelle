import type {
  Category,
  LocalizedString,
  Product,
  ProductVariant,
} from "@/data/products";
import type { ShopifyProduct, ShopifyProductVariant } from "./types";

const CATEGORIES: Category[] = [
  "dresses",
  "suits",
  "outerwear",
  "blouses",
  "skirts",
  "bags",
  "belts",
  "scarves",
  "wallets",
  "eyewear",
];

const emptyL = (value = ""): LocalizedString => ({
  uk: value,
  en: value,
  pl: value,
  fr: value,
  de: value,
  es: value,
});

function optionValue(
  variant: ShopifyProductVariant,
  names: string[],
): string | undefined {
  const match = variant.selectedOptions.find((option) =>
    names.includes(option.name.toLowerCase()),
  );
  return match?.value;
}

function colorToHex(name: string): string {
  const palette: Record<string, string> = {
    black: "#1a1a1a",
    white: "#f7f4ef",
    ivory: "#f3ebe0",
    cream: "#efe6d8",
    beige: "#d8c7b0",
    camel: "#c4a574",
    brown: "#6b4f3a",
    espresso: "#3b2a22",
    navy: "#1e2a44",
    blue: "#3a4f7a",
    grey: "#8a8680",
    gray: "#8a8680",
    stone: "#a39e94",
    taupe: "#8b7d6b",
    sand: "#cbb89a",
    champagne: "#e6d5b8",
    olive: "#6b6b45",
    green: "#4a5a3c",
    red: "#8b3a3a",
    burgundy: "#5c2430",
    gold: "#c9a96e",
    silver: "#b8b8b8",
  };
  const key = name.trim().toLowerCase();
  if (palette[key]) return palette[key];
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 18% 55%)`;
}

function mapCategory(product: ShopifyProduct): Category {
  const type = product.productType.toLowerCase().trim();
  if (CATEGORIES.includes(type as Category)) return type as Category;

  const hay = [type, ...product.tags.map((t) => t.toLowerCase())].join(" ");
  const aliases: Array<[Category, string[]]> = [
    ["dresses", ["dress", "сукн"]],
    ["suits", ["suit", "костюм"]],
    ["outerwear", ["coat", "jacket", "outer", "пальто", "курт"]],
    ["blouses", ["blouse", "shirt", "top", "блуз", "сороч"]],
    ["skirts", ["skirt", "спідниц"]],
    ["bags", ["bag", "сумк", "handbag", "tote"]],
    ["belts", ["belt", "ремін"]],
    ["scarves", ["scarf", "хуст", "shawl"]],
    ["wallets", ["wallet", "гаман"]],
    ["eyewear", ["eyewear", "sunglass", "окуляр"]],
  ];
  for (const [category, keys] of aliases) {
    if (keys.some((key) => hay.includes(key))) return category;
  }
  return "dresses";
}

function mapTags(tags: string[]): Product["tags"] {
  const lowered = tags.map((t) => t.toLowerCase());
  const result: Product["tags"] = [];
  if (lowered.some((t) => t === "new" || t === "новинка" || t === "новинки")) {
    result.push("new");
  }
  if (lowered.some((t) => t === "sale" || t === "розпродаж" || t.includes("sale"))) {
    result.push("sale");
  }
  if (lowered.some((t) => t === "limited" || t === "ліміт" || t.includes("limited"))) {
    result.push("limited");
  }
  return result;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toUAH(amount: string, currencyCode: string): number {
  const value = Number.parseFloat(amount);
  if (Number.isNaN(value)) return 0;
  const code = currencyCode.toUpperCase();
  if (code === "UAH") return Math.round(value);
  if (code === "USD") return Math.round(value * 41);
  if (code === "EUR") return Math.round(value * 44);
  return Math.round(value);
}

function metafieldLike(tags: string[], prefix: string): string {
  const hit = tags.find((tag) => tag.toLowerCase().startsWith(prefix));
  if (!hit) return "";
  return hit.slice(prefix.length).trim();
}

export function mapShopifyProduct(product: ShopifyProduct): Product {
  const tags = mapTags(product.tags);
  const featured =
    product.tags.some((t) => t.toLowerCase() === "featured") ||
    product.collections.nodes.some((c) =>
      ["featured", "homepage", "best-sellers"].includes(c.handle.toLowerCase()),
    );
  const limited =
    tags.includes("limited") ||
    product.tags.some((t) => t.toLowerCase() === "limited");

  const sizeOption = product.options.find((o) =>
    ["size", "розмір", "taille", "größe", "talla"].includes(o.name.toLowerCase()),
  );
  const colorOption = product.options.find((o) =>
    ["color", "colour", "колір", "цвет", "couleur", "farbe", "color"].includes(
      o.name.toLowerCase(),
    ),
  );

  const sizes = sizeOption?.values.length ? sizeOption.values : undefined;
  const colors =
    colorOption?.values.map((value) => ({
      name: emptyL(value),
      hex: colorToHex(value),
    })) ??
    (product.variants.nodes[0]
      ? [
          {
            name: emptyL(
              optionValue(product.variants.nodes[0], [
                "color",
                "colour",
                "колір",
              ]) || "Default",
            ),
            hex: colorToHex(
              optionValue(product.variants.nodes[0], [
                "color",
                "colour",
                "колір",
              ]) || product.title,
            ),
          },
        ]
      : [{ name: emptyL("Default"), hex: "#c4b5a0" }]);

  const variants: ProductVariant[] = product.variants.nodes.map((variant) => {
    const size = optionValue(variant, ["size", "розмір", "taille", "größe", "talla"]);
    const colorName =
      optionValue(variant, ["color", "colour", "колір", "цвет", "couleur", "farbe"]) ||
      colors[0]?.name.en ||
      "Default";
    return {
      id: variant.id,
      size,
      color: emptyL(colorName),
      colorHex: colorToHex(colorName),
      stock: variant.availableForSale
        ? Math.max(variant.quantityAvailable ?? 10, 1)
        : 0,
    };
  });

  const images = [
    ...product.images.nodes.map((image) => image.url),
    ...(product.featuredImage ? [product.featuredImage.url] : []),
  ].filter((url, index, all) => url && all.indexOf(url) === index);

  const minPrice = product.priceRange.minVariantPrice;
  const compare = product.compareAtPriceRange.minVariantPrice;
  const priceUAH = toUAH(minPrice.amount, minPrice.currencyCode);
  const compareAtUAH = toUAH(compare.amount, compare.currencyCode);
  const hasCompare = compareAtUAH > priceUAH;

  const materials =
    metafieldLike(product.tags, "material:") ||
    metafieldLike(product.tags, "матеріал:") ||
    "";
  const care =
    metafieldLike(product.tags, "care:") ||
    metafieldLike(product.tags, "догляд:") ||
    "";

  const description =
    product.description ||
    stripHtml(product.descriptionHtml) ||
    product.title;

  return {
    id: product.id,
    slug: product.handle,
    name: emptyL(product.title),
    description: emptyL(description),
    category: mapCategory(product),
    collectionIds: product.collections.nodes.map((c) => c.handle),
    priceUAH,
    compareAtUAH: hasCompare ? compareAtUAH : undefined,
    images: images.length
      ? images
      : ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"],
    materials: emptyL(materials),
    care: emptyL(care),
    sizes,
    colors,
    variants: variants.length
      ? variants
      : [
          {
            id: `${product.id}-default`,
            color: emptyL("Default"),
            colorHex: "#c4b5a0",
            stock: product.availableForSale ? 10 : 0,
          },
        ],
    tags,
    featured: featured || undefined,
    limited: limited || undefined,
  };
}
