"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Option = {
  value: string;
  label: string;
};

export function ElegantSelect({
  value,
  options,
  onChange,
  ariaLabel,
  align = "end",
  variant = "header",
  className,
}: {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  ariaLabel: string;
  align?: "start" | "end" | "center";
  variant?: "header" | "field";
  className?: string;
}) {
  const current =
    options.find((option) => option.value === value)?.label ?? value;
  const isField = variant === "field";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={ariaLabel}
        className={cn(
          "group cursor-pointer bg-transparent text-foreground outline-none transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-champagne/40",
          isField
            ? "flex h-11 w-full items-center justify-between border-b border-border/80 pb-1 text-left text-sm tracking-normal hover:border-champagne"
            : "inline-flex h-10 items-center gap-1.5 px-1 text-[10px] uppercase tracking-[0.16em] hover:text-champagne",
          className,
        )}
      >
        <span className={cn(isField && "truncate")}>{current}</span>
        <ChevronDown
          size={isField ? 14 : 12}
          strokeWidth={1.5}
          className="shrink-0 opacity-55 transition-transform duration-300 ease-out group-data-[popup-open]:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        sideOffset={isField ? 6 : 10}
        className={cn(
          "rounded-none border border-border/70 bg-[#f7f3ee] p-1 shadow-[0_16px_48px_rgba(28,25,23,0.1)] ring-0 duration-300 data-closed:fade-out-0 data-closed:zoom-out-95 data-open:fade-in-0 data-open:zoom-in-95",
          isField ? "min-w-[var(--anchor-width)] w-[var(--anchor-width)]" : "min-w-[8rem]",
        )}
      >
        {options.map((option) => {
          const active = option.value === value;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                "cursor-pointer rounded-none px-3 py-2.5 outline-none transition-colors duration-200 focus:bg-[#ebe4da] focus:text-foreground data-[highlighted]:bg-[#ebe4da]",
                isField
                  ? "text-sm tracking-normal"
                  : "text-[10px] uppercase tracking-[0.16em]",
                active
                  ? "bg-[#ebe4da] text-foreground"
                  : "text-muted-foreground hover:bg-[#ebe4da]/80 hover:text-foreground",
              )}
            >
              <span className="flex w-full items-center justify-between gap-3">
                {option.label}
                {active && (
                  <span className="h-px w-3.5 shrink-0 bg-[#c4a574]" aria-hidden />
                )}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
