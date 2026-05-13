Here is the complete, fully stitched-together `App.jsx` file. This includes all your custom icons, the Admin Portal, the Directory routes, and the newly integrated `HomeLayout` landing page, all hooked up and ready to go.

### `App.jsx`

```jsx
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
// 1. ADMIN PORTAL
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
const HomeLayout = ({ liveMerchants = [] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Navbar shrink on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Premium reveal animations
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    document.querySelectorAll('.stagger').forEach((parent) => {
      [...parent.children].forEach((child, i) => {
        child.style.transitionDelay = (i * 90) + 'ms';
      });
    });

    document.querySelectorAll('.hero-copy, .dark-statement, .section-head, .cust-grid > div:first-child').forEach((group) => {
      let i = 0;
      group.querySelectorAll('.reveal').forEach((el) => {
        el.style.transitionDelay = (i * 110) + 'ms';
        i++;
      });
    });

    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* NAV */}
      <header className={`nav-shell ${isScrolled ? 'scrolled' : ''}`} id="nav">
        <div className="nav-inner">
          <Link to="/" className="brand" aria-label="Korra">
            <img src="/korra_logo_icon.webp" alt="Korra Logo" />
            <span className="wordmark">KORRA</span>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            <a className="nav-link" href="#businesses">For Businesses</a>
            <a className="nav-link" href="#customers">For Customers</a>
            <a className="nav-link" href="#directory">Merchant Directory</a>
            <a className="nav-link" href="#how">How It Works</a>
          </nav>
          <div className="nav-ctas">
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>Get Started Free</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" data-screen-label="01 Hero">
        <div className="hero-bg-num" aria-hidden="true">₦</div>
        <div className="container-wide">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow reveal">Built for Nigerian Businesses</div>
              <h1 className="display reveal">
                Offer installment<br />
                payments with<br />
                <span className="underlined">structure</span>.
              </h1>
              <p className="lede reveal">
                Many Nigerian businesses already let customers pay in parts. Korra helps you manage it properly — clear terms, payment visibility, and less stress. Without changing how you already sell.
              </p>
              <div className="hero-ctas reveal">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>Get started as a business <span className="arrow">→</span></button>
                <button className="btn btn-text" onClick={() => setShowModal(true)}>Download the customer app <span className="arrow">→</span></button>
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

            {/* phone mockups */}
            <div className="phone-stage reveal">
              <div className="phone-glow" aria-hidden="true"></div>
              <div className="phone">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  {/* UPDATE ASSET URL IF NEEDED */}
                  <img src="/assets/app-home-clean.png" alt="Korra merchant app showing wallet balance and active plans" />
                </div>
              </div>

              <div className="notif notif-hero" aria-hidden="true">
                <div className="bell">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
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

      {/* INSIGHT STRIP (dark) */}
      <section className="section dark" data-screen-label="02 Insight">
        <div className="bg-naira" aria-hidden="true">₦</div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="dark-statement">
            <div className="eyebrow reveal">The opportunity</div>
            <h2 className="h1 reveal" style={{ marginTop: '32px' }}>
              Your customers are already<br />
              thinking in installments.<br />
              <span className="accent-orange">They just don't know you allow it.</span>
            </h2>
            <p className="lede reveal">
              Korra makes the option visible — without the chaos. One link, one code, one structured plan from start to finish.
            </p>
            <div className="hero-ctas reveal">
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>Start managing installments <span className="arrow">→</span></button>
              <a href="#how" className="btn btn-text">See how it works <span className="arrow">→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* FOR BUSINESSES */}
      <section className="section" id="businesses" data-screen-label="03 For Businesses">
        <div className="container-wide">
          <div className="biz-grid">
            <div>
              <div className="section-head" style={{ marginBottom: '56px' }}>
                <div className="eyebrow reveal">For Businesses</div>
                <h2 className="h2 reveal" style={{ marginTop: '28px' }}>
                  You already offer installment.<br />
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
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>Download the Korra Business App <span className="arrow">→</span></button>
              </div>
            </div>

            {/* duo phone mockup */}
            <div className="phone-duo reveal">
              <div className="phone-glow" aria-hidden="true" style={{ top: '30%', left: '25%', width: '50%', height: '50%' }}></div>
              <div className="phone">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  {/* UPDATE ASSET URL IF NEEDED */}
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

      {/* HOW IT WORKS */}
      <section className="section" id="how" data-screen-label="04 How It Works" style={{ background: 'var(--white)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container-wide">
          <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 'none', gap: '56px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '700px' }}>
              <div className="eyebrow reveal">How It Works</div>
              <h2 className="h2 reveal" style={{ marginTop: '28px' }}>
                Simple for you.<br />
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

      {/* FOR CUSTOMERS */}
      <section className="section customers" id="customers" data-screen-label="05 For Customers">
        <div className="container-wide">
          <div className="cust-grid">
            <div className="cust-copy">
              <div className="eyebrow reveal">For Customers</div>
              <h2 className="h2 reveal" style={{ marginTop: '24px' }}>
                Pay gradually.<br />
                <span className="accent-orange">With full clarity.</span>
              </h2>
              <p className="lede reveal" style={{ marginTop: '22px' }}>
                Korra also has a free app for customers — a clear plan, visible progress, and structured commitment to the things they want.
              </p>
              <div className="hero-ctas reveal" style={{ marginTop: '28px' }}>
                <button className="btn btn-dark btn-sm" onClick={() => setShowModal(true)}>Download the Korra app <span className="arrow">→</span></button>
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
                  {/* UPDATE ASSET URL IF NEEDED */}
                  <img src="/assets/cust-home-clean.png" alt="Korra customer app home screen" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MERCHANT DIRECTORY (Dynamic Implementation) */}
      <section className="section" id="directory" data-screen-label="06 Merchant Directory" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container-wide">
          <div className="directory-head">
            <div className="left">
              <div className="eyebrow reveal">Merchant Directory</div>
              <h2 className="h2 reveal" style={{ marginTop: '28px' }}>
                Discover businesses that accept<br />
                installment on Korra.
              </h2>
              <p className="lede reveal" style={{ marginTop: '24px' }}>Browse merchants across Nigeria who use Korra to offer structured installment payments.</p>
            </div>
            <Link to="/merchants" className="btn btn-text reveal">Browse all merchants <span className="arrow">→</span></Link>
          </div>

          <div className="directory-grid stagger reveal">
            {liveMerchants.length > 0 ? (
              liveMerchants.slice(0, 6).map((merchant) => {
                // Generate initials for the logo fallback
                const initials = merchant.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                return (
                  <Link to={`/merchant/${merchant.name.toLowerCase().replace(/\s+/g, '-')}`} key={merchant.id} className="merchant-card block">
                    <div className="merchant-top">
                      <div className="merchant-logo" style={{ background: '#A54600' }}>
                        {initials}
                      </div>
                      <div>
                        <div className="merchant-name">{merchant.name}</div>
                        <div className="merchant-cat">{merchant.category}</div>
                      </div>
                    </div>
                    <div className="merchant-meta">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {merchant.location}
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="text-slate-500">Loading live merchants...</p>
            )}
          </div>
        </div>
      </section>

      {/* WHY KORRA (dark) */}
      <section className="section dark" data-screen-label="07 Why Korra" style={{ paddingBottom: 0 }}>
        <div className="container-wide">
          <div className="section-head" style={{ marginBottom: '96px', maxWidth: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end' }}>
            <div>
              <div className="eyebrow reveal">Why Korra</div>
              <h2 className="h1 reveal" style={{ marginTop: '28px', color: 'var(--white)' }}>
                Not a loan.<br />
                Not a ledger.<br />
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

      {/* FINAL CTA (orange) */}
      <section className="section orange cta-orange" data-screen-label="08 Final CTA">
        <div className="container">
          <h2 className="h1 reveal">When a customer is ready to commit — everything should already be in place.</h2>
          <p className="lede reveal">Set up Korra today. The next time a customer asks about installment, you'll be ready to say yes — with structure.</p>
          <div className="hero-ctas reveal">
            <button className="btn btn-light" onClick={() => setShowModal(true)}>Start free as a business <span className="arrow">→</span></button>
            <button className="btn btn-dark" onClick={() => setShowModal(true)}>Download the customer app <span className="arrow">→</span></button>
          </div>
          <div className="note reveal">No subscription. No setup fee. Free to start.</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container-wide">
          <div className="footer-top">
            <div className="footer-brand">
              <Link to="/" className="brand">
                <img src="/korra_logo_icon.webp" alt="Korra Logo" />
                <span className="wordmark" style={{ color: 'var(--white)' }}>KORRA</span>
              </Link>
              <div className="footer-tag">Smart People Own Things Differently.</div>
              <div className="footer-desc">Structured installment payments for Nigerian businesses. Manage how your customers pay — with clarity and control.</div>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><a href="#businesses">For Businesses</a></li>
                <li><a href="#customers">For Customers</a></li>
                <li><Link to="/merchants">Merchant Directory</Link></li>
                <li><a href="#how">How It Works</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href={KorraLinks.customerTermsPdf}>Customer Terms</a></li>
                <li><a href={KorraLinks.vendorTermsPdf}>Merchant Rules</a></li>
                <li><a href={KorraLinks.customerPrivacyPdf}>Privacy Policy</a></li>
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

      {/* GET STARTED MODAL */}
      <div className={`modal-shell ${showModal ? 'open' : ''}`} id="get-started-modal" aria-hidden={!showModal}>
        <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
        <div className="modal-card" role="dialog" aria-labelledby="modal-title" aria-modal="true">
          <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></svg>
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