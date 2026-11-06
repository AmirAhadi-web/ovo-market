"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Accessible modal + bottom-sheet built on Radix Dialog. */

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  className,
  children,
  side = "center",
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & { side?: "center" | "bottom" }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-[2px] data-[state=open]:animate-[fade-in_0.2s_ease_both]" />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 flex max-h-[92dvh] flex-col gap-4 overflow-y-auto bg-white p-5 shadow-[var(--shadow-pop)] focus:outline-none",
          side === "bottom"
            ? "inset-x-0 bottom-0 animate-[slide-up_0.35s_cubic-bezier(0.16,1,0.3,1)_both] rounded-t-3xl"
            : "start-1/2 top-1/2 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 animate-[fade-in_0.2s_ease_both] rounded-2xl rtl:translate-x-1/2",
          className,
        )}
        {...props}
      >
        {side === "bottom" && (
          <div className="mx-auto -mt-1 mb-1 h-1.5 w-12 shrink-0 rounded-full bg-slate-200" />
        )}
        {children}
        <DialogPrimitive.Close
          aria-label="بستن"
          className="absolute end-4 top-4 grid size-8 cursor-pointer place-items-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="size-4.5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("space-y-1.5 pe-8", className)} {...props} />;
}

export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-bold text-ink", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm leading-6 text-slate-500", className)}
      {...props}
    />
  );
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}
