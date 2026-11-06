"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/features/products/types/product";
import { cn } from "@/lib/utils";

/**
 * RTL-aware horizontal product carousel (scroll-snap, no dependencies).
 * «Next» scrolls toward the visual left in RTL.
 */
export function ProductCarousel({
  products,
  className,
  itemClassName,
}: {
  products: Product[];
  className?: string;
  itemClassName?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const scrollable = el.scrollWidth > el.clientWidth + 4;
    // In RTL scrollLeft runs from 0 to negative values in modern browsers
    const pos = Math.abs(el.scrollLeft);
    const max = el.scrollWidth - el.clientWidth;
    setCanNext(scrollable && pos < max - 4);
    setCanPrev(scrollable && pos > 4);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85 * dir;
    el.scrollBy({ left: -amount, behavior: "smooth" }); // RTL: forward = negative left
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scrollbar-none md:mx-0 md:gap-4 md:px-0"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className={cn("w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[23.5%] xl:w-[19%]", itemClassName)}
          >
            <ProductCard product={p} className="h-full" />
          </div>
        ))}
      </div>

      {canPrev && (
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="قبلی"
          className="absolute -start-1 top-[38%] z-10 hidden size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-white text-slate-600 shadow-md transition-all hover:bg-primary hover:text-white md:grid"
        >
          <ChevronRight className="size-5" />
        </button>
      )}
      {canNext && (
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="بعدی"
          className="absolute -end-1 top-[38%] z-10 hidden size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-white text-slate-600 shadow-md transition-all hover:bg-primary hover:text-white md:grid"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}
    </div>
  );
}
