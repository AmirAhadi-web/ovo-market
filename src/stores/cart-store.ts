"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  clampQuantity,
  type CartLineSnapshot,
} from "@/features/cart/utils/cart-utils";
import type { Product } from "@/features/products/types/product";

interface CartState {
  items: CartLineSnapshot[];
  /** Add a product (or increase its quantity), clamped to available stock */
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  /** Set an exact quantity; 0 or less removes the line */
  setQuantity: (productId: number, quantity: number) => void;
  /** Refresh stored stock for a product (keeps carts honest) */
  syncStock: (productId: number, stock: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.productId === product.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === product.id
                ? { ...i, stock: product.stock, quantity: clampQuantity(i.quantity + quantity, product.stock) }
                : i,
            ),
          });
          return;
        }
        if (product.stock <= 0) return;
        const line: CartLineSnapshot = {
          productId: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          priceUsd: product.price,
          discountPercentage: product.discountPercentage,
          stock: product.stock,
          quantity: clampQuantity(quantity, product.stock),
        };
        set({ items: [...items, line] });
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),

      setQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: clampQuantity(quantity, i.stock) }
              : i,
          ),
        });
      },

      syncStock: (productId, stock) =>
        set({
          items: get().items.map((i) =>
            i.productId === productId
              ? { ...i, stock, quantity: clampQuantity(i.quantity, stock) }
              : i,
          ),
        }),

      clearCart: () => set({ items: [] }),
    }),
    { name: "marketly-cart-v1" },
  ),
);
