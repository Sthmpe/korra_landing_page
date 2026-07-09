import { Star } from './Icons';

function stars(avg) {
  return [0, 1, 2, 3, 4].map((i) => (
    <Star key={i} size={13} filled={avg >= i + 1} />
  ));
}

// Rating summary + a few recent reviews, matching the app's reviews block.
export default function Reviews({ reviews }) {
  if (!reviews || reviews.count === 0) return null;
  const { average, count, recent = [] } = reviews;

  return (
    <section className="reviews">
      <h2 className="section-title">Ratings &amp; Reviews</h2>
      <div className="reviews-summary">
        <div className="reviews-score">{average.toFixed(1)}</div>
        <div>
          <div className="reviews-stars">{stars(average)}</div>
          <div className="reviews-count">
            {count} review{count === 1 ? '' : 's'}
          </div>
        </div>
      </div>

      {recent.length > 0 ? (
        <div className="reviews-list">
          {recent.map((r, i) => (
            <div className="review" key={i}>
              <div className="review-head">
                <span className="review-name">{r.name}</span>
                <span className="review-stars">{stars(r.rating)}</span>
              </div>
              <p className="review-text">{r.comment}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
