import { notFound } from 'next/navigation';

// Directory promotion pulled per David's request (nav/footer links and the
// home page section removed) — the route itself is also disabled here so a
// direct/old link doesn't work either. Delete this notFound() call to bring
// the page back; MerchantsDirectoryClient is untouched.
export const metadata = {
  robots: { index: false, follow: false },
};

export default function MerchantsPage() {
  notFound();
}
