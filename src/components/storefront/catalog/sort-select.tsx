"use client";

import { ArrowDownWideNarrow } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { NativeSelect } from "@/components/ui/forms";
import { SORT_OPTIONS, type SortOption } from "@/features/products/types/product";

/** Sorting dropdown — keeps every other search param, resets the page. */
export function SortSelect({ sort }: { sort: SortOption }) {
  const router = useRouter();
  const params = useSearchParams();

  const onChange = (value: SortOption) => {
    const next = new URLSearchParams(params.toString());
    if (value === "popular") next.delete("sort");
    else next.set("sort", value);
    next.delete("page");
    const qs = next.toString();
    router.push(qs ? `?${qs}` : "?", { scroll: false });
  };

  return (
    <label className="flex items-center gap-2">
      <ArrowDownWideNarrow className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
      <span className="hidden text-[13px] font-medium text-slate-500 sm:inline">مرتب‌سازی:</span>
      <NativeSelect
        value={sort}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="h-9 w-36 text-xs sm:w-40"
        aria-label="مرتب‌سازی نتایج"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </NativeSelect>
    </label>
  );
}
