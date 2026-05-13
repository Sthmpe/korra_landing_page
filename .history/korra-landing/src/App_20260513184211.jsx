import './index.css';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { 
  Menu, X, ShieldCheck, Store,
  CheckCircle, Lock, Briefcase,
  ChevronDown, ChevronUp, RefreshCcw,
  Smartphone, Globe, Upload, Plus,
  ArrowLeft, Search, ArrowRight, UserCheck, MapPin,
  TrendingUp, Activity, CheckSquare, Download
} from 'lucide-react';

// --- CUSTOM SVG ICONS ---
const WhatsAppIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;
const InstagramIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>;
const TikTokIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>;
const XSocialIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.913l-5.4-7.06L4.5 22H1.244l8.07-9.222L1 2h7.077l4.875 6.45L18.244 2zm-1.213 18.169h1.83L7.046 3.74H5.082L17.031 20.17z"/></svg>;

const KorraLinks = {
  vendorTermsPdf: 'https://drive.google.com/uc?export=download&id=1hYJ1ZFdH2J7znT7zz_E2xm--CWO7fGAL',
  vendorPartnershipPdf: 'https://drive.google.com/uc?export=download&id=1K2jqJ0XB3lS_w1b64MCyvfUaPnaJyFJP',
  vendorPrivacyPdf: 'https://drive.google.com/uc?export=download&id=1P9rBibP5HASwzaGaFcnRTwSFjOlMBtNk',
  customerTermsPdf: 'https://drive.google.com/uc?export=download&id=1hYJ1ZFdH2J7znT7zz_E2xm--CWO7fGAL',
  customerPrivacyPdf: 'https://drive.google.com/uc?export=download&id=1P9rBibP5HASwzaGaFcnRTwSFjOlMBtNk',
  merchantApk: 'https://drive.google.com/uc?export=download&id=1Arcgl8M9k-jrLR0AcqIWOuN-oVUufpeQ',
  customerApk: 'https://drive.google.com/uc?export=download&id=1Yvv24squjPq424ry9I7GRP1UfNXMuk0q'
};

// ============================================================================
// 1. ADMIN PORTAL (Untouched)
// ============================================================================
const AdminPortal = ({ liveMerchants = [] }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: '', location: '', description: '', imageUrl: '', whatsapp: '', instagram: '', tiktok: '', website: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => { e.preventDefault(); setIsAuthenticated(true); };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://ltytmqjpektcgwajfzfm.supabase.co/functions/v1/merchants-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminPassword: password,
          merchantData: {
            name: formData.name, category: formData.category, location: formData.location, description: formData.description, imageUrl: formData.imageUrl,
            socials: { whatsapp: formData.whatsapp || "", instagram: formData.instagram || "", tiktok: formData.tiktok || "", website: formData.website || "" }
          }
        })
      });
      const data = await res.json();
      if (res.ok && data.status === "SUCCESS") {
        alert(`Merchant ${formData.name} added successfully!`);
        setFormData({ name: '', category: '', location: '', description: '', imageUrl: '', whatsapp: '', instagram: '', tiktok: '', website: '' });
      } else {
        alert("Failed: " + (data.error || "Check your password."));
        if (data.error === "Unauthorized Access.") setIsAuthenticated(false);
      }
    } catch (_error : any) {
      alert("Network error. " + _error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative">
      <Link to="/" className="absolute top-8 left-8 text-white"><ArrowLeft size={24}/></Link>
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-center mb-6 text-slate-900">Admin Portal</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="password" placeholder="Master Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-lg outline-none focus:ring-2 focus:ring-[#A54600]" />
          <button type="submit" className="w-full bg-[#A54600] text-white py-3 rounded-lg font-bold">Access Database</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-lg">
        <h1 className="text-lg md:text-2xl font-bold text-slate-900 mb-8"><Upload className="inline text-[#A54600]"/> Platform Injection</h1>
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Merchant Name</label><input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-lg outline-none"/></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Category</label><input required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-lg outline-none"/></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Location</label><input required name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-lg outline-none"/></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Banner Image URL</label><input required type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-lg outline-none"/></div>
          </div>
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Description</label><input required name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-lg outline-none"/></div>
          <button disabled={loading} type="submit" className="w-full bg-[#A54600] text-white py-4 rounded-xl font-bold">{loading ? 'Saving...' : 'Add Merchant'}</button>
        </form>
      </div>
    </div>
  );
};

// ============================================================================
// 2. MERCHANT DYNAMIC PROFILE PAGE (Untouched)
// ============================================================================
const MerchantProfile = ({ liveMerchants = [], loading }) => {
  const { slug } = useParams();
  const merchant = liveMerchants.find(m => m.name.toLowerCase().replace(/\s+/g, '-') === slug);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!merchant) return <div className="min-h-screen flex items-center justify-center">Not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white sticky top-0 z-50 shadow-sm"><div className="max-w-4xl mx-auto px-4 h-16 flex items-center"><Link to="/merchants"><ArrowLeft size={24} /></Link><span className="ml-4 font-bold">{merchant.name}</span></div></nav>
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="h-48 md:h-80 w-full"><img src={merchant.imageUrl} alt="" className="w-full h-full object-cover" /></div>
          <div className="p-6 md:p-12">
            <h1 className="text-2xl font-extrabold mb-2">{merchant.name}</h1>
            <p className="text-slate-500 mb-6">{merchant.location}</p>
            <p className="text-slate-600 mb-8">{merchant.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. MERCHANTS DIRECTORY PAGE (Untouched)
// ============================================================================
const MerchantsDirectory = ({ liveMerchants = [], loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = liveMerchants.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white sticky top-0 z-50 shadow-sm"><div className="max-w-7xl mx-auto px-4 h-16 flex items-center"><Link to="/"><ArrowLeft size={24} /></Link><span className="ml-4 font-bold">Merchants</span></div></nav>
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full p-4 rounded-xl shadow-sm mb-8"/>
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map(merchant => (
            <Link to={`/merchant/${merchant.name.toLowerCase().replace(/\s+/g, '-')}`} key={merchant.id} className="bg-white rounded-3xl overflow-hidden shadow-sm block hover:shadow-lg">
              <div className="h-40"><img src={merchant.imageUrl} alt="" className="w-full h-full object-cover" /></div>
              <div className="p-5"><h3 className="font-bold">{merchant.name}</h3><p className="text-sm text-slate-500">{merchant.location}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. CATEGORY SEO PAGE (Untouched)
// ============================================================================
const CategoryPage = ({ liveMerchants = [], loading }) => {
  const { categorySlug } = useParams();
  return <div className="min-h-screen bg-slate-50"><nav className="bg-white shadow-sm p-4"><Link to="/"><ArrowLeft size={24} /></Link></nav><div className="p-8"><h1>{categorySlug}</h1></div></div>;
}

// ============================================================================
// 5. UNIFIED SCROLLING LANDING PAGE (1:1 HTML Matching)
// ============================================================================
const HomeLayout = ({ liveMerchants = [] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                Many Nigerian businesses already let customers pay in parts. Korra helps you manage it properly — clear terms, payment visibility, and less stress. Without changing how you already sell.
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
                  <div className="l">You set the terms — every single time.</div>
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
              Korra makes the option visible — without the chaos. One link, one code, one structured plan from start to finish.
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
                  Stop limiting installment to only your most trusted customers. With Korra, you stay in control — set your own terms, track every payment, and reduce the stress of manual follow-up.
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
                Korra also has a free app for customers — a clear plan, visible progress, and structured commitment to the things they want.
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
                        <a href={merchant.socials.tiktok} target="_blank" rel="noreferrer" className="social-btn" aria-label="X">
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
                <span className="accent-orange">A structured payment layer.</span>
              </h2>
            </div>
            <p className="lede reveal">
              Korra structures the installment behavior that already exists in Nigerian commerce. No credit. No lending. Just clarity and control — built for how businesses actually sell.
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
              <div className="why-desc">You set the terms, the duration, the deposit. Korra manages the process — not the decisions.</div>
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
              <div className="why-desc">Designed around how Nigerian businesses actually sell — fashion, gadgets, accessories, and more.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FINAL CTA (orange) ============== */}
      <section className="section orange cta-orange" data-screen-label="08 Final CTA">
        <div className="container">
          <h2 className="h1 reveal">When a customer is ready to commit — everything should already be in place.</h2>
          <p className="lede reveal">Set up Korra today. The next time a customer asks about installment, you'll be ready to say yes — with structure.</p>
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
              <div className="footer-desc">Structured installment payments for Nigerian businesses. Manage how your customers pay — with clarity and control.</div>
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
              <div className="modal-col-desc">Pay gradually for what you want — with a clear plan and visible progress.</div>
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

// ============================================================================
// 6. MAIN APP COMPONENT (ROUTING)
// ============================================================================
export default function App() {
  const [isAdminRoute] = useState(() => typeof window !== 'undefined' && window.location.search.includes('admin=true'));
  const [merchantsList, setMerchantsList] = useState([]);
  const [loadingMerchants, setLoadingMerchants] = useState(true);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const res = await fetch('https://ltytmqjpektcgwajfzfm.supabase.co/functions/v1/merchants-api', { method: 'GET' });
        const data = await res.json();
        if (data.merchants) setMerchantsList(data.merchants);
      } catch (error) {
        console.error("Failed to load merchants:", error);
      } finally {
        setLoadingMerchants(false);
      }
    };
    fetchMerchants();
  }, []);

  if (isAdminRoute) {
     return <BrowserRouter><AdminPortal liveMerchants={merchantsList} /></BrowserRouter>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout liveMerchants={merchantsList} />} />
        <Route path="/merchants" element={<MerchantsDirectory liveMerchants={merchantsList} loading={loadingMerchants} />} />
        <Route path="/merchant/:slug" element={<MerchantProfile liveMerchants={merchantsList} loading={loadingMerchants} />} />
        <Route path="/:categorySlug" element={<CategoryPage liveMerchants={merchantsList} loading={loadingMerchants} />} />
        <Route path="/admin" element={<AdminPortal liveMerchants={merchantsList} />} />
      </Routes>
    </BrowserRouter>
  );
}