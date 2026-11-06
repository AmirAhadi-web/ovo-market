"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  BadgePercent,
  CheckCircle2,
  CircleAlert,
  CreditCard,
  Loader2,
  MapPin,
  Package,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { EmptyState } from "@/components/common/empty-state";
import { ProductImage } from "@/components/common/product-image";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/forms";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";
import { computeCartTotals, lineFinalToman } from "@/features/cart/utils/cart-utils";
import { useMounted } from "@/hooks/use-mounted";
import {
  formatNumber,
  formatToman,
  formatTomanWithUnit,
  generateOrderRef,
  usdToToman,
} from "@/lib/format";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/validations/checkout";
import { cn, sleep } from "@/lib/utils";
import { useOrdersStore, type DemoOrder } from "@/stores/orders-store";
import { useCartStore } from "@/stores/cart-store";
import { usePreferencesStore } from "@/stores/preferences-store";

const STEPS = ["اطلاعات ارسال", "بازبینی سفارش", "پرداخت"] as const;

export function CheckoutClient() {
  const mounted = useMounted();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const registerOrder = useOrdersStore((s) => s.registerOrder);
  const coupons = useOrdersStore((s) => s.coupons);
  const profile = usePreferencesStore((s) => s.profile);
  const addresses = usePreferencesStore((s) => s.addresses);

  const [step, setStep] = useState(0);
  const [buyer, setBuyer] = useState<CheckoutFormValues | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [paying, setPaying] = useState<"success" | "fail" | null>(null);
  const [payError, setPayError] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: profile?.fullName ?? addresses[0]?.receiver ?? "",
      phone: profile?.phone ?? addresses[0]?.phone ?? "",
      email: profile?.email ?? "",
      province: addresses[0]?.province ?? "",
      city: addresses[0]?.city ?? "",
      address: addresses[0]?.address ?? "",
      postalCode: addresses[0]?.postalCode ?? "",
    },
  });

  if (!mounted) {
    return (
      <div className="container-x grid gap-6 py-6 lg:grid-cols-[1fr_340px]">
        <Skeleton className="h-96 w-full rounded-xl" />
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    );
  }

  const totals = computeCartTotals(items);

  if (items.length === 0) {
    return (
      <div className="container-x py-10">
        <Breadcrumbs items={[{ label: "تکمیل خرید" }]} className="mb-6" />
        <EmptyState
          icon={ShoppingCart}
          title="سبد خرید شما خالی است"
          description="برای تکمیل خرید ابتدا کالاهایی را به سبد خرید اضافه کنید."
          action={
            <Button asChild size="lg">
              <Link href="/products">رفتن به فروشگاه</Link>
            </Button>
          }
        />
      </div>
    );
  }

  // --- Totals (Toman) ---
  const couponDiscount = appliedCoupon
    ? Math.round((totals.total * appliedCoupon.percent) / 100)
    : 0;
  const afterDiscounts = totals.total - couponDiscount;
  const shipping =
    afterDiscounts >= usdToToman(siteConfig.freeShippingThresholdUsd)
      ? 0
      : usdToToman(siteConfig.shippingFeeUsd);
  const payable = afterDiscounts + shipping;

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    const found = coupons.find((c) => c.code === code);
    if (!found || !found.active) {
      toast.error("کد تخفیف معتبر نیست", {
        description: "کد وارد شده نامعتبر یا منقضی است.",
      });
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon({ code: found.code, percent: found.percent });
    toast.success("کد تخفیف اعمال شد", {
      description: `${formatNumber(found.percent)}٪ تخفیف روی سفارش شما اعمال شد.`,
    });
  };

  const simulatePayment = async (outcome: "success" | "fail") => {
    if (!buyer) return;
    setPayError(false);
    setPaying(outcome);
    await sleep(1400);

    if (outcome === "fail") {
      setPaying(null);
      setPayError(true);
      toast.error("پرداخت ناموفق بود", {
        description: "تراکنش انجام نشد؛ مبلغی از حساب شما کسر نشده است.",
      });
      return;
    }

    const order: DemoOrder = {
      id: `order-${Date.now().toString(36)}`,
      ref: generateOrderRef(),
      createdAt: new Date().toISOString(),
      customerName: buyer.fullName,
      customerPhone: buyer.phone,
      address: `${buyer.province}، ${buyer.city}، ${buyer.address}`,
      items: items.map((i) => ({
        productId: i.productId,
        title: i.title,
        thumbnail: i.thumbnail,
        quantity: i.quantity,
        unitToman: lineFinalToman(i),
      })),
      subtotalToman: totals.subtotal,
      discountToman: totals.discount + couponDiscount,
      shippingToman: shipping,
      totalToman: payable,
      status: "processing",
    };
    registerOrder(order);
    clearCart();
    router.push(`/checkout/success?ref=${order.ref}`);
  };

  return (
    <div className="container-x py-4 md:py-6">
      <Breadcrumbs
        items={[{ label: "سبد خرید", href: "/cart" }, { label: "تکمیل خرید" }]}
        className="mb-4"
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-extrabold text-ink md:text-2xl">تکمیل خرید</h1>
        {/* Stepper */}
        <ol className="flex items-center gap-2 text-xs font-medium">
          {STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors",
                  i === step
                    ? "bg-primary text-white"
                    : i < step
                      ? "bg-green-100 text-success"
                      : "bg-slate-100 text-slate-400",
                )}
              >
                <span className="tnum grid size-4.5 place-items-center rounded-full bg-white/20 text-[10px] font-bold">
                  {i < step ? <CheckCircle2 className="size-3.5" /> : formatNumber(i + 1)}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </span>
              {i < STEPS.length - 1 && <span className="h-px w-4 bg-slate-300 sm:w-8" />}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          {/* Step 1 — shipping info form */}
          {step === 0 && (
            <form
              onSubmit={form.handleSubmit((values) => {
                setBuyer(values);
                setStep(1);
              })}
              className="card space-y-5 p-5 md:p-6"
              noValidate
            >
              <h2 className="flex items-center gap-2 text-base font-bold text-ink">
                <MapPin className="size-5 text-primary" />
                اطلاعات تماس و آدرس تحویل
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="نام و نام خانوادگی گیرنده" required error={form.formState.errors.fullName?.message}>
                  <Input {...form.register("fullName")} placeholder="مثال: سارا محمدی" />
                </Field>
                <Field label="شماره موبایل" required error={form.formState.errors.phone?.message}>
                  <Input {...form.register("phone")} dir="ltr" inputMode="numeric" placeholder="09123456789" />
                </Field>
                <Field label="ایمیل (اختیاری)" error={form.formState.errors.email?.message}>
                  <Input {...form.register("email")} dir="ltr" type="email" placeholder="you@example.com" />
                </Field>
                <Field label="کد پستی (اختیاری)" error={form.formState.errors.postalCode?.message}>
                  <Input {...form.register("postalCode")} dir="ltr" inputMode="numeric" placeholder="1234567890" />
                </Field>
                <Field label="استان" required error={form.formState.errors.province?.message}>
                  <Input {...form.register("province")} placeholder="مثال: تهران" />
                </Field>
                <Field label="شهر" required error={form.formState.errors.city?.message}>
                  <Input {...form.register("city")} placeholder="مثال: تهران" />
                </Field>
              </div>
              <Field label="آدرس کامل" required error={form.formState.errors.address?.message}>
                <Input {...form.register("address")} placeholder="خیابان، کوچه، پلاک، واحد" />
              </Field>
              <div className="flex justify-end border-t border-line pt-4">
                <Button type="submit" size="lg" className="font-bold">
                  ادامه
                  <ArrowRight className="size-4.5 rtl:-scale-x-100" />
                </Button>
              </div>
            </form>
          )}

          {/* Step 2 — review */}
          {step === 1 && buyer && (
            <div className="space-y-4">
              <div className="card p-5 md:p-6">
                <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-ink">
                  <Package className="size-5 text-primary" />
                  کالاهای سفارش
                </h2>
                <ul className="divide-y divide-line">
                  {items.map((line) => (
                    <li key={line.productId} className="flex items-center gap-3 py-3">
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-line bg-white">
                        <ProductImage src={line.thumbnail} alt={line.title} fill sizes="56px" className="object-contain p-1" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-[13px] font-medium text-ink">{line.title}</p>
                        <p className="tnum mt-0.5 text-xs text-slate-400">
                          {formatNumber(line.quantity)} عدد × {formatToman(lineFinalToman(line))} تومان
                        </p>
                      </div>
                      <p className="tnum shrink-0 text-sm font-bold text-ink">
                        {formatToman(lineFinalToman(line) * line.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-2 rounded-xl bg-slate-50 p-3 text-[13px] leading-6 text-slate-600">
                  <span className="font-bold text-ink">آدرس تحویل: </span>
                  {buyer.province}، {buyer.city}، {buyer.address} — گیرنده: {buyer.fullName} (
                  <span dir="ltr">{buyer.phone}</span>)
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="ms-2 cursor-pointer font-semibold text-primary hover:underline"
                  >
                    ویرایش
                  </button>
                </div>
              </div>

              {/* Demo coupon */}
              <div className="card p-5 md:p-6">
                <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-ink">
                  <BadgePercent className="size-5 text-accent" />
                  کد تخفیف
                </h2>
                <div className="flex gap-2">
                  <Input
                    dir="ltr"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="WELCOME10"
                    aria-label="کد تخفیف"
                    className="max-w-44"
                  />
                  <Button type="button" variant="secondary" onClick={applyCoupon}>
                    اعمال کد
                  </Button>
                  {appliedCoupon && (
                    <span className="tnum flex items-center rounded-lg bg-green-50 px-3 text-xs font-bold text-success">
                      {formatNumber(appliedCoupon.percent)}٪ اعمال شد ({appliedCoupon.code})
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  کدهای فعال: <span dir="ltr">WELCOME10</span> و <span dir="ltr">OVOMARKET25</span>
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(0)}>
                  مرحله قبل
                </Button>
                <Button size="lg" onClick={() => setStep(2)} className="font-bold">
                  انتخاب روش پرداخت
                  <ArrowRight className="size-4.5 rtl:-scale-x-100" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 — simulated payment */}
          {step === 2 && buyer && (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink via-slate-900 to-primary-950 p-6 text-white md:p-8">
                <div className="pointer-events-none absolute -end-10 -top-10 size-48 rounded-full bg-primary/20 blur-2xl" aria-hidden="true" />
                <h2 className="flex items-center gap-2 text-base font-bold">
                  <CreditCard className="size-5" />
                  درگاه پرداخت
                </h2>
                <p className="mt-2 max-w-lg text-[13px] leading-6 text-white/70">
                  مبلغ سفارش را بررسی کنید و پرداخت را تکمیل نمایید.
                </p>
                <dl className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between text-white/75">
                    <dt>مبلغ سفارش</dt>
                    <dd className="tnum">{formatTomanWithUnit(afterDiscounts)}</dd>
                  </div>
                  <div className="flex justify-between text-white/75">
                    <dt>هزینه ارسال</dt>
                    <dd className="tnum">{shipping === 0 ? "رایگان" : formatTomanWithUnit(shipping)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-white/15 pt-3 text-base font-extrabold">
                    <dt>مبلغ قابل پرداخت</dt>
                    <dd className="tnum text-amber-300">{formatTomanWithUnit(payable)}</dd>
                  </div>
                </dl>

                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  <Button
                    onClick={() => simulatePayment("success")}
                    disabled={paying !== null}
                    size="lg"
                    className="h-12 bg-success font-bold hover:bg-green-700"
                  >
                    {paying === "success" ? <Loader2 className="size-5 animate-spin" /> : <CheckCircle2 className="size-5" />}
                    پرداخت و ثبت سفارش
                  </Button>
                  <Button
                    onClick={() => simulatePayment("fail")}
                    disabled={paying !== null}
                    size="lg"
                    variant="danger"
                    className="h-12 font-bold"
                  >
                    {paying === "fail" ? <Loader2 className="size-5 animate-spin" /> : <CircleAlert className="size-5" />}
                    انصراف از پرداخت
                  </Button>
                </div>

                {payError && (
                  <p role="alert" className="mt-4 rounded-xl bg-red-500/15 p-3 text-[13px] font-medium text-red-200 ring-1 ring-red-400/30">
                    پرداخت ناموفق بود. سفارشی ثبت نشد؛ می‌توانید دوباره تلاش کنید یا به مرحله قبل بازگردید.
                  </p>
                )}
              </div>

              <Button variant="outline" onClick={() => setStep(1)}>
                مرحله قبل
              </Button>
            </div>
          )}
        </div>

        {/* Persistent summary */}
        <aside className="card sticky top-40 space-y-3 p-5" aria-label="خلاصه پرداخت">
          <h2 className="text-base font-bold text-ink">خلاصه پرداخت</h2>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">قیمت کالاها</dt>
              <dd className="tnum font-medium">{formatTomanWithUnit(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">تخفیف کالاها</dt>
              <dd className="tnum font-medium text-accent-600">{formatTomanWithUnit(totals.discount)}</dd>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between">
                <dt className="text-slate-500">کد تخفیف</dt>
                <dd className="tnum font-medium text-success">{formatTomanWithUnit(couponDiscount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-slate-500">هزینه ارسال</dt>
              <dd className={cn("tnum font-medium", shipping === 0 && "font-bold text-success")}>
                {shipping === 0 ? "رایگان" : formatTomanWithUnit(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3">
              <dt className="font-bold text-ink">مبلغ قابل پرداخت</dt>
              <dd className="tnum text-base font-extrabold text-primary-700">
                {formatTomanWithUnit(payable)}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
