import { notFound } from 'next/navigation';
import Link from 'next/link';

import { fetchStore, fetchProduct } from '@/lib/api';
import { CUSTOMER_WEBAPP, storeUrl, productUrl, OG_FALLBACK_IMAGE } from '@/lib/config';
import { Star } from '@/components/store/Icons';
import Storefront from '@/components/store/Storefront';

export const revalidate = 300;

function priceOf(p) {
  const disc = Number(p.discountedPrice || 0);
  return disc > 0 ? disc : Number(p.price || 0);
}

export async function generateMetadata({ params }) {
  const data = await fetchProduct(params.slug, params.productId);
  if (!data || !data.store || !data.product) {
    return { title: 'Product not found', robots: { index: false } };
  }
  const { store: s, product: p } = data;
  const url = productUrl(params.slug, params.productId);
  const image = p.images?.[0] || s.coverUrl || s.logoUrl || OG_FALLBACK_IMAGE;
  const metaDescription = p.description || `${p.name} on ${s.name}, shop it on Korra.`;
  const shareDescription =
    p.description || `${p.name} for ${naira(priceOf(p))} on ${s.name}. Pay outright or in instalments with Korra.`;
  const title = `${p.name} · ${s.name} on Korra`;
  return {
    title: { absolute: title },
    description: metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: shareDescription,
      url,
      type: 'website',
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: shareDescription,
      images: [image],
    },
  };
}

function naira(n) {
  return `₦${Number(n || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`;
}

export default async function ProductPage({ params }) {
  const { slug, productId } = params;
  const [storeData, productData] = await Promise.all([
    fetchStore(slug),
    fetchProduct(slug, productId),
  ]);
  if (!storeData || !storeData.store || !productData || !productData.product) notFound();

  const s = storeData.store;
  const product = productData.product;
  const url = storeUrl(slug);

  if (storeData.blocked) {
    const msg =
      storeData.blockedMessage ||
      'This store has been suspended or restricted due to a policy or compliance issue on Korra.';
    return (
      <>
        <StoreBar store={s} />
        <div className="notice fade-in">
          <div className="notice-icon">⚠</div>
          <h1>Store temporarily unavailable</h1>
          <p>{msg}</p>
        </div>
      </>
    );
  }

  const reviews = storeData.reviews || { average: 0, count: 0, recent: [] };
  const products = storeData.products || [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `${product.name} on ${s.name}`,
    image: product.images?.[0] || OG_FALLBACK_IMAGE,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'NGN',
      price: priceOf(product),
      availability: product.availableStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: productUrl(slug, productId),
    },
  };

  return (
    <>
      <StoreBar store={s} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="cover fade-in">
        {s.coverUrl ? <img src={s.coverUrl} alt={`${s.name} cover`} /> : <div className="cover-fallback" />}
      </div>

      <main className="container">
        <div className="store-head rise-in">
          <div className="logo-card">
            {s.logoUrl ? (
              <img src={s.logoUrl} alt={`${s.name} logo`} />
            ) : (
              <span className="logo-fallback">{s.name.charAt(0)}</span>
            )}
          </div>
          <div className="store-head-text">
            <Link href={`/store/${slug}/reviews`} className="rating rating-link">
              {reviews.count > 0 ? (
                <>
                  <span className="score">{reviews.average.toFixed(1)}</span>
                  <Star size={13} filled />
                  <span>({reviews.count})</span>
                  <span className="rating-more">Reviews ›</span>
                </>
              ) : (
                <span className="muted-rating">No reviews yet ›</span>
              )}
            </Link>
          </div>
        </div>

        <Storefront
          slug={slug}
          store={s}
          deals={storeData.deals || []}
          initial={products}
          initialCursor={storeData.nextCursor}
          initialProductId={productId}
          initialProductData={product}
        />
      </main>

      <footer className="store-footer">
        <img src="/korra-logo.webp" alt="Korra" width={20} height={20} />
        <span>Powered by Korra</span>
      </footer>
    </>
  );
}

function StoreBar({ store }) {
  return (
    <header className="storebar">
      <div className="container storebar-inner">
        <div className="storebar-id">
          <div className="storebar-logo">
            {store.logoUrl ? (
              <img src={store.logoUrl} alt={store.name} />
            ) : (
              <span>{store.name.charAt(0)}</span>
            )}
          </div>
          <h1 className="storebar-name">{store.name}</h1>
        </div>
        <a className="btn btn-soft btn-sm" href={CUSTOMER_WEBAPP}>Open app</a>
      </div>
    </header>
  );
}
