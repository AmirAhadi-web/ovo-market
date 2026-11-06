"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { fallbackProducts } from "@/features/products/data/fallback-products";
import { generateOrderRef, usdToToman } from "@/lib/format";

/**
 * Local demo orders & coupons.
 *
 * The project has no backend, so orders placed through the simulated checkout
 * are stored in LocalStorage together with a small set of seeded demo orders
 * (used for the account order history).
 */

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  processing: "در حال پردازش",
  shipped: "ارسال‌شده",
  delivered: "تحویل‌شده",
  cancelled: "لغوشده",
};

export interface DemoOrderItem {
  productId: number;
  title: string;
  thumbnail: string;
  quantity: number;
  unitToman: number;
}

export interface DemoOrder {
  id: string;
  ref: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: DemoOrderItem[];
  subtotalToman: number;
  discountToman: number;
  shippingToman: number;
  totalToman: number;
  status: OrderStatus;
}

export interface DemoCoupon {
  id: string;
  code: string;
  percent: number;
  active: boolean;
}

function seedOrder(idx: number, daysAgo: number, status: OrderStatus): DemoOrder {
  const slice = fallbackProducts.slice(idx * 2, idx * 2 + 2);
  const items: DemoOrderItem[] = slice.map((p, i) => {
    const finalUsd =
      p.discountPercentage > 0 ? p.price * (1 - p.discountPercentage / 100) : p.price;
    return {
      productId: p.id,
      title: p.title,
      thumbnail: p.thumbnail,
      quantity: (idx % 3) + i + 1,
      unitToman: usdToToman(finalUsd),
    };
  });
  const subtotal = items.reduce((s, i) => s + i.unitToman * i.quantity, 0);
  const shipping = 490_000;
  return {
    id: `seed-order-${idx}`,
    ref: generateOrderRef(),
    createdAt: new Date(Date.now() - daysAgo * 86_400_000).toISOString(),
    customerName: ["سارا محمدی", "علی رضایی", "نیلوفر کریمی", "رضا احمدی", "مریم حسینی", "امیر تهرانی"][idx % 6],
    customerPhone: "09121234567",
    address: "تهران، خیابان ولیعصر، کوچه نمونه، پلاک ۱۲",
    items,
    subtotalToman: subtotal,
    discountToman: 0,
    shippingToman: shipping,
    totalToman: subtotal + shipping,
    status,
  };
}

function seedOrders(): DemoOrder[] {
  return [
    seedOrder(0, 0, "processing"),
    seedOrder(1, 1, "processing"),
    seedOrder(2, 3, "shipped"),
    seedOrder(3, 5, "shipped"),
    seedOrder(4, 9, "delivered"),
    seedOrder(5, 12, "delivered"),
    seedOrder(8, 15, "cancelled"),
  ];
}

function seedCoupons(): DemoCoupon[] {
  return [
    { id: "c1", code: "WELCOME10", percent: 10, active: true },
    { id: "c2", code: "OVOMARKET25", percent: 25, active: true },
    { id: "c3", code: "EXPIRED15", percent: 15, active: false },
  ];
}

interface OrdersState {
  orders: DemoOrder[];
  coupons: DemoCoupon[];
  registerOrder: (order: DemoOrder) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  upsertCoupon: (coupon: DemoCoupon) => void;
  removeCoupon: (id: string) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: seedOrders(),
      coupons: seedCoupons(),

      registerOrder: (order) => set({ orders: [order, ...get().orders] }),

      updateOrderStatus: (id, status) =>
        set({ orders: get().orders.map((o) => (o.id === id ? { ...o, status } : o)) }),

      upsertCoupon: (coupon) => {
        const coupons = get().coupons;
        if (coupons.some((c) => c.id === coupon.id)) {
          set({ coupons: coupons.map((c) => (c.id === coupon.id ? coupon : c)) });
        } else {
          set({ coupons: [coupon, ...coupons] });
        }
      },

      removeCoupon: (id) => set({ coupons: get().coupons.filter((c) => c.id !== id) }),
    }),
    { name: "marketly-orders-v1" },
  ),
);
