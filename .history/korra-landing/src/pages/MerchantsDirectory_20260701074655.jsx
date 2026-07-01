import React, { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, TikTokIcon } from '../components/icons';
import { SiteNav, SiteFooter } from '../components/SiteChrome';

export const MerchantsDirectory = ({ liveMerchants = [], loading }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = liveMerchants.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      (m.category || '').toLowerCase().includes(q) ||
      (m.location || '').toLowerCase().includes(q)
    );
  });

  // Reveal-on-scroll, same behaviour as the home page
  useLayoutEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => { el.classList.remove('in'); io.observe(el); });
    return () => io.disconnect();
  }, [loading, filtered.length]);

  return (
    <div className="page">
      <SiteNav />

      <section className="section directory-page" data-screen-label="Directory">
        <div className="container-wide">

          {/* Header */}
          <div className="directory-head">
            <div className="left">
              <div className="eyebrow reveal">Verified Platform Partners</div>
              <h1 className="h1 reveal" style={{ marginTop: '24px' }}>
                Merchant Directory
              </h1>
              <p className="lede reveal" style={{ marginTop: '20px' }}>
                Discover verified businesses across Nigeria that offer structured
                part-payment plans through Korra. Every merchant here is set up to
                let you pay in parts, with clarity from start to finish.
              </p>
            </div>
            <div className="directory-count reveal mono">
              {loading ? '—' : String(filtered.length).padStart(2, '0')}
              <span>listed</span>
            </div>
          </div>

          {/* Search */}
          <div className="directory-search reveal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search by name, category, or location…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Grid */}
          {loading ? (
            <div className="directory-empty">
              <div className="spinner" aria-hidden="true"></div>
              <p className="mono">Loading verified merchants…</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="directory-grid stagger reveal">
              {filtered.map((merchant) => {
                const initials = merchant.name
                  .split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
                const slug = merchant.name.toLowerCase().replace(/\s+/g, '-');

                return (
                  <Link to={`/merchant/${slug}`} key={merchant.id} className="merchant-card">
                    <div className="merchant-top">
                      <div className="merchant-logo">{initials}</div>
                      <div>
                        <div className="merchant-name">{merchant.name}</div>
                        <div className="merchant-cat">{merchant.category}</div>
                      </div>
                    </div>

                    <div className="merchant-meta">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span>{merchant.location}</span>
                    </div>

                    <div className="merchant-socials" onClick={(e) => e.preventDefault()}>
                      {merchant.socials?.whatsapp && (
                        <a href={merchant.socials.whatsapp} target="_blank" rel="noreferrer" className="social-btn wa" aria-label="WhatsApp"><WhatsAppIcon className="ic" /></a>
                      )}
                      {merchant.socials?.instagram && (
                        <a href={merchant.socials.instagram} target="_blank" rel="noreferrer" className="social-btn ig" aria-label="Instagram"><InstagramIcon className="ic" /></a>
                      )}
                      {merchant.socials?.tiktok && (
                        <a href={merchant.socials.tiktok} target="_blank" rel="noreferrer" className="social-btn tt" aria-label="TikTok"><TikTokIcon className="ic" /></a>
                      )}
                      {merchant.socials?.website && (
                        <a href={merchant.socials.website} target="_blank" rel="noreferrer" className="social-btn web" aria-label="Website"><Globe className="ic" /></a>
                      )}
                      <span className="merchant-view">View <span className="arrow">→</span></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="directory-empty">
              <p>No merchants match “{searchQuery}”.</p>
              <button className="btn btn-dark btn-sm" onClick={() => setSearchQuery('')}>Clear search</button>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />

      {/* Page-specific styles that extend (not override) index.css */}
      <style>{`
        .directory-page { padding-top: 160px; }
        @media (max-width: 820px) { .directory-page { padding-top: 128px; } }

        .directory-count {
          font-size: clamp(40px, 5vw, 64px); font-weight: 700;
          letter-spacing: -0.04em; line-height: 1; color: var(--ink);
          display: flex; align-items: baseline; gap: 12px;
        }
        .directory-count span {
          font-size: 12px; font-weight: 500; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--muted); font-family: 'Sora', sans-serif;
        }
        @media (max-width: 720px) { .directory-count { display: none; } }

        .directory-search {
          position: relative; max-width: 520px; margin: 0 0 48px;
        }
        .directory-search svg {
          position: absolute; left: 18px; top: 50%; transform: translateY(-50%);
          color: var(--muted); transition: color .2s var(--ease); pointer-events: none;
        }
        .directory-search input {
          width: 100%; padding: 16px 18px 16px 48px;
          font-family: 'Sora', sans-serif; font-size: 14.5px; color: var(--ink);
          background: var(--white); border: 1px solid var(--line); border-radius: 100px;
          outline: none; transition: border-color .2s var(--ease), box-shadow .2s var(--ease);
        }
        .directory-search input::placeholder { color: var(--muted); }
        .directory-search input:focus { border-color: var(--orange); box-shadow: 0 0 0 4px var(--orange-tint); }
        .directory-search:focus-within svg { color: var(--orange); }

        /* Merchant card additions (base .merchant-card already in index.css) */
        .merchant-card { display: block; position: relative; overflow: hidden; }
        .merchant-card .merchant-logo { background: var(--ink); transition: background .3s var(--ease); }
        .merchant-card:hover .merchant-logo { background: var(--orange); }
        .merchant-card .merchant-name { transition: color .2s var(--ease); }
        .merchant-card:hover .merchant-name { color: var(--orange); }

        .merchant-socials { align-items: center; }
        .social-btn .ic { width: 15px; height: 15px; }
        .social-btn.wa:hover { background: #25D366; color: #fff; }
        .social-btn.ig:hover { background: #E1306C; color: #fff; }
        .social-btn.tt:hover { background: #000; color: #fff; }
        .social-btn.web:hover { background: var(--ink); color: #fff; }
        .merchant-view {
          margin-left: auto; font-size: 12px; font-weight: 600; color: var(--muted);
          display: inline-flex; align-items: center; gap: 5px; transition: color .2s var(--ease);
        }
        .merchant-card:hover .merchant-view { color: var(--orange); }
        .merchant-card:hover .merchant-view .arrow { transform: translateX(3px); }
        .merchant-view .arrow { transition: transform .3s var(--ease); }

        .directory-empty {
          padding: 96px 24px; text-align: center; border: 1px dashed var(--line);
          border-radius: 24px; background: var(--white);
          display: flex; flex-direction: column; align-items: center; gap: 18px;
        }
        .directory-empty p { color: var(--muted); font-size: 15px; }
        .directory-empty .mono { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
        .spinner {
          width: 34px; height: 34px; border-radius: 50%;
          border: 3px solid var(--orange-tint); border-top-color: var(--orange);
          animation: dir-spin 0.8s linear infinite;
        }
        @keyframes dir-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};