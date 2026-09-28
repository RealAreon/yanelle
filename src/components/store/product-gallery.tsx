"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const list = images.length > 0 ? images : [];
  const [active, setActive] = useState(0);
  const current = list[active] ?? list[0];

  if (!current) {
    return (
      <div className="relative aspect-square w-full overflow-hidden bg-muted" />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[500px] flex-col gap-3 lg:mx-0 lg:max-w-[88%]">
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          key={current}
          src={current}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) min(100vw, 500px), 45vw"
          className="object-cover object-center"
        />
      </div>

      {list.length > 1 && (
        <ul className="flex gap-2 overflow-x-auto pb-1">
          {list.map((image, index) => {
            const selected = index === active;
            return (
              <li key={`${image}-${index}`} className="shrink-0">
                <button
                  type="button"
                  aria-label={`${alt} ${index + 1}`}
                  aria-pressed={selected}
                  onClick={() => setActive(index)}
                  className={`relative block size-16 overflow-hidden bg-muted transition-opacity duration-300 sm:size-20 ${
                    selected
                      ? "ring-1 ring-ink ring-offset-2 ring-offset-background"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
