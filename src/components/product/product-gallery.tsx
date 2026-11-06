"use client";

import { useState } from "react";

import { ProductImage } from "@/components/common/product-image";
import { cn } from "@/lib/utils";

/** Detail-page gallery: main stage + thumbnail strip */
export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const safe = images.length ? images : ["/images/placeholder-product.svg"];
  const current = Math.min(active, safe.length - 1);

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-white">
        <ProductImage
          key={safe[current]}
          src={safe[current]}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-contain p-6 md:p-10"
        />
      </div>

      {safe.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" role="tablist" aria-label="تصاویر محصول">
          {safe.map((src, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`تصویر ${(i + 1).toLocaleString("fa-IR")}`}
              onClick={() => setActive(i)}
              className={cn(
                "relative size-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border bg-white transition-all md:size-20",
                i === current
                  ? "border-primary ring-2 ring-primary/25"
                  : "border-line opacity-70 hover:opacity-100",
              )}
            >
              <ProductImage src={src} alt="" fill sizes="80px" className="object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
