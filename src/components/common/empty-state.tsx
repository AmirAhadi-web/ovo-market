import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Friendly empty-state block used across cart / wishlist / search / lists. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line bg-white px-6 py-14 text-center",
        className,
      )}
    >
      <div className="grid size-16 place-items-center rounded-2xl bg-slate-100 text-slate-400">
        <Icon className="size-8" strokeWidth={1.75} />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-base font-bold text-ink">{title}</h2>
        {description && <p className="mx-auto max-w-md text-sm leading-6 text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/** Error-state block with retry action */
export function ErrorState({
  title = "خطایی رخ داده است",
  description = "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.",
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-100 bg-red-50/60 px-6 py-12 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-red-100 text-danger">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-7">
          <path d="M12 9v4" strokeLinecap="round" />
          <path d="M12 17h.01" strokeLinecap="round" />
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="space-y-1">
        <h2 className="text-base font-bold text-ink">{title}</h2>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      {action}
    </div>
  );
}
