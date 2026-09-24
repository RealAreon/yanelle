import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { products } from "../../src/data/products.ts";
import { lookbook } from "../../src/data/lookbook.ts";
import {
  journalPosts,
  testimonials,
  arrivalNotes,
} from "../../src/data/editorial.ts";
import { collections } from "../../src/data/collections.ts";

const dir = dirname(fileURLToPath(import.meta.url));
mkdirSync(dir, { recursive: true });

const esc = (s: unknown) =>
  `"${String(s ?? "")
    .replace(/"/g, '""')
    .replace(/\r?\n/g, "<br>")}"`;

const rows: string[] = [];
const header = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Option2 Name",
  "Option2 Value",
  "Variant SKU",
  "Variant Inventory Qty",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Image Src",
  "Image Position",
  "Gift Card",
  "Status",
];
rows.push(header.join(","));

for (const p of products) {
  const tags = [...p.tags];
  if (p.featured) tags.push("featured");
  if (p.limited) tags.push("limited");
  tags.push(p.category);
  const body = `<p>${p.description.uk}</p><p><strong>Матеріали:</strong> ${p.materials.uk}</p><p><strong>Догляд:</strong> ${p.care.uk}</p>`;
  const variants =
    p.variants.length > 0
      ? p.variants
      : [
          {
            id: `${p.id}-d`,
            size: (p.sizes || ["OS"])[0],
            color: p.colors[0]?.name,
            colorHex: p.colors[0]?.hex || "#000",
            stock: 10,
          },
        ];

  let first = true;
  for (const v of variants) {
    const opt1 = v.size || (p.sizes ? p.sizes[0] : "OS") || "OS";
    const opt2 =
      (v.color && "uk" in v.color ? v.color.uk : undefined) ||
      p.colors[0]?.name.uk ||
      "Default";
    rows.push(
      [
        esc(p.slug),
        first ? esc(p.name.uk) : '""',
        first ? esc(body) : '""',
        first ? esc("YANELLE") : '""',
        first ? esc(p.category) : '""',
        first ? esc(tags.join(", ")) : '""',
        first ? "TRUE" : '""',
        esc("Size"),
        esc(opt1),
        esc("Color"),
        esc(opt2),
        esc(v.id),
        String(v.stock ?? 10),
        "deny",
        "manual",
        (p.priceUAH).toFixed(2),
        p.compareAtUAH ? p.compareAtUAH.toFixed(2) : '""',
        "TRUE",
        "TRUE",
        first && p.images[0] ? esc(p.images[0]) : '""',
        first && p.images[0] ? "1" : '""',
        "FALSE",
        first ? "active" : '""',
      ].join(","),
    );
    first = false;
  }

  p.images.slice(1).forEach((img, i) => {
    rows.push(
      [
        esc(p.slug),
        '""',
        '""',
        '""',
        '""',
        '""',
        '""',
        '""',
        '""',
        '""',
        '""',
        '""',
        '""',
        '""',
        '""',
        '""',
        '""',
        '""',
        '""',
        esc(img),
        String(i + 2),
        '""',
        '""',
      ].join(","),
    );
  });
}

writeFileSync(join(dir, "products.csv"), rows.join("\n"), "utf8");
writeFileSync(
  join(dir, "content.json"),
  JSON.stringify(
    {
      lookbook: lookbook.map((l) => ({
        title: l.title.uk,
        image: l.image,
        slug: l.slug,
      })),
      journalPosts: journalPosts.map((j) => ({
        category: j.category.uk,
        title: j.title.uk,
        excerpt: j.excerpt.uk,
        image: j.image,
      })),
      testimonials: testimonials.map((t) => ({
        quote: t.quote.uk,
        name: t.name,
        role: t.role.uk,
      })),
      arrivalNotes: arrivalNotes.map((a) => ({
        label: a.label.uk,
        title: a.title.uk,
        body: a.body.uk,
      })),
      collections: collections.map((c) => ({
        slug: c.slug,
        name: c.name.uk,
        description: c.description.uk,
        image: c.image,
      })),
    },
    null,
    2,
  ),
  "utf8",
);

console.log(`OK: ${products.length} products, ${rows.length} CSV rows`);
