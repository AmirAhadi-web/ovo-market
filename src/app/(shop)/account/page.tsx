import type { Metadata } from "next";

import { AccountClient } from "@/features/account/account-client";

export const metadata: Metadata = {
  title: "حساب کاربری",
  description: "مدیریت حساب کاربری، سفارش‌ها و آدرس‌ها در OVO Market",
};

export default function AccountPage() {
  return <AccountClient />;
}
