import type { Metadata } from "next";

import { WishlistClient } from "@/features/wishlist/wishlist-client";

export const metadata: Metadata = {
  title: "لیست علاقه‌مندی‌ها",
  description: "کالاهای مورد علاقه شما در OVO Market",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
