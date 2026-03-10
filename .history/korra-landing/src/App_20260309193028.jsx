import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ShieldCheck, Store, Hexagon,
  CheckCircle, Banknote, Lock, Briefcase,
  ChevronDown, ChevronUp, RefreshCcw,
  Smartphone, Globe, Instagram, MessageCircle, Upload, Plus,
  ArrowLeft, Search, ArrowRight, UserCheck, Twitter, Linkedin, AtSign, Megaphone
} from 'lucide-react';

// --- CUSTOM SVG ICONS ---

const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
  </svg>
);

// ============================================================================
// LEGAL LINKS CONFIGURATION
// ============================================================================
const KorraLinks = {
  vendorTermsPdf: 'https://drive.google.com/uc?export=download&id=1hYJ1ZFdH2J7znT7zz_E2xm--CWO7fGAL',
  vendorPartnershipPdf: 'https://drive.google.com/uc?export=download&id=1K2jqJ0XB3lS_w1b64MCyvfUaPnaJyFJP',
  vendorPrivacyPdf: 'https://drive.google.com/uc?export=download&id=1P9rBibP5HASwzaGaFcnRTwSFjOlMBtNk',
  customerTermsPdf: 'https://drive.google.com/uc?export=download&id=1hYJ1ZFdH2J7znT7zz_E2xm--CWO7fGAL',
  customerPrivacyPdf: 'https://drive.google.com/uc?export=download&id=1P9rBibP5HASwzaGaFcnRTwSFjOlMBtNk'
};

// ============================================================================
// 1. ADMIN PORTAL (Merchant Management)
// ============================================================================
const AdminPortal = ({ goHome, liveMerchants = [] }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: '', location: '', description: '', imageUrl: '', whatsapp: '', instagram: '', tiktok: '', website: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

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
            name: formData.name,
            category: formData.category,
            location: formData.location,
            description: formData.description,
            imageUrl: formData.imageUrl,
            socials: {
              whatsapp: formData.whatsapp || "",
              instagram: formData.instagram || "",
              tiktok: formData.tiktok || "",
              website: formData.website || ""
            }
          }
        })
      });

      const data = await res.json();

      if (res.ok && data.status === "SUCCESS") {
        alert(`Merchant ${formData.name} added successfully! Refresh the page to see changes.`);
        setFormData({ name: '', category: '', location: '', description: '', imageUrl: '', whatsapp: '', instagram: '', tiktok: '', website: '' });
      } else {
        alert("Failed: " + (data.error || "Check your password."));
        if (data.error === "Unauthorized Access.") setIsAuthenticated(false);
      }
      
    } catch (error) {
      console.error("Upload error:", error);
      alert("Network error. Make sure your Edge Function is deployed.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative">
        <button onClick={goHome} className="absolute top-8 left-8 text-white flex items-center gap-2 hover:text-[#A54600]"><ArrowLeft size={20}/> Back to Site</button>
        <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <div className="flex justify-center mb-6"><Lock className="text-[#A54600] w-12 h-12" /></div>
          <h2 className="text-2xl font-bold text-center mb-6 text-slate-900">Admin Portal</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="Master Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-[#A54600]" />
            <button type="submit" className="w-full bg-[#A54600] text-white py-3 rounded-lg font-bold">Access Database</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-slate-100">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 flex-wrap gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg md:text-2xl font-bold text-slate-900 flex items-center gap-2 truncate">
              <Upload className="text-[#A54600] shrink-0"/> Platform Injection
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1 truncate">Database Merchant Management</p>
          </div>
          <div className="flex gap-4 shrink-0">
             <button onClick={goHome} className="text-xs md:text-sm font-bold text-slate-500 hover:text-slate-900">Exit</button>
             <button onClick={() => setIsAuthenticated(false)} className="text-xs md:text-sm font-bold text-red-500 hover:text-red-700">Lock</button>
          </div>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Merchant Name</label><input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none"/></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Category</label><input required name="category" placeholder="e.g. Fashion, Gadgets" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none"/></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Location</label><input required name="location" placeholder="e.g. Tanke, Ilorin" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none"/></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Banner Image URL</label><input required type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none"/></div>
          </div>
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Short Description</label><input required name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none"/></div>
          
          <div className="border-t border-slate-100 pt-6">
             <h3 className="font-bold text-slate-900 mb-4">Social Links (Leave empty if none)</h3>
             <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-xs font-bold text-slate-500 mb-2">WhatsApp Link</label><input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="https://wa.me/..." className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"/></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-2">Instagram Link</label><input name="instagram" value={formData.instagram} onChange={handleChange} placeholder="https://instagram.com/..." className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"/></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-2">TikTok Link</label><input name="tiktok" value={formData.tiktok} onChange={handleChange} placeholder="https://tiktok.com/..." className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"/></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-2">Website Link</label><input name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"/></div>
             </div>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-[#A54600] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#8a3a00]">
            <Plus size={20} /> {loading ? 'Saving...' : 'Add Merchant'}
          </button>
        </form>

        <div className="mt-12 border-t border-slate-100 pt-8">
           <h3 className="font-bold text-lg text-slate-900 mb-4">Live Merchants ({liveMerchants.length})</h3>
           <div className="space-y-3">
              {liveMerchants.length === 0 && <p className="text-sm text-slate-400">No merchants found in database.</p>}
              {liveMerchants.map(m => (
                 <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div><p className="font-bold text-slate-900">{m.name}</p><p className="text-xs text-slate-500">{m.category}</p></div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. DEDICATED MERCHANTS DIRECTORY PAGE
// ============================================================================
const MerchantsDirectory = ({ goHome, liveMerchants = [], loading }) => {
  const [merchantFilter, setMerchantFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['All', ...new Set(liveMerchants.map(m => m.category))];
  
  const filteredMerchants = liveMerchants.filter(m => {
    const matchesCategory = merchantFilter === 'All' || m.category === merchantFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (m.name || '').toLowerCase().includes(searchLower) || 
                          (m.location || '').toLowerCase().includes(searchLower) || 
                          (m.category || '').toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={goHome} className="flex items-center gap-2 text-slate-600 hover:text-[#A54600] font-bold text-sm">
            <ArrowLeft size={18} />
          </button>
          <span className="font-bold text-lg text-slate-900">Verified Merchants</span>
          <div className="w-20"></div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Discover Your Next Acquisition.</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            These merchants are fully verified on the Korra infrastructure. Negotiate your terms directly with them, then structure your ownership through the app.
          </p>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="max-w-2xl mx-auto mb-8 relative">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
             <Search className="text-slate-400 w-5 h-5" />
           </div>
           <input 
             type="text" 
             placeholder="Search by store name, location, or category..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-[#A54600] focus:ring-2 focus:ring-[#A54600]/20 outline-none text-slate-900 shadow-sm transition-all"
           />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat, idx) => (
            <button key={idx} onClick={() => setMerchantFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${merchantFilter === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'}`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 font-bold animate-pulse">Loading merchant database...</div>
        ) : filteredMerchants.length === 0 ? (
          <div className="text-center py-20 text-slate-500">No merchants found matching your criteria.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMerchants.map((merchant) => (
              <div key={merchant.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wide z-10">{merchant.category}</div>
                  {/* SEO HIDDEN IN ALT TAG */}
                  <img src={merchant.imageUrl} alt={`${merchant.name} - Korra flexible payment gateway, zero interest installment plans, buy phones and laptops pay small small`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{merchant.name}</h3>
                  <p className="text-xs font-bold text-[#A54600] mb-3 flex items-center gap-1"><Store size={12}/> {merchant.location}</p>
                  <p className="text-sm text-slate-600 mb-6 flex-1">{merchant.description}</p>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    {merchant.socials?.whatsapp && (<a href={merchant.socials.whatsapp} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors" title="WhatsApp"><MessageCircle size={16} /></a>)}
                    {merchant.socials?.instagram && (<a href={merchant.socials.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors" title="Instagram"><Instagram size={16} /></a>)}
                    {merchant.socials?.tiktok && (<a href={merchant.socials.tiktok} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-200 transition-colors" title="TikTok"><TikTokIcon className="w-4 h-4" /></a>)}
                    {merchant.socials?.website && (<a href={merchant.socials.website} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors" title="Website"><Globe size={16} /></a>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 3. MAIN APP COMPONENT
// ============================================================================
export default function App() {
  const [isAdminRoute] = useState(() => typeof window !== 'undefined' && window.location.search.includes('admin=true'));
  const [currentView, setCurrentView] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  
  // LIVE FIREBASE STATE
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

  // Routing
  if (isAdminRoute) return <AdminPortal goHome={() => window.location.href = '/'} liveMerchants={merchantsList} />;
  if (currentView === 'merchants') return <MerchantsDirectory goHome={() => setCurrentView('home')} liveMerchants={merchantsList} loading={loadingMerchants} />;

  const toggleFaq = (id) => { setOpenFaq(openFaq === id ? null : id); };
  
  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // --- COMPREHENSIVE FAQ DATA ---
  const customerFaqs = [
    { question: "What exactly is Korra?", answer: "Korra is a structured payment platform. You reserve what you want today with a minimum 30% down payment, pay toward the full amount at your own pace, and own it completely when done. No loans. No interest. No debt. Just your money moving toward something that becomes yours." },
    { question: "Is Korra a loan app?", answer: "No. Korra does not lend you money, charge interest, or run a credit check. You are paying your own money toward something you already want in a structure that works for your timeline. There is no lender involved at any point." },
    { question: "How does a plan work?", answer: "You and a merchant agree on an item and price through your own channels. The merchant generates a Payment Code on Korra. You enter the code in the app, review the plan summary, and pay your minimum 30% down payment. Your price is locked. Your item is reserved. You pay toward the balance at your own pace within the plan duration. When fully paid, Korra releases your Delivery Code and you collect your item." },
    { question: "What is the Korra plan fee?", answer: "The plan fee is 3.5% of your total plan value. It is charged once at plan initiation from your Korra balance and is non-refundable under any circumstances. For plans above 857,143 naira the fee is capped at 30,000 naira. For plans above 1,714,286 naira it is capped at 60,000 naira." },
    { question: "Is there a fixed payment schedule?", answer: "No. You pay toward your plan at your own pace within the minimum duration. There are no mandatory daily or weekly payments. Payment goals you set in the app are personal commitment tools only and carry no penalties." },
    { question: "What happens if my plan duration ends before I finish paying?", answer: "The plan closes automatically. Everything you paid excluding the non-refundable Korra plan fee converts to Store Balance credited to your merchant. Store Balance is a credit they owe you toward a future transaction with them. It is valid for 12 months from the date it was created." },
    { question: "What happens when I cancel a plan?", answer: "Cancellation is instant. Select Close Plan and it closes immediately. Everything you paid excluding the Korra plan fee converts to Store Balance with your merchant. There are no cash refunds once a plan is initiated." },
    { question: "Can I withdraw money I deposited into my Korra balance?", answer: "No. Your Korra balance exists only for initiating and paying toward active plans or purchasing an item in full. Korra is not a savings platform or a withdrawal service. Only deposit what you are ready to put toward a plan." },
    { question: "What is the minimum down payment?", answer: "Under Korra Strict the platform default minimum down payment is 30% of the total plan value. This is enforced by Korra and cannot be negotiated down by the merchant. Under Korra Direct the merchant sets their own minimum down payment above or below the 30% default based on their relationship with the customer or their own risk appetite. Whichever applies to your plan will be clearly displayed on your plan confirmation screen before you commit." }
  ];

  const merchantFaqs = [
    { question: "How does Korra work for my business?", answer: "You register, complete identity verification, and start generating Payment Codes for customers who want to reserve your items. When a customer pays their down payment you receive those funds immediately into your withdrawable wallet minus Korra's 3.5% merchant fee. You hold the item until full payment is complete. Each delivery confirmation you log grows your Business Capacity and builds your platform profile." },
    { question: "When do I receive my money?", answer: "Every payment a customer makes settles into your withdrawable wallet immediately minus the 3.5% merchant fee. You do not wait for the full plan to complete. Korra absorbs all withdrawal transfer fees so you receive clean transfers with no additional deductions. Your first withdrawal requires completing a one-time live video verification call with the Korra team." },
    { question: "What is Business Capacity?", answer: "Business Capacity is the total naira value of active reservations you can hold across all open plans simultaneously. Every merchant starts at 200,000 naira. Capacity frees up in real time as customer payments come in and grows permanently as you log delivery confirmations. Higher capacity unlocks higher value plan eligibility and platform recognition." },
    { question: "What if a merchant refuses to honour my Store Balance?", answer: "A merchant who refuses to honour Store Balance is in material breach of Korra's Terms of Service and faces permanent platform ban. Korra will generate an Incident Report with the merchant's verified legal name, BVN, NIN, and business address. You will receive a Case Reference Number for independent legal action. Every merchant on Korra has a real verified identity on file. No merchant on this platform is anonymous." }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#A54600] selection:text-white overflow-x-hidden">
      
      {/* 🚀 SITELINK NAVIGATION MAP */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
              {/* SEO HIDDEN IN ALT TAG */}
              <img src="/korra_logo_icon.webp" alt="Korra - Structured ownership infrastructure in Nigeria, BNPL alternative, pay small small app" className="h-12 w-12 md:h-12 md:w-12 object-contain" />
              <span className="font-bold text-xl md:text-2xl tracking-tight text-slate-900">Korra</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#A54600] transition-colors text-sm font-medium">How it Works</button>
              <button onClick={() => scrollToSection('models')} className="hover:text-[#A54600] transition-colors text-sm font-medium">Framework</button>
              <button onClick={() => setCurrentView('merchants')} className="hover:text-[#A54600] transition-colors text-sm font-medium">For Merchants</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-[#A54600] transition-colors text-sm font-medium">FAQs</button>
              <button onClick={() => scrollToSection('download-section')} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-xl">Get Started</button>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 hover:text-slate-900 p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 absolute w-full left-0 top-16 shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <button onClick={() => scrollToSection('how-it-works')} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50">How it Works</button>
              <button onClick={() => scrollToSection('models')} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50">Framework</button>
              <button onClick={() => { setIsMenuOpen(false); setCurrentView('merchants'); }} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50 text-[#A54600]">For Merchants</button>
              <button onClick={() => scrollToSection('faq')} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50">FAQs</button>
              <div className="pt-2">
                <button onClick={() => scrollToSection('download-section')} className="w-full bg-slate-900 text-white px-4 py-3.5 rounded-xl font-bold text-base shadow-md">Get Started</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 🚀 HERO SECTION (CLEAN & PREMIUM) */}
      <section id="hero" className="relative pt-28 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#A54600]/5 rounded-full blur-[60px] md:blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6 md:mb-8 mx-auto">
            <span className="flex h-2 w-2 rounded-full bg-[#A54600]"></span>
            <span className="text-[10px] md:text-xs font-bold text-slate-800 tracking-wide uppercase">No Debt. No Interest. Pure Structure.</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 leading-[1.1] text-slate-900">
            Smart People Own <br />
            <span className="text-[#A54600]">Things Differently.</span>
          </h1>
          
          {/* RESTORED PREMIUM TEXT */}
          <h2 className="mt-4 md:mt-6 max-w-2xl mx-auto text-base md:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed px-2 font-normal">
            Korra is the structured payment infrastructure that empowers deliberate buyers to secure and own what they want on their terms. Commit at your pace, own with dignity.
          </h2>

          <button onClick={() => setCurrentView('merchants')} className="bg-[#A54600] hover:bg-[#8a3a00] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl active:scale-95 flex items-center gap-2 mx-auto">
             <Store size={20}/> View Verified Merchants
          </button>
        </div>
      </section>

      {/* 🚀 HOW IT WORKS SECTION (CLEAN & PREMIUM) */}
      <section id="how-it-works" className="py-20 md:py-28 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How The Infrastructure Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Korra verifies identity and moves money. The trust is entirely between the customer and the merchant.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Customer Flow */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white"><UserCheck size={20}/></div>
                <h3 className="text-2xl font-bold text-slate-900">The Deliberate Buyer</h3>
              </div>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent hidden md:block"></div>
              
              <div className="space-y-8 relative">
                 <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-100 -z-10"></div>
                 
                 <div className="flex gap-6 relative z-10">
                   <div className="w-12 h-12 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center font-bold text-slate-500 shrink-0 bg-white">1</div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-lg mb-2">Find Your Merchant</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">Locate a verified merchant, negotiate your price offline, and request their Korra Payment Code.</p>
                   </div>
                 </div>
                 <div className="flex gap-6 relative z-10">
                   <div className="w-12 h-12 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center font-bold text-slate-500 shrink-0 bg-white">2</div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-lg mb-2">Structure Your Plan</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">Enter the code in the Korra app. Make your minimum down payment to instantly lock the price and reserve the item.</p>
                   </div>
                 </div>
                 <div className="flex gap-6 relative z-10">
                   <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-900 flex items-center justify-center font-bold text-white shrink-0 shadow-lg">3</div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-lg mb-2">Own With Dignity</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">Complete your payments at your own pace. Once finished, generate your Delivery Code to collect your item.</p>
                   </div>
                 </div>
              </div>
            </div>

            {/* Merchant Flow */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#A54600] flex items-center justify-center text-white"><Store size={20}/></div>
                <h3 className="text-2xl font-bold text-slate-900">The Smart Merchant</h3>
              </div>
              
              <div className="space-y-8 relative">
                 <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#A54600]/10 -z-10"></div>
                 
                 <div className="flex gap-6 relative z-10">
                   <div className="w-12 h-12 rounded-full bg-orange-50 border-2 border-[#A54600]/20 flex items-center justify-center font-bold text-[#A54600] shrink-0 bg-white">1</div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-lg mb-2">Generate a Code</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">Agree on a price with your customer. Create a specific plan code in your Korra Business app and share it.</p>
                   </div>
                 </div>
                 <div className="flex gap-6 relative z-10">
                   <div className="w-12 h-12 rounded-full bg-orange-50 border-2 border-[#A54600]/20 flex items-center justify-center font-bold text-[#A54600] shrink-0 bg-white">2</div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-lg mb-2">Receive Instant Settlements</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">As the customer pays, funds settle into your Korra wallet immediately. Withdraw freely, no delays.</p>
                   </div>
                 </div>
                 <div className="flex gap-6 relative z-10">
                   <div className="w-12 h-12 rounded-full bg-[#A54600] border-2 border-[#A54600] flex items-center justify-center font-bold text-white shrink-0 shadow-lg shadow-[#A54600]/20">3</div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-lg mb-2">Handover & Grow</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">Verify the customer's Delivery Code upon handover. Build your platform capacity and unlock higher transaction limits.</p>
                   </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🚀 MODELS SECTION (CLEAN & PREMIUM) */}
      <section id="models" className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Infrastructure Frameworks</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Merchants dictate the rules of engagement using two distinct operating models.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Strict */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center mb-6"><ShieldCheck size={24} /></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Korra Strict</h3>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-6">Platform Enforced • High Discipline</p>
              <ul className="space-y-4 text-slate-700 text-sm md:text-base">
                <li className="flex gap-3"><CheckCircle className="text-slate-900 w-5 h-5 flex-shrink-0" /> <span><strong>Deposit Floor:</strong> Platform enforces a mandatory minimum 30% down payment.</span></li>
                <li className="flex gap-3"><Lock className="text-slate-900 w-5 h-5 flex-shrink-0" /> <span><strong>Timeframes:</strong> Strict adherence to duration limits based on product value.</span></li>
                <li className="flex gap-3"><RefreshCcw className="text-slate-400 w-5 h-5 flex-shrink-0" /> <span className="text-slate-500"><strong>Cancellation:</strong> No Cash Refunds. Converted to Store Balance only.</span></li>
              </ul>
            </div>
            {/* Direct */}
            <div className="p-8 rounded-3xl bg-white border border-[#A54600]/20 shadow-xl shadow-[#A54600]/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A54600]/5 rounded-bl-full -z-10"></div>
              <div className="w-12 h-12 rounded-full bg-[#A54600] text-white flex items-center justify-center mb-6"><Briefcase size={24} /></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Korra Direct</h3>
              <p className="text-sm text-[#A54600] font-bold uppercase tracking-wider mb-6">Merchant Controlled • Trusted Relationships</p>
              <ul className="space-y-4 text-slate-700 text-sm md:text-base">
                <li className="flex gap-3"><CheckCircle className="text-[#A54600] w-5 h-5 flex-shrink-0" /> <span><strong>Deposit Flexibility:</strong> Merchant independently determines the acceptable down payment percentage.</span></li>
                <li className="flex gap-3"><Lock className="text-[#A54600] w-5 h-5 flex-shrink-0" /> <span><strong>Timeline Control:</strong> Merchant dictates extension permissions.</span></li>
                <li className="flex gap-3"><RefreshCcw className="text-slate-400 w-5 h-5 flex-shrink-0" /> <span className="text-slate-500"><strong>Cancellation:</strong> No Cash Refunds. Converted to Store Balance only.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 DOWNLOAD SECTION (CLEAN & PREMIUM) */}
      <section id="download-section" className="py-20 md:py-28 bg-slate-900 text-white border-y border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 mb-6 md:mb-8 mx-auto">
              <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
              <span className="text-[10px] md:text-xs font-bold text-slate-300 tracking-wide uppercase">Systems Online</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white">Access The Infrastructure</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg mb-12">
              Android users can install the native application directly. iOS and Desktop users have full access via our optimized Web Portals.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Customer Access */}
              <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col items-center hover:border-slate-600 transition-colors">
                <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mb-6"><UserCheck className="w-8 h-8 text-white" /></div>
                <h3 className="text-2xl font-bold text-white mb-2">Customer Access</h3>
                <p className="text-slate-400 text-sm mb-8 text-center">Manage your active plans, review Store Balances, and generate Delivery Codes.</p>
                <div className="w-full space-y-3">
                  <a href="https://app.korra.com.ng/downloads/korra.apk" className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 px-6 py-4 rounded-xl hover:bg-slate-100 transition-all font-bold">
                    <Smartphone className="w-5 h-5" /> Install App (Android)
                  </a>
                  <a href="https://app.korra.com.ng" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 bg-slate-700 text-white px-6 py-4 rounded-xl hover:bg-slate-600 transition-all font-bold">
                    <Globe className="w-5 h-5" /> Launch Web Portal
                  </a>
                </div>
              </div>

              {/* Merchant Access */}
              <div className="bg-slate-800 rounded-3xl p-8 border border-[#A54600]/30 relative overflow-hidden flex flex-col items-center">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#A54600] to-transparent"></div>
                <div className="w-16 h-16 bg-[#A54600]/20 rounded-2xl flex items-center justify-center mb-6"><Store className="w-8 h-8 text-[#A54600]" /></div>
                <h3 className="text-2xl font-bold text-white mb-2">Merchant Terminal</h3>
                <p className="text-slate-400 text-sm mb-8 text-center">Generate Payment Codes, monitor your Business Capacity, and withdraw settlements.</p>
                <div className="w-full space-y-3">
                  <a href="https://app.korra.com.ng/downloads/korra-business.apk" className="w-full flex items-center justify-center gap-3 bg-[#A54600] text-white px-6 py-4 rounded-xl hover:bg-[#8a3a00] transition-all font-bold">
                    <Smartphone className="w-5 h-5" /> Install Terminal (Android)
                  </a>
                  <a href="https://business.korra.com.ng" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 bg-slate-700 text-white px-6 py-4 rounded-xl hover:bg-slate-600 transition-all font-bold">
                    <Globe className="w-5 h-5" /> Launch Web Terminal
                  </a>
                </div>
              </div>
            </div>
         </div>
      </section>

      {/* 🚀 EXTENSIVE FAQ SECTION */}
      <section id="faq" className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900">Platform FAQs</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base">Clear, transparent answers on how the Korra infrastructure operates.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Customers FAQs */}
            <div>
              <h3 className="text-xl font-bold text-[#A54600] mb-6 flex items-center gap-2 border-b border-slate-100 pb-2"><UserCheck size={24}/> FOR CUSTOMERS</h3>
              <div className="space-y-4">
                {customerFaqs.map((faq, index) => {
                  const id = `customer-${index}`;
                  return (
                    <div key={id} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <button onClick={() => toggleFaq(id)} className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-slate-50 transition-colors">
                        <span className="font-bold text-slate-900 text-sm pr-4">{faq.question}</span>
                        {openFaq === id ? <ChevronUp className="text-[#A54600] flex-shrink-0" /> : <ChevronDown className="text-slate-400 flex-shrink-0" />}
                      </button>
                      {openFaq === id && <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-0 bg-white">{faq.answer}</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Merchants FAQs */}
            <div>
              <h3 className="text-xl font-bold text-[#A54600] mb-6 flex items-center gap-2 border-b border-slate-100 pb-2"><Store size={24}/> FOR MERCHANTS</h3>
              <div className="space-y-4">
                {merchantFaqs.map((faq, index) => {
                  const id = `merchant-${index}`;
                  return (
                    <div key={id} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <button onClick={() => toggleFaq(id)} className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-slate-50 transition-colors">
                        <span className="font-bold text-slate-900 text-sm pr-4">{faq.question}</span>
                        {openFaq === id ? <ChevronUp className="text-[#A54600] flex-shrink-0" /> : <ChevronDown className="text-slate-400 flex-shrink-0" />}
                      </button>
                      {openFaq === id && <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-0 bg-white">{faq.answer}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 🚀 FOOTER (SOCIALS & RC NUMBER ADDED) */}
      <footer className="bg-slate-50 text-slate-600 py-12 md:py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-2 mb-4"><img src="/korra_logo_icon.webp" alt="Korra" className="w-8 h-8 opacity-80" /><span className="font-bold text-xl text-slate-900">Korra</span></div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Structured ownership infrastructure for deliberate buyers and smart merchants.</p>
              
              {/* SOCIAL MEDIA ICONS */}
              <div className="flex flex-wrap gap-4 mt-6">
                 <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors" title="X (Twitter)"><Twitter size={20}/></a>
                 <a href="#" className="text-slate-400 hover:text-pink-600 transition-colors" title="Instagram"><Instagram size={20}/></a>
                 <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors" title="TikTok"><TikTokIcon className="w-5 h-5"/></a>
                 <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors" title="LinkedIn"><Linkedin size={20}/></a>
                 <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors" title="Threads"><AtSign size={20}/></a>
                 <a href="#" className="text-slate-400 hover:text-green-600 transition-colors" title="WhatsApp Channel"><Megaphone size={20}/></a>
                 <a href="#" className="text-slate-400 hover:text-green-600 transition-colors" title="WhatsApp DM"><MessageCircle size={20}/></a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:col-span-3">
                <div>
                  <h4 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wider">Customer Legal</h4>
                  <ul className="space-y-3 text-sm">
                    <li><a href={KorraLinks.customerTermsPdf} className="hover:text-[#A54600] flex items-center gap-1 group"><ArrowRight className="w-3 h-3 text-transparent group-hover:text-[#A54600] transition-colors"/> Terms of Service</a></li>
                    <li><a href={KorraLinks.customerPrivacyPdf} className="hover:text-[#A54600] flex items-center gap-1 group"><ArrowRight className="w-3 h-3 text-transparent group-hover:text-[#A54600] transition-colors"/> Privacy Policy</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wider">Merchant Legal</h4>
                  <ul className="space-y-3 text-sm">
                    <li><a href={KorraLinks.vendorTermsPdf} className="hover:text-[#A54600] flex items-center gap-1 group"><ArrowRight className="w-3 h-3 text-transparent group-hover:text-[#A54600] transition-colors"/> Platform Rules</a></li>
                    <li><a href={KorraLinks.vendorPartnershipPdf} className="hover:text-[#A54600] flex items-center gap-1 group"><ArrowRight className="w-3 h-3 text-transparent group-hover:text-[#A54600] transition-colors"/> Partnership Agreement</a></li>
                    <li><a href={KorraLinks.vendorPrivacyPdf} className="hover:text-[#A54600] flex items-center gap-1 group"><ArrowRight className="w-3 h-3 text-transparent group-hover:text-[#A54600] transition-colors"/> Privacy Policy</a></li>
                  </ul>
                </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs md:text-sm font-medium">© {new Date().getFullYear()} Korra Ltd (RC xxxxx). All rights reserved.</p>
            <div className="flex gap-4 text-slate-400">
               <span>support@korra.com.ng</span>
               <span>•</span>
               <span>Ilorin, Kwara State.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}