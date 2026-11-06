import type { MetadataRoute } from "next";

import { getAllProducts, getCategories } from "@/features/products/services/product-api";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => [] as string[]),
    getAllProducts().catch(() => []),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/search",
    "/cart",
    "/wishlist",
    "/account",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "daily",
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((slug) => ({
    url: `${BASE_URL}/categories/${slug}`,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Keep the sitemap lightweight — the full catalog is reachable via listing pages
  const productRoutes: MetadataRoute.Sitemap = products.slice(0, 100).map((p) => ({
    url: `${BASE_URL}/products/${p.id}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
