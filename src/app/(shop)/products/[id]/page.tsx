import type { Metadata } from "next";
import { MessageSquareText, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { RatingStars, StockLabel } from "@/components/common/price";
import { SectionHeader } from "@/components/common/section-header";
import { BuyPanel, StickyBuyBar } from "@/components/product/buy-panel";
import { ProductCarousel } from "@/components/product/product-carousel";
import { ProductGallery } from "@/components/product/product-gallery";
import { getCategoryMeta } from "@/config/categories";
import { Badge } from "@/components/ui/badge";
import {
  getProduct,
  getRelatedProducts,
} from "@/features/products/services/product-api";
import { formatFaDate, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ id: string }>;
}

async function load(id: string) {
  const num = Number(id);
  if (!Number.isInteger(num) || num <= 0) return null;
  return getProduct(num);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await load(id);
  if (!product) return { title: "محصول یافت نشد" };
  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: product.thumbnail ? [{ url: product.thumbnail }] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await load(id);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 10);
  const catMeta = getCategoryMeta(product.category);
  const reviews = product.reviews ?? [];

  const specs: { label: string; value: string }[] = [
    { label: "برند", value: product.brand },
    { label: "دسته‌بندی", value: catMeta.label },
    product.sku ? { label: "کد کالا (SKU)", value: product.sku } : null,
    product.weight
      ? { label: "وزن", value: `${formatNumber(product.weight)} کیلوگرم` }
      : null,
    product.dimensions
      ? {
          label: "ابعاد (عرض × ارتفاع × عمق)",
          value: `${formatNumber(Math.round(product.dimensions.width))} × ${formatNumber(Math.round(product.dimensions.height))} × ${formatNumber(Math.round(product.dimensions.depth))} سانتی‌متر`,
        }
      : null,
    product.minimumOrderQuantity && product.minimumOrderQuantity > 1
      ? { label: "حداقل تعداد سفارش", value: formatNumber(product.minimumOrderQuantity) }
      : null,
  ].filter((s): s is { label: string; value: string } => Boolean(s));

  const services: { icon: typeof Truck; label: string }[] = [
    product.warrantyInformation ? { icon: ShieldCheck, label: product.warrantyInformation } : null,
    product.shippingInformation ? { icon: Truck, label: product.shippingInformation } : null,
    product.returnPolicy ? { icon: RotateCcw, label: product.returnPolicy } : null,
  ].filter((s): s is { icon: typeof Truck; label: string } => Boolean(s));

  return (
    <div className="container-x py-4 md:py-6">
      <Breadcrumbs
        items={[
          { label: "فروشگاه", href: "/products" },
          { label: catMeta.label, href: `/categories/${product.category}` },
          { label: product.title },
        ]}
        className="mb-4"
      />

      {/* Main section */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] xl:gap-10">
        <ProductGallery images={product.images} title={product.title} />

        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{catMeta.label}</Badge>
            <span className="text-xs text-slate-400" dir="auto">
              برند: {product.brand}
            </span>
          </div>

          <h1 className="text-lg font-extrabold leading-8 text-ink md:text-2xl md:leading-10">
            {product.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <RatingStars rating={product.rating} reviewsCount={reviews.length} size="md" />
            <StockLabel stock={product.stock} />
          </div>

          <hr className="my-5 border-line" />

          <BuyPanel product={product} />

          {services.length > 0 && (
            <div className="mt-5 grid gap-2 rounded-xl border border-line bg-white p-3.5 sm:grid-cols-3">
              {services.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-slate-600">
                  <Icon className="size-4.5 shrink-0 text-primary" strokeWidth={1.8} />
                  <span className="leading-5">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description + specs */}
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <section className="card p-5 md:p-6" aria-label="معرفی محصول">
          <h2 className="mb-3 text-base font-bold text-ink">معرفی محصول</h2>
          <p className="text-sm leading-7.5 text-slate-600" dir="auto">
            {product.description}
          </p>
          {!!product.tags?.length && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.tags.map((t) => (
                <Badge key={t} variant="outline" dir="ltr">
                  #{t}
                </Badge>
              ))}
            </div>
          )}
        </section>

        <section className="card p-5 md:p-6" aria-label="مشخصات فنی">
          <h2 className="mb-3 text-base font-bold text-ink">مشخصات</h2>
          <dl className="divide-y divide-line">
            {specs.map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-6 py-2.5">
                <dt className="shrink-0 text-[13px] text-slate-500">{label}</dt>
                <dd className="text-end text-[13px] font-medium text-ink" dir="auto">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {/* Reviews (sample data provided by DummyJSON) */}
      <section className="card mt-5 p-5 md:p-6" aria-label="دیدگاه کاربران">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MessageSquareText className="size-5 text-primary" />
            <h2 className="text-base font-bold text-ink">
              دیدگاه‌ها <span className="tnum text-sm font-semibold text-slate-400">({formatNumber(reviews.length)})</span>
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">داده نمونه ارائه‌شده توسط DummyJSON</span>
        </div>

        {reviews.length === 0 ? (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            برای این کالا هنوز دیدگاهی ثبت نشده است.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {reviews.slice(0, 6).map((r, i) => (
              <article key={i} className="rounded-xl border border-line bg-slate-50/60 p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                      {r.reviewerName.trim().charAt(0)}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-ink" dir="auto">
                        {r.reviewerName}
                      </p>
                      <p className="text-[11px] text-slate-400">{formatFaDate(r.date)}</p>
                    </div>
                  </div>
                  <RatingStars rating={r.rating} />
                </div>
                <p className="text-[13px] leading-6 text-slate-600" dir="auto">
                  {r.comment}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="section-gap" aria-label="کالاهای مشابه">
          <SectionHeader
            title="کالاهای مشابه"
            subtitle={`از دسته ${catMeta.label}`}
            href={`/categories/${product.category}`}
          />
          <ProductCarousel products={related} />
        </section>
      )}

      <StickyBuyBar product={product} />
    </div>
  );
}
