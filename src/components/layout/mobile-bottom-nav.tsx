"use client";

import { Heart, Home, LayoutGrid, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";

/** Fixed mobile bottom navigation */
export function MobileBottomNav() {
  const pathname = usePathname();
  const mounted = useMounted();
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const items = [
    { href: "/", label: "خانه", icon: Home, active: pathname === "/" },
    { href: "/products", label: "فروشگاه", icon: LayoutGrid, active: pathname.startsWith("/products") || pathname.startsWith("/categories") },
    { href: "/wishlist", label: "علاقه‌مندی‌ها", icon: Heart, active: pathname === "/wishlist", badge: wishlistCount },
    { href: "/cart", label: "سبد خرید", icon: ShoppingCart, active: pathname === "/cart", badge: cartCount },
    { href: "/account", label: "حساب من", icon: UserRound, active: pathname.startsWith("/account") },
  ];

  return (
    <nav
      aria-label="ناوبری موبایل"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgb(15_23_42/0.06)] backdrop-blur-md md:hidden"
    >
      <div className="grid h-16 grid-cols-5">
        {items.map(({ href, label, icon: Icon, active, badge }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "relative flex flex-col items-center justify-center gap-1 text-[10.5px] font-medium transition-colors",
              active ? "text-primary" : "text-slate-500 hover:text-ink",
            )}
          >
            <span className="relative">
              <Icon className={cn("size-5.5", active && "stroke-[2.2]")} strokeWidth={1.8} />
              {mounted && !!badge && badge > 0 && (
                <span className="tnum absolute -end-2.5 -top-1.5 grid min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold leading-4 text-white">
                  {badge > 99 ? "۹۹+" : badge.toLocaleString("fa-IR")}
                </span>
              )}
            </span>
            {label}
            {active && <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary" />}
          </Link>
        ))}
      </div>
    </nav>
  );
}
