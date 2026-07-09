// The site's only data source: the Supabase `store-api` edge function.
// No Firebase SDK, no direct Firestore access — reads are fully server-brokered.

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config';

const FN = `${SUPABASE_URL}/functions/v1/store-api`;

const AUTH = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

// Cache store payloads briefly (ISR) so merchant edits (price, stock, etc.)
// appear quickly without hammering store-api on every single page view.
const REVALIDATE = 30;

// Full store payload: { store, blocked, blockedMessage, visibility, reviews,
// products, nextCursor }. Returns null when the store doesn't exist.
export async function fetchStore(slug) {
  const res = await fetch(`${FN}?slug=${encodeURIComponent(slug)}`, {
    headers: AUTH,
    next: { revalidate: REVALIDATE },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    console.error('store-api error', res.status, await res.text());
    return null;
  }
  return res.json();
}

// Store + a single product, for the product-level SSR page and its OG tags.
// Returns null when the store or product doesn't exist.
export async function fetchProduct(slug, productId) {
  const res = await fetch(
    `${FN}?slug=${encodeURIComponent(slug)}&productId=${encodeURIComponent(productId)}`,
    { headers: AUTH, next: { revalidate: REVALIDATE } },
  );
  if (!res.ok) return null;
  return res.json();
}

// Next page of products for lazy loading (client-side).
export async function fetchMoreProducts(slug, cursor) {
  const res = await fetch(
    `${FN}?slug=${encodeURIComponent(slug)}&cursor=${encodeURIComponent(cursor)}`,
    { headers: AUTH },
  );
  if (!res.ok) return { products: [], nextCursor: null };
  return res.json();
}

// All store slugs for the sitemap.
export async function fetchAllStoreSlugs() {
  const res = await fetch(`${FN}?action=slugs`, {
    headers: AUTH,
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data.slugs) ? data.slugs : [];
}

// Every approved product's { slug, productId }, for the sitemap so
// individual product pages are discoverable by crawlers.
export async function fetchAllProductUrls() {
  const res = await fetch(`${FN}?action=product-urls`, {
    headers: AUTH,
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data.urls) ? data.urls : [];
}
