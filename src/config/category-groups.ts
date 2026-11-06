import type { LucideIcon } from "lucide-react";
import {
  Car,
  Cpu,
  Dumbbell,
  Lamp,
  Shirt,
  ShoppingBasket,
  Sparkles,
  Watch,
} from "lucide-react";

/**
 * Top-level («کلی») category groups. Each group lists its DummyJSON
 * sub-category slugs — rendered as parent sections in the navigation menus.
 */
export interface CategoryGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  slugs: string[];
}

export const categoryGroups: CategoryGroup[] = [
  {
    id: "digital",
    label: "کالای دیجیتال",
    icon: Cpu,
    slugs: ["smartphones", "laptops", "tablets", "mobile-accessories"],
  },
  {
    id: "fashion",
    label: "مد و پوشاک",
    icon: Shirt,
    slugs: ["mens-shirts", "womens-dresses", "tops", "mens-shoes", "womens-shoes", "womens-bags"],
  },
  {
    id: "accessories",
    label: "ساعت و اکسسوری",
    icon: Watch,
    slugs: ["mens-watches", "womens-watches", "sunglasses", "womens-jewellery"],
  },
  {
    id: "beauty",
    label: "زیبایی و سلامت",
    icon: Sparkles,
    slugs: ["beauty", "skin-care", "fragrances"],
  },
  {
    id: "home",
    label: "خانه و آشپزخانه",
    icon: Lamp,
    slugs: ["furniture", "home-decoration", "kitchen-accessories"],
  },
  {
    id: "grocery",
    label: "خوراک و سوپرمارکت",
    icon: ShoppingBasket,
    slugs: ["groceries"],
  },
  {
    id: "sports",
    label: "ورزش و سفر",
    icon: Dumbbell,
    slugs: ["sports-accessories"],
  },
  {
    id: "vehicle",
    label: "خودرو و موتورسیکلت",
    icon: Car,
    slugs: ["vehicle", "motorcycle"],
  },
];

/** Groups limited to categories actually present in the catalog */
export function visibleGroups(availableSlugs: string[]): CategoryGroup[] {
  const available = new Set(availableSlugs);
  return categoryGroups
    .map((g) => ({ ...g, slugs: g.slugs.filter((s) => available.has(s)) }))
    .filter((g) => g.slugs.length > 0);
}
