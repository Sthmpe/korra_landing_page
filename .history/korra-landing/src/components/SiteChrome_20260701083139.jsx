import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

/*
  Shared site chrome (nav + footer) extracted so the Merchant Directory,
  Privacy Policy, and any other inner page share the exact same top/bottom
  as the home page. Uses the existing index.css design system — no Tailwind.

  On inner pages the nav links point back to the home page's section anchors
  ("/#businesses" etc.) so they still work from a different route.
*/

/*
  ScrollToTop: React Router keeps the previous scroll position when you change
  routes, which is why clicking "Merchant Directory" from the footer dropped you
  at the footer of the next page. Rendering this once inside <BrowserRouter>
  resets scroll to the top on every path change. If the URL has a #hash, it
  scrolls to that element instead (so home-page anchor links still work).
*/
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

export const SiteNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (hash) => (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate('/' + hash);
  };

  return (
    <>
      <header className={`nav-shell ${isScrolled ? 'scrolled' : ''}`} id="nav">
        <div className="nav-inner">
          <Link to="/" className="brand" aria-label="Korra">
            <img src="/korra_logo_icon.webp" alt="Korra Logo" />
            <span className="wordmark">KORRA</span>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            <a className="nav-link" href="/#businesses" onClick={go('#businesses')}>For Businesses</a>
            <a className="nav-link" href="/#customers" onClick={go('#customers')}>For Customers</a>
            <Link className="nav-link" to="/merchants">Merchant Directory</Link>
            <a className="nav-link" href="/#how" onClick={go('#how')}>How It Works</a>
          </nav>
          <div className="nav-ctas nav-ctas-desktop">
            <a href="https://business.korra.com.ng" className="btn btn-primary btn-sm">Get Started Free</a>
          </div>
          <button className="nav-hamburger" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-top">
              <Link to="/" className="brand" onClick={() => setMobileMenuOpen(false)}>
                <img src="/korra_logo_icon.webp" alt="Korra Logo" />
                <span className="wordmark">KORRA</span>
              </Link>
              <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>
              </button>
            </div>
            <nav className="mobile-menu-links">
              <a href="/#businesses" onClick={go('#businesses')}>For Businesses <span className="arrow">→</span></a>
              <a href="/#customers" onClick={go('#customers')}>For Customers <span className="arrow">→</span></a>
              <Link to="/merchants" onClick={() => setMobileMenuOpen(false)}>Merchant Directory <span className="arrow">→</span></Link>
              <a href="/#how" onClick={go('#how')}>How It Works <span className="arrow">→</span></a>
            </nav>
            <div className="mobile-menu-ctas">
              <a href="https://business.korra.com.ng" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Get Started Free <span className="arrow">→</span></a>
            </div>
          </div>
        </div>https://www.korra.com.ng/
      )}
    </>
  );
};

export const SiteFooter = () => (
  <footer className="footer">
    <div className="container-wide">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="brand"><img src="/korra_logo_icon.webp" alt="Korra Logo" /><span className="wordmark" style={{ color: 'var(--white)' }}>KORRA</span></Link>
          <div className="footer-tag">Smart People Own Things Differently.</div>
          <div className="footer-desc">Structured installment payments for Nigerian businesses. Manage how your customers pay, with clarity and control.</div>
        </div>
        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li><a href="/#businesses">For Businesses</a></li>
            <li><a href="/#customers">For Customers</a></li>
            <li><Link to="/merchants">Merchant Directory</Link></li>
            <li><a href="/#how">How It Works</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="/#about">About Korra</a></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><a href="mailto:support@korra.com.ng">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:support@korra.com.ng">support@korra.com.ng</a></li>
            <li><a href="https://wa.me/2349152540533">WhatsApp · 09152540533</a></li>
            <li><a href="https://korra.com.ng">korra.com.ng</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-mega" aria-hidden="true">KORRA</div>
      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} KorraHQ Byte Ltd. All rights reserved. Ilorin, Nigeria.</div>
        <div className="right">Smart People Own Things Differently.</div>
      </div>
    </div>
  </footer>
);