"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Demo user preferences & profile.
 * This is a frontend-only demo account — no real authentication happens.
 */

export interface DemoAddress {
  id: string;
  title: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  receiver: string;
  phone: string;
}

export interface DemoProfile {
  fullName: string;
  phone: string;
  email: string;
}

interface PreferencesState {
  profile: DemoProfile | null;
  addresses: DemoAddress[];
  newsletterSubscribed: boolean;
  setProfile: (profile: DemoProfile | null) => void;
  addAddress: (address: Omit<DemoAddress, "id">) => void;
  removeAddress: (id: string) => void;
  setNewsletterSubscribed: (v: boolean) => void;
  resetAll: () => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      profile: null,
      addresses: [
        {
          id: "addr-demo-1",
          title: "منزل",
          province: "تهران",
          city: "تهران",
          address: "خیابان ولیعصر، کوچه نمونه، پلاک ۱۲، واحد ۳",
          postalCode: "1234567890",
          receiver: "کاربر نمونه",
          phone: "09121234567",
        },
      ],
      newsletterSubscribed: false,

      setProfile: (profile) => set({ profile }),

      addAddress: (address) =>
        set({
          addresses: [
            ...get().addresses,
            { ...address, id: `addr-${Date.now().toString(36)}` },
          ],
        }),

      removeAddress: (id) =>
        set({ addresses: get().addresses.filter((a) => a.id !== id) }),

      setNewsletterSubscribed: (v) => set({ newsletterSubscribed: v }),

      resetAll: () => set({ profile: null, newsletterSubscribed: false }),
    }),
    { name: "marketly-preferences-v1" },
  ),
);
