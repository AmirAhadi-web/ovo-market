"use client";

import { CheckCircle2, Home, PackageSearch, ReceiptText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { ProductImage } from "@/components/common/product-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMounted } from "@/hooks/use-mounted";
import { formatFaDate, formatNumber, formatTomanWithUnit } from "@/lib/format";
import { ORDER_STATUS_LABELS, useOrdersStore } from "@/stores/orders-store";

function SuccessContent() {
  const mounted = useMounted();
  const params = useSearchParams();
  const ref = params.get("ref");
  const order = useOrdersStore((s) => s.orders.find((o) => o.ref === ref));

  if (!mounted) {
    return (
      <div className="container-x max-w-2xl py-10">
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-x max-w-2xl py-16 text-center">
        <div className="card space-y-4 p-10">
          <PackageSearch className="mx-auto size-12 text-slate-300" />
          <h1 className="text-lg font-bold text-ink">سفارشی با این شماره پیدا نشد</h1>
          <p className="text-sm text-slate-500">
            ممکن است صفحه را مستقیم باز کرده باشید یا سفارش منقضی شده باشد.
          </p>
          <Button asChild>
            <Link href="/products">رفتن به فروشگاه</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x max-w-2xl py-10">
      <div className="card animate-[fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both] overflow-hidden">
        <div className="bg-gradient-to-l from-success to-emerald-600 p-8 text-center text-white">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-white/20 backdrop-blur">
            <CheckCircle2 className="size-9" />
          </span>
          <h1 className="mt-4 text-xl font-extrabold md:text-2xl">سفارش شما با موفقیت ثبت شد</h1>
          <p className="mt-2 text-sm text-white/85">از خرید شما سپاسگزاریم.</p>
          <p className="mx-auto mt-4 w-fit rounded-full bg-white/15 px-5 py-2 font-bold ring-1 ring-white/30" dir="ltr">
            {order.ref}
          </p>
        </div>

        <div className="space-y-5 p-5 md:p-7">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">تاریخ ثبت</span>
            <span className="font-medium text-ink">{formatFaDate(order.createdAt)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">وضعیت سفارش</span>
            <Badge variant="accent-soft">{ORDER_STATUS_LABELS[order.status]}</Badge>
          </div>
          <div className="flex items-start justify-between gap-6 text-sm">
            <span className="shrink-0 text-slate-500">آدرس تحویل</span>
            <span className="text-end font-medium leading-6 text-ink">{order.address}</span>
          </div>

          <ul className="divide-y divide-line rounded-xl border border-line">
            {order.items.map((item) => (
              <li key={item.productId} className="flex items-center gap-3 p-3">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                  <ProductImage src={item.thumbnail} alt={item.title} fill sizes="48px" className="object-contain p-1" />
                </span>
                <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{item.title}</p>
                <span className="tnum text-xs text-slate-400">× {formatNumber(item.quantity)}</span>
                <span className="tnum text-[13px] font-bold text-ink">
                  {formatTomanWithUnit(item.unitToman * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-500">
              <dt>مجموع کالاها</dt>
              <dd className="tnum">{formatTomanWithUnit(order.subtotalToman)}</dd>
            </div>
            <div className="flex justify-between text-accent-600">
              <dt>تخفیف</dt>
              <dd className="tnum">{formatTomanWithUnit(order.discountToman)}</dd>
            </div>
            <div className="flex justify-between text-slate-500">
              <dt>هزینه ارسال</dt>
              <dd className="tnum">
                {order.shippingToman === 0 ? "رایگان" : formatTomanWithUnit(order.shippingToman)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-extrabold text-ink">
              <dt>مبلغ پرداخت‌شده</dt>
              <dd className="tnum text-primary-700">{formatTomanWithUnit(order.totalToman)}</dd>
            </div>
          </dl>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <Button asChild variant="outline">
              <Link href="/account#orders">
                <ReceiptText className="size-4.5" />
                مشاهده سفارش‌ها
              </Link>
            </Button>
            <Button asChild>
              <Link href="/products">
                <Home className="size-4.5" />
                بازگشت به فروشگاه
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export function OrderSuccessClient() {
  return (
    <Suspense fallback={<div className="container-x max-w-2xl py-10"><Skeleton className="h-96 w-full rounded-2xl" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
