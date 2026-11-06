import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { siteConfig } from "@/config/site";

import "./globals.css";

const yekanBakh = localFont({
  src: [
    { path: "../../public/fonts/YekanBakh-Thin.ttf", weight: "100", style: "normal" },
    { path: "../../public/fonts/YekanBakh-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/YekanBakh-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/YekanBakh-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/YekanBakh-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/YekanBakh-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../../public/fonts/YekanBakh-Black.ttf", weight: "900", style: "normal" },
    { path: "../../public/fonts/YekanBakh-ExtraBlack.ttf", weight: "950", style: "normal" },
  ],
  display: "swap",
  variable: "--font-yekan-bakh",
});

export const metadata: Metadata = {
  title: {
    default: "OVO Market",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    locale: "fa_IR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${yekanBakh.variable} font-sans`}>
        {children}
        <Toaster
          position="top-center"
          richColors
          closeButton
          dir="rtl"
          toastOptions={{ style: { fontFamily: "inherit" } }}
        />
      </body>
    </html>
  );
}
