import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { EmptyState } from "@/components/common/empty-state";
import { ProductGrid } from "@/components/product/product-card";
import { FilterPanel } from "@/components/storefront/catalog/filter-panel";
import { MobileFilterSheet } from "@/components/storefront/catalog/mobile-filter-sheet";
import { SortSelect } from "@/components/storefront/catalog/sort-select";
import { Pagination } from "@/components/storefront/catalog/pagination";
import { Button } from "@/components/ui/button";
import type { CatalogQuery, Product } from "@/features/products/types/product";
import {
  extractBrands,
  filterProducts,
  paginate,
  priceBounds,
  sortProducts,
} from "@/features/products/utils/product-utils";
import { toFaDigits } from "@/lib/format";

const PER_PAGE = 20;

/**
 * Shared server-rendered catalog surface used by /products, /categories/[slug]
 * and /search: sidebar filters (desktop), bottom-sheet filters (mobile),
 * sorting, result count, responsive grid and pagination.
 */
export function CatalogView({
  scope,
  query,
  basePath,
  rawParams,
  categories,
  includeCategory = false,
}: {
  /** Products of the current scope (before brand/price/etc. filters) */
  scope: Product[];
  query: CatalogQuery;
  basePath: string;
  rawParams: Record<string, string | string[] | undefined>;
  /** When provided, a category facet is rendered (listing & search pages) */
  categories?: string[] | null;
  includeCategory?: boolean;
}) {
  // Brands represent the scope after non-brand filters (Digikala-style counts)
  const brandScope = filterProducts(scope, { ...query, brands: undefined });
  const facets = {
    brands: extractBrands(brandScope),
    categories: categories ?? null,
    boundsUsd: priceBounds(scope),
  };

  const filtered = filterProducts(scope, query);
  const sorted = sortProducts(filtered, query.sort ?? "popular");
  const page = paginate(sorted, query.page ?? 1, PER_PAGE);

  return (
    <div className="flex items-start gap-6">
      {facets.brands.length + (facets.categories?.length ?? 0) > 0 && (
        <aside className="hidden w-64 shrink-0 lg:block" aria-label="فیلترها">
          <div className="card sticky top-40 max-h-[calc(100dvh-11rem)] overflow-y-auto p-5 scrollbar-none">
            <FilterPanel query={query} facets={facets} basePath={basePath} />
          </div>
        </aside>
      )}

      <div className="min-w-0 flex-1">
        <div className="card flex items-center justify-between gap-3 p-3 md:p-4">
          <Suspense fallback={<div className="h-9 w-40 rounded-lg bg-slate-100" />}>
            <SortSelect sort={query.sort ?? "popular"} />
          </Suspense>
          <div className="flex items-center gap-3">
            <span className="tnum hidden text-[13px] text-slate-500 sm:inline">
              {filtered.length > 0 ? `${toFaDigits(filtered.length)} کالا` : ""}
            </span>
            <MobileFilterSheet
              query={query}
              facets={facets}
              basePath={basePath}
              includeCategory={includeCategory}
            />
          </div>
        </div>

        <div className="mt-4">
          {page.items.length === 0 ? (
            <EmptyState
              icon={PackageSearch}
              title="کالایی با این مشخصات پیدا نشد"
              description="فیلترها را تغییر دهید یا محدوده قیمت را بازتر کنید."
              action={
                <Button asChild variant="outline">
                  <Link href={basePath}>حذف همه فیلترها</Link>
                </Button>
              }
            />
          ) : (
            <ProductGrid products={page.items} />
          )}
        </div>

        <Pagination page={page.page} pageCount={page.pageCount} params={rawParams} basePath={basePath} />
      </div>
    </div>
  );
}
