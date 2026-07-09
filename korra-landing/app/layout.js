import './globals.css';

// Shared across every route (landing pages AND /store/*): the favicon,
// facebook domain verification (Facebook expects to find this on any page
// it crawls, not just the home page), theme color, and metadataBase used to
// resolve every page's relative OG/canonical URLs. Page-specific SEO
// (title, description, OG, Twitter, canonical, JSON-LD) is set per-page —
// see app/page.js for the home page and app/store/[slug]/page.js for stores
// — and overrides these defaults via Next.js's metadata merging.
export const metadata = {
  metadataBase: new URL('https://korra.com.ng'),
  title: 'Korra | Installment Payments That Keep Customers Committed',
  description:
    'Korra is the commitment infrastructure that helps merchants sell more by letting customers pay small small. Track installment payments easily and keep buyers committed to your brand.',
  robots: { index: true, follow: true },
  icons: {
    icon: '/korra_logo_icon.webp',
  },
  other: {
    'facebook-domain-verification': 'ih7yklux3pyc6dg8jfnkzpkg1lz4hb',
  },
};

export const viewport = {
  themeColor: '#A54600',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
