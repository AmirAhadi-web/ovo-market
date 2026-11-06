/**
 * Central brand + commerce configuration.
 * Change the brand identity of the whole shop from this single file.
 */
export const siteConfig = {
  /** Brand name shown across the UI (Latin brand, Persian storefront) */
  name: "OVO Market",
  /** Fallback / metadata name */
  latinName: "OVO Market",
  tagline: "تجربه‌ای تازه از خرید آنلاین",
  description:
    "OVO Market یک فروشگاه اینترنتی چند‌دسته‌ای است که تجربه‌ای مدرن، سریع و قابل اعتماد از خرید آنلاین را ارائه می‌کند.",

  /**
   * MOCK exchange rate — demo display purposes only.
   * DummyJSON prices are sample USD values; they are converted to Toman
   * purely for a consistent demo presentation. This is NOT a live rate.
   * 1 USD = 100,000 Toman (demo).
   */
  usdToTomanRate: 100_000,

  /** Demo shipping fee in USD (converted with the same mock rate) */
  shippingFeeUsd: 4.9,
  /** Orders above this USD amount get free demo shipping */
  freeShippingThresholdUsd: 60,

  currencyLabel: "تومان",

  socials: [
    { label: "لینکدین", href: "https://www.linkedin.com/in/ovomarketdemo" },
    { label: "اینستاگرام", href: "https://www.instagram.com/ovomarketdemo" },
  ],

  supportPhone: "۰۲۱-۹۱۰۰۹۱۰۰",
  supportEmail: "support@ovomarket.demo",

  /** Developer credit shown at the bottom of the site footer (English) */
  developer: {
    name: "Amir Mohammad Ahadi",
    role: "Front-End Developer",
    photo: "/images/developer.jpg",
    linkedin: "https://linkedin.com/in/amirmohammad-ahadi",
    instagram: "https://instagram.com/amirahadi_web",
    github: "https://github.com/AmirAhadi-web",
    email: "amirahadiweb@gmail.com",
    phone: "+98 939 387 1582",
  },
} as const;
