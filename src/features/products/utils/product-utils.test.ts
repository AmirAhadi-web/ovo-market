import { describe, expect, it } from "vitest";

import type { Product } from "../types/product";
import {
  extractBrands,
  filterProducts,
  paginate,
  parseCatalogQuery,
  priceBounds,
  sortProducts,
} from "./product-utils";

function makeProduct(overrides: Partial<Product>): Product {
  return {
    id: 1,
    title: "Sample",
    description: "desc",
    category: "beauty",
    price: 100,
    discountPercentage: 0,
    rating: 4,
    stock: 10,
    brand: "Acme",
    thumbnail: "t.webp",
    images: ["t.webp"],
    ...overrides,
  };
}

const catalog: Product[] = [
  makeProduct({ id: 1, title: "Apple Phone X", price: 100, brand: "Apple", rating: 4.8, stock: 5, discountPercentage: 10 }),
  makeProduct({ id: 2, title: "Samsung Phone", price: 50, brand: "Samsung", rating: 4.1, stock: 0 }),
  makeProduct({ id: 3, title: "Apple Laptop", price: 200, brand: "Apple", rating: 4.5, stock: 3 }),
  makeProduct({ id: 4, title: "Cheap Case", price: 10, brand: "Generic", rating: 3.2, stock: 40, discountPercentage: 50 }),
];

describe("filterProducts", () => {
  it("filters by text query across title and brand", () => {
    expect(filterProducts(catalog, { q: "apple" }).map((p) => p.id)).toEqual([1, 3]);
  });

  it("filters by brand list", () => {
    expect(filterProducts(catalog, { brands: ["Apple"] })).toHaveLength(2);
  });

  it("filters by discounted price range", () => {
    // id1 final=90, id2=50, id3=200, id4=5
    const r = filterProducts(catalog, { minPrice: 50, maxPrice: 100 });
    expect(r.map((p) => p.id).sort()).toEqual([1, 2]);
  });

  it("filters by stock, rating and discount flags", () => {
    expect(filterProducts(catalog, { inStock: true }).map((p) => p.id)).toEqual([1, 3, 4]);
    expect(filterProducts(catalog, { minRating: 4.5 }).map((p) => p.id)).toEqual([1, 3]);
    expect(filterProducts(catalog, { onSale: true }).map((p) => p.id)).toEqual([1, 4]);
  });
});

describe("sortProducts", () => {
  it("sorts cheapest and expensive by final price", () => {
    expect(sortProducts(catalog, "cheapest")[0].id).toBe(4); // 10 with 50% off = 5
    expect(sortProducts(catalog, "expensive")[0].id).toBe(3);
  });

  it("sorts by rating", () => {
    const sortedDesc = sortProducts(catalog, "rating");
    expect(sortedDesc[0].rating).toBe(4.8);
  });

  it("popular sort puts highest engagement first and never mutates input", () => {
    const before = catalog.map((p) => p.id);
    sortProducts(catalog, "popular");
    expect(catalog.map((p) => p.id)).toEqual(before);
  });
});

describe("paginate", () => {
  const items = Array.from({ length: 45 }, (_, i) => i + 1);

  it("pages correctly", () => {
    const p2 = paginate(items, 2, 20);
    expect(p2.items).toHaveLength(20);
    expect(p2.pageCount).toBe(3);
    expect(p2.items[0]).toBe(21);
  });

  it("clamps out-of-range pages", () => {
    expect(paginate(items, 99, 20).page).toBe(3);
    expect(paginate(items, -5, 20).page).toBe(1);
  });

  it("handles empty lists", () => {
    const p = paginate([], 1, 20);
    expect(p.pageCount).toBe(1);
    expect(p.items).toEqual([]);
  });
});

describe("parseCatalogQuery", () => {
  it("parses and validates search params", () => {
    const q = parseCatalogQuery({
      q: "phone",
      brands: "Apple,Samsung",
      minPrice: "10",
      maxPrice: "100",
      minRating: "4",
      inStock: "1",
      onSale: "1",
      sort: "cheapest",
      page: "2",
    });
    expect(q).toEqual({
      q: "phone",
      category: undefined,
      brands: ["Apple", "Samsung"],
      minPrice: 10,
      maxPrice: 100,
      minRating: 4,
      inStock: true,
      onSale: true,
      sort: "cheapest",
      page: 2,
    });
  });

  it("ignores invalid sort values and bad numbers", () => {
    const q = parseCatalogQuery({ sort: "nonsense", page: "abc", minPrice: "xyz" });
    expect(q.sort).toBeUndefined();
    expect(q.page).toBeUndefined();
    expect(q.minPrice).toBeUndefined();
  });
});

describe("facets", () => {
  it("counts brands", () => {
    const brands = extractBrands(catalog);
    expect(brands.find((b) => b.brand === "Apple")?.count).toBe(2);
  });

  it("computes discounted price bounds", () => {
    expect(priceBounds(catalog)).toEqual({ min: 5, max: 200 });
  });
});
