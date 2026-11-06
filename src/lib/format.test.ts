import { describe, expect, it } from "vitest";

import {
  discountPercent,
  discountedUsd,
  finalPriceToman,
  generateOrderRef,
  toFaDigits,
  tomanToUsd,
  usdToToman,
} from "./format";

describe("currency formatting (mock demo rate)", () => {
  it("converts USD to Toman with the fixed mock rate, rounded to 1000", () => {
    expect(usdToToman(1)).toBe(100_000);
    expect(usdToToman(9.99)).toBe(999_000);
    expect(usdToToman(0.004)).toBe(0);
  });

  it("inverts Toman back to USD consistently", () => {
    expect(tomanToUsd(100_000)).toBe(1);
  });

  it("renders Persian digits", () => {
    expect(toFaDigits("1234567890")).toBe("۱۲۳۴۵۶۷۸۹۰");
    expect(toFaDigits(42)).toBe("۴۲");
  });
});

describe("discount math", () => {
  it("applies percentage discounts correctly", () => {
    expect(discountedUsd(100, 25)).toBe(75);
    expect(discountedUsd(100, 0)).toBe(100);
    expect(discountedUsd(50, -5)).toBe(50); // negative discounts are ignored
  });

  it("computes final Toman price after discount", () => {
    expect(finalPriceToman(10, 50)).toBe(500_000);
  });

  it("normalizes float percentages to integers", () => {
    expect(discountPercent(12.96)).toBe(13);
    expect(discountPercent(0.4)).toBe(0);
  });
});

describe("order references", () => {
  it("generates MK-XXXXXX demo references", () => {
    expect(generateOrderRef()).toMatch(/^MK-[A-Z0-9]{6}$/);
  });
});
