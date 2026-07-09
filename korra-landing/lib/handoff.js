'use client';

import { SITE_URL, CUSTOMER_WEBAPP, ANDROID_PLAY_URL } from './config';

// Detect platform once.
export function getPlatform() {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return 'android';
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  return 'other';
}

// Build the canonical app link for a store, optionally carrying intent so the
// app can open the right place (a product, or the cart, and installment vs
// outright). The Flutter DeepLinkService reads these query params.
export function appStoreLink(slug, { productId, cartIds, action } = {}) {
  const params = new URLSearchParams();
  if (productId) params.set('product', productId);
  if (cartIds && cartIds.length) params.set('cart', cartIds.join(','));
  if (action) params.set('action', action); // 'installment' | 'outright'
  const qs = params.toString();
  return `${SITE_URL}/store/${slug}${qs ? `?${qs}` : ''}`;
}

// Payment always happens in the app. Hand the shopper off:
//   Android → the App Link (opens the app; Play Store fallback if not installed)
//   iOS/desktop → the customer web app (with the same intent params)
export function handoffToApp(slug, intent = {}) {
  const platform = getPlatform();
  const appLink = appStoreLink(slug, intent);

  if (platform === 'android') {
    const t = setTimeout(() => {
      window.location.href = ANDROID_PLAY_URL;
    }, 1200);
    window.addEventListener(
      'visibilitychange',
      () => {
        if (document.visibilityState === 'hidden') clearTimeout(t);
      },
      { once: true },
    );
    window.location.href = appLink;
  } else {
    // Carry the same intent to the web app storefront path.
    const params = new URLSearchParams();
    if (intent.productId) params.set('product', intent.productId);
    if (intent.cartIds && intent.cartIds.length) params.set('cart', intent.cartIds.join(','));
    if (intent.action) params.set('action', intent.action);
    const qs = params.toString();
    window.location.href = `${CUSTOMER_WEBAPP}/store/${slug}${qs ? `?${qs}` : ''}`;
  }
}
