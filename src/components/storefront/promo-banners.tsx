import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    image: "/images/promo-home.jpg",
    kicker: "دکوراسیون منزل",
    title: "خانه‌ای به زیبایی رویاها",
    cta: "مشاهده محصولات",
    href: "/categories/home-decoration",
  },
  {
    image: "/images/promo-grocery.jpg",
    kicker: "سوپرمارکت OVO Market",
    title: "تازگی هر روز، در خانه‌ی شما",
    cta: "خرید مواد غذایی",
    href: "/categories/groceries",
  },
];

/** Two image promo banners between homepage product sections */
export function PromoBanners() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {banners.map((b) => (
        <Link
          key={b.image}
          href={b.href}
          className="group relative block h-44 overflow-hidden rounded-2xl shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] md:h-52"
        >
          <Image
            src={b.image}
            alt={b.title}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-ink/10 to-ink/70" />
          <div className="relative flex h-full flex-col justify-center gap-1.5 p-6 md:p-8">
            <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
              {b.kicker}
            </span>
            <h3 className="text-xl font-extrabold text-white md:text-2xl">{b.title}</h3>
            <span className="mt-1 inline-flex w-fit items-center gap-1.5 text-[13px] font-bold text-white/95">
              {b.cta}
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
