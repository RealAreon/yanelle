"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@/data/products";
import { ElegantSelect } from "@/components/layout/elegant-select";
import { CatalogSearch } from "./catalog-search";
import { ProductCard } from "./product-card";

const categories: Category[] = [
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

export function CatalogClient({
  products,
  locale,
  initialQuery = "",
  initialCategory = "",
  initialTag = "",
}: {
  products: Product[];
  locale: string;
  initialQuery?: string;
  initialCategory?: string;
  initialTag?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [tag, setTag] = useState(initialTag);
  const [sort, setSort] = useState("newest");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery =
        !normalized ||
        Object.values(product.name).some((name) =>
          name.toLowerCase().includes(normalized),
        );
      return (
        matchesQuery &&
        (!category || product.category === category) &&
        (!tag || product.tags.includes(tag as "new" | "sale" | "limited"))
      );
    });
    return filtered.toSorted((a, b) => {
      if (sort === "price-asc") return a.priceUAH - b.priceUAH;
      if (sort === "price-desc") return b.priceUAH - a.priceUAH;
      return (
        Number(Boolean(b.tags.includes("new"))) -
        Number(Boolean(a.tags.includes("new")))
      );
    });
  }, [category, products, query, sort, tag]);

  const categoryOptions = [
    { value: "", label: "All" },
    ...categories.map((item) => ({
      value: item,
      label: item.charAt(0).toUpperCase() + item.slice(1),
    })),
  ];

  const tagOptions = [
    { value: "", label: "All" },
    { value: "new", label: "New" },
    { value: "sale", label: "Sale" },
    { value: "limited", label: "Limited" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price ascending" },
    { value: "price-desc", label: "Price descending" },
  ];

  return (
    <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
      <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
        <CatalogSearch
          value={query}
          onChange={setQuery}
          placeholder="Search the edit…"
        />

        <FilterField label="Category">
          <ElegantSelect
            variant="field"
            align="start"
            ariaLabel="Category"
            value={category}
            options={categoryOptions}
            onChange={setCategory}
          />
        </FilterField>

        <FilterField label="Edit">
          <ElegantSelect
            variant="field"
            align="start"
            ariaLabel="Edit"
            value={tag}
            options={tagOptions}
            onChange={setTag}
          />
        </FilterField>

        <FilterField label="Sort">
          <ElegantSelect
            variant="field"
            align="start"
            ariaLabel="Sort"
            value={sort}
            options={sortOptions}
            onChange={setSort}
          />
        </FilterField>

        <button
          type="button"
          className="cursor-pointer pt-1 text-[11px] uppercase tracking-[0.18em] text-foreground/80 underline decoration-champagne underline-offset-8 transition-colors duration-300 hover:text-champagne"
          onClick={() => {
            setQuery("");
            setCategory("");
            setTag("");
            setSort("newest");
          }}
        >
          Clear filters
        </button>
      </aside>

      <div>
        <p className="mb-8 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {visible.length} pieces
        </p>
        {visible.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="border-y border-border/70 py-16 text-center font-heading text-3xl">
            No pieces match your selection.
          </p>
        )}
      </div>
    </div>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}
