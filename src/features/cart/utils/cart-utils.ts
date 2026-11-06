import { finalPriceToman, usdToToman } from "@/lib/format";

/**
 * Pure cart computations — unit-tested with Vitest.
 * Prices are stored as sample USD values on the item snapshot and are
 * converted to Toman at display/checkout time with the shared mock rate.
 */

export interface CartLineSnapshot {
  productId: number;
  title: string;
  thumbnail: string;
  /** Original USD unit price (before discount) */
  priceUsd: number;
  discountPercentage: number;
  stock: number;
  quantity: number;
}

export interface CartTotals {
  /** Sum of original prices (before discounts), Toman */
  subtotal: number;
  /** Total amount saved by product discounts, Toman */
  discount: number;
  /** Total item count */
  count: number;
  /** subtotal - discount, Toman */
  total: number;
}

export function lineUnitToman(line: CartLineSnapshot): number {
  return usdToToman(line.priceUsd);
}

export function lineFinalToman(line: CartLineSnapshot): number {
  return finalPriceToman(line.priceUsd, line.discountPercentage);
}

export function lineTotalToman(line: CartLineSnapshot): number {
  return lineFinalToman(line) * line.quantity;
}

/** Keep quantity inside [1, stock]; never below 1, never above availability. */
export function clampQuantity(quantity: number, stock: number): number {
  const safeStock = Math.max(0, Math.floor(stock));
  const upper = Math.max(1, safeStock);
  const q = Math.floor(quantity);
  if (!Number.isFinite(q)) return 1;
  return Math.min(Math.max(1, q), upper);
}

export function computeCartTotals(lines: CartLineSnapshot[]): CartTotals {
  let subtotal = 0;
  let discount = 0;
  let count = 0;
  for (const line of lines) {
    const unit = lineUnitToman(line);
    const finalU = lineFinalToman(line);
    subtotal += unit * line.quantity;
    discount += (unit - finalU) * line.quantity;
    count += line.quantity;
  }
  return { subtotal, discount, count, total: subtotal - discount };
}
