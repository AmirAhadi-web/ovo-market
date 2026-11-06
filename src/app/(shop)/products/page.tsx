import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { CatalogView } from "@/components/storefront/catalog/catalog-view";
import { getCategoryMeta } from "@/config/categories";
import { getAllProducts, getCategories } from "@/features/products/services/product-api";
import { parseCatalogQuery } from "@/features/products/utils/product-utils";
import { toFaDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "فروشگاه — همه کالاها",
  description: "مشاهده و خرید از میان صدها کالای اورجینال در دسته‌بندی‌های مختلف با فیلتر و مرتب‌سازی پیشرفته.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = parseCatalogQuery(params);

  // For single-category browsing we pre-scope the catalog for speed & focus
  const [all, categories] = await Promise.all([getAllProducts(), getCategories()]);
  const scope = query.category ? all.filter((p) => p.category === query.category) : all;

  const title = query.category ? getCategoryMeta(query.category).label : "همه کالاها";
  const categoryLabel = query.category ? getCategoryMeta(query.category).label : undefined;

  return (
    <div className="container-x py-4 md:py-6">
      <Breadcrumbs
        items={[{ label: "فروشگاه", href: "/products" }, { label: title }]}
        className="mb-4"
      />

      <header className="mb-5">
        <h1 className="text-xl font-extrabold text-ink md:text-2xl">{title}</h1>
        <p className="mt-1 text-[13px] text-slate-500">
          {query.onSale
            ? "کالاهای دارای تخفیف ویژه"
            : query.q
              ? `جستجو در میان کالاها برای «${query.q}»`
              : `مرور و خرید از میان ${toFaDigits(scope.length)} کالا`}
          {categoryLabel && !query.onSale && !query.q ? "" : ""}
        </p>
      </header>

      <CatalogView
        scope={scope}
        query={query}
        basePath="/products"
        rawParams={params}
        categories={categories}
        includeCategory
      />
    </div>
  );
}
