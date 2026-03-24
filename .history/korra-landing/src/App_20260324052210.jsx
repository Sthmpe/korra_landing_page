import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Menu, X, ShieldCheck, Store,
  CheckCircle, Lock, Briefcase,
  ChevronDown, ChevronUp, RefreshCcw,
  Smartphone, Globe, Upload, Plus,
  ArrowLeft, Search, ArrowRight, UserCheck, MapPin
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
  customerPrivacyPdf: 'https://drive.google.com/uc?export=download&id=1P9rBibP5HASwzaGaFcnRTwSFjOlMBtNk'
};

// ============================================================================
// 1. ADMIN PORTAL
// ============================================================================
const AdminPortal = ({ liveMerchants = [] }) => {
  const navigate = useNavigate();
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
        <button onClick={() => navigate('/')} className="absolute top-8 left-8 text-white flex items-center p-2 hover:text-[#A54600]"><ArrowLeft size={24}/></button>
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
             <button onClick={() => navigate('/')} className="text-xs md:text-sm font-bold text-slate-500 hover:text-slate-900">Exit</button>
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
// 5. HOME LAYOUT 
// ============================================================================
const HomeLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  
  const toggleFaq = (id) => { setOpenFaq(openFaq === id ? null : id); };
  
  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const customerFaqs = [
    { question: "What exactly is Korra?", answer: "Korra is a structured payment platform. You reserve what you want today with a minimum 30% down payment, pay toward the full amount at your own pace, and own it completely when done. No loans. No interest. No debt." },
    { question: "Is Korra a loan app?", answer: "No. Korra does not lend you money, charge interest, or run a credit check." },
    { question: "How does a plan work?", answer: "You and a merchant agree on an item and price. The merchant generates a Payment Code on Korra. You enter the code, review the plan, and pay your minimum 30% down payment. You pay toward the balance at your own pace." },
    { question: "What is the Korra plan fee?", answer: "The plan fee is 3.5% of your total plan value. It is charged once at plan initiation from your Korra balance and is non-refundable." },
    { question: "What happens when I cancel a plan?", answer: "Cancellation is instant. Everything you paid excluding the Korra plan fee converts to Store Balance with your merchant. There are no cash refunds once a plan is initiated." }
  ];

  const merchantFaqs = [
    { question: "How does Korra work for my business?", answer: "You register, complete identity verification, and start generating Payment Codes for customers. When a customer pays their down payment you receive those funds immediately." },
    { question: "When do I receive my money?", answer: "Every payment a customer makes settles into your withdrawable wallet immediately minus the 3.5% merchant fee." },
    { question: "What is Business Capacity?", answer: "Business Capacity is the total naira value of active reservations you can hold across all open plans simultaneously. Every merchant starts at 200,000 naira." }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#A54600] selection:text-white overflow-x-hidden">
      
      {/* 🚀 NAVBAR (Borderless) */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <img src="/korra_logo_icon.webp" alt="Korra App" className="h-10 w-10 object-contain" />
              <span className="font-bold text-xl tracking-tight text-slate-900">Korra</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#A54600] transition-colors text-sm font-medium">How it Works</button>
              <button onClick={() => scrollToSection('models')} className="hover:text-[#A54600] transition-colors text-sm font-medium">Framework</button>
              <Link to="/merchants" className="hover:text-[#A54600] transition-colors text-sm font-medium">For Merchants</Link>
              <button onClick={() => scrollToSection('faq')} className="hover:text-[#A54600] transition-colors text-sm font-medium">FAQs</button>
              <button onClick={() => scrollToSection('download-section')} className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-full font-bold text-sm shadow-md">Get Started</button>
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
              <Link to="/merchants" onClick={() => setIsMenuOpen(false)} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium text-[#A54600]">For Merchants</Link>
              <button onClick={() => scrollToSection('faq')} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium">FAQs</button>
              <div className="pt-2">
                <button onClick={() => scrollToSection('download-section')} className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl font-bold text-base">Get Started</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 🚀 HERO */}
      <section id="hero" className="relative pt-28 pb-12 md:pt-40 md:pb-20 overflow-hidden bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm mb-6 mx-auto">
            <span className="flex h-2 w-2 rounded-full bg-[#A54600]"></span>
            <span className="text-[10px] md:text-xs font-bold text-slate-800 tracking-wide uppercase">No loans. No interest. No pressure.</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-[1.1] text-slate-900">
            Reserve What You Love. <br />
            <span className="text-[#A54600]">Pay Small Small.</span><br />
            Own It Completely.
          </h1>
          <h2 className="mt-4 max-w-2xl mx-auto text-sm md:text-lg text-slate-600 mb-8 leading-relaxed">
            Korra helps you reserve items from trusted merchants and pay gradually. Just simple payment plans that help you afford what matters.
          </h2>
          <Link to="/merchants" className="bg-[#A54600] hover:bg-[#8a3a00] text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-lg inline-flex items-center gap-2">
             <Store size={18}/> Find Merchants
          </Link>
        </div>
      </section>

      {/* 🚀 THE KORRA PROMISE */}
      <section className="py-12 md:py-16 bg-white px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">The Korra Promise</h2>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto mb-10">We built Korra to help you own things comfortably, without the anxiety of traditional loans.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-orange-50 p-6 md:p-8 rounded-3xl text-center">
              <ShieldCheck size={32} className="mx-auto text-[#A54600] mb-3" />
              <h3 className="text-lg font-bold mb-2 text-slate-900">No Interest, Ever</h3>
              <p className="text-slate-600 text-sm">The price you see is the price you pay. No hidden fees or sudden markups.</p>
            </div>
            <div className="bg-orange-50 p-6 md:p-8 rounded-3xl text-center">
              <Lock size={32} className="mx-auto text-[#A54600] mb-3" />
              <h3 className="text-lg font-bold mb-2 text-slate-900">Secure Payments</h3>
              <p className="text-slate-600 text-sm">Your payments are locked and secured directly with verified merchant partners.</p>
            </div>
            <div className="bg-orange-50 p-6 md:p-8 rounded-3xl text-center">
              <RefreshCcw size={32} className="mx-auto text-[#A54600] mb-3" />
              <h3 className="text-lg font-bold mb-2 text-slate-900">Fair Cancellations</h3>
              <p className="text-slate-600 text-sm">Change your mind? Your money safely converts to a store balance. No penalties.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 EXPLORE CATEGORIES (Replaced the Grid Mall) */}
      <section className="py-12 md:py-16 bg-slate-50 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">Explore All Categories</h2>
          <p className="text-slate-600 mb-8 text-sm md:text-base leading-relaxed">
            Whether you are looking for the latest smartphones, premium sneakers, luxury wigs, or laptops, you can find trusted merchants offering flexible payments. Search our directory and reserve your item today.
          </p>
          <Link to="/merchants" className="bg-[#A54600] hover:bg-[#8a3a00] text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-lg inline-flex items-center gap-2">
             <Search size={18}/> View Directory
          </Link>
        </div>
      </section>

      {/* 🚀 HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">How The Infrastructure Works</h2>
            <p className="text-slate-600 text-sm md:text-base">Korra verifies identity and moves money. Trust is entirely between the customer and merchant.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white"><UserCheck size={18}/></div>
                <h3 className="text-xl font-bold text-slate-900">Smart Buyers</h3>
              </div>
              <div className="space-y-6 relative">
                 <div className="absolute left-5 top-5 bottom-5 w-px bg-slate-100 -z-10"></div>
                 <div className="flex gap-4 relative z-10"><div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-slate-500 shrink-0">1</div><div><h4 className="font-bold text-slate-900 mb-1">Find What You Want</h4><p className="text-slate-600 text-sm">Discover trusted merchants seamlessly.</p></div></div>
                 <div className="flex gap-4 relative z-10"><div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-slate-500 shrink-0">2</div><div><h4 className="font-bold text-slate-900 mb-1">Reserve It</h4><p className="text-slate-600 text-sm">Pay a starting deposit to secure your item.</p></div></div>
                 <div className="flex gap-4 relative z-10"><div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white shrink-0 shadow-md">3</div><div><h4 className="font-bold text-slate-900 mb-1">Pay Small Small</h4><p className="text-slate-600 text-sm">Complete payments and collect your item.</p></div></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#A54600] flex items-center justify-center text-white"><Store size={18}/></div>
                <h3 className="text-xl font-bold text-slate-900">Merchants</h3>
              </div>
              <div className="space-y-6 relative">
                 <div className="absolute left-5 top-5 bottom-5 w-px bg-orange-100 -z-10"></div>
                 <div className="flex gap-4 relative z-10"><div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-[#A54600] shrink-0">1</div><div><h4 className="font-bold text-slate-900 mb-1">Create a Plan</h4><p className="text-slate-600 text-sm">Turn shoppers into committed buyers.</p></div></div>
                 <div className="flex gap-4 relative z-10"><div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-[#A54600] shrink-0">2</div><div><h4 className="font-bold text-slate-900 mb-1">Customer Reserves Item</h4><p className="text-slate-600 text-sm">Customer pays the deposit on Korra.</p></div></div>
                 <div className="flex gap-4 relative z-10"><div className="w-10 h-10 rounded-full bg-[#A54600] flex items-center justify-center font-bold text-white shrink-0 shadow-md">3</div><div><h4 className="font-bold text-slate-900 mb-1">Receive Payments</h4><p className="text-slate-600 text-sm">Funds settle into your wallet immediately.</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 MODELS SECTION */}
      <section id="models" className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">Infrastructure Frameworks</h2>
            <p className="text-slate-600 text-sm md:text-base">Merchants dictate the rules of engagement using two distinct models.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 md:p-8 rounded-3xl bg-white shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center mb-4"><ShieldCheck size={20} /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Korra Strict</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-5">Platform Enforced</p>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex gap-3"><CheckCircle className="text-slate-900 w-4 h-4 flex-shrink-0" /> <span>Mandatory minimum 30% down payment.</span></li>
                <li className="flex gap-3"><Lock className="text-slate-900 w-4 h-4 flex-shrink-0" /> <span>Strict adherence to duration limits.</span></li>
                <li className="flex gap-3"><RefreshCcw className="text-slate-400 w-4 h-4 flex-shrink-0" /> <span className="text-slate-500">Cancellations convert to Store Balance.</span></li>
              </ul>
            </div>
            <div className="p-6 md:p-8 rounded-3xl bg-white shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#A54600] text-white flex items-center justify-center mb-4"><Briefcase size={20} /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Korra Direct</h3>
              <p className="text-xs text-[#A54600] font-bold uppercase tracking-wider mb-5">Merchant Controlled</p>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex gap-3"><CheckCircle className="text-[#A54600] w-4 h-4 flex-shrink-0" /> <span>Merchant independently determines down payment.</span></li>
                <li className="flex gap-3"><Lock className="text-[#A54600] w-4 h-4 flex-shrink-0" /> <span>Merchant dictates extension permissions.</span></li>
                <li className="flex gap-3"><RefreshCcw className="text-slate-400 w-4 h-4 flex-shrink-0" /> <span className="text-slate-500">Cancellations convert to Store Balance.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 DOWNLOAD SECTION */}
      <section id="download-section" className="py-16 md:py-20 bg-slate-900 text-white">
         <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 mb-6 mx-auto">
              <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
              <span className="text-[10px] font-bold text-slate-300 tracking-wide uppercase">Systems Online</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Access The Infrastructure</h2>
            <p className="text-slate-400 text-sm md:text-base mb-10 max-w-lg mx-auto">Android users can install the native application. iOS and Desktop users have full access via our optimized Web Portals.</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-3xl p-6 md:p-8 flex flex-col items-center">
                <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4"><UserCheck className="w-6 h-6 text-white" /></div>
                <h3 className="text-xl font-bold text-white mb-2">Customer Access</h3>
                <p className="text-slate-400 text-xs md:text-sm mb-6 text-center">Manage plans, review balances, and generate Delivery Codes.</p>
                <div className="w-full space-y-3">
                  <a href="https://app.korra.com.ng/downloads/korra.apk" className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 px-4 py-3 rounded-xl hover:bg-slate-100 font-bold text-sm">
                    <Smartphone className="w-4 h-4" /> App (Android)
                  </a>
                  <a href="https://app.korra.com.ng" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-slate-700 text-white px-4 py-3 rounded-xl hover:bg-slate-600 font-bold text-sm">
                    <Globe className="w-4 h-4" /> Web Portal
                  </a>
                </div>
              </div>

              <div className="bg-slate-800 rounded-3xl p-6 md:p-8 flex flex-col items-center">
                <div className="w-12 h-12 bg-[#A54600]/20 rounded-xl flex items-center justify-center mb-4"><Store className="w-6 h-6 text-[#A54600]" /></div>
                <h3 className="text-xl font-bold text-white mb-2">Merchant Terminal</h3>
                <p className="text-slate-400 text-xs md:text-sm mb-6 text-center">Generate Codes, monitor Capacity, and withdraw settlements.</p>
                <div className="w-full space-y-3">
                  <a href="https://app.korra.com.ng/downloads/korra-business.apk" className="w-full flex items-center justify-center gap-2 bg-[#A54600] text-white px-4 py-3 rounded-xl hover:bg-[#8a3a00] font-bold text-sm">
                    <Smartphone className="w-4 h-4" /> Terminal (Android)
                  </a>
                  <a href="https://business.korra.com.ng" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-slate-700 text-white px-4 py-3 rounded-xl hover:bg-slate-600 font-bold text-sm">
                    <Globe className="w-4 h-4" /> Web Terminal
                  </a>
                </div>
              </div>
            </div>
         </div>
      </section>

      {/* 🚀 FAQ SECTION */}
      <section id="faq" className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">Platform FAQs</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-[#A54600] mb-4 flex items-center gap-2"><UserCheck size={20}/> CUSTOMERS</h3>
              <div className="space-y-3">
                {customerFaqs.map((faq, index) => {
                  const id = `customer-${index}`;
                  return (
                    <div key={id} className="bg-slate-50 rounded-xl overflow-hidden">
                      <button onClick={() => toggleFaq(id)} className="w-full flex justify-between items-center p-4 text-left">
                        <span className="font-bold text-slate-900 text-sm pr-4">{faq.question}</span>
                        {openFaq === id ? <ChevronUp className="text-[#A54600] shrink-0 w-4 h-4" /> : <ChevronDown className="text-slate-400 shrink-0 w-4 h-4" />}
                      </button>
                      {openFaq === id && <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">{faq.answer}</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#A54600] mb-4 flex items-center gap-2"><Store size={20}/> MERCHANTS</h3>
              <div className="space-y-3">
                {merchantFaqs.map((faq, index) => {
                  const id = `merchant-${index}`;
                  return (
                    <div key={id} className="bg-slate-50 rounded-xl overflow-hidden">
                      <button onClick={() => toggleFaq(id)} className="w-full flex justify-between items-center p-4 text-left">
                        <span className="font-bold text-slate-900 text-sm pr-4">{faq.question}</span>
                        {openFaq === id ? <ChevronUp className="text-[#A54600] shrink-0 w-4 h-4" /> : <ChevronDown className="text-slate-400 shrink-0 w-4 h-4" />}
                      </button>
                      {openFaq === id && <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">{faq.answer}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 SECURITY & PAYMENTS */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Payments Secured By</p>
          <div className="flex justify-center items-center opacity-70 hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col items-center">
               <img src="/monnify-logo.png" alt="Monnify by Moniepoint" className="h-8 md:h-10 object-contain mb-2" />
               <span className="text-[10px] font-bold text-slate-500">Official Payment Partner</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 FOOTER */}
      <footer className="bg-white text-slate-600 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-2 mb-3"><img src="/korra_logo_icon.webp" alt="Korra" className="w-6 h-6" /><span className="font-bold text-lg text-slate-900">Korra</span></div>
              <p className="text-slate-500 text-xs md:text-sm mb-4">Reserve what you love and pay small small with trusted merchants.</p>
              <div className="flex gap-3">
                 <a href="#" className="text-slate-400 hover:text-slate-900"><XIcon className="w-4 h-4"/></a>
                 <a href="#" className="text-slate-400 hover:text-pink-600"><InstagramIcon className="w-4 h-4"/></a>
                 <a href="#" className="text-slate-400 hover:text-slate-900"><TikTokIcon className="w-4 h-4"/></a>
                 <a href="https://www.linkedin.com/company/korraapp" className="text-slate-400 hover:text-blue-600"><LinkedInIcon className="w-4 h-4"/></a>
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
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 border-t border-slate-100">
            <p className="text-slate-500 text-xs font-medium">© {new Date().getFullYear()} Korra Ltd (RC xxxxx).</p>
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
// 6. MAIN APP COMPONENT 
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