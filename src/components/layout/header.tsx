"use client";

import { Heart, Menu, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";

import { MainNav } from "@/components/layout/main-nav";
import { Logo } from "@/components/layout/logo";
import { SearchBox } from "@/components/layout/search-box";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCategoryMeta } from "@/config/categories";
import { visibleGroups } from "@/config/category-groups";
import { useMounted } from "@/hooks/use-mounted";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";

function CountBadge({ count }: { count: number }) {
  const mounted = useMounted();
  if (!mounted || count <= 0) return null;
  return (
    <Badge
      variant="accent"
      size="sm"
      className="tnum absolute -end-1.5 -top-1.5 min-w-4.5 rounded-full px-1"
    >
      {count > 99 ? "۹۹+" : count.toLocaleString("fa-IR")}
    </Badge>
  );
}

const iconBtn =
  "relative grid size-10 place-items-center rounded-[var(--radius-ctl)] text-slate-600 transition-colors hover:bg-slate-100 hover:text-primary";

export function Header({ categories }: { categories: string[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 shadow-[0_1px_2px_rgb(15_23_42/0.04)] backdrop-blur-md">
      <div className="container-x flex h-16 items-center gap-3 md:h-[72px] md:gap-6">
        <button
          type="button"
          aria-label="باز کردن منوی دسته‌بندی‌ها"
          onClick={() => setMenuOpen(true)}
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-[var(--radius-ctl)] text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
        >
          <Menu className="size-5" />
        </button>

        <Logo />

        <Suspense fallback={<div className="hidden h-11 flex-1 rounded-lg bg-slate-100 md:block" />}>
          <SearchBox className="hidden flex-1 md:block" />
        </Suspense>

        <div className="ms-auto flex items-center gap-1">
          <Link href="/account" className={iconBtn} aria-label="حساب کاربری">
            <UserRound className="size-5" />
          </Link>
          <Link href="/wishlist" className={iconBtn} aria-label="لیست علاقه‌مندی‌ها">
            <Heart className="size-5" />
            <CountBadge count={wishlistCount} />
          </Link>
          <Link href="/cart" className={iconBtn} aria-label="سبد خرید">
            <ShoppingCart className="size-5" />
            <CountBadge count={cartCount} />
          </Link>
        </div>
      </div>

      {/* Mobile search row */}
      <div className="container-x pb-3 md:hidden">
        <Suspense fallback={<div className="h-11 rounded-lg bg-slate-100" />}>
          <SearchBox />
        </Suspense>
      </div>

      <MainNav categories={categories} className="hidden lg:block" />

      {/* Mobile menu bottom sheet */}
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent side="bottom" className="max-h-[80dvh]">
          <DialogHeader>
            <DialogTitle>دسته‌بندی کالاها</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            {visibleGroups(categories).map((group) => {
              const GroupIcon = group.icon;
              return (
                <div key={group.id}>
                  {/* دسته مادر */}
                  <p className="mb-2 flex items-center gap-2 border-b border-line pb-2 text-sm font-extrabold text-ink">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary">
                      <GroupIcon className="size-4" strokeWidth={2} />
                    </span>
                    {group.label}
                  </p>
                  {/* زیرمجموعه‌ها */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {group.slugs.map((slug) => {
                      const meta = getCategoryMeta(slug);
                      const Icon = meta.icon;
                      return (
                        <Link
                          key={slug}
                          href={`/categories/${slug}`}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-2 text-[12.5px] font-medium text-slate-600 transition-colors hover:border-primary/30 hover:bg-primary-50/50 hover:text-primary-700"
                        >
                          <span className={`grid size-7 shrink-0 place-items-center rounded-md ${meta.tone}`}>
                            <Icon className="size-3.5" />
                          </span>
                          <span className="leading-4.5">{meta.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl bg-primary-50 px-4 py-2.5 text-center text-sm font-bold text-primary-700 transition-colors hover:bg-primary-100"
            >
              مشاهده همه کالاها
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
