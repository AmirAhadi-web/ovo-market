import type { Metadata } from "next";
import { SearchX } from "lucide-react";

import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { EmptyState } from "@/components/common/empty-state";
import { SectionHeader } from "@/components/common/section-header";
import { ProductGrid } from "@/components/product/product-card";
import { CatalogView } from "@/components/storefront/catalog/catalog-view";
import {
  getBestSellers,
  getCategories,
  searchProducts,
} from "@/features/products/services/product-api";
import { parseCatalogQuery } from "@/features/products/utils/product-utils";

export const metadata: Metadata = {
  title: "جستجو",
  description: "جستجو در میان هزاران کالای OVO Market",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rawParams = await searchParams;
  const query = parseCatalogQuery(rawParams);
  const q = query.q?.trim() ?? "";

  const [results, categories, popular] = await Promise.all([
    q ? searchProducts(q) : Promise.resolve([]),
    getCategories(),
    q ? Promise.resolve([]) : getBestSellers(10),
  ]);

  return (
    <div className="container-x py-4 md:py-6">
      <Breadcrumbs items={[{ label: "جستجو" }]} className="mb-4" />

      <header className="mb-5">
        <h1 className="text-xl font-extrabold text-ink md:text-2xl">
          {q ? (
            <>
              نتایج جستجو برای <span className="text-primary">«{q}»</span>
            </>
          ) : (
            "جستجوی محصولات"
          )}
        </h1>
        {q && results.length > 0 && (
          <p className="mt-1 text-[13px] text-slate-500">
            {results.length.toLocaleString("fa-IR")} کالا یافت شد
          </p>
        )}
      </header>

      {!q ? (
        <div className="space-y-8">
          <EmptyState
            icon={SearchX}
            title="عبارت مورد نظر خود را جستجو کنید"
            description="نام محصول، برند یا دسته‌بندی را در نوار جستجوی بالای صفحه وارد کنید."
          />
          <section>
            <SectionHeader title="پیشنهادهای محبوب" href="/products?sort=popular" />
            <ProductGrid products={popular} />
          </section>
        </div>
      ) : results.length === 0 ? (
        <NoResults />
      ) : (
        <CatalogView
          scope={results}
          query={{ ...query }}
          basePath="/search"
          rawParams={rawParams}
          categories={categories}
          includeCategory
        />
      )}
    </div>
  );
}

async function NoResults() {
  const popular = await getBestSellers(10);
  return (
    <div className="space-y-8">
      <EmptyState
        icon={SearchX}
        title="نتیجه‌ای برای جستجوی شما پیدا نشد"
        description="از صحت املای واژه مطمئن شوید، واژه‌های ساده‌تر امتحان کنید یا دسته‌بندی‌ها را مرور کنید."
      />
      <section>
        <SectionHeader
          title="شاید این‌ها را دوست داشته باشید"
          subtitle="پرفروش‌ترین کالاهای فروشگاه"
          href="/products?sort=popular"
        />
        <ProductGrid products={popular} />
      </section>
    </div>
  );
}
