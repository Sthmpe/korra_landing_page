# korra-landing

Korra's public web presence, all in one Next.js app deployed to `korra.com.ng`:

- **Landing site** — `/`, `/merchants`, `/merchant/[slug]`, `/admin`, `/privacy`, `/[categorySlug]`. Marketing pages, all client-rendered, fetching the merchant directory from the `merchants-api` Supabase function.
- **Storefront** — `/store/[slug]`, `/store/[slug]/reviews`, `/store/[slug]/p/[productId]`. Server-rendered, SEO-indexable per-merchant store pages. Talks only to the `store-api` Supabase function (never Firestore directly), so Firestore security rules stay locked.

This project used to be two separate deployments (a Vite landing page proxying `/store/*` to a standalone `korra-store` Next.js project via a Vercel rewrite). They were merged into this one app to remove that split — no more rewrite-rule ordering, no more syncing two `vercel.json`s, one real sitemap instead of a proxied `/store-sitemap.xml` workaround.

## Structure

```
app/
  layout.js              # root shell + sitewide metadata (favicon, FB domain verification)
  page.js                # home page (metadata + JSON-LD)
  merchants/              # merchant directory
  merchant/[slug]/         # merchant profile
  admin/                  # merchant-upload tool (noindex)
  privacy/
  [categorySlug]/          # legacy catch-all stub
  store/
    layout.js             # loads store.css + Inter font, scoped to /store/* only
    store.css             # storefront design system (kept separate from globals.css
                           # on purpose — its :root variables and body rules would
                           # otherwise collide with the landing page's own)
    [slug]/                # store page, reviews, product detail pages
  sitemap.js              # unified sitemap: landing pages + every store + every product
  robots.js
components/
  landing/                # landing page client components
  store/                  # storefront components (Storefront, ProductModal, CartModal, etc.)
  icons.jsx               # landing page's own icon set
lib/
  api.js, config.js, cart.js, handoff.js   # storefront data/config
  useLiveMerchants.js     # shared fetch hook for the merchant directory pages
  organizationJsonLd.js   # home page's structured data
```

## Environment

Storefront needs `SUPABASE_URL` and `SUPABASE_ANON_KEY` (set in Vercel's project env vars, or a local `.env.local`). Falls back to the test Supabase project's values if unset — see `lib/config.js`.

## Notable behavior

- Bare `/store` (no slug) redirects to the home page — see `next.config.js`.
- `/store/{unknown-slug}` shows a proper "Store not found" page (Next.js `notFound()`), distinct from the bare-`/store` redirect above.
- `/admin` is `noindex` in its page metadata and disallowed in `robots.js`.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

Deploy: `vercel --prod` from this folder — already linked to the `korra.com.ng` domain.
