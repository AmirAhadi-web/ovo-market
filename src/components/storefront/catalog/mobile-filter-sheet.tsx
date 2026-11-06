"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { countActiveFilters, FilterPanel, type FilterFacets } from "./filter-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { CatalogQuery } from "@/features/products/types/product";
import { toFaDigits } from "@/lib/format";

/** Mobile trigger + bottom-sheet wrapper for the shared filter panel */
export function MobileFilterSheet({
  query,
  facets,
  basePath,
  includeCategory = false,
}: {
  query: CatalogQuery;
  facets: FilterFacets;
  basePath: string;
  includeCategory?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const active = countActiveFilters(query, includeCategory);

  return (
    <>
      <Button variant="outline" size="md" onClick={() => setOpen(true)} className="lg:hidden">
        <SlidersHorizontal className="size-4" />
        فیلترها
        {active > 0 && (
          <Badge variant="accent" size="sm" className="tnum rounded-full">
            {toFaDigits(active)}
          </Badge>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent side="bottom" className="max-h-[85dvh]">
          <DialogHeader>
            <DialogTitle>فیلترها</DialogTitle>
          </DialogHeader>
          <FilterPanel query={query} facets={facets} basePath={basePath} onApplied={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
