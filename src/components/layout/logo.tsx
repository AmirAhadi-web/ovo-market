import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Original OVO Market brand mark:
 * two rings («O O») with an accent chevron («V») between them,
 * set on a blue gradient tile.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary-400 via-primary to-primary-800 shadow-md shadow-primary/25",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 44 44" className="size-[62%]" fill="none">
        <circle cx="11" cy="22" r="5.75" stroke="#FFFFFF" strokeWidth="4" />
        <path
          d="M19.5 13.5 L27.5 30.5 L35.5 13.5"
          stroke="#F97316"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="33" cy="22" r="5.75" stroke="#FFFFFF" strokeWidth="4" />
      </svg>
    </span>
  );
}

/** Full logo: mark + «OVO Market» wordmark */
export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="OVO Market — بازگشت به صفحه اصلی"
      className={cn("flex shrink-0 items-center gap-2.5", className)}
    >
      <LogoMark className="size-10" />
      {!compact && (
        <span className="leading-none" dir="ltr">
          <span className="block text-xl font-extrabold tracking-tight text-ink">
            OVO<span className="ms-1.5 font-bold text-primary">Market</span>
          </span>
          <span className="mt-1.5 block text-[10px] font-medium tracking-[0.18em] text-slate-400">
            ONLINE SHOP
          </span>
        </span>
      )}
    </Link>
  );
}
