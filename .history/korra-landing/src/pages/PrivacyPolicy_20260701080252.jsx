import React, { useState, useEffect } from 'react';
import { SiteNav, SiteFooter } from '../components/SiteChrome';

const SUPPORT_EMAIL = 'support@korra.com.ng';

export const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('part1');
  const [copied, setCopied] = useState(false);

  const requestDeletion = async () => {
    // Try to open the user's mail client…
    // …but mailto silently fails on devices without one, so ALSO copy the
    // address and confirm, guaranteeing the button always does something.
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(SUPPORT_EMAIL);
      } else {
        const ta = document.createElement('textarea');
        ta.value = SUPPORT_EMAIL; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch { /* clipboard blocked — mailto below still fires */ }
    // Let the native mailto proceed (do not preventDefault).
    window.location.href =
      `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Account deletion request')}` +
      `&body=${encodeURIComponent('Please delete my Korra account and associated data. My registered email is: ')}`;
  };

  const sections = [
    { id: 'part1', label: 'Customer App' },
    { id: 'part2', label: 'Business App' },
    { id: 'part3', label: 'Retention & Deletion' },
  ];

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 220;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(s.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jump = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 110, behavior: 'smooth' });
  };

  return (
    <div className="page">
      <SiteNav />

      {/* Hero */}
      <section className="section privacy-hero">
        <div className="container">
          <div className="eyebrow">Legal · Effective June 30, 2026</div>
          <h1 className="h1" style={{ marginTop: '22px' }}>Privacy Policy</h1>
          <p className="lede" style={{ marginTop: '20px' }}>
            How KorraHQ Byte Ltd collects, uses, and protects your data across the
            Korra Customer and Korra Business apps. Published from Ilorin, Kwara State, Nigeria.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="privacy-body">
        <div className="container">
          <div className="privacy-layout">

            {/* Sticky sidebar */}
            <aside className="privacy-nav" aria-label="Sections">
              <div className="privacy-nav-label mono">On this page</div>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={jump(s.id)}
                  className={`privacy-nav-link ${activeSection === s.id ? 'active' : ''}`}
                >
                  {s.label}
                </a>
              ))}
              <button type="button" onClick={requestDeletion} className="btn btn-primary btn-sm privacy-nav-cta">
                {copied ? 'Email copied ✓' : 'Request deletion'}
              </button>
            </aside>

            {/* Content */}
            <div className="privacy-content">
              <p className="privacy-intro">
                This Privacy Policy explains how KorraHQ Byte Ltd (“we,” “us,” or “our”)
                collects, uses, stores, and protects your personal data — whether you use
                the <strong>Korra Customer App</strong> to track your flexible part-payment
                plans, or the <strong>Korra Business App</strong> to manage your storefront
                and settlements. By using any part of our platform, you agree to the
                practices described below.
              </p>

              {/* PART 1 */}
              <div className="privacy-part" id="part1">
                <div className="privacy-part-head">
                  <span className="privacy-part-num mono">Part 01</span>
                  <h2 className="h2">Korra Customer App</h2>
                </div>

                <h3 className="privacy-h3">1.1 &nbsp;Data we collect</h3>
                <p>We collect only the personal information strictly necessary to authenticate your profile and manage your payment plans securely:</p>
                <ul className="privacy-list">
                  <li><strong>Authentication data</strong> — full name, email, and profile picture, provided securely through Google Sign-In (OAuth). We never collect or store manual passwords.</li>
                  <li><strong>Contact data</strong> — your phone number and email address.</li>
                  <li><strong>KYC data</strong> — standard identity details provided during account setup to protect platform integrity and verify account security.</li>
                  <li><strong>Transaction ledger data</strong> — your purchase history, outstanding plan balances, installment schedules, and merchant confirmation-code logs.</li>
                </ul>

                <h3 className="privacy-h3">1.2 &nbsp;How we use your data</h3>
                <ul className="privacy-list">
                  <li>To sign you in securely across your devices through Google Sign-In.</li>
                  <li>To track ongoing installments and keep your remaining balance with the merchant up to date.</li>
                  <li>To send push notifications about payment updates, plan reminders, and order confirmations.</li>
                </ul>

                <h3 className="privacy-h3">1.3 &nbsp;Data sharing &amp; third parties</h3>
                <ul className="privacy-list">
                  <li><strong>Monnify</strong> — we securely pass the parameters needed to process wallet top-ups and bank transfers.</li>
                  <li><strong>With merchants</strong> — we share only limited, relevant details (such as your name and confirmation code) so the merchant can confirm your plan and coordinate handover. We never expose your private financial details.</li>
                </ul>
              </div>

              {/* PART 2 */}
              <div className="privacy-part" id="part2">
                <div className="privacy-part-head">
                  <span className="privacy-part-num mono">Part 02</span>
                  <h2 className="h2">Korra Business App</h2>
                </div>

                <h3 className="privacy-h3">2.1 &nbsp;Data we collect</h3>
                <p>We collect the operational and identity data required to host and maintain your storefront:</p>
                <ul className="privacy-list">
                  <li><strong>Authentication data</strong> — full name, email, and profile picture, provided securely through Google Sign-In (OAuth).</li>
                  <li><strong>Business profile</strong> — your business name, store links, product descriptions, pricing, inventory listings, and business address.</li>
                  <li><strong>KYC data</strong> — basic verification details provided during merchant onboarding to maintain platform safety and trust.</li>
                  <li><strong>Settlement &amp; transaction data</strong> — bank account details used strictly for automatic payout settlements, along with your store’s processing history and active ledger logs.</li>
                </ul>

                <h3 className="privacy-h3">2.2 &nbsp;How we use your data</h3>
                <ul className="privacy-list">
                  <li>To host, generate, and serve your public store checkout links.</li>
                  <li>To manage customer installment tracking and calculate your store wallet balance.</li>
                  <li>To notify you when a customer makes a deposit, clears a plan balance, or requests an item release.</li>
                </ul>

                <h3 className="privacy-h3">2.3 &nbsp;Data sharing &amp; third parties</h3>
                <ul className="privacy-list">
                  <li><strong>Monnify</strong> — your settlement bank details are securely shared with Monnify to route automatic payouts to your business bank account.</li>
                  <li><strong>With customers</strong> — your public store name, business address, and inventory are shared openly through your store link so buyers can discover and complete their orders.</li>
                </ul>
              </div>

              {/* PART 3 */}
              <div className="privacy-part" id="part3">
                <div className="privacy-part-head">
                  <span className="privacy-part-num mono">Part 03</span>
                  <h2 className="h2">Retention, Security &amp; Deletion</h2>
                </div>
                <p style={{ color: 'var(--muted)' }}>The following applies to both customers and merchants.</p>

                <h3 className="privacy-h3">3.1 &nbsp;Data retention</h3>
                <div className="privacy-callout">
                  <strong>12-month hold.</strong> To keep accurate ledger records and support dispute handling and accounting, we retain transaction logs, payment histories, and store configurations for a standard cycle of 12 months from the date of each activity.
                </div>
                <ul className="privacy-list">
                  <li><strong>Dormant accounts</strong> — accounts inactive for a continuous 12-month period are flagged for closure, and their associated personal files are queued for removal.</li>
                </ul>

                <h3 className="privacy-h3">3.2 &nbsp;Account deletion <span className="privacy-tag">Google Play compliant</span></h3>
                <p>You can request full deletion of your account and data at any time, from either app.</p>
                <ul className="privacy-list">
                  <li><strong>How to request</strong> — send a deletion request from your registered email address to <a href="mailto:support@korra.com.ng">support@korra.com.ng</a>.</li>
                  <li><strong>Processing window</strong> — once we verify ownership, your profile identifiers, historical logs, and Google authentication links are removed from our live databases within 30 days.</li>
                  <li><strong>Active balance exception</strong> — if your account holds a live, uncompleted payment plan or an unresolved store balance, deletion is paused until that balance is cleared between both parties.</li>
                </ul>

                <h3 className="privacy-h3">3.3 &nbsp;Security safeguards</h3>
                <ul className="privacy-list">
                  <li>All data moving between your app and our servers is protected with industry-standard TLS/SSL encryption.</li>
                  <li>Korra does <strong>not</strong> sell, rent, or trade your personal information, store records, or transaction logs to advertisers or data brokers under any circumstances.</li>
                  <li>All payments are processed over secure NIP bank networks via Monnify. Korra never processes, handles, or stores raw card numbers.</li>
                </ul>

                <div className="privacy-contact">
                  <div className="privacy-contact-label mono">Privacy &amp; data requests</div>
                  <button type="button" onClick={requestDeletion} className="privacy-contact-email">
                    {copied ? 'Copied to clipboard ✓' : 'support@korra.com.ng'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        .privacy-hero { padding: 180px 0 56px; background: var(--white); border-bottom: 1px solid var(--line); }
        @media (max-width: 820px) { .privacy-hero { padding: 140px 0 44px; } }

        .privacy-body { padding: 72px 0 40px; background: var(--white); }
        .privacy-layout { display: grid; grid-template-columns: 240px 1fr; gap: 72px; align-items: start; }
        @media (max-width: 900px) { .privacy-layout { grid-template-columns: 1fr; gap: 40px; } }

        /* Sidebar */
        .privacy-nav { position: sticky; top: 110px; display: flex; flex-direction: column; gap: 4px; }
        @media (max-width: 900px) {
          .privacy-nav {
            position: relative; top: 0; flex-direction: row; flex-wrap: wrap; gap: 8px;
            padding-bottom: 24px; border-bottom: 1px solid var(--line);
          }
        }
        .privacy-nav-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
        @media (max-width: 900px) { .privacy-nav-label { display: none; } }
        .privacy-nav-link {
          font-size: 14px; font-weight: 500; color: var(--muted);
          padding: 9px 14px; border-radius: 100px; border: 1px solid transparent;
          transition: color .2s var(--ease), background .2s var(--ease), border-color .2s var(--ease);
        }
        .privacy-nav-link:hover { color: var(--ink); background: rgba(0,0,0,0.03); }
        .privacy-nav-link.active { color: var(--orange); background: var(--orange-tint); font-weight: 600; }
        .privacy-nav-cta { margin-top: 18px; justify-content: center; }
        @media (max-width: 900px) { .privacy-nav-cta { margin-top: 0; } }

        /* Content */
        .privacy-content { max-width: 720px; min-width: 0; }
        .privacy-intro {
          font-size: 16.5px; line-height: 1.7; color: var(--ink);
          padding-bottom: 40px; margin-bottom: 8px; border-bottom: 1px solid var(--line);
        }
        .privacy-intro strong { font-weight: 600; }

        .privacy-part { padding: 48px 0; border-bottom: 1px solid var(--line); }
        .privacy-part:last-child { border-bottom: none; }
        .privacy-part-head { margin-bottom: 28px; }
        .privacy-part-num { display: block; font-size: 12px; font-weight: 600; color: var(--orange); letter-spacing: 0.08em; margin-bottom: 14px; }
        .privacy-part-head .h2 { font-size: clamp(24px, 3vw, 34px); }

        .privacy-h3 {
          font-family: 'Sora', sans-serif; font-size: 17px; font-weight: 600;
          letter-spacing: -0.01em; color: var(--ink); margin: 34px 0 14px;
          display: flex; align-items: center; flex-wrap: wrap; gap: 4px;
        }
        .privacy-content p { font-size: 15.5px; line-height: 1.7; color: var(--muted); margin-bottom: 14px; }

        .privacy-list { list-style: none; margin: 0 0 8px; padding: 0; }
        .privacy-list li {
          position: relative; padding-left: 26px; margin-bottom: 14px;
          font-size: 15.5px; line-height: 1.7; color: var(--muted);
        }
        .privacy-list li::before {
          content: ''; position: absolute; left: 4px; top: 10px;
          width: 7px; height: 7px; border-radius: 50%; background: var(--orange);
        }
        .privacy-list li strong { color: var(--ink); font-weight: 600; }
        .privacy-content a { color: var(--orange); font-weight: 500; text-decoration: underline; text-underline-offset: 2px; }

        .privacy-callout {
          background: var(--orange-tint); border-left: 3px solid var(--orange);
          border-radius: 0 14px 14px 0; padding: 18px 22px; margin: 4px 0 20px;
          font-size: 15px; line-height: 1.65; color: var(--ink);
        }
        .privacy-callout strong { color: var(--orange); font-weight: 700; }

        .privacy-tag {
          font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 600;
          letter-spacing: 0.05em; text-transform: uppercase; color: var(--orange);
          background: var(--orange-tint); padding: 4px 9px; border-radius: 100px;
        }

        .privacy-contact { margin-top: 40px; background: var(--ink); border-radius: 20px; padding: 28px 30px; }
        .privacy-contact-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted-dark); margin-bottom: 8px; }
        .privacy-contact-email {
          font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 700;
          color: var(--white); letter-spacing: -0.02em; background: none; border: none;
          padding: 0; cursor: pointer; text-align: left; transition: color .2s var(--ease);
        }
        .privacy-contact-email:hover { color: var(--orange-2); }
      `}</style>
    </div>
  );
};