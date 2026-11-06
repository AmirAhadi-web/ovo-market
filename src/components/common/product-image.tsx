"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

const FALLBACK_SRC = "/images/placeholder-product.svg";

/**
 * Product image with graceful failure handling:
 * if the remote image cannot be loaded a local placeholder is rendered
 * instead, so no broken or stretched imagery ever appears.
 */
export function ProductImage({
  src,
  alt,
  className,
  ...props
}: Omit<ImageProps, "src" | "alt"> & { src: string | undefined; alt: string }) {
  const [failed, setFailed] = useState(false);
  const safeSrc = !src || failed ? FALLBACK_SRC : src;

  return (
    <Image
      src={safeSrc}
      alt={alt}
      unoptimized={failed || !src}
      onError={() => setFailed(true)}
      className={cn(failed && "object-contain p-6 opacity-60", className)}
      {...props}
    />
  );
}
