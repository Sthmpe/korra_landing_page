'use client';

// Web cart — mirrors the app's CartService, persisted in localStorage and
// scoped per store. Payment never happens here; at checkout we hand off to the
// app. A tiny pub/sub lets components react to changes.

const KEY = 'korra_web_cart_v1';
const listeners = new Set();

function read() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

function write(all) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(all));
  listeners.forEach((fn) => fn());
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getItems(vendorId) {
  return read()[vendorId] || [];
}

export function itemCount(vendorId) {
  return getItems(vendorId).reduce((n, i) => n + i.quantity, 0);
}

export function subtotal(vendorId) {
  return getItems(vendorId).reduce((s, i) => s + i.price * i.quantity, 0);
}

export function addToCart(vendorId, product, quantity = 1) {
  const all = read();
  const items = [...(all[vendorId] || [])];
  const price =
    product.discountedPrice > 0 ? product.discountedPrice : product.price;
  const idx = items.findIndex((i) => i.productId === product.id);
  if (idx >= 0) {
    items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
  } else {
    items.push({
      productId: product.id,
      name: product.name,
      code: product.code || '',
      imageUrl: product.images?.[0] || '',
      price,
      quantity,
    });
  }
  all[vendorId] = items;
  write(all);
}

export function updateQuantity(vendorId, productId, delta) {
  const all = read();
  let items = [...(all[vendorId] || [])];
  const idx = items.findIndex((i) => i.productId === productId);
  if (idx < 0) return;
  const q = items[idx].quantity + delta;
  if (q <= 0) items = items.filter((i) => i.productId !== productId);
  else items[idx] = { ...items[idx], quantity: q };
  if (items.length) all[vendorId] = items;
  else delete all[vendorId];
  write(all);
}

export function removeItem(vendorId, productId) {
  const all = read();
  const items = (all[vendorId] || []).filter((i) => i.productId !== productId);
  if (items.length) all[vendorId] = items;
  else delete all[vendorId];
  write(all);
}

export function clearCart(vendorId) {
  const all = read();
  delete all[vendorId];
  write(all);
}
