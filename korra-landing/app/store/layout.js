// Route-scoped stylesheet: korra-store's globals.css defines its own
// :root variables (--ink, --muted, --line, etc.) and base body/font rules
// that collide by name with the landing page's own design system. Next.js
// only loads this CSS when a /store/* route actually renders, so it never
// bleeds into the landing pages above it.
import { Inter } from 'next/font/google';
import './store.css';

// Inter, scoped to .store-scope in store.css (not <html>/<body> — only the
// root layout can touch those, and they're shared with the landing page's
// own Sora font stack).
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

export default function StoreLayout({ children }) {
  return <div className={`store-scope ${inter.variable}`}>{children}</div>;
}
