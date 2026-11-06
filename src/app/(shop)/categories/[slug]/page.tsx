import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { CatalogView } from "@/components/storefront/catalog/catalog-view";
import { getCategoryMeta } from "@/config/categories";
import {
  getCategories,
  getProductsByCategory,
} from "@/features/products/services/product-api";
import { parseCatalogQuery } from "@/features/products/utils/product-utils";
import { toFaDigits } from "@/lib/format";

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getCategoryMeta(slug);
  return {
    title: meta.label,
    description: `${meta.description} — خرید آنلاین با بهترین قیمت در OVO Market`,
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const [{ slug }, rawParams] = await Promise.all([params, searchParams]);
  const categories = await getCategories();

  // Gracefully handle invalid categories
  if (!categories.includes(slug)) notFound();

  const scope = await getProductsByCategory(slug);
  const query = parseCatalogQuery(rawParams);
  const meta = getCategoryMeta(slug);
  const Icon = meta.icon;

  return (
    <div className="container-x py-4 md:py-6">
      <Breadcrumbs
        items={[{ label: "دسته‌بندی‌ها", href: "/products" }, { label: meta.label }]}
        className="mb-4"
      />

      <header className="card mb-5 flex items-center gap-4 p-5 md:p-6">
        <span className={`grid size-14 shrink-0 place-items-center rounded-2xl md:size-16 ${meta.tone}`}>
          <Icon className="size-7 md:size-8" strokeWidth={1.6} />
        </span>
        <div>
          <h1 className="text-xl font-extrabold text-ink md:text-2xl">{meta.label}</h1>
          <p className="mt-1 text-[13px] leading-6 text-slate-500">
            {meta.description} — <span className="tnum">{toFaDigits(scope.length)}</span> کالا
          </p>
        </div>
      </header>

      <CatalogView
        scope={scope}
        query={{ ...query, category: undefined }}
        basePath={`/categories/${slug}`}
        rawParams={rawParams}
      />
    </div>
  );
}
