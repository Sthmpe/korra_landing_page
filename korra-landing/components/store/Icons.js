// Minimal inline-SVG icon set matching the app's iconography (Iconsax-style
// line icons). currentColor so they inherit brand/muted colors from CSS.

const base = (props) => ({
  width: props.size || 18,
  height: props.size || 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  // 2.2 to match the landing page's icon weight (was 1.8 — noticeably
  // thinner/weaker next to it).
  strokeWidth: props.strokeWidth || 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

export const Bag = (p) => (
  <svg {...base(p)}>
    <path d="M6 7h12l-1 13H7L6 7Z" />
    <path d="M9 7a3 3 0 0 1 6 0" />
  </svg>
);

export const Star = (p) => (
  <svg {...base(p)} fill={p.filled ? 'currentColor' : 'none'}>
    <path d="m12 3 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.2l5.9-.9L12 3Z" />
  </svg>
);

export const Location = (p) => (
  <svg {...base(p)}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Phone = (p) => (
  <svg {...base(p)}>
    <path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const Search = (p) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3-3" />
  </svg>
);

export const Sliders = (p) => (
  <svg {...base(p)}>
    <path d="M4 6h16M4 12h16M4 18h16" />
    <circle cx="9" cy="6" r="2" fill="var(--surface)" />
    <circle cx="15" cy="12" r="2" fill="var(--surface)" />
    <circle cx="9" cy="18" r="2" fill="var(--surface)" />
  </svg>
);

export const Close = (p) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Timer = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2.5M9 2h6" />
  </svg>
);

export const Plus = (p) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Minus = (p) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const Trash = (p) => (
  <svg {...base(p)}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
  </svg>
);

export const Chevron = (p) => (
  <svg {...base(p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const Receipt = (p) => (
  <svg {...base(p)}>
    <path d="M6 3v18l2-1 2 1 2-1 2 1 2-1 2 1V3l-2 1-2-1-2 1-2-1-2 1-2-1Z" />
    <path d="M9 8h6M9 12h6" />
  </svg>
);

export const Share = (p) => (
  <svg {...base(p)}>
    <circle cx="18" cy="5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="19" r="2.5" />
    <path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6" />
  </svg>
);

export const Shield = (p) => (
  <svg {...base(p)}>
    <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
