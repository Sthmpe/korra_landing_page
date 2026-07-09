// Central config. The site talks ONLY to the Supabase store-api function —
// it never reads Firestore directly, so Firestore rules stay locked.

export const SUPABASE_URL = (
  process.env.SUPABASE_URL || 'https://ltytmqjpektcgwajfzfm.supabase.co'
).replace(/\/$/, '');

// Anon key is public-safe (it only unlocks the read-only store-api).
export const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0eXRtcWpwZWt0Y2d3YWpmemZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NzAxNDgsImV4cCI6MjA3MjM0NjE0OH0.ABKFE8k0pPxgieXYd5sKUkeymtjLImS0pDbwN-6TQlc';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://korra.com.ng'
).replace(/\/$/, '');

export const CUSTOMER_WEBAPP =
  process.env.NEXT_PUBLIC_CUSTOMER_WEBAPP || 'https://app.korra.com.ng';

export const MERCHANT_WEBAPP =
  process.env.NEXT_PUBLIC_MERCHANT_WEBAPP || 'https://business.korra.com.ng';

export const ANDROID_PLAY_URL =
  process.env.NEXT_PUBLIC_ANDROID_PLAY_URL ||
  'https://play.google.com/store/apps/details?id=com.korra.shop.live';

// The canonical customer app link for a store — the same URL the Flutter app
// registers as an Android App Link.
export function storeUrl(slug) {
  return `${SITE_URL}/store/${slug}`;
}

// Deep link to a single product's details, used for product-level share and
// its own OG preview.
export function productUrl(slug, productId) {
  return `${SITE_URL}/store/${slug}/p/${productId}`;
}

// Branded default OG image used when a merchant hasn't uploaded a cover/logo,
// so every store link still shows a preview when shared. Absolute URL so social
// crawlers (WhatsApp, X, Facebook) can fetch it.
export const OG_FALLBACK_IMAGE = `${SITE_URL}/korra_logo_icon_og.jpeg`;

export const BRAND = {
  name: 'Korra',
  color: '#A54600',
  colorLight: '#FFF2EB',
  tagline: 'Reserve today. Complete at your pace.',
};
