# OVO Market — فروشگاه اینترنتی مدرن

A portfolio-quality, Persian (RTL) multi-category e-commerce storefront inspired by Digikala's
shopping flows and information architecture — with a fully original visual identity.

**Frontend-only by design** — no backend, no real database, no real payment and no real
authentication. All shopping behaviour is simulated in the browser with clean, testable code.

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js (App Router) + React 19 |
| Language | TypeScript (strict, no `any`) |
| Styling | Tailwind CSS v4 (design tokens in `src/app/globals.css`) |
| UI primitives | shadcn-style components in `src/components/ui` |
| State | Zustand + persist middleware → LocalStorage |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Font | Estedad (self-hosted variable font) |
| Product data | DummyJSON API (cached + offline fallback) |
| Tests | Vitest (unit) · Playwright (e2e journey) |

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

Tests:

```bash
npx vitest run                       # unit tests (pure logic: pricing, filters, cart…)
npx playwright install               # one-time browser download
npm run build && npx playwright test # e2e: homepage → product → cart → checkout → demo success
```

No environment variables are required — the product API (DummyJSON) is public and keyless.
Optionally set `NEXT_PUBLIC_SITE_URL` for canonical sitemap URLs when deploying.

## Deploying on Vercel

1. Push the repository to GitHub.
2. Import it in Vercel (`New Project → Import`).
3. Defaults work out of the box (Next.js is auto-detected). No env vars needed.
4. (Optional) Add `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app` for the sitemap.

---

## Data source — DummyJSON

All products come from `https://dummyjson.com` via a single centralized service layer
(`src/features/products/services/product-api.ts`):

- `GET /products?limit=0` — full catalog (ISR cache, revalidated hourly)
- `GET /products/category-list` — categories
- `GET /products/{id}` — product detail
- `GET /products/search?q=` — search
- `GET /products/category/{slug}` — category pages

**Graceful degradation:** if the API is unreachable, a local snapshot of 60 products
(`src/features/products/data/fallback-products.ts`) keeps the whole storefront usable.
Broken images degrade to a local SVG placeholder.

### Currency conversion (demo)

DummyJSON prices are sample USD values. They are converted to **تومان** with a fixed,
configurable **mock rate** defined in `src/config/site.ts` (`usdToTomanRate`, default
1 USD = 100,000 Toman). This is *not* a live exchange rate — it exists purely for a
consistent, realistic demo presentation. All conversion/formatting lives in `src/lib/format.ts`.

## Brand configuration

The brand name/identity is centralized in `src/config/site.ts` — change `name`/`latinName`
and the whole site follows.

## Architecture

```
src/
  app/                 # routes — (shop) group with storefront chrome
  components/
    ui/                # design-system primitives (button, badge, forms, dialog, skeleton)
    layout/            # header, nav, footer, announcement bar, mobile bottom nav
    storefront/        # hero slider, category tiles, promos, newsletter, catalog surfaces
    product/           # product card, carousel, gallery, buy panel
    common/            # price, rating, breadcrumbs, empty states, image fallback
  features/            # cart / checkout / wishlist / account feature code
  stores/              # Zustand stores: cart, wishlist, orders, preferences (persisted)
  lib/                 # formatters, validators (zod), utils
  config/              # brand + category identity
```

- Server Components by default; Client Components only where interactivity demands it.
- Filters/sort/pagination are URL-synced (`/products?brands=…&sort=cheapest&page=2`).
- Persisted stores are hydration-safe (`useMounted` gates all localStorage-driven UI).

## Frontend-only behaviour

- Checkout is simulated client-side: no real gateway is called, no payment data is requested,
  and orders are stored in LocalStorage only.
- Login on `/account` stores a local profile — no credential verification happens.
- Reviews and seeded order history come from DummyJSON / local sample data.

## Notes & limitations

- INR: exchange rate, shipping fee and thresholds are fixed demo constants.
- Search within the API is English-only (DummyJSON dataset); Persian labels map to the
  same English slugs in `src/config/categories.ts`.
- Playwright e2e needs network access (or runs against the local fallback catalog).
