import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-ctl)] font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-sm hover:bg-primary-700 focus-visible:outline-primary",
        secondary:
          "bg-primary-50 text-primary-700 hover:bg-primary-100",
        outline:
          "border border-line bg-white text-ink shadow-sm hover:bg-slate-50 hover:text-primary-700",
        ghost: "text-slate-600 hover:bg-slate-100 hover:text-ink",
        danger: "bg-danger text-white shadow-sm hover:bg-red-700",
        "danger-outline": "border border-red-200 bg-white text-danger hover:bg-red-50",
        accent: "bg-accent text-white shadow-sm hover:bg-accent-600",
        dark: "bg-ink text-white hover:bg-slate-800",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
      },
      fullWidth: { true: "w-full" },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, fullWidth, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
