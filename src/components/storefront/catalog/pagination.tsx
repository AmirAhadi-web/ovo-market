import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";

interface PaginationProps {
  page: number;
  pageCount: number;
  /** Raw current search params to preserve */
  params: Record<string, string | string[] | undefined>;
  basePath: string;
}

function buildHref(
  basePath: string,
  params: Record<string, string | string[] | undefined>,
  page: number,
) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    const val = Array.isArray(v) ? v[0] : v;
    if (val && k !== "page") sp.set(k, val);
  }
  if (page > 1) sp.set("page", String(page));
  const qs = sp.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

/** Compact numbered pagination with prev/next (server-rendered links). */
export function Pagination({ page, pageCount, params, basePath }: PaginationProps) {
  if (pageCount <= 1) return null;

  // window of pages around the current one
  const pages: number[] = [];
  const push = (n: number) => {
    if (n >= 1 && n <= pageCount && !pages.includes(n)) pages.push(n);
  };
  push(1);
  for (let i = page - 1; i <= page + 1; i++) push(i);
  push(pageCount);
  pages.sort((a, b) => a - b);

  const itemCls = (active: boolean) =>
    cn(
      "grid size-9 place-items-center rounded-lg border text-sm font-medium transition-colors",
      active
        ? "border-primary bg-primary text-white shadow-sm"
        : "border-line bg-white text-slate-600 hover:border-primary/40 hover:text-primary",
    );

  return (
    <nav aria-label="صفحه‌بندی" className="mt-8 flex items-center justify-center gap-1.5">
      {page > 1 && (
        <Link href={buildHref(basePath, params, page - 1)} aria-label="صفحه قبلی" className={itemCls(false)}>
          <ChevronRight className="size-4" />
        </Link>
      )}

      {pages.map((n, i) => {
        const prev = pages[i - 1];
        const showEllipsis = prev && n - prev > 1;
        return (
          <span key={n} className="flex items-center gap-1.5">
            {showEllipsis && <span className="px-1 text-slate-400">…</span>}
            <Link
              href={buildHref(basePath, params, n)}
              aria-label={`صفحه ${toFaDigits(n)}`}
              aria-current={n === page ? "page" : undefined}
              className={itemCls(n === page)}
            >
              {toFaDigits(n)}
            </Link>
          </span>
        );
      })}

      {page < pageCount && (
        <Link href={buildHref(basePath, params, page + 1)} aria-label="صفحه بعدی" className={itemCls(false)}>
          <ChevronLeft className="size-4" />
        </Link>
      )}
    </nav>
  );
}
