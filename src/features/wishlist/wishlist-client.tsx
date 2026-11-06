"use client";

import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";

import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { EmptyState } from "@/components/common/empty-state";
import { DiscountBadge, Price, RatingStars, StockLabel } from "@/components/common/price";
import { ProductImage } from "@/components/common/product-image";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/features/products/types/product";
import { useMounted } from "@/hooks/use-mounted";
import { useWishlistStore, type WishlistItem } from "@/stores/wishlist-store";

/** Build the minimal Product shape that card actions need from a wishlist snapshot */
function snapshotToProduct(item: WishlistItem): Product {
  return {
    id: item.productId,
    title: item.title,
    description: "",
    category: item.category,
    price: item.priceUsd,
    discountPercentage: item.discountPercentage,
    rating: item.rating,
    stock: item.stock,
    brand: "",
    thumbnail: item.thumbnail,
    images: [item.thumbnail],
  };
}

export function WishlistClient() {
  const mounted = useMounted();
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);

  if (!mounted) {
    return (
      <div className="container-x py-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-4 md:py-6">
      <Breadcrumbs items={[{ label: "علاقه‌مندی‌ها" }]} className="mb-4" />
      <h1 className="mb-5 text-xl font-extrabold text-ink md:text-2xl">
        لیست علاقه‌مندی‌ها{" "}
        {items.length > 0 && (
          <span className="tnum text-sm font-semibold text-slate-400">
            ({items.length.toLocaleString("fa-IR")} کالا)
          </span>
        )}
      </h1>

      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="لیست علاقه‌مندی‌ها خالی است"
          description="با لمس آیکن قلب روی هر کالا، آن را برای بعد ذخیره کنید."
          action={
            <Button asChild size="lg">
              <Link href="/products">مشاهده کالاها</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => {
            const product = snapshotToProduct(item);
            return (
              <article key={item.productId} className="card flex gap-3 p-3">
                <Link
                  href={`/products/${item.productId}`}
                  className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-white"
                >
                  <ProductImage
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-contain p-1.5"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/products/${item.productId}`}
                      className="line-clamp-2 text-[13px] font-medium leading-5.5 text-ink transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(item.productId)}
                      aria-label="حذف از علاقه‌مندی‌ها"
                      className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-danger"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <RatingStars rating={item.rating} />
                    <DiscountBadge discountPercentage={item.discountPercentage} />
                    {item.stock <= 0 && <StockLabel stock={0} />}
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                    <Price priceUsd={item.priceUsd} discountPercentage={item.discountPercentage} size="sm" />
                    <AddToCartButton product={product} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
