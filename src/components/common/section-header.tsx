import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Consistent homepage / listing section heading with optional «view all». */
export function SectionHeader({
  title,
  subtitle,
  href,
  hrefLabel = "مشاهده همه",
  icon,
  className,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-5 flex items-end justify-between gap-4", className)}>
      <div className="flex items-center gap-2.5">
        {icon}
        <div>
          <h2 className="text-lg font-bold text-ink md:text-xl">{title}</h2>
          {subtitle && <p className="mt-0.5 text-[13px] text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {href && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1 text-[13px] font-semibold text-primary transition-colors hover:text-primary-700"
        >
          {hrefLabel}
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
