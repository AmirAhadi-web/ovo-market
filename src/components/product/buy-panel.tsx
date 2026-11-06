"use client";

import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Price } from "@/components/common/price";
import { WishlistToggle } from "@/components/product/wishlist-toggle";
import { Button } from "@/components/ui/button";
import { clampQuantity } from "@/features/cart/utils/cart-utils";
import type { Product } from "@/features/products/types/product";
import { formatNumber } from "@/lib/format";
import { useMounted } from "@/hooks/use-mounted";
import { useCartStore } from "@/stores/cart-store";

/** Quantity selector + add-to-cart + wishlist block for the detail page */
export function BuyPanel({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const mounted = useMounted();
  const cartQty = useCartStore(
    (s) => s.items.find((i) => i.productId === product.id)?.quantity ?? 0,
  );
  const inCart = mounted ? cartQty : 0;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock <= 0;
  const maxQty = Math.max(1, product.stock);

  const change = (delta: number) =>
    setQty((q) => clampQuantity(q + delta, maxQty));

  const add = () => {
    addItem(product, qty);
    setAdded(true);
    toast.success("به سبد خرید اضافه شد", {
      description: `${product.title} × ${qty.toLocaleString("fa-IR")}`,
    });
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">قیمت نهایی</span>
        <Price priceUsd={product.price} discountPercentage={product.discountPercentage} size="xl" />
      </div>

      {!outOfStock && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-500">تعداد</span>
          <div className="flex items-center rounded-[var(--radius-ctl)] border border-line bg-white shadow-sm">
            <button
              type="button"
              onClick={() => change(1)}
              disabled={qty >= maxQty}
              aria-label="افزایش تعداد"
              className="grid size-10 cursor-pointer place-items-center text-slate-600 transition-colors hover:text-primary disabled:text-slate-300"
            >
              <Plus className="size-4" />
            </button>
            <span className="tnum w-10 text-center text-base font-bold" aria-live="polite">
              {formatNumber(qty)}
            </span>
            <button
              type="button"
              onClick={() => change(-1)}
              disabled={qty <= 1}
              aria-label="کاهش تعداد"
              className="grid size-10 cursor-pointer place-items-center text-slate-600 transition-colors hover:text-danger disabled:text-slate-300"
            >
              <Minus className="size-4" />
            </button>
          </div>
          {inCart > 0 && (
            <span className="tnum text-xs text-slate-400">
              {formatNumber(inCart)} عدد در سبد شما
            </span>
          )}
        </div>
      )}

      <div className="flex gap-2.5">
        <Button
          onClick={add}
          disabled={outOfStock}
          size="lg"
          fullWidth
          className="h-12 text-[15px] font-bold"
        >
          {outOfStock ? (
            "ناموجود"
          ) : added ? (
            <>
              <Check className="size-5" /> اضافه شد!
            </>
          ) : (
            <>
              <ShoppingCart className="size-5" /> افزودن به سبد خرید
            </>
          )}
        </Button>
        <WishlistToggle product={product} variant="full" className="shrink-0" />
      </div>
    </div>
  );
}

/** Sticky bottom buy bar shown on mobile product pages */
export function StickyBuyBar({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock <= 0;

  const add = () => {
    addItem(product, 1);
    setAdded(true);
    toast.success("به سبد خرید اضافه شد");
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="fixed inset-x-0 bottom-16 z-40 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgb(15_23_42/0.08)] backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <Price priceUsd={product.price} discountPercentage={product.discountPercentage} size="md" />
        <Button onClick={add} disabled={outOfStock} className="ms-auto h-11 font-bold" size="md">
          {outOfStock ? "ناموجود" : added ? <Check className="size-4.5" /> : <ShoppingCart className="size-4.5" />}
          {outOfStock ? "" : added ? "اضافه شد" : "افزودن به سبد"}
        </Button>
      </div>
    </div>
  );
}
