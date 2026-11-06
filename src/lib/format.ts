import { siteConfig } from "@/config/site";

/**
 * Currency & number presentation utilities.
 *
 * DummyJSON exposes sample USD prices. For a consistent demo storefront we
 * convert them to Toman using a FIXED, CONFIGURABLE mock rate
 * (see `siteConfig.usdToTomanRate`). This is NOT a live exchange rate.
 */

const faNumber = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 });
const TOMAN_ROUND = 1000;

/** Convert Latin digits to Persian digits inside any string */
export function toFaDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

/** Format a plain number with Persian digits and thousands separators */
export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "۰";
  return faNumber.format(Math.round(value));
}

/** USD (sample) -> Toman (demo), rounded to the nearest 1,000 Toman */
export function usdToToman(usd: number): number {
  const rate = siteConfig.usdToTomanRate; // MOCK rate, demo only
  return Math.round((usd * rate) / TOMAN_ROUND) * TOMAN_ROUND;
}

/** Toman -> USD (inverse of the mock rate, used for server-side filtering) */
export function tomanToUsd(toman: number): number {
  return toman / siteConfig.usdToTomanRate;
}

/** Final USD price after applying the API discount percentage */
export function discountedUsd(price: number, discountPercentage: number): number {
  if (discountPercentage <= 0) return price;
  return price * (1 - discountPercentage / 100);
}

/** Final unit price in Toman after discount */
export function finalPriceToman(price: number, discountPercentage: number): number {
  return usdToToman(discountedUsd(price, discountPercentage));
}

/** Normalized integer discount percent (API values are floats like 12.96) */
export function discountPercent(discountPercentage: number): number {
  return Math.round(discountPercentage);
}

/** Format a Toman amount with Persian digits (no unit label) */
export function formatToman(toman: number): string {
  return formatNumber(toman);
}

/** Format a Toman amount including the currency label «تومان» */
export function formatTomanWithUnit(toman: number): string {
  return `${formatNumber(toman)} ${siteConfig.currencyLabel}`;
}

/** Format a USD sample price directly as a Toman label */
export function formatUsdAsToman(usd: number): string {
  return formatTomanWithUnit(usdToToman(usd));
}

/** Format an ISO date string in Persian locale */
export function formatFaDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(d);
}

/** Generate a demo order reference, e.g. MK-8F3K2Q */
export function generateOrderRef(): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `MK-${rand}`;
}
