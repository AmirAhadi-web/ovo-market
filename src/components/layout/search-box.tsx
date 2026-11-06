"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Storefront search input — pushes queries to /search.
 * Clicking the magnifier icon submits (same as pressing Enter);
 * with an empty query it focuses the input instead.
 */
export function SearchBox({ className, autoFocus = false }: { className?: string; autoFocus?: boolean }) {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(params.get("q") ?? "");
  }, [params]);

  const submit = () => {
    const q = value.trim();
    if (!q) {
      inputRef.current?.focus();
      return;
    }
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={submit}
        aria-label="جستجو"
        title="جستجو"
        className="absolute start-0 top-0 grid h-11 w-11 cursor-pointer place-items-center rounded-s-[var(--radius-ctl)] text-slate-400 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:-outline-offset-2"
      >
        <Search className="size-4.5" />
      </button>
      <input
        ref={inputRef}
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        enterKeyHint="search"
        placeholder="جستجو در OVO Market…"
        aria-label="جستجوی محصولات"
        className="h-11 w-full rounded-[var(--radius-ctl)] border border-transparent bg-slate-100 ps-12 pe-4 text-sm text-ink transition-all placeholder:text-slate-400 hover:bg-slate-200/70 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-search-cancel-button]:hidden"
      />
    </div>
  );
}
