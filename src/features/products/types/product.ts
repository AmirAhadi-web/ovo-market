/** Normalized product model used across the whole application. */
export interface Product {
  id: number;
  title: string;
  description: string;
  /** Category slug as provided by the API (English, kebab-case) */
  category: string;
  /** Sample price in USD, converted to Toman at display time */
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
  sku?: string;
  tags?: string[];
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  availabilityStatus?: string;
  minimumOrderQuantity?: number;
  reviews?: ProductReview[];
  meta?: { createdAt?: string; updatedAt?: string };
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/** Sorting options shared by listing / category / search pages */
export type SortOption =
  | "popular"
  | "newest"
  | "cheapest"
  | "expensive"
  | "rating";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "محبوب‌ترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
  { value: "rating", label: "بالاترین امتیاز" },
];

/** All catalog filter inputs in one serializable shape (for URL sync) */
export interface CatalogQuery {
  q?: string;
  category?: string;
  brands?: string[];
  minPrice?: number; // USD
  maxPrice?: number; // USD
  minRating?: number;
  inStock?: boolean;
  onSale?: boolean;
  sort?: SortOption;
  page?: number;
}
