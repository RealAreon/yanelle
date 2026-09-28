"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Testimonial } from "@/data/editorial";
import { tLocal } from "@/lib/locale-text";

export function TestimonialsCarousel({
  items,
  locale,
}: {
  items: Testimonial[];
  locale: string;
}) {
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(1);

  useEffect(() => {
    function update() {
      if (window.matchMedia("(min-width: 1024px)").matches) setPerPage(3);
      else if (window.matchMedia("(min-width: 768px)").matches) setPerPage(2);
      else setPerPage(1);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, items.length - perPage);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  function prev() {
    setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  }
  function next() {
    setIndex((current) => (current >= maxIndex ? 0 : current + 1));
  }

  const visible = items.slice(index, index + perPage);

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous reviews"
            className="inline-flex size-11 cursor-pointer items-center justify-center border border-border/80 text-foreground transition-colors duration-300 hover:border-champagne hover:text-champagne"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next reviews"
            className="inline-flex size-11 cursor-pointer items-center justify-center border border-border/80 text-foreground transition-colors duration-300 hover:border-champagne hover:text-champagne"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${index}-${perPage}`}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {visible.map((item) => (
            <blockquote
              key={item.id}
              className="flex min-h-[18rem] flex-col border border-border/70 bg-muted/80 px-7 py-9"
            >
              <div className="mb-5 flex gap-1" aria-label={`${item.rating} stars`}>
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={14}
                    strokeWidth={1.4}
                    className={
                      starIndex < item.rating
                        ? "fill-champagne text-champagne"
                        : "text-border"
                    }
                  />
                ))}
              </div>
              <p className="font-heading text-xl leading-8 text-foreground/90">
                “{tLocal(item.quote, locale)}”
              </p>
              <footer className="mt-auto border-t border-border/60 pt-5">
                <cite className="not-italic text-sm font-medium tracking-wide">
                  {item.name}
                </cite>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {tLocal(item.role, locale)}
                </p>
              </footer>
            </blockquote>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, dot) => (
          <button
            key={dot}
            type="button"
            aria-label={`Go to slide ${dot + 1}`}
            onClick={() => setIndex(dot)}
            className={`h-1.5 cursor-pointer transition-all duration-300 ${
              dot === index
                ? "w-7 bg-champagne"
                : "w-1.5 bg-border hover:bg-champagne/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
