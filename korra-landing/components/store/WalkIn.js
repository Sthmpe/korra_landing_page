'use client';

import { useState } from 'react';
import { Location, Chevron } from './Icons';

// Walk-in store row — mirrors the app's StorefrontLocationRow: a borderless
// tinted pill that expands inline to reveal the full address when tapped.
export default function WalkIn({ address }) {
  const [open, setOpen] = useState(false);
  if (!address) return null;

  return (
    <div className="walkin-wrap">
      <button className="walkin" onClick={() => setOpen((o) => !o)}>
        <Location size={14} />
        <span>Walk-in store</span>
        <span className={`walkin-chev ${open ? 'open' : ''}`}>
          <Chevron size={14} />
        </span>
      </button>
      <div className={`walkin-body ${open ? 'open' : ''}`}>
        <div className="walkin-inner">
          <Location size={14} />
          <span>{address}</span>
        </div>
      </div>
    </div>
  );
}
