"use client";

import Link from "next/link";

import { DiscountBadge, Price, RatingStars } from "@/components/common/price";
import { ProductImage } from "@/components/common/product-image";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { WishlistToggle } from "@/components/product/wishlist-toggle";
import { getCategoryMeta } from "@/config/categories";
import type { Product } from "@/features/products/types/product";
import { cn } from "@/lib/utils";

/**
 * The reusable storefront product card.
 * Client-rendered so action buttons work everywhere with zero prop drilling.
 */
export function ProductCard({
  product,
  className,
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  const outOfStock = product.stock <= 0;

  return (
    <article
      className={cn(
        "group card relative flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]",
        outOfStock && "opacity-75",
        className,
      )}
    >
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square bg-white p-4"
        aria-label={product.title}
        tabIndex={-1}
      >
        <ProductImage
          src={product.thumbnail}
          alt={product.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 245px"
          className="object-contain"
        />
        <div className="absolute start-2.5 top-2.5 flex flex-col items-start gap-1.5">
          <DiscountBadge discountPercentage={product.discountPercentage} />
          {outOfStock && (
            <span className="rounded-full bg-slate-700/90 px-2 py-1 text-[10px] font-bold text-white">
              ناموجود
            </span>
          )}
        </div>
      </Link>

      <div className="absolute end-2.5 top-2.5">
        <WishlistToggle product={product} />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 border-t border-line/60 p-3">
        <span className="text-[10.5px] font-medium text-slate-400">
          {getCategoryMeta(product.category).label}
        </span>
        <h3 className="min-h-10">
          <Link
            href={`/products/${product.id}`}
            className="line-clamp-2 text-[13px] font-medium leading-5.5 text-slate-800 transition-colors hover:text-primary"
          >
            {product.title}
          </Link>
        </h3>
        <RatingStars rating={product.rating} reviewsCount={product.reviews?.length} />
        <div className="mt-auto flex items-end justify-between gap-2 pt-1.5">
          <Price priceUsd={product.price} discountPercentage={product.discountPercentage} size="sm" />
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}

/** Standard responsive product grid (2 / 3 / 4 / 5 columns) */
export function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5",
        className,
      )}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 5} />
      ))}
    </div>
  );
}
