import { describe, expect, it } from "vitest";

import {
  clampQuantity,
  computeCartTotals,
  lineFinalToman,
  type CartLineSnapshot,
} from "./cart-utils";

function line(overrides: Partial<CartLineSnapshot>): CartLineSnapshot {
  return {
    productId: 1,
    title: "Sample",
    thumbnail: "t.webp",
    priceUsd: 10,
    discountPercentage: 0,
    stock: 10,
    quantity: 1,
    ...overrides,
  };
}

describe("clampQuantity", () => {
  it("stays within [1, stock]", () => {
    expect(clampQuantity(0, 10)).toBe(1);
    expect(clampQuantity(-3, 10)).toBe(1);
    expect(clampQuantity(99, 5)).toBe(5);
    expect(clampQuantity(3.9, 10)).toBe(3);
  });

  it("never exceeds available stock, even when stock is unavailable", () => {
    expect(clampQuantity(5, 0)).toBe(1);
  });

  it("handles non-finite input safely", () => {
    expect(clampQuantity(Number.NaN, 10)).toBe(1);
  });
});

describe("cart totals", () => {
  it("computes line final price with discount", () => {
    // $10 with 50% → $5 → 500,000 Toman
    expect(lineFinalToman(line({ discountPercentage: 50 }))).toBe(500_000);
  });

  it("computes subtotal, discount and total across lines", () => {
    const totals = computeCartTotals([
      line({ productId: 1, priceUsd: 10, discountPercentage: 50, quantity: 2 }), // unit 1,000,000 → final 500,000 ×2
      line({ productId: 2, priceUsd: 20, discountPercentage: 0, quantity: 1 }), // 2,000,000
    ]);
    expect(totals.subtotal).toBe(1_000_000 * 2 + 2_000_000);
    expect(totals.discount).toBe(500_000 * 2);
    expect(totals.total).toBe(totals.subtotal - totals.discount);
    expect(totals.count).toBe(3);
  });

  it("returns zeroed totals for an empty cart", () => {
    expect(computeCartTotals([])).toEqual({ subtotal: 0, discount: 0, count: 0, total: 0 });
  });
});
