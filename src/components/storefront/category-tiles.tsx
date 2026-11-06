import Link from "next/link";

import { featuredCategorySlugs, getCategoryMeta } from "@/config/categories";

/** Homepage popular-category shortcuts */
export function CategoryTiles() {
  return (
    <div className="grid grid-cols-4 gap-2.5 md:grid-cols-8 md:gap-4">
      {featuredCategorySlugs.map((slug, i) => {
        const meta = getCategoryMeta(slug);
        const Icon = meta.icon;
        return (
          <Link
            key={slug}
            href={`/categories/${slug}`}
            style={{ animationDelay: `${i * 60}ms` }}
            className="group flex animate-[fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both] flex-col items-center gap-2.5 rounded-xl border border-line bg-white p-3 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-card-hover)] md:p-4"
          >
            <span
              className={`grid size-12 place-items-center rounded-full transition-transform group-hover:scale-110 md:size-14 ${meta.tone}`}
            >
              <Icon className="size-5.5 md:size-6.5" strokeWidth={1.8} />
            </span>
            <span className="text-center text-[11px] font-medium leading-4.5 text-slate-700 md:text-xs">
              {meta.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
