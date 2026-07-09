import HomeClient from '../components/landing/HomeClient';
import { organizationJsonLd } from '../lib/organizationJsonLd';

// Home-page-specific SEO, ported verbatim from the old index.html. Note the
// search-result copy (title/description) intentionally differs from the
// social-share copy (openGraph/twitter) below, matching the original.
export const metadata = {
  title: { absolute: 'Korra | Installment Payments That Keep Customers Committed' },
  description:
    'Korra is the commitment infrastructure that helps merchants sell more by letting customers pay small small. Track installment payments easily and keep buyers committed to your brand.',
  alternates: { canonical: 'https://korra.com.ng/' },
  openGraph: {
    title: "Korra | Stop Losing Customers Who Can't Pay Upfront",
    description:
      "Stop losing customers who can't pay upfront. Let them pay small small while Korra tracks everything for you, no stress, no confusion.",
    url: 'https://korra.com.ng/',
    type: 'website',
    images: [{ url: 'https://korra.com.ng/korra_logo_icon.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Korra | Turn 'I'll come back' into paying customers",
    description:
      'Let your customers pay small small while you track everything without stress. Close more sales with Korra.',
    images: ['https://korra.com.ng/korra_logo_icon.webp'],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
