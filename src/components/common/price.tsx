import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  discountPercent,
  finalPriceToman,
  formatNumber,
  formatToman,
  usdToToman,
} from "@/lib/format";

/** Price block: discounted Toman price + optional strikethrough original. */
export function Price({
  priceUsd,
  discountPercentage = 0,
  size = "md",
  className,
}: {
  priceUsd: number;
  discountPercentage?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const hasDiscount = discountPercentage >= 0.5;
  const finalT = finalPriceToman(priceUsd, discountPercentage);
  const originalT = usdToToman(priceUsd);

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span
        className={cn(
          "tnum font-bold text-ink",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-xl",
          size === "xl" && "text-2xl md:text-3xl",
        )}
      >
        {formatToman(finalT)}
        <span className="ms-1 text-[0.72em] font-medium text-slate-500">تومان</span>
      </span>
      {hasDiscount && (
        <span
          className={cn(
            "tnum text-slate-400 line-through decoration-slate-300",
            size === "xl" ? "text-base" : "text-xs",
          )}
        >
          {formatToman(originalT)}
        </span>
      )}
    </div>
  );
}

/** Rounded «٪XX-» chip used on discounted products */
export function DiscountBadge({
  discountPercentage,
  className,
}: {
  discountPercentage: number;
  className?: string;
}) {
  if (discountPercentage < 0.5) return null;
  return (
    <Badge variant="danger" size="sm" className={cn("tnum rounded-full px-2", className)}>
      {formatNumber(discountPercent(discountPercentage))}٪-
    </Badge>
  );
}

/** Read-only star rating with Persian numeric label */
export function RatingStars({
  rating,
  reviewsCount,
  size = "sm",
  className,
}: {
  rating: number;
  reviewsCount?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <Star
        className={cn(
          "fill-amber-400 text-amber-400",
          size === "sm" ? "size-3.5" : "size-4.5",
        )}
      />
      <span className={cn("tnum font-semibold text-slate-700", size === "sm" ? "text-xs" : "text-sm")}>
        {formatNumber(Math.round(rating * 10) / 10)}
      </span>
      {typeof reviewsCount === "number" && (
        <span className="text-xs text-slate-400">({formatNumber(reviewsCount)})</span>
      )}
    </span>
  );
}

/** Availability label */
export function StockLabel({ stock, className }: { stock: number; className?: string }) {
  if (stock <= 0) {
    return (
      <Badge variant="danger-soft" className={className}>
        ناموجود
      </Badge>
    );
  }
  if (stock <= 5) {
    return (
      <Badge variant="accent-soft" className={cn("tnum", className)}>
        تنها {formatNumber(stock)} عدد در انبار
      </Badge>
    );
  }
  return (
    <Badge variant="success-soft" className={className}>
      موجود در انبار
    </Badge>
  );
}
