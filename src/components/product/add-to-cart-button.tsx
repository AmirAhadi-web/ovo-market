"use client";

import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { Product } from "@/features/products/types/product";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

/** Add-to-cart action — icon variant for cards, full variant for detail pages. */
export function AddToCartButton({
  product,
  variant = "icon",
  className,
}: {
  product: Product;
  variant?: "icon" | "full";
  className?: string;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const mounted = useMounted();
  const [justAdded, setJustAdded] = useState(false);
  const disabled = product.stock <= 0;

  const handleAdd = () => {
    addItem(product, 1);
    setJustAdded(true);
    toast.success("به سبد خرید اضافه شد", {
      description: product.title,
      action: { label: "مشاهده سبد", onClick: () => (window.location.href = "/cart") },
    });
    setTimeout(() => setJustAdded(false), 1600);
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleAdd}
        disabled={disabled}
        aria-label={disabled ? "ناموجود" : "افزودن به سبد خرید"}
        title={disabled ? "ناموجود" : "افزودن به سبد خرید"}
        className={cn(
          "grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border transition-all active:scale-90",
          disabled
            ? "cursor-not-allowed border-line bg-slate-50 text-slate-300"
            : justAdded && mounted
              ? "border-success bg-green-50 text-success"
              : "border-primary/25 bg-primary-50 text-primary hover:bg-primary hover:text-white",
          className,
        )}
      >
        {justAdded && mounted ? <Check className="size-4.5" /> : <ShoppingCart className="size-4.5" />}
      </button>
    );
  }

  return (
    <Button
      onClick={handleAdd}
      disabled={disabled}
      size="lg"
      className={cn("font-bold", className)}
      fullWidth
    >
      {disabled ? (
        "ناموجود"
      ) : justAdded && mounted ? (
        <>
          <Check className="size-5" /> اضافه شد!
        </>
      ) : (
        <>
          <ShoppingCart className="size-5" /> افزودن به سبد خرید
        </>
      )}
    </Button>
  );
}
