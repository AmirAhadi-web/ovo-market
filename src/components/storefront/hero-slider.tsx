"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface HeroSlide {
  image: string;
  badge: string;
  badgeClass: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  alignClass: string;
}

const SLIDES: HeroSlide[] = [
  {
    image: "/images/hero-tech.jpg",
    badge: "پیشنهاد ویژه تکنولوژی",
    badgeClass: "bg-white/15 text-white ring-1 ring-white/30",
    title: "دنیای تکنولوژی، نزدیک‌تر از همیشه",
    description: "جدیدترین گوشی‌های هوشمند، لپ‌تاپ‌ها و گجت‌ها با تخفیف‌های استثنایی",
    primaryCta: { label: "گوشی‌های هوشمند", href: "/categories/smartphones" },
    secondaryCta: { label: "لپ‌تاپ‌ها", href: "/categories/laptops" },
    alignClass: "text-white",
  },
  {
    image: "/images/hero-fashion.jpg",
    badge: "کالکشن تازه",
    badgeClass: "bg-ink/25 text-white ring-1 ring-white/40",
    title: "استایل تو، امضای توست",
    description: "شیک‌ترین پوشاک، کیف و ساعت‌های فصل را همین حالا کشف کن",
    primaryCta: { label: "لباس زنانه", href: "/categories/womens-dresses" },
    secondaryCta: { label: "ساعت مردانه", href: "/categories/mens-watches" },
    alignClass: "text-white",
  },
  {
    image: "/images/hero-beauty.jpg",
    badge: "زیبایی و مراقبت",
    badgeClass: "bg-white/25 text-ink ring-1 ring-white/60",
    title: "درخشش تو از اینجا شروع می‌شود",
    description: "عطرهای اصل و محصولات مراقبت پوست با ضمانت اورجینال",
    primaryCta: { label: "عطر و ادکلن", href: "/categories/fragrances" },
    secondaryCta: { label: "مراقبت پوست", href: "/categories/skin-care" },
    alignClass: "text-ink",
  },
];

const DURATION = 6000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = useState(false);

  const go = useCallback((i: number) => setIndex((i + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(() => go(index + 1), DURATION);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, go]);

  return (
    <section
      aria-label="پیشنهادهای ویژه"
      className="relative h-[300px] overflow-hidden rounded-2xl shadow-[var(--shadow-card)] sm:h-[340px] md:rounded-3xl lg:h-[400px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.image}
            aria-hidden={!active}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-out",
              active ? "z-10 opacity-100" : "z-0 opacity-0",
            )}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/5 to-black/45" />
            <div className="container-x relative flex h-full items-center">
              <div
                className={cn(
                  "max-w-md space-y-4 transition-all delay-100 duration-500 md:max-w-lg",
                  slide.alignClass,
                  active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
              >
                <span className={cn("inline-flex rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur", slide.badgeClass)}>
                  {slide.badge}
                </span>
                <h1 className="text-2xl font-extrabold leading-snug drop-shadow-sm md:text-4xl md:leading-[1.35]">
                  {slide.title}
                </h1>
                <p className="text-sm leading-7 opacity-90 md:text-base">{slide.description}</p>
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <Link
                    href={slide.primaryCta.href}
                    className="inline-flex h-11 items-center rounded-[var(--radius-ctl)] bg-white px-5 text-sm font-bold text-ink shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                  >
                    {slide.primaryCta.label}
                  </Link>
                  <Link
                    href={slide.secondaryCta.href}
                    className="inline-flex h-11 items-center rounded-[var(--radius-ctl)] bg-white/15 px-5 text-sm font-bold text-white ring-1 ring-white/40 backdrop-blur transition-colors hover:bg-white/25"
                  >
                    {slide.secondaryCta.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Dots */}
      <div className="absolute bottom-4 start-1/2 z-20 flex -translate-x-1/2 gap-1.5 rtl:translate-x-1/2">
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            type="button"
            onClick={() => go(i)}
            aria-label={`اسلاید ${(i + 1).toLocaleString("fa-IR")}`}
            aria-current={i === index}
            className={cn(
              "h-1.5 cursor-pointer rounded-full transition-all duration-300",
              i === index ? "w-7 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </section>
  );
}
