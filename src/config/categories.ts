import type { LucideIcon } from "lucide-react";
import {
  Bike,
  Car,
  CookingPot,
  Droplets,
  Dumbbell,
  Flower2,
  Footprints,
  Gem,
  Glasses,
  Handbag,
  Headphones,
  Lamp,
  Laptop,
  Layers,
  Package,
  Shirt,
  ShoppingBasket,
  Smartphone,
  Sofa,
  Sparkles,
  SprayCan,
  Tablet,
  Watch,
} from "lucide-react";

export interface CategoryMeta {
  /** Persian display label */
  label: string;
  icon: LucideIcon;
  /** Tailwind classes for the tile background + icon color */
  tone: string;
  /** Short Persian description used on category pages */
  description: string;
}

/**
 * Original Persian identity for every DummyJSON category slug.
 * Slugs are the canonical API identifiers and must stay in English.
 */
export const categoryMeta: Record<string, CategoryMeta> = {
  beauty: {
    label: "زیبایی و آرایشی",
    icon: Sparkles,
    tone: "bg-pink-50 text-pink-600",
    description: "محصولات آرایشی و زیبایی از برندهای شناخته‌شده",
  },
  fragrances: {
    label: "عطر و ادکلن",
    icon: SprayCan,
    tone: "bg-violet-50 text-violet-600",
    description: "عطرهای زنانه و مردانه با رایحه‌های ماندگار",
  },
  furniture: {
    label: "مبلمان و صندلی",
    icon: Sofa,
    tone: "bg-amber-50 text-amber-600",
    description: "مبلمان مدرن و راحت برای خانه و محل کار",
  },
  groceries: {
    label: "خوراک و مواد غذایی",
    icon: ShoppingBasket,
    tone: "bg-green-50 text-green-600",
    description: "مواد غذایی تازه و کالاهای مصرفی روزمره",
  },
  "home-decoration": {
    label: "دکوراسیون منزل",
    icon: Lamp,
    tone: "bg-orange-50 text-orange-600",
    description: "اکسسوری‌های زیبا برای فضایی دلنشین‌تر",
  },
  "kitchen-accessories": {
    label: "لوازم آشپزخانه",
    icon: CookingPot,
    tone: "bg-red-50 text-red-600",
    description: "ابزار و ظروف کاربردی برای آشپزی حرفه‌ای",
  },
  laptops: {
    label: "لپ‌تاپ",
    icon: Laptop,
    tone: "bg-blue-50 text-blue-600",
    description: "لپ‌تاپ‌های کار‌شده برای کار، تحصیل و بازی",
  },
  "mens-shirts": {
    label: "پیراهن مردانه",
    icon: Shirt,
    tone: "bg-sky-50 text-sky-600",
    description: "پیراهن‌های رسمی و اسپرت مردانه",
  },
  "mens-shoes": {
    label: "کفش مردانه",
    icon: Footprints,
    tone: "bg-stone-100 text-stone-600",
    description: "کفش‌های راحتی، رسمی و ورزشی مردانه",
  },
  "mens-watches": {
    label: "ساعت مردانه",
    icon: Watch,
    tone: "bg-slate-100 text-slate-600",
    description: "ساعتهای کلاسیک و مدرن مردانه",
  },
  "mobile-accessories": {
    label: "جانبی موبایل",
    icon: Headphones,
    tone: "bg-indigo-50 text-indigo-600",
    description: "هندزفری، کاور، شارژر و سایر لوازم جانبی",
  },
  motorcycle: {
    label: "موتورسیکلت",
    icon: Bike,
    tone: "bg-zinc-100 text-zinc-700",
    description: "موتورسیکلت‌های شهری و جاده‌ای",
  },
  "skin-care": {
    label: "مراقبت پوست",
    icon: Droplets,
    tone: "bg-rose-50 text-rose-600",
    description: "محصولات مراقبت و بهداشت پوست",
  },
  smartphones: {
    label: "گوشی هوشمند",
    icon: Smartphone,
    tone: "bg-blue-50 text-blue-600",
    description: "جدیدترین گوشی‌های هوشمند بازار",
  },
  "sports-accessories": {
    label: "لوازم ورزشی",
    icon: Dumbbell,
    tone: "bg-emerald-50 text-emerald-600",
    description: "تجهیزات و پوشاک ورزشی برای سبک زندگی فعال",
  },
  sunglasses: {
    label: "عینک آفتابی",
    icon: Glasses,
    tone: "bg-cyan-50 text-cyan-600",
    description: "عینک‌های آفتابی شیک با حفاظت UV",
  },
  tablets: {
    label: "تبلت",
    icon: Tablet,
    tone: "bg-sky-50 text-sky-600",
    description: "تبلت‌های سبک و قدرتمند برای کار و سرگرمی",
  },
  tops: {
    label: "تاپ و تیشرت زنانه",
    icon: Layers,
    tone: "bg-fuchsia-50 text-fuchsia-600",
    description: "تاپ‌ها و تیشرت‌های راحت زنانه",
  },
  vehicle: {
    label: "خودرو",
    icon: Car,
    tone: "bg-gray-100 text-gray-600",
    description: "خودروهای سواری در مدل‌های متنوع",
  },
  "womens-bags": {
    label: "کیف زنانه",
    icon: Handbag,
    tone: "bg-rose-50 text-rose-500",
    description: "کیف‌های دستی و دوشی زنانه",
  },
  "womens-dresses": {
    label: "لباس زنانه",
    icon: Flower2,
    tone: "bg-pink-50 text-pink-500",
    description: "پیراهن و لباس‌های شیک زنانه",
  },
  "womens-jewellery": {
    label: "زیورآلات",
    icon: Gem,
    tone: "bg-yellow-50 text-yellow-600",
    description: "گردنبند، دستبند و زیورآلات ظریف",
  },
  "womens-shoes": {
    label: "کفش زنانه",
    icon: Footprints,
    tone: "bg-orange-50 text-orange-500",
    description: "کفشهای راحتی و مجلسی زنانه",
  },
  "womens-watches": {
    label: "ساعت زنانه",
    icon: Watch,
    tone: "bg-violet-50 text-violet-500",
    description: "ساعتهای ظریف و شیک زنانه",
  },
};

export const fallbackCategoryMeta: CategoryMeta = {
  label: "سایر کالاها",
  icon: Package,
  tone: "bg-slate-100 text-slate-600",
  description: "مشاهده محصولات این دسته‌بندی",
};

export function getCategoryMeta(slug: string): CategoryMeta {
  return categoryMeta[slug] ?? fallbackCategoryMeta;
}

/** Categories highlighted on the homepage tiles section */
export const featuredCategorySlugs = [
  "smartphones",
  "laptops",
  "fragrances",
  "skin-care",
  "mens-watches",
  "womens-dresses",
  "furniture",
  "groceries",
] as const;
