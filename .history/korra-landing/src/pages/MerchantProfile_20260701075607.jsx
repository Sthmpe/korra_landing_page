import React, { useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, TikTokIcon } from '../components/icons';
import { SiteNav, SiteFooter } from '../components/SiteChrome';

const slugify = (name = '') =>
  name.toLowerCase().trim().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const MerchantProfile = ({ liveMerchants = [], loading }) => {
  const { slug } = useParams();
  const merchant = liveMerchants.find((m) => slugify(m.name) === slug);

  useLayoutEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => { el.classList.remove('in'); io.observe(el); });
    return () => io.disconnect();
  }, [merchant]);

  const initials = merchant
    ? merchant.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : '';

  return (
    <div className="page">
      <SiteNav />

      <section className="section profile-page">
        <div className="container">
          <Link to="/merchants" className="profile-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            <span>All merchants</span>
          </Link>

          {/* Still loading merchant list */}
          {loading && !merchant && (
            <div className="profile-state">
              <div className="spinner" aria-hidden="true"></div>
              <p className="mono">Loading merchant…</p>
            </div>
          )}

          {/* List loaded but no match */}
          {!loading && !merchant && (
            <div className="profile-state">
              <h1 className="h2">Merchant not found</h1>
              <p className="lede" style={{ margin: '16px auto 28px' }}>
                We couldn’t find that merchant. It may have been removed, or the link is out of date.
              </p>
              <Link to="/merchants" className="btn btn-primary">Back to directory <span className="arrow">→</span></Link>
            </div>
          )}

          {/* Merchant found */}
          {merchant && (
            <div className="profile-card reveal">
              <div className="profile-banner">
                {merchant.imageUrl
                  ? <img src={merchant.imageUrl} alt={merchant.name} />
                  : <div className="profile-banner-fallback" aria-hidden="true">₦</div>}
                <div className="profile-banner-scrim" aria-hidden="true"></div>
              </div>

              <div className="profile-body">
                <div className="profile-head">
                  <div className="profile-logo">{initials}</div>
                  <div className="profile-headtext">
                    <div className="eyebrow">Verified Korra Merchant</div>
                    <h1 className="h1 profile-name">{merchant.name}</h1>
                    <div className="profile-meta">
                      <span className="profile-cat">{merchant.category}</span>
                      <span className="profile-dot">·</span>
                      <span className="profile-loc">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {merchant.location}
                      </span>
                    </div>
                  </div>
                </div>

                {merchant.description && (
                  <p className="profile-desc">{merchant.description}</p>
                )}

                {/* Socials */}
                {merchant.socials && Object.values(merchant.socials).some(Boolean) && (
                  <div className="profile-socials">
                    {merchant.socials.whatsapp && (
                      <a href={merchant.socials.whatsapp} target="_blank" rel="noreferrer" className="profile-social wa">
                        <WhatsAppIcon className="ic" /> WhatsApp
                      </a>
                    )}
                    {merchant.socials.instagram && (
                      <a href={merchant.socials.instagram} target="_blank" rel="noreferrer" className="profile-social ig">
                        <InstagramIcon className="ic" /> Instagram
                      </a>
                    )}
                    {merchant.socials.tiktok && (
                      <a href={merchant.socials.tiktok} target="_blank" rel="noreferrer" className="profile-social tt">
                        <TikTokIcon className="ic" /> TikTok
                      </a>
                    )}
                    {merchant.socials.website && (
                      <a href={merchant.socials.website} target="_blank" rel="noreferrer" className="profile-social web">
                        <Globe className="ic" /> Website
                      </a>
                    )}
                  </div>
                )}

                <div className="profile-note">
                  <strong>Pay in parts with this merchant.</strong> Reach out through any channel
                  above to agree on a plan, then complete your payment securely through Korra.
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />

      <style>{`
        .profile-page { padding-top: 150px; }
        @media (max-width: 820px) { .profile-page { padding-top: 120px; } }

        .profile-back {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 32px;
          font-size: 13px; font-weight: 500; color: var(--muted);
          padding: 9px 16px 9px 12px; border: 1px solid var(--line); border-radius: 100px;
          transition: color .2s var(--ease), border-color .2s var(--ease), background .2s var(--ease);
        }
        .profile-back:hover { color: var(--ink); border-color: var(--ink); }
        .profile-back svg { transition: transform .2s var(--ease); }
        .profile-back:hover svg { transform: translateX(-3px); }

        .profile-state { text-align: center; padding: 80px 20px; display: flex; flex-direction: column; align-items: center; }
        .profile-state .lede { max-width: 44ch; }
        .profile-state .mono { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-top: 16px; }
        .spinner { width: 34px; height: 34px; border-radius: 50%; border: 3px solid var(--orange-tint); border-top-color: var(--orange); animation: pf-spin 0.8s linear infinite; }
        @keyframes pf-spin { to { transform: rotate(360deg); } }

        .profile-card {
          background: var(--white); border: 1px solid var(--line); border-radius: 28px;
          overflow: hidden; box-shadow: 0 30px 60px -30px rgba(0,0,0,0.12); max-width: 860px;
        }
        .profile-banner { position: relative; height: 240px; background: var(--ink); }
        @media (max-width: 640px) { .profile-banner { height: 170px; } }
        .profile-banner img { width: 100%; height: 100%; object-fit: cover; }
        .profile-banner-fallback {
          width: 100%; height: 100%; display: grid; place-items: center;
          font-size: 140px; font-weight: 800; color: rgba(255,255,255,0.06);
          background: linear-gradient(135deg, var(--ink), #2a2a2a); font-family: 'Sora', sans-serif;
        }
        .profile-banner-scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.35), transparent 55%); }

        .profile-body { padding: 0 40px 44px; }
        @media (max-width: 640px) { .profile-body { padding: 0 22px 32px; } }

        .profile-head { display: flex; align-items: flex-end; gap: 20px; margin-top: -44px; position: relative; z-index: 1; }
        .profile-logo {
          width: 96px; height: 96px; flex-shrink: 0; border-radius: 22px;
          background: var(--orange); color: var(--white); display: grid; place-items: center;
          font-size: 34px; font-weight: 700; letter-spacing: -0.02em;
          border: 4px solid var(--white); box-shadow: 0 12px 30px -10px rgba(165,70,0,0.5);
        }
        @media (max-width: 640px) { .profile-logo { width: 74px; height: 74px; font-size: 26px; border-radius: 18px; } }
        .profile-headtext { padding-bottom: 6px; }
        .profile-headtext .eyebrow { margin-bottom: 12px; }
        .profile-name { font-size: clamp(28px, 4vw, 44px); margin-top: 6px; }
        .profile-meta { display: flex; align-items: center; gap: 10px; margin-top: 14px; flex-wrap: wrap; font-size: 14px; color: var(--muted); }
        .profile-cat { font-weight: 600; color: var(--ink); }
        .profile-dot { color: var(--line); }
        .profile-loc { display: inline-flex; align-items: center; gap: 5px; }

        .profile-desc { font-size: 16px; line-height: 1.7; color: var(--muted); margin-top: 28px; max-width: 60ch; }

        .profile-socials { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
        .profile-social {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 11px 18px; border-radius: 100px; font-size: 13.5px; font-weight: 600;
          background: #F5F5F5; color: var(--ink); border: 1px solid transparent;
          transition: background .2s var(--ease), color .2s var(--ease), transform .2s var(--ease);
        }
        .profile-social:hover { transform: translateY(-2px); }
        .profile-social .ic { width: 16px; height: 16px; }
        .profile-social.wa:hover { background: #25D366; color: #fff; }
        .profile-social.ig:hover { background: #E1306C; color: #fff; }
        .profile-social.tt:hover { background: #000; color: #fff; }
        .profile-social.web:hover { background: var(--ink); color: #fff; }

        .profile-note {
          margin-top: 32px; padding: 18px 22px; border-radius: 16px;
          background: var(--orange-tint); border: 1px solid rgba(165,70,0,0.15);
          font-size: 14.5px; line-height: 1.6; color: var(--ink);
        }
        .profile-note strong { color: var(--orange); font-weight: 600; }
      `}</style>
    </div>
  );
};