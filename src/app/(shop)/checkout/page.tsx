import type { Metadata } from "next";

import { CheckoutClient } from "@/features/checkout/checkout-client";

export const metadata: Metadata = {
  title: "تکمیل خرید",
  description: "ثبت سفارش و پرداخت در OVO Market",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
