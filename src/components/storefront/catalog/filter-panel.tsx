"use client";

import { Eraser, ListFilter } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox, Input, NativeSelect } from "@/components/ui/forms";
import { getCategoryMeta } from "@/config/categories";
import type { CatalogQuery } from "@/features/products/types/product";
import type { BrandCount, PriceBounds } from "@/features/products/utils/product-utils";
import { tomanToUsd, usdToToman } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface FilterFacets {
  brands: BrandCount[];
  categories: string[] | null;
  boundsUsd: PriceBounds;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-b border-line pb-5 last:border-0 last:pb-0">
      <legend className="mb-3 text-[13px] font-bold text-ink">{title}</legend>
      {children}
    </fieldset>
  );
}

/**
 * Full catalog filter panel. State is applied to URL search params,
 * keeping filters shareable and synced with the address bar.
 */
export function FilterPanel({
  query,
  facets,
  basePath,
  onApplied,
}: {
  query: CatalogQuery;
  facets: FilterFacets;
  basePath: string;
  onApplied?: () => void;
}) {
  const router = useRouter();

  const [category, setCategory] = useState<string | undefined>(query.category);
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(
    () => new Set(query.brands ?? []),
  );
  const [minToman, setMinToman] = useState(
    typeof query.minPrice === "number" ? String(usdToToman(query.minPrice)) : "",
  );
  const [maxToman, setMaxToman] = useState(
    typeof query.maxPrice === "number" ? String(usdToToman(query.maxPrice)) : "",
  );
  const [minRating, setMinRating] = useState(query.minRating ?? 0);
  const [inStock, setInStock] = useState(Boolean(query.inStock));
  const [onSale, setOnSale] = useState(Boolean(query.onSale));

  const activeCount = useMemo(() => {
    let n = 0;
    if (category) n++;
    n += selectedBrands.size;
    if (minToman || maxToman) n++;
    if (minRating) n++;
    if (inStock) n++;
    if (onSale) n++;
    return n;
  }, [category, selectedBrands, minToman, maxToman, minRating, inStock, onSale]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      if (next.has(brand)) next.delete(brand);
      else next.add(brand);
      return next;
    });
  };

  const buildUrl = (withFilters: boolean) => {
    const params = new URLSearchParams();
    if (query.q) params.set("q", query.q);
    if (query.sort && query.sort !== "popular") params.set("sort", query.sort);
    if (withFilters) {
      if (category && facets.categories) params.set("category", category);
      if (selectedBrands.size) params.set("brands", [...selectedBrands].join(","));
      const minUsd = minToman ? Math.round(tomanToUsd(Number(minToman) || 0) * 100) / 100 : undefined;
      const maxUsd = maxToman ? Math.round(tomanToUsd(Number(maxToman) || 0) * 100) / 100 : undefined;
      if (minUsd && minUsd > 0) params.set("minPrice", String(minUsd));
      if (maxUsd && maxUsd > 0) params.set("maxPrice", String(maxUsd));
      if (minRating) params.set("minRating", String(minRating));
      if (inStock) params.set("inStock", "1");
      if (onSale) params.set("onSale", "1");
    }
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const apply = () => {
    router.push(buildUrl(true));
    onApplied?.();
  };

  const reset = () => {
    setCategory(undefined);
    setSelectedBrands(new Set());
    setMinToman("");
    setMaxToman("");
    setMinRating(0);
    setInStock(false);
    setOnSale(false);
    router.push(buildUrl(false));
    onApplied?.();
  };

  return (
    <div className="space-y-5">
      {facets.categories && facets.categories.length > 0 && (
        <Section title="دسته‌بندی">
          <ul className="max-h-56 space-y-1 overflow-y-auto ps-0.5 pe-1">
            {facets.categories.map((slug) => {
              const meta = getCategoryMeta(slug);
              const active = category === slug;
              return (
                <li key={slug}>
                  <button
                    type="button"
                    onClick={() => setCategory(active ? undefined : slug)}
                    aria-pressed={active}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-start text-[13px] transition-colors",
                      active
                        ? "bg-primary-50 font-bold text-primary-700"
                        : "text-slate-600 hover:bg-slate-50",
                    )}
                  >
                    {meta.label}
                    {active && <span className="size-1.5 rounded-full bg-primary" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      <Section title="محدوده قیمت (تومان)">
        <div className="flex items-center gap-2">
          <Input
            inputMode="numeric"
            dir="ltr"
            placeholder={`از ${usdToToman(facets.boundsUsd.min).toLocaleString("en-US")}`}
            value={minToman}
            onChange={(e) => setMinToman(e.target.value.replace(/[^0-9]/g, ""))}
            aria-label="حداقل قیمت، تومان"
            className="h-9 text-xs"
          />
          <span className="text-slate-300">—</span>
          <Input
            inputMode="numeric"
            dir="ltr"
            placeholder={`تا ${usdToToman(facets.boundsUsd.max).toLocaleString("en-US")}`}
            value={maxToman}
            onChange={(e) => setMaxToman(e.target.value.replace(/[^0-9]/g, ""))}
            aria-label="حداکثر قیمت، تومان"
            className="h-9 text-xs"
          />
        </div>
      </Section>

      <Section title="حداقل امتیاز">
        <NativeSelect
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full"
          aria-label="حداقل امتیاز"
        >
          <option value={0}>همه امتیازها</option>
          <option value={3}>۳ به بالا</option>
          <option value={4}>۴ به بالا</option>
          <option value={4.5}>۴٫۵ به بالا</option>
        </NativeSelect>
      </Section>

      {facets.brands.length > 0 && (
        <Section title="برند">
          <ul className="max-h-48 space-y-1 overflow-y-auto ps-0.5 pe-1">
            {facets.brands.map(({ brand, count }) => (
              <li key={brand}>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] text-slate-600 transition-colors hover:bg-slate-50">
                  <Checkbox
                    checked={selectedBrands.has(brand)}
                    onChange={() => toggleBrand(brand)}
                    aria-label={brand}
                  />
                  <span className="flex-1 truncate" dir="auto">
                    {brand}
                  </span>
                  <span className="tnum text-xs text-slate-400">
                    {count.toLocaleString("fa-IR")}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="گزینه‌های بیشتر">
        <div className="space-y-1">
          <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] text-slate-600 transition-colors hover:bg-slate-50">
            <Checkbox checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
            فقط کالاهای موجود
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] text-slate-600 transition-colors hover:bg-slate-50">
            <Checkbox checked={onSale} onChange={(e) => setOnSale(e.target.checked)} />
            فقط کالاهای تخفیف‌دار
          </label>
        </div>
      </Section>

      <div className="flex gap-2 pt-1">
        <Button onClick={apply} className="flex-1" size="md">
          <ListFilter className="size-4" />
          اعمال فیلترها
        </Button>
        <Button
          onClick={reset}
          variant="outline"
          size="md"
          disabled={activeCount === 0}
          aria-label="حذف همه فیلترها"
        >
          <Eraser className="size-4" />
        </Button>
      </div>
    </div>
  );
}

/** How many URL filters are currently active (for the mobile trigger badge) */
export function countActiveFilters(query: CatalogQuery, includeCategory = false): number {
  let n = 0;
  if (includeCategory && query.category) n++;
  if (query.brands?.length) n += query.brands.length;
  if (query.minPrice || query.maxPrice) n++;
  if (query.minRating) n++;
  if (query.inStock) n++;
  if (query.onSale) n++;
  return n;
}
