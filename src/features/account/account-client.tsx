"use client";

import {
  Heart,
  LogOut,
  MapPin,
  Package,
  Plus,
  ReceiptText,
  Trash2,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, Input } from "@/components/ui/forms";
import { Skeleton } from "@/components/ui/skeleton";
import { useMounted } from "@/hooks/use-mounted";
import { formatFaDate, formatNumber, formatTomanWithUnit } from "@/lib/format";
import { ORDER_STATUS_LABELS, useOrdersStore } from "@/stores/orders-store";
import { usePreferencesStore, type DemoAddress } from "@/stores/preferences-store";
import { useWishlistStore } from "@/stores/wishlist-store";

const emptyAddress = {
  title: "",
  province: "",
  city: "",
  address: "",
  postalCode: "",
  receiver: "",
  phone: "",
};

export function AccountClient() {
  const mounted = useMounted();
  const profile = usePreferencesStore((s) => s.profile);
  const setProfile = usePreferencesStore((s) => s.setProfile);
  const addresses = usePreferencesStore((s) => s.addresses);
  const addAddress = usePreferencesStore((s) => s.addAddress);
  const removeAddress = usePreferencesStore((s) => s.removeAddress);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const orders = useOrdersStore((s) => s.orders);

  const [loginForm, setLoginForm] = useState({ fullName: "", phone: "", email: "" });
  const [addrOpen, setAddrOpen] = useState(false);
  const [addrForm, setAddrForm] = useState(emptyAddress);

  if (!mounted) {
    return (
      <div className="container-x py-6">
        <Skeleton className="h-44 w-full rounded-2xl" />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // ---- Demo authentication (no real auth) ----
  if (!profile) {
    const validName = loginForm.fullName.trim().length >= 3;
    const validPhone = /^09\d{9}$/.test(loginForm.phone.trim());

    return (
      <div className="container-x max-w-lg py-12">
        <div className="card space-y-5 p-6 md:p-8">
          <div className="text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary">
              <UserRound className="size-7" />
            </span>
            <h1 className="mt-4 text-xl font-extrabold text-ink">ورود به حساب کاربری</h1>
            <p className="mt-1.5 text-[13px] leading-6 text-slate-500">
              برای مدیریت سفارش‌ها و آدرس‌ها وارد شوید.
            </p>
          </div>

          <div className="space-y-4">
            <Field label="نام و نام خانوادگی" required>
              <Input
                value={loginForm.fullName}
                onChange={(e) => setLoginForm({ ...loginForm, fullName: e.target.value })}
                placeholder="مثال: سارا محمدی"
              />
            </Field>
            <Field label="شماره موبایل" required hint="مثال: 09123456789">
              <Input
                value={loginForm.phone}
                onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value.replace(/[^0-9]/g, "") })}
                dir="ltr"
                inputMode="numeric"
                placeholder="09123456789"
              />
            </Field>
            <Field label="ایمیل (اختیاری)">
              <Input
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                dir="ltr"
                type="email"
                placeholder="you@example.com"
              />
            </Field>
          </div>

          <Button
            size="lg"
            fullWidth
            disabled={!validName || !validPhone}
            onClick={() => {
              setProfile({
                fullName: loginForm.fullName.trim(),
                phone: loginForm.phone.trim(),
                email: loginForm.email.trim(),
              });
              toast.success("خوش آمدید!", {
                description: "ورود شما با موفقیت انجام شد.",
              });
            }}
          >
            ورود به حساب
          </Button>
        </div>
      </div>
    );
  }

  const statusTone = {
    processing: "accent-soft",
    shipped: "secondary",
    delivered: "success-soft",
    cancelled: "danger-soft",
  } as const;

  return (
    <div className="container-x py-4 md:py-6">
      <Breadcrumbs items={[{ label: "حساب کاربری" }]} className="mb-4" />

      {/* Profile header */}
      <section className="card flex flex-wrap items-center gap-4 p-5 md:p-6">
        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-800 text-2xl font-extrabold text-white">
          {profile.fullName.trim().charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-extrabold text-ink md:text-xl">{profile.fullName}</h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-500">
            <span dir="ltr">{profile.phone}</span>
            {profile.email && <span dir="ltr">{profile.email}</span>}
          </p>
        </div>
        <Button
          variant="danger-outline"
          onClick={() => {
            setProfile(null);
            toast.info("از حساب خود خارج شدید");
          }}
        >
          <LogOut className="size-4" />
          خروج
        </Button>
      </section>

      {/* Quick stats */}
      <section className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link
          href="#orders"
          className="card flex items-center gap-3 p-4 transition-shadow hover:shadow-[var(--shadow-card-hover)]"
        >
          <span className="grid size-11 place-items-center rounded-xl bg-primary-50 text-primary">
            <ReceiptText className="size-5.5" strokeWidth={1.8} />
          </span>
          <span>
            <span className="tnum block text-lg font-extrabold text-ink">{formatNumber(orders.length)}</span>
            <span className="text-xs text-slate-500">سفارش</span>
          </span>
        </Link>
        <Link
          href="/wishlist"
          className="card flex items-center gap-3 p-4 transition-shadow hover:shadow-[var(--shadow-card-hover)]"
        >
          <span className="grid size-11 place-items-center rounded-xl bg-rose-50 text-danger">
            <Heart className="size-5.5" strokeWidth={1.8} />
          </span>
          <span>
            <span className="tnum block text-lg font-extrabold text-ink">{formatNumber(wishlistCount)}</span>
            <span className="text-xs text-slate-500">علاقه‌مندی‌ها</span>
          </span>
        </Link>
        <div className="card flex items-center gap-3 p-4">
          <span className="grid size-11 place-items-center rounded-xl bg-green-50 text-success">
            <MapPin className="size-5.5" strokeWidth={1.8} />
          </span>
          <span>
            <span className="tnum block text-lg font-extrabold text-ink">{formatNumber(addresses.length)}</span>
            <span className="text-xs text-slate-500">آدرس ثبت‌شده</span>
          </span>
        </div>
      </section>

      {/* Orders */}
      <section id="orders" className="card mt-6 scroll-mt-32 p-5 md:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-ink">
          <Package className="size-5 text-primary" />
          آخرین سفارش‌ها
        </h2>
        {orders.length === 0 ? (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            هنوز سفارشی ثبت نشده است. پس از تکمیل خرید، سفارش‌ها اینجا نمایش داده می‌شوند.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {orders.slice(0, 6).map((o) => (
              <li key={o.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3.5">
                <span className="font-bold text-primary-700" dir="ltr">
                  {o.ref}
                </span>
                <span className="text-xs text-slate-400">{formatFaDate(o.createdAt)}</span>
                <Badge variant={statusTone[o.status]} size="sm">
                  {ORDER_STATUS_LABELS[o.status]}
                </Badge>
                <span className="tnum ms-auto text-sm font-bold text-ink">
                  {formatTomanWithUnit(o.totalToman)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Addresses */}
      <section className="card mt-6 p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-bold text-ink">
            <MapPin className="size-5 text-primary" />
            آدرس‌های من
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setAddrForm({ ...emptyAddress, receiver: profile.fullName, phone: profile.phone });
              setAddrOpen(true);
            }}
          >
            <Plus className="size-4" />
            افزودن آدرس
          </Button>
        </div>

        {addresses.length === 0 ? (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">آدرسی ثبت نشده است.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {addresses.map((a) => (
              <div key={a.id} className="rounded-xl border border-line p-4">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-bold text-ink">{a.title || "آدرس"}</span>
                  <button
                    type="button"
                    onClick={() => {
                      removeAddress(a.id);
                      toast.success("آدرس حذف شد");
                    }}
                    aria-label="حذف آدرس"
                    className="grid size-7 cursor-pointer place-items-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-danger"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
                <p className="text-[13px] leading-6 text-slate-600">
                  {a.province}، {a.city}، {a.address}
                </p>
                <p className="mt-1.5 text-xs text-slate-400">
                  گیرنده: {a.receiver} — <span dir="ltr">{a.phone}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add address dialog */}
      <Dialog open={addrOpen} onOpenChange={setAddrOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>افزودن آدرس جدید</DialogTitle>
            <DialogDescription>اطلاعات آدرس جدید خود را وارد کنید.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["title", "عنوان (منزل، محل کار…)"],
                ["receiver", "نام گیرنده"],
                ["phone", "موبایل گیرنده"],
                ["province", "استان"],
                ["city", "شهر"],
                ["postalCode", "کد پستی"],
              ] as [keyof DemoAddress, string][]
            )
              .filter(([k]) => k !== "id")
              .map(([key, ph]) => (
                <Input
                  key={key}
                  value={addrForm[key as keyof typeof addrForm]}
                  onChange={(e) => setAddrForm({ ...addrForm, [key]: e.target.value })}
                  placeholder={ph}
                  aria-label={ph}
                  dir={key === "phone" || key === "postalCode" ? "ltr" : undefined}
                />
              ))}
            <Input
              value={addrForm.address}
              onChange={(e) => setAddrForm({ ...addrForm, address: e.target.value })}
              placeholder="آدرس کامل"
              aria-label="آدرس کامل"
              className="sm:col-span-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddrOpen(false)}>
              انصراف
            </Button>
            <Button
              disabled={
                addrForm.receiver.trim().length < 3 ||
                !/^09\d{9}$/.test(addrForm.phone) ||
                addrForm.province.trim().length < 2 ||
                addrForm.city.trim().length < 2 ||
                addrForm.address.trim().length < 10
              }
              onClick={() => {
                addAddress({ ...addrForm, title: addrForm.title || "آدرس جدید" });
                setAddrOpen(false);
                toast.success("آدرس جدید ذخیره شد");
              }}
            >
              ذخیره آدرس
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
