import React, { useState, useEffect, useMemo } from 'react';
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
const XIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>;
const InstagramIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const LinkedInIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const WhatsAppIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
  </svg>
);

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
// 1. ADMIN PORTAL (Untouched functionality)
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
        <Link to="/" className="absolute top-8 left-8 text-white flex items-center p-2 hover:text-[#A54600]"><ArrowLeft size={24}/></Link>
        <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <div className="flex justify-center mb-6"><Lock className="text-[#A54600] w-10 h-10" /></div>
          <h2 className="text-xl font-bold text-center mb-6 text-slate-900">Admin Portal</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="Master Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-lg outline-none focus:ring-2 focus:ring-[#A54600]" />
            <button type="submit" className="w-full bg-[#A54600] text-white py-3 rounded-lg font-bold">Access Database</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-lg">
        <div className="flex items-center justify-between mb-8 pb-4 flex-wrap gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg md:text-2xl font-bold text-slate-900 flex items-center gap-2 truncate">
              <Upload className="text-[#A54600] shrink-0"/> Platform Injection
            </h1>
          </div>
          <div className="flex gap-4 shrink-0">
             <Link to="/" className="text-xs md:text-sm font-bold text-slate-500 hover:text-slate-900">Exit</Link>
             <button onClick={() => setIsAuthenticated(false)} className="text-xs md:text-sm font-bold text-red-500 hover:text-red-700">Lock</button>
          </div>
        </div>
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Merchant Name</label><input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-lg outline-none"/></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Category</label><input required name="category" placeholder="e.g. Fashion, Gadgets" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-lg outline-none"/></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Location</label><input required name="location" placeholder="e.g. Tanke, Ilorin" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-lg outline-none"/></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Banner Image URL</label><input required type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-lg outline-none"/></div>
          </div>
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Short Description</label><input required name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-lg outline-none"/></div>
          
          <div className="pt-6">
             <h3 className="font-bold text-slate-900 mb-4">Social Links</h3>
             <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-xs font-bold text-slate-500 mb-2">WhatsApp</label><input name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 rounded-lg outline-none"/></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-2">Instagram</label><input name="instagram" value={formData.instagram} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 rounded-lg outline-none"/></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-2">TikTok Link</label><input name="tiktok" value={formData.tiktok} onChange={handleChange} placeholder="https://tiktok.com/..." className="w-full px-4 py-2 bg-slate-50 rounded-lg outline-none"/></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-2">Website Link</label><input name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-2 bg-slate-50 rounded-lg outline-none"/></div>
             </div>
          </div>
          <button disabled={loading} type="submit" className="w-full bg-[#A54600] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#8a3a00]">
            <Plus size={20} /> {loading ? 'Saving...' : 'Add Merchant'}
          </button>
        </form>

        <div className="mt-12 pt-8">
           <h3 className="font-bold text-lg text-slate-900 mb-4">Live Merchants ({liveMerchants.length})</h3>
           <div className="space-y-3">
              {liveMerchants.length === 0 && <p className="text-sm text-slate-400">No merchants found in database.</p>}
              {liveMerchants.map(m => (
                 <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
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
// 2. MERCHANT DYNAMIC PROFILE PAGE 
// ============================================================================
const MerchantProfile = ({ liveMerchants = [], loading }) => {
  const { slug } = useParams();
  
  const merchant = liveMerchants.find(m => m.name.toLowerCase().replace(/\s+/g, '-') === slug);

  useEffect(() => {
    if (merchant) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Store",
        "name": merchant.name,
        "image": merchant.imageUrl,
        "description": merchant.description,
        "address": { "@type": "PostalAddress", "addressLocality": merchant.location, "addressCountry": "Nigeria" },
        "url": `https://korra.com.ng/merchant/${slug}`
      });
      document.head.appendChild(script);
      return () => { document.head.removeChild(script); }
    }
  }, [merchant, slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading store...</div>;
  if (!merchant) return <div className="min-h-screen flex flex-col items-center justify-center text-slate-500"><p>Merchant not found.</p><Link to="/merchants" className="mt-4 text-[#A54600] font-bold">Go Back</Link></div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/merchants" className="flex items-center text-slate-600 hover:text-[#A54600] p-2 -ml-2">
            <ArrowLeft size={24} />
          </Link>
          <span className="font-bold text-lg text-slate-900 truncate px-4">{merchant.name}</span>
          <div className="w-10"></div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 pt-8 md:pt-10">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="h-48 md:h-80 w-full relative">
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-slate-900 uppercase tracking-wider z-10">
              {merchant.category}
            </div>
            <img src={merchant.imageUrl} alt={`${merchant.name} store on Korra`} className="w-full h-full object-cover" />
          </div>
          
          <div className="p-6 md:p-12">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">{merchant.name}</h1>
            <p className="text-slate-500 text-sm md:text-base font-bold flex items-center gap-2 mb-6"><MapPin size={16}/> {merchant.location}, Nigeria</p>
            <div className="prose prose-slate max-w-none mb-8"><p className="text-sm md:text-base text-slate-600 leading-relaxed">{merchant.description}</p></div>

            <div className="bg-orange-50 rounded-2xl p-5 mb-8">
              <h3 className="font-bold text-[#A54600] text-base mb-1">Available on Korra</h3>
              <p className="text-slate-700 text-xs md:text-sm">This merchant accepts Korra flexible payments. Contact them directly via the links below to negotiate a price, ask for their Korra Payment Code, and reserve your item today.</p>
            </div>

            <h3 className="font-bold text-slate-900 text-base mb-3">Contact Merchant</h3>
            <div className="flex flex-wrap items-center gap-3">
              {merchant.socials?.whatsapp && (<a href={merchant.socials.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 font-bold text-sm transition-colors"><WhatsAppIcon className="w-4 h-4" /> WhatsApp</a>)}
              {merchant.socials?.instagram && (<a href={merchant.socials.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 font-bold text-sm transition-colors"><InstagramIcon className="w-4 h-4" /> Instagram</a>)}
              {merchant.socials?.tiktok && (<a href={merchant.socials.tiktok} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 font-bold text-sm transition-colors"><TikTokIcon className="w-4 h-4" /> TikTok</a>)}
              {merchant.socials?.website && (<a href={merchant.socials.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-sm transition-colors"><Globe className="w-4 h-4" /> Website</a>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. MERCHANTS DIRECTORY PAGE
// ============================================================================
const MerchantsDirectory = ({ liveMerchants = [], loading }) => {
  const [merchantFilter, setMerchantFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const categories = ['All', ...new Set(liveMerchants.map(m => m.category))];
  
  const filteredMerchants = useMemo(() => {
    return liveMerchants.filter(m => {
      const matchesCategory = merchantFilter === 'All' || m.category === merchantFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = (m.name || '').toLowerCase().includes(searchLower) || (m.location || '').toLowerCase().includes(searchLower) || (m.category || '').toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [liveMerchants, merchantFilter, searchQuery]);

  const totalPages = Math.ceil(filteredMerchants.length / ITEMS_PER_PAGE);
  const currentMerchants = filteredMerchants.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center text-slate-600 hover:text-[#A54600] p-2 -ml-2">
            <ArrowLeft size={24} />
          </Link>
          <span className="font-bold text-lg text-slate-900">Verified Merchants</span>
          <div className="w-10"></div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 mb-2">Discover Your Next Acquisition.</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">These merchants are fully verified on the Korra infrastructure.</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8 relative">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search className="text-slate-400 w-5 h-5" /></div>
           <input type="text" placeholder="Search store name, location..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full pl-12 pr-4 py-3 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-[#A54600]/20 outline-none text-sm text-slate-900 transition-all" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat, idx) => (
            <button key={idx} onClick={() => { setMerchantFilter(cat); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all ${merchantFilter === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 shadow-sm'}`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[300px] bg-white animate-pulse rounded-3xl flex flex-col">
                <div className="h-40 bg-slate-200 w-full rounded-t-3xl"></div>
                <div className="p-5 space-y-3"><div className="h-5 bg-slate-200 rounded w-3/4"></div><div className="h-4 bg-slate-200 rounded w-1/2"></div></div>
              </div>
            ))}
          </div>
        ) : filteredMerchants.length === 0 ? (
          <div className="text-center py-16 text-slate-500">No merchants found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMerchants.map((merchant) => (
              <Link to={`/merchant/${merchant.name.toLowerCase().replace(/\s+/g, '-')}`} key={merchant.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col cursor-pointer block">
                <div className="h-40 overflow-hidden relative">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wide z-10">{merchant.category}</div>
                  <img src={merchant.imageUrl} alt={`${merchant.name} store on Korra`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-[#A54600] transition-colors line-clamp-1">{merchant.name}</h3>
                  <p className="text-xs font-bold text-[#A54600] mb-2 flex items-center gap-1"><Store size={12}/> {merchant.location}</p>
                  <p className="text-sm text-slate-500 flex-1 line-clamp-2">{merchant.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="px-4 py-2 bg-white shadow-sm rounded-lg font-bold text-sm text-slate-600 disabled:opacity-50">Previous</button>
            <span className="text-sm font-bold text-slate-600">Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="px-4 py-2 bg-white shadow-sm rounded-lg font-bold text-sm text-slate-600 disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 4. CATEGORY SEO PAGE 
// ============================================================================
const CategoryPage = ({ liveMerchants = [], loading }) => {
  const { categorySlug } = useParams();
  const rawCategory = categorySlug ? categorySlug.split('-')[0] : '';
  const displayCategory = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
  const categoryMerchants = liveMerchants.filter(m => m.category.toLowerCase() === rawCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center text-slate-600 hover:text-[#A54600] p-2 -ml-2">
            <ArrowLeft size={24} />
          </Link>
          <span className="font-bold text-lg text-slate-900">{displayCategory}</span>
          <div className="w-10"></div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-2">Buy {displayCategory} and Pay Small Small</h1>
          <p className="text-sm md:text-base text-slate-600">Discover trusted merchants that allow you to reserve {rawCategory} and pay gradually.</p>
        </div>
        
        {loading ? (
          <p className="text-slate-500 text-sm">Loading merchants...</p>
        ) : categoryMerchants.length === 0 ? (
          <p className="text-slate-500 text-sm">More {rawCategory} merchants joining soon!</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {categoryMerchants.map((merchant) => (
              <Link to={`/merchant/${merchant.name.toLowerCase().replace(/\s+/g, '-')}`} key={merchant.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col cursor-pointer block">
                <div className="h-40 overflow-hidden relative">
                  <img src={merchant.imageUrl} alt={`${merchant.name} store on Korra`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#A54600] transition-colors">{merchant.name}</h3>
                  <p className="text-xs font-bold text-[#A54600] flex items-center gap-1"><Store size={12}/> {merchant.location}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 5. UNIFIED SCROLLING LANDING PAGE (Main '/' Route)
// ============================================================================
const HomeLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  
  const toggleFaq = (id) => { setOpenFaq(openFaq === id ? null : id); };
  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const merchantFaqs = [
    { question: "How do I start accepting Korra payments?", answer: "Create a free account on business.korra.com.ng. Once your business is verified, you can immediately start generating payment plans for customers who cannot pay your full price upfront." },
    { question: "When do I hand over the item to the customer?", answer: "You only release the physical item to the customer after the Korra dashboard confirms their balance has hit 100% of your asking price. You take zero credit risk." },
    { question: "What happens if a customer stops paying?", answer: "If a customer defaults or cancels, their payments convert into a Store Balance locked to your business. You do not lose money, and you keep your inventory until a purchase is complete." }
  ];

  const customerFaqs = [
    { question: "Is Korra a loaning or credit system?", answer: "No, Korra is not a loan or credit system. We use a safe 'pay small small' model. We do not lend you money or run a credit check. You make flexible payments and receive the goods only after full payment is complete, keeping you free from debt traps." },
    { question: "How does the Korra installment plan work?", answer: "1. Find a trusted Korra merchant and agree on an item. 2. Log into app.korra.com.ng with your Payment Code. 3. Pay small small at your own pace. 4. Pick up your item once the store balance is fully paid." },
    { question: "What is a Store Balance on Korra?", answer: "Your store balance is the total amount you have paid towards your reserved item. If you cancel a plan, your funds safely convert to Store Balance with your merchant so you do not lose your money." }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#A54600] selection:text-white overflow-x-hidden">
      
      {/* 🚀 ACCOUNT SELECTION MODAL */}
      {showAccountModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4" onClick={() => setShowAccountModal(false)}>
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowAccountModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 bg-slate-100 p-2 rounded-full"><X size={20} /></button>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2 text-center">Join Korra</h3>
            <p className="text-slate-600 text-sm mb-8 text-center">Choose how you want to use the platform.</p>
            
            <div className="space-y-4">
              <a href="https://business.korra.com.ng" className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-[#A54600] transition-colors group">
                <div className="w-12 h-12 bg-orange-50 text-[#A54600] rounded-full flex items-center justify-center group-hover:bg-[#A54600] group-hover:text-white transition-colors"><Store size={24}/></div>
                <div>
                  <h4 className="font-bold text-slate-900">I am a Merchant</h4>
                  <p className="text-xs text-slate-500">Create a business account to sell.</p>
                </div>
              </a>
              
              <a href="https://app.korra.com.ng" className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-600 transition-colors group">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors"><UserCheck size={24}/></div>
                <div>
                  <h4 className="font-bold text-slate-900">I am a Buyer</h4>
                  <p className="text-xs text-slate-500">Log in to track my payments.</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 NAVBAR */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <img src="/korra_logo_icon.webp" alt="Korra App" className="h-10 w-10 object-contain" />
              <span className="font-bold text-xl tracking-tight text-slate-900">Korra</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#A54600] transition-colors text-sm font-medium">How it Works</button>
              <button onClick={() => scrollToSection('customers')} className="hover:text-[#A54600] transition-colors text-sm font-medium">For Customers</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-[#A54600] transition-colors text-sm font-medium">FAQs</button>
              <button onClick={() => setShowAccountModal(true)} className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-full font-bold text-sm shadow-md transition-transform active:scale-95">Open Account</button>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute w-full left-0 top-16 shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => scrollToSection('how-it-works')} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium">How it Works</button>
              <button onClick={() => scrollToSection('customers')} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium">For Customers</button>
              <button onClick={() => scrollToSection('faq')} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium">FAQs</button>
              <div className="pt-2">
                <button onClick={() => { setIsMenuOpen(false); setShowAccountModal(true); }} className="w-full text-center block bg-slate-900 text-white px-4 py-3 rounded-xl font-bold text-base">Open Account</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 🚀 HERO (MERCHANT FOCUSED) */}
      <section id="hero" className="relative pt-28 pb-12 md:pt-40 md:pb-20 overflow-hidden bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-[1.1] text-slate-900">
            Stop losing customers who <br className="hidden md:block"/>
            <span className="text-[#A54600]">can’t pay upfront.</span>
          </h1>
          <h2 className="mt-4 max-w-2xl mx-auto text-sm md:text-lg text-slate-600 mb-10 leading-relaxed">
            Let your customers lock in their purchase with a deposit today, while Korra tracks the rest of the payments for you. Zero stress. Zero confusion.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setShowAccountModal(true)} className="w-full sm:w-auto bg-[#A54600] hover:bg-[#8a3a00] text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg transition-colors">
              Open Merchant Account
            </button>
            <button onClick={() => scrollToSection('customers')} className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-[#A54600] hover:text-[#A54600] text-slate-700 px-8 py-4 rounded-xl font-bold text-base transition-colors">
              I am a Buyer
            </button>
          </div>
        </div>
      </section>

      {/* 🚀 WHY KORRA (MERCHANT PAIN & SOLUTION) */}
      <section className="py-16 md:py-24 bg-white px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4">Run Your Installments Like a Pro.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-orange-50 p-8 rounded-3xl">
              <TrendingUp className="text-[#A54600] w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Close More Sales Today</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Stop letting customers walk out because they don't have the full cash. Lock them in immediately with a digital reservation.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl">
              <Activity className="text-slate-900 w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Zero Manual Tracking</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Throw away the notebook. Korra automatically records every deposit and updates the customer's balance. No math required.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl">
              <CheckSquare className="text-slate-900 w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Arguments or Confusion</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Both you and the customer see the exact same balance on your phones at all times. Total transparency and trust.</p>
            </div>
            <div className="bg-orange-50 p-8 rounded-3xl">
              <ShieldCheck className="text-[#A54600] w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">100% Safe Fulfillment</h3>
              <p className="text-slate-600 text-sm leading-relaxed">You keep the physical item until the Korra ledger shows 100% paid. No credit risk. No chargebacks. You are completely protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 HOW IT WORKS (SPLIT VIEW) */}
      <section id="how-it-works" className="py-16 md:py-24 bg-slate-900 text-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4">How it Works.</h2>
            <p className="text-slate-400 text-sm md:text-base">A simple tool for merchants. A safe payment plan for buyers.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* For Merchants */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#A54600] flex items-center justify-center text-white"><Store size={18}/></div>
                <h3 className="text-xl font-bold text-white">For Merchants</h3>
              </div>
              <div className="space-y-6">
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 shrink-0">1</div>
                   <div><h4 className="font-bold text-white mb-1">Create a Plan</h4><p className="text-slate-400 text-sm">Enter the item price and deposit on your Korra app.</p></div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 shrink-0">2</div>
                   <div><h4 className="font-bold text-white mb-1">Send to Customer</h4><p className="text-slate-400 text-sm">Customer accepts the payment plan on their phone.</p></div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 shrink-0">3</div>
                   <div><h4 className="font-bold text-white mb-1">They Pay Small-Small</h4><p className="text-slate-400 text-sm">Customer makes flexible deposits into their balance.</p></div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-[#A54600] flex items-center justify-center font-bold text-white shrink-0 shadow-md">4</div>
                   <div><h4 className="font-bold text-white mb-1">Hand Over Goods</h4><p className="text-slate-400 text-sm">System confirms full payment, you release the item.</p></div>
                 </div>
              </div>
            </div>

            {/* For Buyers */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white"><UserCheck size={18}/></div>
                <h3 className="text-xl font-bold text-white">For Buyers</h3>
              </div>
              <div className="space-y-6">
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 shrink-0">1</div>
                   <div><h4 className="font-bold text-white mb-1">Find What You Want</h4><p className="text-slate-400 text-sm">Discover trusted Korra merchants.</p></div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 shrink-0">2</div>
                   <div><h4 className="font-bold text-white mb-1">Reserve It</h4><p className="text-slate-400 text-sm">Pay a starting deposit to secure your item.</p></div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 shrink-0">3</div>
                   <div><h4 className="font-bold text-white mb-1">Pay Small Small</h4><p className="text-slate-400 text-sm">Make flexible payments at your own pace.</p></div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-slate-900 shrink-0 shadow-md">4</div>
                   <div><h4 className="font-bold text-white mb-1">Collect Your Item</h4><p className="text-slate-400 text-sm">Pick up your item once fully paid.</p></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 FOR YOUR CUSTOMERS SECTION */}
      <section id="customers" className="py-16 md:py-24 bg-orange-50 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xs font-bold text-[#A54600] uppercase tracking-widest mb-4">For Your Customers</h2>
          <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-6">Let your customers get what they want without paying everything upfront.</h3>
          <p className="text-slate-600 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            With Korra, customers can reserve items and pay small small over time, no loans, no pressure, and no hidden charges.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12 text-left">
            <div className="flex items-start gap-3 bg-white p-5 rounded-2xl shadow-sm">
              <CheckCircle className="text-[#A54600] w-6 h-6 shrink-0" />
              <p className="text-sm font-bold text-slate-900">Pay gradually at your own pace.</p>
            </div>
            <div className="flex items-start gap-3 bg-white p-5 rounded-2xl shadow-sm">
              <CheckCircle className="text-[#A54600] w-6 h-6 shrink-0" />
              <p className="text-sm font-bold text-slate-900">No interest or hidden fees.</p>
            </div>
            <div className="flex items-start gap-3 bg-white p-5 rounded-2xl shadow-sm">
              <CheckCircle className="text-[#A54600] w-6 h-6 shrink-0" />
              <p className="text-sm font-bold text-slate-900">Clear payment tracking.</p>
            </div>
            <div className="flex items-start gap-3 bg-white p-5 rounded-2xl shadow-sm">
              <CheckCircle className="text-[#A54600] w-6 h-6 shrink-0" />
              <p className="text-sm font-bold text-slate-900">If you cancel, your money stays as store balance.</p>
            </div>
          </div>

          <Link to="/merchants" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md transition-all">
            <Search size={18}/> Looking to buy? Find merchants that accept Korra
          </Link>
        </div>
      </section>

      {/* 🚀 ACCESS THE PLATFORM SECTION (Downloads & Web App) */}
      {/* 🚀 ACCESS THE PLATFORM SECTION (Downloads & Web App) */}
      <section id="download-section" className="py-16 md:py-20 bg-slate-900 text-white">
         <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 mb-6 mx-auto">
              <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
              <span className="text-[10px] font-bold text-slate-300 tracking-wide uppercase">Systems Online</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Access The Infrastructure</h2>
            <p className="text-slate-400 text-sm md:text-base mb-10 max-w-lg mx-auto">
              iOS and Desktop users have full access via our optimized Web Portals, or download the official Android applications for the best experience.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              
              {/* Merchant Access */}
              <div className="bg-slate-800 rounded-3xl p-6 md:p-8 flex flex-col items-center">
                <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                  <Store className="w-6 h-6 text-[#A54600]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Merchant Access</h3>
                <p className="text-slate-400 text-xs md:text-sm mb-6 text-center">
                  Close more sales today and let the system handle the payments completely stress-free.
                </p>
                <div className="w-full space-y-3">
                  <a href={KorraLinks.merchantApk} className="flex items-center justify-center gap-2 bg-[#A54600] hover:bg-[#8a3a00] text-white w-full px-6 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-md">
                     <Download size={18}/> Download Android App
                  </a>
                  <a href="https://business.korra.com.ng" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 w-full px-6 py-3.5 rounded-xl font-bold text-sm transition-colors">
                     <Globe size={18}/> Open Web Terminal
                  </a>
                </div>
              </div>

              {/* Buyer Access */}
              <div className="bg-slate-800 rounded-3xl p-6 md:p-8 flex flex-col items-center">
                <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Buyer Access</h3>
                <p className="text-slate-400 text-xs md:text-sm mb-6 text-center">
                  Afford the items you love easily and pay small-small with absolutely zero pressure.
                </p>
                <div className="w-full space-y-3">
                  <a href={KorraLinks.customerApk} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white w-full px-6 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-md">
                     <Download size={18}/> Download Android App
                  </a>
                  <a href="https://app.korra.com.ng" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 w-full px-6 py-3.5 rounded-xl font-bold text-sm transition-colors">
                     <Globe size={18}/> Open Web Portal
                  </a>
                </div>
              </div>

            </div>
        </div>
      </section>

      {/* 🚀 FAQ SECTION (SPLIT) */}
      <section id="faq" className="py-16 md:py-24 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Platform FAQs</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Merchant FAQs */}
            <div>
              <h3 className="text-lg font-bold text-[#A54600] mb-6 flex items-center gap-2"><Store size={20}/> For Merchants</h3>
              <div className="space-y-4">
                {merchantFaqs.map((faq, index) => {
                  const id = `merchant-${index}`;
                  return (
                    <div key={id} className="bg-slate-50 rounded-2xl overflow-hidden">
                      <button onClick={() => toggleFaq(id)} className="w-full flex justify-between items-center p-5 text-left">
                        <span className="font-bold text-slate-900 text-sm pr-4">{faq.question}</span>
                        {openFaq === id ? <ChevronUp className="text-[#A54600] shrink-0 w-5 h-5" /> : <ChevronDown className="text-slate-400 shrink-0 w-5 h-5" />}
                      </button>
                      {openFaq === id && <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{faq.answer}</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buyer FAQs */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><UserCheck size={20}/> For Buyers</h3>
              <div className="space-y-4">
                {customerFaqs.map((faq, index) => {
                  const id = `customer-${index}`;
                  return (
                    <div key={id} className="bg-slate-50 rounded-2xl overflow-hidden">
                      <button onClick={() => toggleFaq(id)} className="w-full flex justify-between items-center p-5 text-left">
                        <span className="font-bold text-slate-900 text-sm pr-4">{faq.question}</span>
                        {openFaq === id ? <ChevronUp className="text-[#A54600] shrink-0 w-5 h-5" /> : <ChevronDown className="text-slate-400 shrink-0 w-5 h-5" />}
                      </button>
                      {openFaq === id && <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{faq.answer}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 FINAL CTA */}
      <section className="py-16 md:py-20 bg-slate-50 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4">Turn "I'll come back" into a closed sale today.</h2>
          <p className="text-slate-600 text-sm md:text-base mb-8">Join the smart merchants in Ilorin who are growing their revenue without the stress of manual tracking.</p>
          <a href="https://business.korra.com.ng" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#A54600] hover:bg-[#8a3a00] text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg transition-colors">
            Create Your Free Merchant Account
          </a>
        </div>
      </section>

      {/* 🚀 SECURITY & FOOTER */}
      <footer className="bg-white text-slate-600 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center mb-12">
             <div className="flex flex-col items-center opacity-70">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Payments Secured By</span>
                <img src="/monnify-logo.png" alt="Monnify by Moniepoint" className="h-8 object-contain" />
             </div>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-2 mb-3"><img src="/korra_logo_icon.webp" alt="Korra" className="w-6 h-6" /><span className="font-bold text-lg text-slate-900">Korra</span></div>
              <p className="text-slate-500 text-xs md:text-sm mb-4">Structured payment infrastructure for modern retail.</p>
              <div className="flex gap-3">
                 <a href="https://www.instagram.com/korraapp" className="text-slate-400 hover:text-pink-600"><InstagramIcon className="w-4 h-4"/></a>
                 <a href="https://www.tiktok.com/@korraapp" className="text-slate-400 hover:text-slate-900"><TikTokIcon className="w-4 h-4"/></a>
                 <a href="https://wa.me/2349152540533" className="text-slate-400 hover:text-green-500"><WhatsAppIcon className="w-4 h-4"/></a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 md:col-span-3">
               <div>
                 <h4 className="text-slate-900 font-bold mb-3 text-xs uppercase">Customer Legal</h4>
                 <ul className="space-y-2 text-xs md:text-sm">
                   <li><a href={KorraLinks.customerTermsPdf} className="hover:text-[#A54600] flex items-center gap-1"><ArrowRight className="w-3 h-3 text-slate-300"/> Terms of Service</a></li>
                   <li><a href={KorraLinks.customerPrivacyPdf} className="hover:text-[#A54600] flex items-center gap-1"><ArrowRight className="w-3 h-3 text-slate-300"/> Privacy Policy</a></li>
                 </ul>
               </div>
               <div>
                 <h4 className="text-slate-900 font-bold mb-3 text-xs uppercase">Merchant Legal</h4>
                 <ul className="space-y-2 text-xs md:text-sm">
                   <li><a href={KorraLinks.vendorTermsPdf} className="hover:text-[#A54600] flex items-center gap-1"><ArrowRight className="w-3 h-3 text-slate-300"/> Platform Rules</a></li>
                   <li><a href={KorraLinks.vendorPartnershipPdf} className="hover:text-[#A54600] flex items-center gap-1"><ArrowRight className="w-3 h-3 text-slate-300"/> Partnership</a></li>
                 </ul>
               </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
            <p className="text-slate-500 text-xs font-medium">© {new Date().getFullYear()} KorraHQ Byte Limited (RC 9428861).</p>
            <div className="flex gap-3 text-slate-400 text-xs">
               <span>support@korra.com.ng</span>
               <span>•</span>
               <span>Ilorin, Kwara State.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
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
        <Route path="/" element={<HomeLayout />} />
        <Route path="/merchants" element={<MerchantsDirectory liveMerchants={merchantsList} loading={loadingMerchants} />} />
        <Route path="/merchant/:slug" element={<MerchantProfile liveMerchants={merchantsList} loading={loadingMerchants} />} />
        <Route path="/:categorySlug" element={<CategoryPage liveMerchants={merchantsList} loading={loadingMerchants} />} />
        <Route path="/admin" element={<AdminPortal liveMerchants={merchantsList} />} />
      </Routes>
    </BrowserRouter>
  );
}