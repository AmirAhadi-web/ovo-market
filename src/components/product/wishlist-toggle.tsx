"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { Product } from "@/features/products/types/product";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { selectIsWishlisted, useWishlistStore } from "@/stores/wishlist-store";

/** Heart toggle — icon variant for cards, full variant for detail pages. */
export function WishlistToggle({
  product,
  variant = "icon",
  className,
}: {
  product: Product;
  variant?: "icon" | "full";
  className?: string;
}) {
  const toggle = useWishlistStore((s) => s.toggle);
  const active = useWishlistStore(selectIsWishlisted(product.id));
  const mounted = useMounted();
  const on = mounted && active;

  const handle = () => {
    toggle(product);
    toast.success(on ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد", {
      description: product.title,
    });
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handle}
        aria-label={on ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        aria-pressed={on}
        title={on ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        className={cn(
          "grid size-8.5 cursor-pointer place-items-center rounded-full bg-white/90 shadow-sm ring-1 ring-line backdrop-blur transition-all hover:scale-105 active:scale-95",
          on ? "text-danger" : "text-slate-500 hover:text-danger",
          className,
        )}
      >
        <Heart className={cn("size-4 transition-transform", on && "fill-danger scale-110")} />
      </button>
    );
  }

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handle}
      aria-pressed={on}
      className={cn(on && "border-red-200 bg-red-50 text-danger hover:bg-red-50 hover:text-danger", className)}
    >
      <Heart className={cn("size-4.5", on && "fill-danger")} />
      {on ? "در علاقه‌مندی‌ها" : "علاقه‌مندی"}
    </Button>
  );
}
