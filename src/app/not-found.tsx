import { Compass } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60dvh] flex-col items-center justify-center gap-6 py-16 text-center">
      <p className="text-[88px] font-extrabold leading-none text-slate-200 select-none">۴۰۴</p>
      <div className="space-y-2">
        <h1 className="text-xl font-bold text-ink">صفحه مورد نظر پیدا نشد</h1>
        <p className="mx-auto max-w-sm text-sm leading-6 text-slate-500">
          ممکن است آدرس صفحه تغییر کرده باشد یا حذف شده باشد. می‌توانید از جستجو یا دسته‌بندی‌ها
          استفاده کنید.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/">
          <Compass className="size-4.5" />
          بازگشت به صفحه اصلی
        </Link>
      </Button>
    </div>
  );
}
