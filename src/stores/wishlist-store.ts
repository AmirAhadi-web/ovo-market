"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Product } from "@/features/products/types/product";

export interface WishlistItem {
  productId: number;
  title: string;
  thumbnail: string;
  priceUsd: number;
  discountPercentage: number;
  rating: number;
  category: string;
  stock: number;
}

interface WishlistState {
  items: WishlistItem[];
  toggle: (product: Product) => void;
  remove: (productId: number) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (product) => {
        const items = get().items;
        if (items.some((i) => i.productId === product.id)) {
          set({ items: items.filter((i) => i.productId !== product.id) });
          return;
        }
        const item: WishlistItem = {
          productId: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          priceUsd: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          category: product.category,
          stock: product.stock,
        };
        set({ items: [item, ...items] });
      },

      remove: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),

      clear: () => set({ items: [] }),
    }),
    { name: "marketly-wishlist-v1" },
  ),
);

/** Selector helper — is a product in the wishlist? */
export const selectIsWishlisted = (productId: number) => (state: WishlistState) =>
  state.items.some((i) => i.productId === productId);
