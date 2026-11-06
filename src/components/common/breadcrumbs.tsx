import { ChevronLeft, Home } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

/** RTL-aware breadcrumb navigation (chevron points toward the previous items). */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="مسیر صفحه" className={cn("flex items-center overflow-x-auto scrollbar-none", className)}>
      <ol className="flex items-center gap-1.5 whitespace-nowrap text-[13px]">
        <li>
          <Link
            href="/"
            aria-label="صفحه اصلی"
            className="flex items-center gap-1 text-slate-400 transition-colors hover:text-primary"
          >
            <Home className="size-3.5" />
          </Link>
        </li>
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              <ChevronLeft className="size-3.5 text-slate-300" aria-hidden="true" />
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="text-slate-500 transition-colors hover:text-primary"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "font-semibold text-ink" : "text-slate-500"}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
