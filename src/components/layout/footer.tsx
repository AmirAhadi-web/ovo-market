import { CreditCard, Headset, Mail, Phone, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { Logo } from "@/components/layout/logo";
import { getCategoryMeta } from "@/config/categories";
import { siteConfig } from "@/config/site";

const trustItems = [
  { icon: Truck, title: "ارسال سریع", desc: "به سراسر کشور" },
  { icon: ShieldCheck, title: "ضمانت اصالت", desc: "کالاهای اورجینال" },
  { icon: CreditCard, title: "پرداخت امن", desc: "با درگاه‌های معتبر" },
  { icon: Headset, title: "پشتیبانی", desc: "۷ روز هفته، ۲۴ ساعته" },
];

const shopLinks = [
  { label: "همه کالاها", href: "/products" },
  { label: "پیشنهاد شگفت‌انگیز", href: "/products?onSale=1" },
  { label: "پرفروش‌ترین‌ها", href: "/products?sort=popular" },
  { label: "جدیدترین‌ها", href: "/products?sort=newest" },
  { label: "جستجوی پیشرفته", href: "/search" },
];

const accountLinks = [
  { label: "حساب کاربری", href: "/account" },
  { label: "سبد خرید", href: "/cart" },
  { label: "علاقه‌مندی‌ها", href: "/wishlist" },
  { label: "پیگیری سفارش", href: "/account#orders" },
];

const socialIcons = [LinkedinIcon, InstagramIcon];

export function Footer() {
  const dev = siteConfig.developer;

  return (
    <footer className="mt-12 border-t border-line bg-white">
      {/* Trust strip */}
      <div className="container-x grid grid-cols-2 gap-4 border-b border-line py-7 lg:grid-cols-4">
        {trustItems.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary">
              <Icon className="size-5.5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">{title}</p>
              <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="container-x grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-[13px] leading-6 text-slate-500">
            OVO Market، فروشگاه اینترنتی چند‌دسته‌ای با تمرکز بر تجربه خرید آسان، قیمت منصفانه و
            ارسال سریع.
          </p>
          <div className="flex items-center gap-2">
            {siteConfig.socials.map((s, i) => {
              const Icon = socialIcons[i % socialIcons.length];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-lg border border-line text-slate-500 transition-colors hover:border-primary hover:bg-primary-50 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="پیوندهای فروشگاه">
          <h3 className="mb-4 text-sm font-bold text-ink">فروشگاه</h3>
          <ul className="space-y-2.5">
            {shopLinks.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} className="text-[13px] text-slate-500 transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="پیوندهای حساب کاربری">
          <h3 className="mb-4 text-sm font-bold text-ink">حساب کاربری</h3>
          <ul className="space-y-2.5">
            {accountLinks.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} className="text-[13px] text-slate-500 transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="دسته‌بندی‌های پرطرفدار">
          <h3 className="mb-4 text-sm font-bold text-ink">دسته‌های پرطرفدار</h3>
          <ul className="space-y-2.5">
            {["smartphones", "laptops", "fragrances", "mens-watches", "womens-dresses"].map((slug) => (
              <li key={slug}>
                <Link
                  href={`/categories/${slug}`}
                  className="text-[13px] text-slate-500 transition-colors hover:text-primary"
                >
                  {getCategoryMeta(slug).label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line bg-slate-50">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-4 text-center text-xs text-slate-500 md:flex-row md:text-start">
          <p>
            © {new Date().getFullYear().toLocaleString("fa-IR", { useGrouping: false })}{" "}
            <span dir="ltr" className="font-semibold">{siteConfig.name}</span>
          </p>
          <p className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Phone className="size-3.5" /> {siteConfig.supportPhone}
            </span>
            <span className="hidden h-3 w-px bg-slate-300 sm:block" />
            <span className="hidden items-center gap-1 sm:flex">
              <Mail className="size-3.5" /> <span dir="ltr">{siteConfig.supportEmail}</span>
            </span>
          </p>
        </div>
      </div>

      {/* Developer credit — English, at the very bottom of the footer */}
      <div className="container-x pb-10 pt-8" dir="ltr">
        <section
          aria-label="About the developer"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-ink via-slate-900 to-primary-950 p-6 text-left text-white shadow-[var(--shadow-pop)] md:p-9"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-20 size-64 rounded-full bg-primary/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-10 size-72 rounded-full bg-accent/20 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-7 md:flex-row md:items-center">
            {/* Photo */}
            <span className="relative block size-28 shrink-0 overflow-hidden rounded-3xl ring-4 ring-white/15 md:size-36">
              <Image
                src={dev.photo}
                alt={`${dev.name} — ${dev.role}`}
                fill
                sizes="(max-width: 768px) 112px, 144px"
                priority
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20"
              />
            </span>

            {/* Info */}
            <div className="min-w-0 flex-1 text-center md:text-left">
              <p className="text-[11px] font-bold tracking-[0.2em] text-primary-300">
                DEVELOPED BY
              </p>
              <h2 className="mt-1.5 text-xl font-extrabold md:text-2xl">{dev.name}</h2>
              <p className="mt-0.5 text-sm font-medium text-primary-200">{dev.role}</p>

              {/* Contact chips */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white ring-1 ring-white/15 backdrop-blur transition-all hover:bg-white/20 hover:ring-white/30"
                >
                  <LinkedinIcon className="size-4" />
                  LinkedIn
                </a>
                <a
                  href={dev.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white ring-1 ring-white/15 backdrop-blur transition-all hover:bg-white/20 hover:ring-white/30"
                >
                  <InstagramIcon className="size-4" />
                  Instagram
                </a>
                <a
                  href={dev.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white ring-1 ring-white/15 backdrop-blur transition-all hover:bg-white/20 hover:ring-white/30"
                >
                  <GithubIcon className="size-4" />
                  GitHub
                </a>
                <a
                  href={`mailto:${dev.email}`}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white ring-1 ring-white/15 backdrop-blur transition-all hover:bg-white/20 hover:ring-white/30"
                >
                  <Mail className="size-4" />
                  {dev.email}
                </a>
                <a
                  href={`tel:${dev.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white ring-1 ring-white/15 backdrop-blur transition-all hover:bg-white/20 hover:ring-white/30"
                >
                  <Phone className="size-4" />
                  {dev.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
