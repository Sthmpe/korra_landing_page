import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, TikTokIcon } from '../components/icons';
import { KorraLinks } from '../constants/links';

export const HomeLayout = ({ liveMerchants = [] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Is Korra a loan or credit system?",
      a: "No. Korra is not a loan or credit system. Customers simply pay in parts over time, and merchants track everything clearly. There is no debt, no interest, and no borrowing involved."
    },
    {
      q: "How does Korra work for customers?",
      a: "A customer receives a payment plan from a merchant, pays at their own pace over time, and completes payment before collecting their item. They can see their full progress at every step."
    },
    {
      q: "How do merchants use Korra?",
      a: "Merchants create a payment plan, share it with their customer, and track every payment in one place. Korra sends the reminders automatically, so there is no need to chase anyone."
    },
    {
      q: "What is a Store Balance?",
      a: "Store Balance is money a customer has already paid towards a plan with a specific merchant. If a plan is cancelled, the money stays as credit with that merchant. It can be used to pay in full for a new item, but starting a new plan requires fresh payment."
    },
    {
      q: "Does Korra hold my money or guarantee delivery?",
      a: "No. Korra is a payment tracking technology, not an escrow service or marketplace. Payments are processed through our licensed partner and settled to the merchant. Merchants are responsible for delivering, and customers should always transact with businesses they trust."
    },
    {
      q: "What are the fees to use Korra?",
      a: "Korra charges a transparent service fee to maintain secure payment tracking. Fees are capped so you never overpay on large purchases. There is no interest, no subscription, and no late penalties."
    }
  ];

  // Smooth scroll logic
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Nav shrink logic
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Strict staggered reveal animations matching exactly to the vanilla JS
  useLayoutEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Stagger sibling reveals within parent
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      el.classList.remove('in'); // Reset on mount
      io.observe(el);
    });

    // Stagger children
    document.querySelectorAll('.stagger').forEach((parent) => {
      [...parent.children].forEach((child, i) => {
        child.style.transitionDelay = (i * 90) + 'ms';
      });
    });

    // Within reveal groups: chain text/cta delays
    document.querySelectorAll('.hero-copy, .dark-statement, .section-head, .cust-grid > div:first-child').forEach((group) => {
      let i = 0;
      group.querySelectorAll('.reveal').forEach((el) => {
        el.style.transitionDelay = (i * 110) + 'ms';
        i++;
      });
    });

    return () => io.disconnect();
  }, []);

  // Handle body overflow when modal is open to ensure "smooth flow"
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  // Modal Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  const triggerModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      {/* ============== NAV ============== */}
      <header className={`nav-shell ${isScrolled ? 'scrolled' : ''}`} id="nav">
        <div className="nav-inner">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="brand" aria-label="Korra">
            <img src="/korra_logo_icon.webp" alt="Korra Logo" />
            <span className="wordmark">KORRA</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            <a className="nav-link" href="#businesses" onClick={(e) => handleNavClick(e, 'businesses')}>For Businesses</a>
            <a className="nav-link" href="#customers" onClick={(e) => handleNavClick(e, 'customers')}>For Customers</a>
            <a className="nav-link" href="#directory" onClick={(e) => handleNavClick(e, 'directory')}>Merchant Directory</a>
            <a className="nav-link" href="#how" onClick={(e) => handleNavClick(e, 'how')}>How It Works</a>
          </nav>
          {/* Desktop CTA */}
          <div className="nav-ctas nav-ctas-desktop">
            <a href="#" className="btn btn-primary btn-sm" onClick={triggerModal}>Get Started Free</a>
          </div>
          {/* Mobile hamburger */}
          <button className="nav-hamburger" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </header>

      {/* ============== MOBILE MENU OVERLAY ============== */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-top">
              <a href="#" className="brand" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
                <img src="/korra_logo_icon.webp" alt="Korra Logo" />
                <span className="wordmark">KORRA</span>
              </a>
              <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>
              </button>
            </div>
            <nav className="mobile-menu-links">
              <a href="#businesses" onClick={(e) => { handleNavClick(e, 'businesses'); setMobileMenuOpen(false); }}>For Businesses <span className="arrow">→</span></a>
              <a href="#customers" onClick={(e) => { handleNavClick(e, 'customers'); setMobileMenuOpen(false); }}>For Customers <span className="arrow">→</span></a>
              <a href="#directory" onClick={(e) => { handleNavClick(e, 'directory'); setMobileMenuOpen(false); }}>Merchant Directory <span className="arrow">→</span></a>
              <a href="#how" onClick={(e) => { handleNavClick(e, 'how'); setMobileMenuOpen(false); }}>How It Works <span className="arrow">→</span></a>
            </nav>
            <div className="mobile-menu-ctas">
              <a href="https://business.korra.com.ng" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Get Started Free <span className="arrow">→</span></a>
              <a href="#" className="btn btn-dark" onClick={(e) => { triggerModal(e); setMobileMenuOpen(false); }}>Download App</a>
            </div>
          </div>
        </div>
      )}

      {/* ============== HERO ============== */}
      <section className="hero" data-screen-label="01 Hero">
        <div className="hero-bg-num" aria-hidden="true">₦</div>
        <div className="container-wide">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow reveal">Built for Nigerian Businesses</div>
              <h1 className="display reveal">
                Offer installment<br/>
                payments with<br/>
                <span className="underlined">structure</span>.
              </h1>
              <p className="lede reveal">
                Many Nigerian businesses already let customers pay in parts. Korra is the commitment infrastructure that helps you manage it properly. Turn casual shoppers into intentional buyers who stay with your brand, not just one purchase.
              </p>
              <div className="hero-ctas reveal">
                <a href="#" className="btn btn-primary" onClick={triggerModal}>Get started as a business <span className="arrow">→</span></a>
                <a href="#" className="btn btn-text" onClick={triggerModal}>Download the customer app <span className="arrow">→</span></a>
              </div>

              <div className="hero-stats stagger reveal">
                <div className="hero-stat">
                  <div className="v"><span className="orange">₦0</span> to start</div>
                  <div className="l">No subscription. No setup fee.</div>
                </div>
                <div className="hero-stat">
                  <div className="v">3.5% per payment</div>
                  <div className="l">Only on completed customer payments.</div>
                </div>
                <div className="hero-stat">
                  <div className="v">100% merchant-controlled</div>
                  <div className="l">You set the terms  every single time.</div>
                </div>
              </div>
            </div>

            {/* phone */}
            <div className="phone-stage reveal">
              <div className="phone-glow" aria-hidden="true"></div>
              <div className="phone">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <img src="/assets/app-home-clean.png" alt="Korra merchant app showing wallet balance and active plans" />
                </div>
              </div>

              <div className="notif notif-hero" aria-hidden="true">
                <div className="bell">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                </div>
                <div>
                  <div className="l1">Payment received</div>
                  <div className="l2">Tobi paid ₦15,000 just now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== INSIGHT STRIP (dark) ============== */}
      <section className="section dark" data-screen-label="02 Insight">
        <div className="bg-naira" aria-hidden="true">₦</div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="dark-statement">
            <div className="eyebrow reveal">The opportunity</div>
            <h2 className="h1 reveal" style={{ marginTop: '32px' }}>
              Your customers are already<br/>
              thinking in installments.<br/>
              <span className="accent-orange">They just don't know you allow it.</span>
            </h2>
            <p className="lede reveal">
              Korra makes the option visible without the chaos. It attracts intentional buyers, with one link, one code, and a clear plan from start to finish.
            </p>
            <div className="hero-ctas reveal">
              <a href="#" className="btn btn-primary" onClick={triggerModal}>Start managing installments <span className="arrow">→</span></a>
              <a href="#how" className="btn btn-text" onClick={(e) => handleNavClick(e, 'how')}>See how it works <span className="arrow">→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FOR BUSINESSES ============== */}
      <section className="section" id="businesses" data-screen-label="03 For Businesses">
        <div className="container-wide">
          <div className="biz-grid">
            <div>
              <div className="section-head" style={{ marginBottom: '56px' }}>
                <div className="eyebrow reveal">For Businesses</div>
                <h2 className="h2 reveal" style={{ marginTop: '28px' }}>
                  You already offer installment.<br/>
                  <span className="accent-orange">Korra helps you manage it better.</span>
                </h2>
                <p className="lede reveal">
                  Stop limiting installment to only your most trusted customers. Korra attracts buyers who are ready to commit, while you stay in control of your terms, your timeline, and every payment.
                </p>
              </div>

              <div className="feature-list reveal">
                <div className="feature-item">
                  <div className="feature-num">01</div>
                  <div>
                    <div className="feature-title">Set clear payment terms</div>
                    <div className="feature-desc">Define duration, deposit, and schedule. Both parties know what to expect from day one.</div>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-num">02</div>
                  <div>
                    <div className="feature-title">Track payment progress</div>
                    <div className="feature-desc">See exactly how much each customer has paid and what's remaining at a glance.</div>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-num">03</div>
                  <div>
                    <div className="feature-title">Automatic reminders</div>
                    <div className="feature-desc">Korra sends reminders on your behalf. No more chasing customers manually.</div>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-num">04</div>
                  <div>
                    <div className="feature-title">Stay in full control</div>
                    <div className="feature-desc">You decide who qualifies, how many active plans to run, and what your terms are.</div>
                  </div>
                </div>
              </div>

              <div className="reveal" style={{ marginTop: '40px' }}>
                <a href="#" className="btn btn-primary" onClick={triggerModal}>Download the Korra Business App <span className="arrow">→</span></a>
              </div>
            </div>

            {/* duo phone mockup */}
            <div className="phone-duo reveal">
              <div className="phone-glow" aria-hidden="true" style={{ top: '30%', left: '25%', width: '50%', height: '50%' }}></div>
              <div className="phone">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <img src="/assets/app-reservations-clean.png" alt="Korra reservations screen" />
                </div>
              </div>
              <div className="phone">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <img src="/assets/app-home-clean.png" alt="Korra home screen with balance" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== HOW IT WORKS ============== */}
      <section className="section" id="how" data-screen-label="04 How It Works" style={{ background: 'var(--white)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container-wide">
          <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 'none', gap: '56px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '700px' }}>
              <div className="eyebrow reveal">How It Works</div>
              <h2 className="h2 reveal" style={{ marginTop: '28px' }}>
                Simple for you.<br/>
                Simple for your customer.
              </h2>
            </div>
            <p className="lede reveal" style={{ maxWidth: '38ch' }}>
              Four straightforward steps. From setup to settled payment in under five minutes of merchant work.
            </p>
          </div>

          <div className="how-grid stagger reveal">
            <div className="how-step">
              <div className="how-num">STEP 01</div>
              <div className="how-title">Merchant sets up</div>
              <div className="how-desc">Add your product, set terms and minimum deposit. Takes about 2 minutes.</div>
            </div>
            <div className="how-step">
              <div className="how-num">STEP 02</div>
              <div className="how-title">Customer gets a code</div>
              <div className="how-desc">A unique plan code is generated. Customer takes it to Korra to start their payment plan.</div>
            </div>
            <div className="how-step">
              <div className="how-num">STEP 03</div>
              <div className="how-title">Payments come in</div>
              <div className="how-desc">Customer pays gradually. Korra tracks every payment and sends automatic reminders.</div>
            </div>
            <div className="how-step">
              <div className="how-num">STEP 04</div>
              <div className="how-title">You deliver & get paid</div>
              <div className="how-desc">Once payment is complete, deliver the product. Clear record of everything.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FOR CUSTOMERS ============== */}
      <section className="section customers" id="customers" data-screen-label="05 For Customers">
        <div className="container-wide">
          <div className="cust-grid">
            <div className="cust-copy">
              <div className="eyebrow reveal">For Customers</div>
              <h2 className="h2 reveal" style={{ marginTop: '24px' }}>
                Pay gradually.<br/>
                <span className="accent-orange">With full clarity.</span>
              </h2>
              <p className="lede reveal" style={{ marginTop: '22px' }}>
                Korra also has a free app for customers, a clear plan, visible progress, and structured commitment to the things they want.
              </p>
              <div className="hero-ctas reveal" style={{ marginTop: '28px' }}>
                <a href="#" className="btn btn-dark btn-sm" onClick={triggerModal}>Download the Korra app <span className="arrow">→</span></a>
              </div>
            </div>

            <div className="benefit-list reveal">
              <div className="benefit-row">
                <div className="benefit-num">01</div>
                <div>
                  <div className="benefit-title">Clear payment plan</div>
                  <div className="benefit-desc">Know exactly how much to pay and when. No surprises, no hidden conditions.</div>
                </div>
              </div>
              <div className="benefit-row">
                <div className="benefit-num">02</div>
                <div>
                  <div className="benefit-title">Visible progress</div>
                  <div className="benefit-desc">Watch yourself get closer to completing your purchase with every payment.</div>
                </div>
              </div>
              <div className="benefit-row">
                <div className="benefit-num">03</div>
                <div>
                  <div className="benefit-title">Payment reminders</div>
                  <div className="benefit-desc">Never miss a payment. Korra reminds you when your next payment is due.</div>
                </div>
              </div>
              <div className="benefit-row">
                <div className="benefit-num">04</div>
                <div>
                  <div className="benefit-title">Structured commitment</div>
                  <div className="benefit-desc">No more informal agreements. Everything is documented and clear.</div>
                </div>
              </div>
            </div>

            <div className="cust-phone-col reveal">
              <div className="phone">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <img src="/assets/cust-home-clean.png" alt="Korra customer app home screen" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== MERCHANT DIRECTORY ============== */}
      <section className="section" id="directory" data-screen-label="06 Merchant Directory" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container-wide">
          <div className="directory-head">
            <div className="left">
              <div className="eyebrow reveal">Merchant Directory</div>
              <h2 className="h2 reveal" style={{ marginTop: '28px' }}>
                Discover businesses that accept<br/>
                installment on Korra.
              </h2>
              <p className="lede reveal" style={{ marginTop: '24px' }}>Browse merchants across Nigeria who use Korra to offer structured installment payments.</p>
            </div>
            <Link to="/merchants" className="btn btn-text reveal">Browse all merchants <span className="arrow">→</span></Link>
          </div>

          <div className="directory-grid stagger reveal">
            {liveMerchants.length > 0 ? (
              liveMerchants.slice(0, 6).map((merchant) => {
                const initials = merchant.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                return (
                  <div key={merchant.id} className="merchant-card block">
                    <div className="merchant-top">
                      <div className="merchant-logo" style={{ background: '#0D0D0D' }}>
                        {initials}
                      </div>
                      <div>
                        <div className="merchant-name">{merchant.name}</div>
                        <div className="merchant-cat">{merchant.category}</div>
                      </div>
                    </div>
                    <div className="merchant-meta">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {merchant.location}
                    </div>
                    <div className="merchant-socials">
                      {merchant.socials?.whatsapp && (
                        <a href={merchant.socials.whatsapp} target="_blank" rel="noreferrer" className="social-btn" aria-label="WhatsApp">
                          <WhatsAppIcon className="w-4 h-4" />
                        </a>
                      )}
                      {merchant.socials?.instagram && (
                        <a href={merchant.socials.instagram} target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram">
                          <InstagramIcon className="w-4 h-4" />
                        </a>
                      )}
                      {merchant.socials?.website && (
                        <a href={merchant.socials.website} target="_blank" rel="noreferrer" className="social-btn" aria-label="Website">
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                      {merchant.socials?.tiktok && (
                        <a href={merchant.socials.tiktok} target="_blank" rel="noreferrer" className="social-btn" aria-label="TikTok">
                          <TikTokIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-slate-500">Loading verified merchants...</p>
            )}
          </div>
        </div>
      </section>

      {/* ============== WHY KORRA (dark) ============== */}
      <section className="section dark" data-screen-label="07 Why Korra" style={{ paddingBottom: 0 }}>
        <div className="container-wide">
          <div className="section-head" style={{ marginBottom: '96px', maxWidth: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end' }}>
            <div>
              <div className="eyebrow reveal">Why Korra</div>
              <h2 className="h1 reveal" style={{ marginTop: '28px', color: 'var(--white)' }}>
                Not a loan.<br/>
                Not a ledger.<br/>
                <span className="accent-orange">A commitment infrastructure.</span>
              </h2>
            </div>
            <p className="lede reveal">
              Korra structures the installment behavior that already exists in Nigerian commerce. No credit. No lending. Just a secure way to turn single payments into lasting commitment to your brand.
            </p>
          </div>

          <div className="why-grid reveal">
            <div className="why-card">
              <div className="why-num">01 / BEHAVIOR</div>
              <div className="why-title">Built around existing behavior</div>
              <div className="why-desc">Merchants already offer installment. Korra structures what already happens informally.</div>
            </div>
            <div className="why-card">
              <div className="why-num">02 / CONTROL</div>
              <div className="why-title">Merchant remains in control</div>
              <div className="why-desc">You set the terms, the duration, the deposit. Korra manages the process  not the decisions.</div>
            </div>
            <div className="why-card">
              <div className="why-num">03 / EASE</div>
              <div className="why-title">Reduces repayment stress</div>
              <div className="why-desc">Automated reminders and visible progress reduce the awkwardness of debt collection.</div>
            </div>
            <div className="why-card">
              <div className="why-num">04 / SETUP</div>
              <div className="why-title">No integration required</div>
              <div className="why-desc">Start immediately. No website needed. Works for any business, online or offline.</div>
            </div>
            <div className="why-card">
              <div className="why-num">05 / PRICING</div>
              <div className="why-title">Free for merchants to start</div>
              <div className="why-desc">No subscription. No setup fee. A small 3.5% processing fee applies only on customer payments.</div>
            </div>
            <div className="why-card">
              <div className="why-num">06 / NIGERIA</div>
              <div className="why-title">Built for Nigerian commerce</div>
              <div className="why-desc">Designed around how Nigerian businesses actually sell  fashion, gadgets, accessories, and more.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section className="section faq-section" data-screen-label="08 FAQ">
        <div className="container">
          <div className="faq-head">
            <span className="eyebrow reveal">Questions</span>
            <h2 className="h1 reveal">Everything you need to know.</h2>
            <p className="lede reveal">Clear answers to the most common questions about how Korra works.</p>
          </div>
          <div className="faq-list reveal">
            {faqs.map((item, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FINAL CTA (orange) ============== */}
      <section className="section orange cta-orange" data-screen-label="08 Final CTA">
        <div className="container">
          <h2 className="h1 reveal">When a customer is ready to commit, everything should already be in place.</h2>
          <p className="lede reveal">Set up Korra today. The next time a customer asks about installment, you'll be ready to say yes, and secure their commitment to your brand.</p>
          <div className="hero-ctas reveal">
            <a href="#" className="btn btn-light" onClick={triggerModal}>Start free as a business <span className="arrow">→</span></a>
            <a href="#" className="btn btn-dark" onClick={triggerModal}>Download the customer app <span className="arrow">→</span></a>
          </div>
          <div className="note reveal">No subscription. No setup fee. Free to start.</div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="footer">
        <div className="container-wide">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="brand"><img src="/korra_logo_icon.webp" alt="Korra Logo" /><span className="wordmark" style={{ color: 'var(--white)' }}>KORRA</span></a>
              <div className="footer-tag">Smart People Own Things Differently.</div>
              <div className="footer-desc">Structured installment payments for Nigerian businesses. Manage how your customers pay, with clarity and control.</div>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><a href="#businesses" onClick={(e) => handleNavClick(e, 'businesses')}>For Businesses</a></li>
                <li><a href="#customers" onClick={(e) => handleNavClick(e, 'customers')}>For Customers</a></li>
                <li><Link to="/merchants">Merchant Directory</Link></li>
                <li><a href="#how" onClick={(e) => handleNavClick(e, 'how')}>How It Works</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Korra</a></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
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

      {/* ============== GET STARTED MODAL ============== */}
      <div className={`modal-shell ${showModal ? 'open' : ''}`} id="get-started-modal" aria-hidden={!showModal}>
        <div className="modal-overlay" onClick={() => setShowModal(false)} data-modal-close></div>
        <div className="modal-card" role="dialog" aria-labelledby="modal-title" aria-modal={showModal}>
          <button className="modal-close" onClick={() => setShowModal(false)} data-modal-close aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>
          </button>
          <div className="modal-head">
            <div className="eyebrow">Get started</div>
            <h3 id="modal-title">Choose your <span className="accent-orange">Korra</span> experience.</h3>
            <p className="modal-sub">Free for everyone. Open the web app instantly, or grab the Android APK.</p>
          </div>
          <div className="modal-grid">
            <div className="modal-col feature">
              <div className="modal-col-tag">For Businesses</div>
              <div className="modal-col-title">Sell with structure</div>
              <div className="modal-col-desc">Set up installment plans, track payments, and manage customers from one place.</div>
              <div className="modal-actions">
                <a href="https://business.korra.com.ng" className="btn btn-primary">Open Web App <span className="arrow">→</span></a>
                <a href={KorraLinks.merchantApk} className="btn btn-dark">Download APK</a>
              </div>
            </div>
            <div className="modal-col">
              <div className="modal-col-tag">For Customers</div>
              <div className="modal-col-title">Buy with clarity</div>
              <div className="modal-col-desc">Pay gradually for what you want  with a clear plan and visible progress.</div>
              <div className="modal-actions">
                <a href="https://app.korra.com.ng" className="btn btn-dark">Open Web App <span className="arrow">→</span></a>
                <a href={KorraLinks.customerApk} className="btn btn-dark">Download APK</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
