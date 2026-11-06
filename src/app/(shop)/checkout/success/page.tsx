import type { Metadata } from "next";

import { OrderSuccessClient } from "@/features/checkout/success-client";

export const metadata: Metadata = {
  title: "سفارش ثبت شد",
  description: "سفارش شما با موفقیت ثبت شد",
};

export default function CheckoutSuccessPage() {
  return <OrderSuccessClient />;
}
