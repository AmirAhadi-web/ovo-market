import type { Metadata } from "next";

import { CartClient } from "@/features/cart/cart-client";

export const metadata: Metadata = {
  title: "سبد خرید",
  description: "مرور و مدیریت کالاهای سبد خرید شما در OVO Market",
};

export default function CartPage() {
  return <CartClient />;
}
