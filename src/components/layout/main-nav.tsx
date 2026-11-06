"use client";

import { ChevronDown, Flame, LayoutGrid, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getCategoryMeta } from "@/config/categories";
import { visibleGroups } from "@/config/category-groups";
import { cn } from "@/lib/utils";

/** Desktop horizontal navigation with a categories dropdown */
export function MainNav({ categories, className }: { categories: string[]; className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const linkCls = (active: boolean) =>
    cn(
      "flex items-center gap-1.5 rounded-[var(--radius-ctl)] px-3 py-2 text-[13.5px] font-medium transition-colors",
      active ? "text-primary" : "text-slate-600 hover:bg-slate-100 hover:text-ink",
    );

  return (
    <nav className={cn("border-t border-line/70", className)} aria-label="ناوبری اصلی">
      <div className="container-x flex h-12 items-center gap-1">
        <div ref={wrapRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="true"
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-[var(--radius-ctl)] px-3 py-2 text-[13.5px] font-bold transition-colors",
              open ? "bg-primary-50 text-primary-700" : "text-ink hover:bg-slate-100",
            )}
          >
            <LayoutGrid className="size-4.5" />
            دسته‌بندی کالاها
            <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
          </button>

          {open && (
            <div className="absolute start-0 top-full z-50 mt-2 w-[720px] max-w-[calc(100vw-2rem)] animate-[fade-in_0.15s_ease_both] rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-pop)]">
              <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                {visibleGroups(categories).map((group) => {
                  const GroupIcon = group.icon;
                  return (
                    <div key={group.id}>
                      {/* دسته مادر */}
                      <p className="mb-2 flex items-center gap-2 border-b border-line pb-2 text-[13px] font-extrabold text-ink">
                        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary">
                          <GroupIcon className="size-3.5" strokeWidth={2} />
                        </span>
                        {group.label}
                      </p>
                      {/* زیرمجموعه‌ها */}
                      <ul className="space-y-0.5">
                        {group.slugs.map((slug) => {
                          const meta = getCategoryMeta(slug);
                          return (
                            <li key={slug}>
                              <Link
                                href={`/categories/${slug}`}
                                className="block rounded-lg px-2 py-1.5 text-[12.5px] font-medium text-slate-500 transition-colors hover:bg-primary-50 hover:text-primary-700"
                              >
                                {meta.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 border-t border-line pt-3">
                <Link
                  href="/products"
                  className="block rounded-xl bg-primary-50 px-4 py-2.5 text-center text-sm font-bold text-primary-700 transition-colors hover:bg-primary-100"
                >
                  مشاهده همه کالاها
                </Link>
              </div>
            </div>
          )}
        </div>

        <span className="mx-1 h-5 w-px bg-line" aria-hidden="true" />

        <Link href="/products?onSale=1" className={linkCls(false)}>
          <Flame className="size-4 text-accent" />
          پیشنهاد شگفت‌انگیز
        </Link>
        <Link href="/products?sort=popular" className={linkCls(pathname === "/products")}>
          <TrendingUp className="size-4 text-success" />
          پرفروش‌ترین‌ها
        </Link>
        <Link href="/products?sort=newest" className={linkCls(false)}>
          <Sparkles className="size-4 text-primary" />
          جدیدترین‌ها
        </Link>
        <Link href="/products" className={linkCls(pathname === "/products")}>
          همه کالاها
        </Link>
      </div>
    </nav>
  );
}
