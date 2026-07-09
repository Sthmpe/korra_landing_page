import { notFound } from 'next/navigation';

// Directory promotion pulled per David's request — see app/merchants/page.js.
// Delete this notFound() call to bring the page back; MerchantProfileClient
// is untouched.
export const metadata = {
  robots: { index: false, follow: false },
};

export default function MerchantProfilePage() {
  notFound();
}
