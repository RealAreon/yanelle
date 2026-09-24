"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function CatalogSearch({
  value,
  onChange,
  placeholder = "Search the edit…",
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "group relative flex items-center gap-3 border-b border-border/80 pb-3 transition-colors duration-300 focus-within:border-champagne",
        className,
      )}
    >
      <Search
        size={16}
        strokeWidth={1.4}
        className="shrink-0 text-muted-foreground transition-colors duration-300 group-focus-within:text-champagne"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-9 w-full min-w-0 bg-transparent text-sm tracking-wide text-foreground outline-none placeholder:text-muted-foreground/65 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="inline-flex size-7 cursor-pointer items-center justify-center text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      ) : (
        <span className="pointer-events-none text-[9px] uppercase tracking-[0.22em] text-muted-foreground/50">
          Find
        </span>
      )}
    </label>
  );
}
