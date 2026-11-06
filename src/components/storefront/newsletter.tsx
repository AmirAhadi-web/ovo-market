"use client";

import { MailCheck, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/forms";
import { usePreferencesStore } from "@/stores/preferences-store";

/** Demo newsletter signup (stored locally, no backend) */
export function Newsletter() {
  const subscribed = usePreferencesStore((s) => s.newsletterSubscribed);
  const setSubscribed = usePreferencesStore((s) => s.setNewsletterSubscribed);
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("ایمیل معتبر نیست", { description: "لطفاً یک آدرس ایمیل صحیح وارد کنید." });
      return;
    }
    setSubscribed(true);
    setEmail("");
    toast.success("عضویت شما ثبت شد", {
      description: "از این پس تخفیف‌ها و جدیدترین‌ها را زودتر از همه دریافت می‌کنید.",
    });
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-primary-800 via-primary to-primary-600 p-7 text-white shadow-[var(--shadow-card)] md:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-16 -top-16 size-64 rounded-full bg-white/10 blur-xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -end-10 size-72 rounded-full bg-accent/25 blur-xl"
      />
      <div className="relative flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="max-w-md text-center md:text-start">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold ring-1 ring-white/25">
            <MailCheck className="size-3.5" /> خبرنامه OVO Marketرکتلی
          </span>
          <h2 className="mt-3 text-xl font-extrabold md:text-2xl">از تخفیف‌ها جا نمانید!</h2>
          <p className="mt-1.5 text-sm leading-6 text-white/85">
            ایمیل خود را ثبت کنید تا جدیدترین پیشنهادها و کدهای تخفیف را زودتر از بقیه دریافت کنید.
          </p>
        </div>
        {subscribed ? (
          <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-6 py-4 ring-1 ring-white/25 backdrop-blur">
            <MailCheck className="size-6 text-green-200" />
            <div>
              <p className="text-sm font-bold">عضویت شما فعال است</p>
              <p className="mt-0.5 text-xs text-white/75">از همراهی شما سپاسگزاریم.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="flex w-full max-w-md gap-2" noValidate>
            <Input
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="آدرس ایمیل"
              className="h-12 border-transparent bg-white/95 text-ink placeholder:text-slate-400"
            />
            <Button type="submit" variant="dark" size="lg" className="shrink-0 font-bold">
              <Send className="size-4.5 rtl:-scale-x-100" />
              عضویت
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
