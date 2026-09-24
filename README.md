# ＹＡＮÈＬＬＥ

Quiet-luxury storefront for women's bags, clothing, and accessories.

## Stack

Next.js App Router · TypeScript · Tailwind · shadcn/ui · Framer Motion · next-intl · Zustand

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → redirects to `/uk`.

## Features

- Languages: UK, EN, PL, FR, DE, ES
- Currencies: UAH, USD, EUR
- Catalog, collections, lookbook, wishlist, cart, checkout
- Payment: online (demo order) or cash on delivery (COD)
- Admin demo: `/admin` — password `yanelle2026`

## Replace later

- Product photos in `src/data/products.ts` (`images` URLs)
- Real payment gateway (LiqPay / Fondy / Stripe)
- Supabase for products/orders + real admin auth
- Domain + Google Analytics + social links
