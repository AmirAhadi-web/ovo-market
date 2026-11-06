import type { CatalogQuery, Product, SortOption } from "../types/product";

/**
 * Pure, framework-free catalog helpers (filtering / sorting / pagination).
 * Unit-tested with Vitest.
 */

const collator = new Intl.Collator("en");

function finalUsd(p: Product): number {
  return p.discountPercentage > 0 ? p.price * (1 - p.discountPercentage / 100) : p.price;
}

function createdStamp(p: Product): number {
  const fromMeta = p.meta?.createdAt ? Date.parse(p.meta.createdAt) : NaN;
  return Number.isFinite(fromMeta) ? fromMeta : p.id;
}

export function filterProducts(products: Product[], query: CatalogQuery): Product[] {
  let list = products;

  if (query.q?.trim()) {
    const needle = query.q.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.brand.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle),
    );
  }
  if (query.category) {
    list = list.filter((p) => p.category === query.category);
  }
  if (query.brands?.length) {
    const wanted = new Set(query.brands.map((b) => b.toLowerCase()));
    list = list.filter((p) => wanted.has(p.brand.toLowerCase()));
  }
  if (typeof query.minPrice === "number") {
    list = list.filter((p) => finalUsd(p) >= (query.minPrice as number));
  }
  if (typeof query.maxPrice === "number") {
    list = list.filter((p) => finalUsd(p) <= (query.maxPrice as number));
  }
  if (typeof query.minRating === "number") {
    list = list.filter((p) => p.rating >= (query.minRating as number));
  }
  if (query.inStock) {
    list = list.filter((p) => p.stock > 0);
  }
  if (query.onSale) {
    list = list.filter((p) => p.discountPercentage > 0);
  }
  return list;
}

export function sortProducts(products: Product[], sort: SortOption = "popular"): Product[] {
  const list = [...products];
  switch (sort) {
    case "newest":
      return list.sort((a, b) => createdStamp(b) - createdStamp(a));
    case "cheapest":
      return list.sort((a, b) => finalUsd(a) - finalUsd(b));
    case "expensive":
      return list.sort((a, b) => finalUsd(b) - finalUsd(a));
    case "rating":
      return list.sort((a, b) => b.rating - a.rating);
    case "popular":
    default:
      return list.sort(
        (a, b) => b.rating * (b.reviews?.length ?? 1) - a.rating * (a.reviews?.length ?? 1),
      );
  }
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageCount: number;
  total: number;
  perPage: number;
}

export function paginate<T>(items: T[], page = 1, perPage = 20): Paginated<T> {
  const safePerPage = perPage > 0 ? perPage : 20;
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / safePerPage));
  const safePage = Math.min(Math.max(1, Math.floor(page) || 1), pageCount);
  const start = (safePage - 1) * safePerPage;
  return {
    items: items.slice(start, start + safePerPage),
    page: safePage,
    pageCount,
    total,
    perPage: safePerPage,
  };
}

export interface BrandCount {
  brand: string;
  count: number;
}

/** Brands present in the current result set, sorted alphabetically. */
export function extractBrands(products: Product[]): BrandCount[] {
  const map = new Map<string, number>();
  for (const p of products) {
    const brand = p.brand || "عمومی";
    map.set(brand, (map.get(brand) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([brand, count]) => ({ brand, count }))
    .sort((a, b) => collator.compare(a.brand, b.brand));
}

export interface PriceBounds {
  min: number;
  max: number;
}

/** USD price bounds (after discount) across a product set */
export function priceBounds(products: Product[]): PriceBounds {
  if (!products.length) return { min: 0, max: 0 };
  let min = Infinity;
  let max = -Infinity;
  for (const p of products) {
    const v = finalUsd(p);
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return { min: Math.floor(min), max: Math.ceil(max) };
}

/** Parse raw URL search params into a typed CatalogQuery (USD price range). */
export function parseCatalogQuery(
  params: Record<string, string | string[] | undefined>,
): CatalogQuery {
  const get = (key: string) => {
    const v = params[key];
    return Array.isArray(v) ? v[0] : v;
  };
  const num = (key: string) => {
    const raw = get(key);
    if (!raw) return undefined;
    const n = Number(raw);
    return Number.isFinite(n) ? n : undefined;
  };
  const brandsRaw = get("brands");
  const sortRaw = get("sort");
  const validSorts: SortOption[] = ["popular", "newest", "cheapest", "expensive", "rating"];
  return {
    q: get("q") || undefined,
    category: get("category") || undefined,
    brands: brandsRaw ? brandsRaw.split(",").filter(Boolean) : undefined,
    minPrice: num("minPrice"),
    maxPrice: num("maxPrice"),
    minRating: num("minRating"),
    inStock: get("inStock") === "1",
    onSale: get("onSale") === "1",
    sort: validSorts.includes(sortRaw as SortOption) ? (sortRaw as SortOption) : undefined,
    page: num("page"),
  };
}
