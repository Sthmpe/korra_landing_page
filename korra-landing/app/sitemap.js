import { fetchAllStoreSlugs, fetchAllProductUrls } from '@/lib/api';
import { productUrl } from '@/lib/config';

// Unified sitemap: landing pages + every store + every product. Replaces the
// old two-sitemap setup (a static landing sitemap.xml plus a
// /store-sitemap.xml proxy to a separate Next.js project) now that both live
// in one app.
export const revalidate = 3600;

export default async function sitemap() {
  const base = [
    { url: 'https://korra.com.ng/', changeFrequency: 'weekly', priority: 1 },
    { url: 'https://korra.com.ng/privacy', changeFrequency: 'yearly', priority: 0.2 },
  ];

  let slugs = [];
  try {
    slugs = await fetchAllStoreSlugs();
  } catch (e) {
    console.error('sitemap: failed to load store slugs', e);
  }
  const stores = slugs.map((slug) => ({
    url: `https://korra.com.ng/store/${slug}`,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  let productUrls = [];
  try {
    productUrls = await fetchAllProductUrls();
  } catch (e) {
    console.error('sitemap: failed to load product urls', e);
  }
  const products = productUrls.map(({ slug, productId }) => ({
    url: productUrl(slug, productId),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...base, ...stores, ...products];
}
