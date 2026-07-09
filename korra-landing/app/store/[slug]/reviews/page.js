import Link from 'next/link';
import { notFound } from 'next/navigation';

import { fetchStore } from '@/lib/api';
import { storeUrl } from '@/lib/config';
import { Star } from '@/components/store/Icons';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const data = await fetchStore(params.slug);
  const name = data?.store?.name || 'Store';
  return {
    title: { absolute: `Reviews · ${name} · Korra` },
    description: `Read customer ratings and reviews for ${name} on Korra.`,
    alternates: { canonical: `${storeUrl(params.slug)}/reviews` },
    robots: { index: true, follow: true },
  };
}

function Stars({ value, size = 14 }) {
  return [0, 1, 2, 3, 4].map((i) => <Star key={i} size={size} filled={value >= i + 1} />);
}

// Web-only reviews page. The app opens its own reviews screen; on the website
// the rating line on the store page links here.
export default async function ReviewsPage({ params }) {
  const slug = params.slug;
  const data = await fetchStore(slug);
  if (!data || !data.store) notFound();

  const s = data.store;
  const reviews = data.reviews || { average: 0, count: 0, recent: [], distribution: {} };
  const recent = reviews.recent || [];
  const dist = reviews.distribution || {};
  const count = reviews.count || 0;

  return (
    <>
      {/* Store name stays sticky at the top of the reviews page. */}
      <header className="storebar">
        <div className="container storebar-inner reviews-bar">
          <Link href={`/store/${slug}`} className="reviews-back" aria-label="Back to store">
            ‹
          </Link>
          <span className="reviews-bar-name">{s.name}</span>
        </div>
      </header>

      <main className="container reviews-page">
        <h1 className="section-title">Ratings &amp; Reviews</h1>

        {count > 0 ? (
          <div className="reviews-overview">
            <div className="reviews-score-block">
              <div className="reviews-score">{Number(reviews.average || 0).toFixed(1)}</div>
              <div className="reviews-stars">
                <Stars value={reviews.average} size={15} />
              </div>
              <div className="reviews-count">
                {count} review{count === 1 ? '' : 's'}
              </div>
            </div>
            <div className="reviews-bars">
              {[5, 4, 3, 2, 1].map((star) => {
                const n = Number(dist[star] || 0);
                const pct = count > 0 ? Math.round((n / count) * 100) : 0;
                return (
                  <div className="reviews-bar-row" key={star}>
                    <span className="reviews-bar-star">
                      {star} <Star size={11} filled />
                    </span>
                    <span className="reviews-bar-track">
                      <span className="reviews-bar-fill" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="reviews-bar-n">{n}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="store-desc">No reviews yet for {s.name}.</p>
        )}

        {recent.length > 0 ? (
          <div className="reviews-list">
            {recent.map((r, i) => (
              <div className="review" key={i}>
                <div className="review-head">
                  <span className="review-name">{r.name}</span>
                  <span className="review-stars">
                    <Stars value={r.rating} size={13} />
                  </span>
                </div>
                {r.comment ? <p className="review-text">{r.comment}</p> : null}
              </div>
            ))}
          </div>
        ) : count > 0 ? (
          <p className="reviews-more-note">No written reviews yet, only star ratings.</p>
        ) : null}

        {count > recent.length && recent.length > 0 ? (
          <p className="reviews-more-note">Showing the {recent.length} most recent reviews.</p>
        ) : null}

        <div className="reviews-back-cta">
          <Link href={`/store/${slug}`} className="btn btn-soft btn-sm">
            Back to store
          </Link>
        </div>
      </main>

      <footer className="store-footer">
        <img src="/korra-logo.webp" alt="Korra" width={20} height={20} />
        <span>Powered by Korra</span>
      </footer>
    </>
  );
}
