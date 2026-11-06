import { Flame } from "lucide-react";
import Link from "next/link";

import { SectionHeader } from "@/components/common/section-header";
import { ProductCarousel } from "@/components/product/product-carousel";
import { ProductGrid } from "@/components/product/product-card";
import { CategoryTiles } from "@/components/storefront/category-tiles";
import { Countdown } from "@/components/storefront/countdown";
import { HeroSlider } from "@/components/storefront/hero-slider";
import { Newsletter } from "@/components/storefront/newsletter";
import { PromoBanners } from "@/components/storefront/promo-banners";
import {
  getBestSellers,
  getNewArrivals,
  getRecommended,
  getSpecialOffers,
} from "@/features/products/services/product-api";

export const revalidate = 3600;

export default async function HomePage() {
  const [offers, bestSellers, newArrivals, recommended] = await Promise.all([
    getSpecialOffers(14),
    getBestSellers(12),
    getNewArrivals(10),
    getRecommended(12),
  ]);

  return (
    <div className="container-x py-4 md:py-6">
      <HeroSlider />

      {/* Popular categories */}
      <section aria-label="دسته‌بندی‌های محبوب" className="section-gap">
        <SectionHeader title="دسته‌بندی‌های محبوب" subtitle="سریع‌تر به آنچه می‌خواهید برسید" />
        <CategoryTiles />
      </section>

      {/* Special offers band */}
      <section
        aria-label="پیشنهاد شگفت‌انگیز"
        className="section-gap overflow-hidden rounded-2xl bg-gradient-to-l from-accent via-[#fb8532] to-accent p-4 shadow-[var(--shadow-card)] md:rounded-3xl md:p-5"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-white">
            <span className="grid size-9 place-items-center rounded-xl bg-white/20 backdrop-blur">
              <Flame className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-extrabold md:text-lg">پیشنهاد شگفت‌انگیز</h2>
              <p className="text-[11px] text-white/80 md:text-xs">تا پایان امروز فرصت دارید</p>
            </div>
            <Countdown />
          </div>
          <Link
            href="/products?onSale=1"
            className="shrink-0 rounded-[var(--radius-ctl)] bg-white px-3.5 py-2 text-xs font-bold text-accent-600 shadow-sm transition-transform hover:scale-[1.03] md:px-4 md:text-sm"
          >
            مشاهده همه
          </Link>
        </div>
        <ProductCarousel products={offers} />
      </section>

      {/* Promo banners */}
      <section aria-label="پیشنهادهای ویژه" className="section-gap">
        <PromoBanners />
      </section>

      {/* Best sellers */}
      <section aria-label="پرفروش‌ترین‌ها" className="section-gap">
        <SectionHeader
          title="پرفروش‌ترین کالاها"
          subtitle="انتخاب اول مشتریان OVO Market"
          href="/products?sort=popular"
        />
        <ProductCarousel products={bestSellers} />
      </section>

      {/* New arrivals */}
      <section aria-label="جدیدترین‌ها" className="section-gap">
        <SectionHeader
          title="جدیدترین کالاها"
          subtitle="تازه‌های فروشگاه را اول ببینید"
          href="/products?sort=newest"
        />
        <ProductGrid products={newArrivals.slice(0, 10)} />
      </section>

      {/* Recommended */}
      <section aria-label="پیشنهاد OVO Market" className="section-gap">
        <SectionHeader
          title="پیشنهاد OVO Market"
          subtitle="منتخب کالاهای باکیفیت با امتیاز بالا"
          href="/products?sort=rating"
        />
        <ProductCarousel products={recommended} />
      </section>

      {/* Newsletter */}
      <section aria-label="خبرنامه" className="section-gap">
        <Newsletter />
      </section>
    </div>
  );
}
