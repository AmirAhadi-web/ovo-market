"use client";

import { useEffect, useState } from "react";

/** Countdown to local midnight — demo urgency element for special offers. */
export function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      setRemaining(Math.max(0, midnight.getTime() - now.getTime()));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const t = remaining ?? 0;
  const h = Math.floor(t / 3_600_000);
  const m = Math.floor((t % 3_600_000) / 60_000);
  const s = Math.floor((t % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0").replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

  return (
    <span
      role="timer"
      aria-label="زمان باقی‌مانده پیشنهاد"
      className="tnum inline-flex items-center gap-1 rounded-lg bg-ink/10 px-2.5 py-1 text-sm font-bold tabular-nums text-white/95"
      dir="ltr"
    >
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  );
}
