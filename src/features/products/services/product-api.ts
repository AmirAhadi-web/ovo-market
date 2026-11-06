import { fallbackProducts } from "../data/fallback-products";
import type { Product, ProductsResponse } from "../types/product";

/**
 * Centralized DummyJSON data-access layer.
 *
 * - All network access to the product API lives here (no component fetches
 *   the API directly).
 * - Responses are cached by Next.js and revalidated hourly.
 * - If the API is unreachable we transparently fall back to a small local
 *   snapshot so the storefront remains usable offline.
 */

const BASE_URL = "https://dummyjson.com";
const REVALIDATE = 3600; // seconds

type FetchResult<T> = { data: T; fromFallback: boolean };

async function fetchJson<T>(path: string, init?: RequestInit): Promise<FetchResult<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) throw new Error(`DummyJSON ${res.status}`);
    return { data: (await res.json()) as T, fromFallback: false };
  } catch {
    return { data: undefined as T, fromFallback: true };
  }
}

function normalizeProducts(products: Product[]): Product[] {
  return products.map((p) => ({
    ...p,
    brand: p.brand ?? "عمومی",
    images: p.images?.length ? p.images : [p.thumbnail],
  }));
}

/** Fetch the full catalog (limit=0 returns everything). */
export async function getAllProducts(): Promise<Product[]> {
  const { data, fromFallback } = await fetchJson<ProductsResponse>(
    "/products?limit=0&select=id,title,description,category,price,discountPercentage,rating,stock,brand,thumbnail,images,sku,tags,warrantyInformation,shippingInformation,returnPolicy,availabilityStatus,minimumOrderQuantity,weight,dimensions,reviews,meta",
  );
  if (fromFallback || !data?.products) return normalizeProducts(fallbackProducts);
  return normalizeProducts(data.products);
}

/** All category slugs available in the catalog. */
export async function getCategories(): Promise<string[]> {
  const { data, fromFallback } = await fetchJson<string[]>("/products/category-list");
  if (fromFallback || !data) {
    return [...new Set(fallbackProducts.map((p) => p.category))].sort();
  }
  return data;
}

/** Single product by id (null when it does not exist / API down with no match). */
export async function getProduct(id: number): Promise<Product | null> {
  const { data, fromFallback } = await fetchJson<Product>(`/products/${id}`);
  if (fromFallback || !data || !data.id) {
    const local = fallbackProducts.find((p) => p.id === id);
    return local ? normalizeProducts([local])[0] : null;
  }
  return normalizeProducts([data])[0];
}

/** Server-side search against the API; falls back to local filtering. */
export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim();
  if (!q) return [];
  const { data, fromFallback } = await fetchJson<ProductsResponse>(
    `/products/search?q=${encodeURIComponent(q)}&limit=0`,
  );
  if (fromFallback || !data?.products) {
    const needle = q.toLowerCase();
    return normalizeProducts(
      fallbackProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          p.description.toLowerCase().includes(needle) ||
          p.category.includes(needle),
      ),
    );
  }
  return normalizeProducts(data.products);
}

/** Products belonging to a category slug. */
export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const { data, fromFallback } = await fetchJson<ProductsResponse>(
    `/products/category/${encodeURIComponent(slug)}?limit=0`,
  );
  if (fromFallback || !data?.products) {
    return normalizeProducts(fallbackProducts.filter((p) => p.category === slug));
  }
  return normalizeProducts(data.products);
}

/**
 * Dedicated queries used by homepage sections. They all reuse the cached
 * full-catalog request, so no extra network calls are made per section.
 */
export async function getSpecialOffers(count = 12): Promise<Product[]> {
  const all = await getAllProducts();
  return [...all]
    .filter((p) => p.discountPercentage > 0)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, count);
}

export async function getBestSellers(count = 10): Promise<Product[]> {
  const all = await getAllProducts();
  return [...all]
    .sort((a, b) => (b.reviews?.length ?? 0) * b.rating - (a.reviews?.length ?? 0) * a.rating)
    .slice(0, count);
}

export async function getNewArrivals(count = 10): Promise<Product[]> {
  const all = await getAllProducts();
  return [...all]
    .sort((a, b) => {
      const da = a.meta?.createdAt ? Date.parse(a.meta.createdAt) : a.id;
      const db = b.meta?.createdAt ? Date.parse(b.meta.createdAt) : b.id;
      return db - da;
    })
    .slice(0, count);
}

export async function getRecommended(count = 10): Promise<Product[]> {
  const all = await getAllProducts();
  return [...all]
    .filter((p) => p.rating >= 4 && p.stock > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
}

export async function getRelatedProducts(product: Product, count = 8): Promise<Product[]> {
  const sameCategory = await getProductsByCategory(product.category);
  return sameCategory.filter((p) => p.id !== product.id).slice(0, count);
}
