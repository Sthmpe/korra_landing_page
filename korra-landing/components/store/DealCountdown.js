'use client';

import { useEffect, useState } from 'react';
import { Timer } from './Icons';

// Live flash-deal badge — mirrors the app's DealCountdownBadge. Upcoming shows
// a dark "STARTS IN…" pill, running shows a red "…LEFT" pill, both ticking each
// second. Renders nothing once the window closes.
function fmt(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (d >= 1) return `${d}D ${String(h).padStart(2, '0')}H`;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function DealCountdown({ deal }) {
  // Start as null so the server render and the first client render agree (no
  // hydration mismatch). The real clock only starts after mount, on the client.
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!deal || now === null) return null;
  const { startAt, endAt } = deal;
  if (now >= endAt) return null;

  const upcoming = now < startAt;
  const remaining = upcoming ? startAt - now : endAt - now;

  return (
    <span className={`deal-badge ${upcoming ? 'deal-upcoming' : 'deal-running'}`}>
      <Timer size={13} />
      <span className="tabular">
        {upcoming ? `STARTS ${fmt(remaining)}` : `${fmt(remaining)} LEFT`}
      </span>
    </span>
  );
}
