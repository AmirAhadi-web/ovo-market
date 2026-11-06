import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-md font-medium leading-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        secondary: "bg-slate-100 text-slate-700",
        outline: "border border-line bg-white text-slate-600",
        accent: "bg-accent text-white",
        "accent-soft": "bg-accent-50 text-accent-600",
        success: "bg-success text-white",
        "success-soft": "bg-green-50 text-success",
        danger: "bg-danger text-white",
        "danger-soft": "bg-red-50 text-danger",
        dark: "bg-ink text-white",
      },
      size: {
        sm: "px-1.5 py-1 text-[11px]",
        md: "px-2.5 py-1.5 text-xs",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface BadgeProps
  extends ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size, className }))} {...props} />;
}
