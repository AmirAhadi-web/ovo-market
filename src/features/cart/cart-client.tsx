"use client";

import { ArrowLeft, Minus, Plus, ShieldCheck, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { EmptyState } from "@/components/common/empty-state";
import { ProductImage } from "@/components/common/product-image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";
import {
  computeCartTotals,
  lineFinalToman,
  lineTotalToman,
  lineUnitToman,
  type CartLineSnapshot,
} from "@/features/cart/utils/cart-utils";
import { useMounted } from "@/hooks/use-mounted";
import { formatNumber, formatTomanWithUnit, usdToToman } from "@/lib/format";
import { useCartStore } from "@/stores/cart-store";

function QuantityStepper({ line }: { line: CartLineSnapshot }) {
  const setQuantity = useCartStore((s) => s.setQuantity);
  return (
    <div className="inline-flex items-center rounded-[var(--radius-ctl)] border border-line bg-white">
      <button
        type="button"
        onClick={() => setQuantity(line.productId, line.quantity + 1)}
        disabled={line.quantity >= line.stock}
        aria-label="افزایش تعداد"
        className="grid size-8.5 cursor-pointer place-items-center text-slate-600 transition-colors hover:text-primary disabled:text-slate-300"
      >
        <Plus className="size-3.5" />
      </button>
      <span className="tnum w-8 text-center text-sm font-bold" aria-live="polite">
        {formatNumber(line.quantity)}
      </span>
      <button
        type="button"
        onClick={() => setQuantity(line.productId, line.quantity - 1)}
        aria-label={line.quantity === 1 ? "حذف از سبد" : "کاهش تعداد"}
        className="grid size-8.5 cursor-pointer place-items-center text-slate-600 transition-colors hover:text-danger"
      >
        {line.quantity === 1 ? <Trash2 className="size-3.5" /> : <Minus className="size-3.5" />}
      </button>
    </div>
  );
}

export function CartClient() {
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const [confirmClear, setConfirmClear] = useState(false);

  if (!mounted) {
    return (
      <div className="container-x grid gap-6 py-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    );
  }

  const totals = computeCartTotals(items);
  const freeShippingToman = usdToToman(siteConfig.freeShippingThresholdUsd);
  const progress = Math.min(100, (totals.total / freeShippingToman) * 100);
  const remaining = Math.max(0, freeShippingToman - totals.total);

  if (items.length === 0) {
    return (
      <div className="container-x py-10">
        <Breadcrumbs items={[{ label: "سبد خرید" }]} className="mb-6" />
        <EmptyState
          icon={ShoppingCart}
          title="سبد خرید شما خالی است"
          description="هنوز کالایی به سبد خرید اضافه نکرده‌اید. از میان هزاران کالای فروشگاه انتخاب کنید."
          action={
            <Button asChild size="lg">
              <Link href="/products">
                شروع خرید
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-x py-4 md:py-6">
      <Breadcrumbs items={[{ label: "سبد خرید" }]} className="mb-4" />

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-ink md:text-2xl">
          سبد خرید{" "}
          <span className="tnum text-sm font-semibold text-slate-400">
            ({formatNumber(totals.count)} کالا)
          </span>
        </h1>
        <button
          type="button"
          onClick={() => setConfirmClear(true)}
          className="flex cursor-pointer items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-danger"
        >
          <Trash2 className="size-3.5" />
          حذف همه
        </button>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Items */}
        <ul className="space-y-3">
          {items.map((line) => (
            <li key={line.productId} className="card flex gap-3 p-3 md:gap-4 md:p-4">
              <Link
                href={`/products/${line.productId}`}
                className="relative size-20 shrink-0 self-center overflow-hidden rounded-lg bg-white md:size-24"
              >
                <ProductImage
                  src={line.thumbnail}
                  alt={line.title}
                  fill
                  sizes="96px"
                  className="object-contain p-1.5"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/products/${line.productId}`}
                    className="line-clamp-2 text-[13px] font-medium leading-6 text-ink transition-colors hover:text-primary"
                  >
                    {line.title}
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeItem(line.productId)}
                    aria-label="حذف از سبد خرید"
                    className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-danger"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {line.quantity >= line.stock && line.stock > 0 && (
                  <p className="tnum mt-1 text-[11px] font-medium text-accent-600">
                    حداکثر موجودی انبار: {formatNumber(line.stock)} عدد
                  </p>
                )}
                {line.stock <= 0 && (
                  <p className="mt-1 text-[11px] font-bold text-danger">
                    این کالا در انبار موجود نیست — لطفاً آن را حذف کنید.
                  </p>
                )}

                <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-2">
                  <QuantityStepper line={line} />
                  <div className="text-end">
                    {line.discountPercentage >= 0.5 && (
                      <p className="tnum text-[11px] text-slate-400 line-through">
                        {formatNumber(lineUnitToman(line) * line.quantity)}
                      </p>
                    )}
                    <p className="tnum text-sm font-bold text-ink">
                      {formatTomanWithUnit(lineTotalToman(line))}
                    </p>
                    <p className="tnum text-[11px] text-slate-400">
                      هر عدد: {formatTomanWithUnit(lineFinalToman(line))}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="card sticky top-40 space-y-4 p-5" aria-label="خلاصه سبد خرید">
          <h2 className="text-base font-bold text-ink">خلاصه سفارش</h2>

          {/* Free shipping progress */}
          <div>
            <p className="mb-2 text-xs leading-5 text-slate-500">
              {remaining > 0 ? (
                <>
                  با خرید{" "}
                  <span className="tnum font-bold text-accent-600">{formatTomanWithUnit(remaining)}</span>{" "}
                  دیگر، ارسال سفارش شما <b className="text-success">رایگان</b> می‌شود.
                </>
              ) : (
                <span className="font-bold text-success">تبریک! ارسال سفارش شما رایگان است.</span>
              )}
            </p>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-l from-success to-emerald-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          <dl className="space-y-2.5 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">قیمت کالاها ({formatNumber(totals.count)})</dt>
              <dd className="tnum font-medium">{formatTomanWithUnit(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">سود شما از خرید</dt>
              <dd className="tnum font-bold text-accent-600">{formatTomanWithUnit(totals.discount)}</dd>
            </div>
            <div className="flex justify-between text-slate-400">
              <dt className="text-xs">هزینه ارسال</dt>
              <dd className="text-xs">در مرحله بعد محاسبه می‌شود</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3">
              <dt className="font-bold text-ink">مبلغ قابل پرداخت</dt>
              <dd className="tnum text-base font-extrabold text-primary-700">
                {formatTomanWithUnit(totals.total)}
              </dd>
            </div>
          </dl>

          <Button asChild size="lg" fullWidth className="h-12 text-[15px] font-bold">
            <Link href="/checkout">
              ادامه فرایند خرید
              <ArrowLeft className="size-4.5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" fullWidth>
            <Link href="/products">ادامه خرید</Link>
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="size-3.5" />
            کالاها در سبد شما رزرو نمی‌شوند.
          </p>
        </aside>
      </div>

      <Dialog open={confirmClear} onOpenChange={setConfirmClear}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>خالی کردن سبد خرید</DialogTitle>
            <DialogDescription>
              آیا مطمئن هستید که می‌خواهید همه کالاها را از سبد خرید حذف کنید؟
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmClear(false)}>
              انصراف
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                clearCart();
                setConfirmClear(false);
              }}
            >
              بله، حذف همه
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
