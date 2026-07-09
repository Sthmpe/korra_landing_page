import { notFound } from 'next/navigation';
import Link from 'next/link';

import { fetchStore } from '@/lib/api';
import { CUSTOMER_WEBAPP, storeUrl, OG_FALLBACK_IMAGE } from '@/lib/config';
import { Star } from '@/components/store/Icons';
import Storefront from '@/components/store/Storefront';
import WalkIn from '@/components/store/WalkIn';

export const revalidate = 300;

function priceOf(p) {
  const disc = Number(p.discountedPrice || 0);
  return disc > 0 ? disc : Number(p.price || 0);
}

export async function generateMetadata({ params }) {
  const data = await fetchStore(params.slug);
  if (!data || !data.store) return { title: 'Store not found', robots: { index: false } };
  const s = data.store;
  const url = storeUrl(params.slug);
  // Prefer the merchant's own cover/logo; otherwise fall back to Korra's
  // branded default so the link always previews with an image.
  const image = s.coverUrl || s.logoUrl || OG_FALLBACK_IMAGE;
  // Search meta description (what shows under the link in Google results).
  const metaDescription = s.description || `Discover ${s.name}'s products on Korra.`;
  // Social share description (what shows on WhatsApp/X/Facebook cards).
  const shareDescription =
    s.description || `Discover amazing deals on ${s.name} — powered by Korra.`;
  return {
    // Absolute so the layout template doesn't append "· Korra" twice.
    title: { absolute: `${s.name} · Shop on Korra` },
    description: metaDescription,
    robots: data.blocked ? { index: false, follow: false } : { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title: `${s.name} · Shop on Korra`,
      description: shareDescription,
      url,
      type: 'website',
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${s.name} · Shop on Korra`,
      description: shareDescription,
      images: [image],
    },
  };
}

export default async function StorePage({ params }) {
  const slug = params.slug;
  const data = await fetchStore(slug);
  if (!data || !data.store) notFound();

  const s = data.store;
  const url = storeUrl(slug);
  const description =
    s.description || `Shop ${s.name} on Korra — reserve or buy outright and pay your way.`;

  if (data.blocked) {
    const msg =
      data.blockedMessage ||
      'This store has been suspended or restricted due to a policy or compliance issue on Korra.';
    return (
      <>
        <StoreBar store={s} />
        <div className="notice fade-in">
          <div className="notice-icon">⚠</div>
          <h1>Store temporarily unavailable</h1>
          <p>{msg}</p>
          <p style={{ marginTop: 14, fontSize: 13 }}>
            If you believe this is an error, please contact the merchant directly.
          </p>
        </div>
      </>
    );
  }

  const reviews = data.reviews || { average: 0, count: 0, recent: [] };
  const products = data.products || [];
  const v = data.visibility || {};

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: s.name,
    description,
    url,
    image: s.coverUrl || s.logoUrl || OG_FALLBACK_IMAGE,
    address: s.walkIn || undefined,
    aggregateRating:
      reviews.count > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: reviews.average.toFixed(1),
            reviewCount: reviews.count,
          }
        : undefined,
    makesOffer: products.slice(0, 30).map((p) => ({
      '@type': 'Offer',
      priceCurrency: 'NGN',
      price: priceOf(p),
      itemOffered: { '@type': 'Product', name: p.name },
    })),
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
            {/* Store name now lives in the sticky header; here just the rating,
                which mirrors the app: always tappable, opens the reviews page. */}
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

        <div className="rise-in delay-1">
          {(Number(v.topSellerCircles) > 0 ||
            Number(v.mostVisitedCircles) > 0 ||
            v.isHighlighted) && (
            <div className="badges">
              {Number(v.topSellerCircles) > 0 ? <span className="badge badge-top">🏆 Top Seller</span> : null}
              {Number(v.mostVisitedCircles) > 0 ? <span className="badge badge-visited">🔥 Most Visited</span> : null}
              {v.isHighlighted ? <span className="badge badge-highlight">✦ Highlighted</span> : null}
            </div>
          )}

          <p className="store-desc">{description}</p>
          <WalkIn address={s.walkIn} />

          <div className="chips">
            {s.whatsapp ? <a className="chip" href={s.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a> : null}
            {s.instagram ? <a className="chip" href={`https://instagram.com/${String(s.instagram).replace('@', '')}`} target="_blank" rel="noopener noreferrer">Instagram</a> : null}
            {s.tiktok ? <a className="chip" href={`https://tiktok.com/@${String(s.tiktok).replace('@', '')}`} target="_blank" rel="noopener noreferrer">TikTok</a> : null}
            {s.phone ? <a className="chip" href={`tel:${s.phone}`}>Call</a> : null}
          </div>
        </div>

        <Storefront
          slug={slug}
          store={s}
          deals={data.deals || []}
          initial={products}
          initialCursor={data.nextCursor}
        />
      </main>

      <footer className="store-footer">
        <img src="/korra-logo.webp" alt="Korra" width={20} height={20} />
        <span>Powered by Korra</span>
      </footer>
    </>
  );
}

// Sticky bar: the STORE's identity stays fixed on scroll (logo + name), with a
// small Korra attribution mark. Not the Korra brand name.
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
          {/* The single h1 for the page — persists in the sticky header now
              that the big name under the cover is gone. */}
          <h1 className="storebar-name">{store.name}</h1>
        </div>
        <a className="btn btn-soft btn-sm" href={CUSTOMER_WEBAPP}>Open app</a>
      </div>
    </header>
  );
}
