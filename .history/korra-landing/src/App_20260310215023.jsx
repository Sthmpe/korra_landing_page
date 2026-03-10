import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Menu, X, ShieldCheck, Store,
  CheckCircle, Lock, Briefcase,
  ChevronDown, ChevronUp, RefreshCcw,
  Smartphone, Globe, Upload, Plus,
  ArrowLeft, Search, ArrowRight, UserCheck, MapPin
} from 'lucide-react';

// --- CUSTOM SVG ICONS (Kept exactly as you designed them) ---
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
// 1. ADMIN PORTAL (Now uses React Router for navigation)
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
        <button onClick={() => navigate('/')} className="absolute top-8 left-8 text-white flex items-center gap-2 hover:text-[#A54600]"><ArrowLeft size={20}/> Back to Site</button>
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
          </div>
          <div className="flex gap-4 shrink-0">
             <button onClick={() => navigate('/')} className="text-xs md:text-sm font-bold text-slate-500 hover:text-slate-900">Exit</button>
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
             <h3 className="font-bold text-slate-900 mb-4">Social Links</h3>
             <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-xs font-bold text-slate-500 mb-2">WhatsApp</label><input name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"/></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-2">Instagram</label><input name="instagram" value={formData.instagram} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"/></div>
             </div>
          </div>
          <button disabled={loading} type="submit" className="w-full bg-[#A54600] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#8a3a00]">
            <Plus size={20} /> {loading ? 'Saving...' : 'Add Merchant'}
          </button>
        </form>
      </div>
    </div>
  );
};

// ============================================================================
// 2. MERCHANT DYNAMIC PROFILE PAGE (Now reads slug from URL)
// ============================================================================
const MerchantProfile = ({ liveMerchants = [], loading }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Find merchant by comparing slug to formatted name
  const merchant = liveMerchants.find(m => m.name.toLowerCase().replace(/\s+/g, '-') === slug);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading store...</div>;
  if (!merchant) return <div className="min-h-screen flex flex-col items-center justify-center text-slate-500"><p>Merchant not found.</p><button onClick={() => navigate('/merchants')} className="mt-4 text-[#A54600] font-bold">Go Back</button></div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/merchants" className="flex items-center gap-2 text-slate-600 hover:text-[#A54600] font-bold text-sm">
            <ArrowLeft size={18} /> Directory
          </Link>
          <span className="font-bold text-lg text-slate-900 truncate px-4">{merchant.name}</span>
          <div className="w-20"></div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 pt-10">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
          <div className="h-64 md:h-80 w-full relative">
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-slate-900 uppercase tracking-wider z-10">
              {merchant.category}
            </div>
            <img src={merchant.imageUrl} alt={`${merchant.name} store on Korra - buy now pay small small with zero interest`} className="w-full h-full object-cover" />
          </div>
          
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">{merchant.name}</h1>
            <p className="text-slate-500 font-bold flex items-center gap-2 mb-8"><MapPin size={18}/> {merchant.location}, Nigeria</p>
            <div className="prose prose-slate max-w-none mb-10"><p className="text-lg text-slate-600 leading-relaxed">{merchant.description}</p></div>

            <div className="bg-orange-50 border border-[#A54600]/20 rounded-2xl p-6 mb-10">
              <h3 className="font-bold text-[#A54600] text-lg mb-2">Available on Korra</h3>
              <p className="text-slate-700 text-sm md:text-base">This merchant accepts Korra flexible payments. Contact them directly via the links below to negotiate a price, ask for their Korra Payment Code, and reserve your item today.</p>
            </div>

            <h3 className="font-bold text-slate-900 text-lg mb-4 border-b border-slate-100 pb-2">Contact Merchant</h3>
            <div className="flex flex-wrap items-center gap-4">
              {merchant.socials?.whatsapp && (<a href={merchant.socials.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 font-bold transition-colors"><WhatsAppIcon className="w-5 h-5" /> WhatsApp</a>)}
              {merchant.socials?.instagram && (<a href={merchant.socials.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 font-bold transition-colors"><InstagramIcon className="w-5 h-5" /> Instagram</a>)}
              {merchant.socials?.tiktok && (<a href={merchant.socials.tiktok} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 font-bold transition-colors"><TikTokIcon className="w-5 h-5" /> TikTok</a>)}
              {merchant.socials?.website && (<a href={merchant.socials.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold transition-colors"><Globe className="w-5 h-5" /> Website</a>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. MERCHANTS DIRECTORY PAGE (Now uses <Link> tags)
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
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-[#A54600] font-bold text-sm">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <span className="font-bold text-lg text-slate-900">Verified Merchants</span>
          <div className="w-20"></div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Discover Your Next Acquisition.</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">These merchants are fully verified on the Korra infrastructure.</p>
        </div>

        {/* Search & Filter UI (Unchanged) */}
        <div className="max-w-2xl mx-auto mb-8 relative">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search className="text-slate-400 w-5 h-5" /></div>
           <input type="text" placeholder="Search by store name, location, or category..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-[#A54600] focus:ring-2 focus:ring-[#A54600]/20 outline-none text-slate-900 shadow-sm transition-all" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat, idx) => (
            <button key={idx} onClick={() => { setMerchantFilter(cat); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${merchantFilter === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'}`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-slate-500 py-10">Loading merchants...</div>
        ) : filteredMerchants.length === 0 ? (
          <div className="text-center py-20 text-slate-500">No merchants found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMerchants.map((merchant) => (
              /* SEO UPGRADE: Using <Link> instead of a standard div click handler */
              <Link 
                to={`/merchant/${merchant.name.toLowerCase().replace(/\s+/g, '-')}`} 
                key={merchant.id} 
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col cursor-pointer block"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wide z-10">{merchant.category}</div>
                  <img src={merchant.imageUrl} alt={`${merchant.name} store on Korra`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-[#A54600] transition-colors">{merchant.name}</h3>
                  <p className="text-xs font-bold text-[#A54600] mb-3 flex items-center gap-1"><Store size={12}/> {merchant.location}</p>
                  <p className="text-sm text-slate-600 mb-6 flex-1 line-clamp-2">{merchant.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="px-4 py-2 border border-slate-200 bg-white rounded-lg font-bold text-slate-600">Previous</button>
            <span className="text-sm font-bold text-slate-600">Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="px-4 py-2 border border-slate-200 bg-white rounded-lg font-bold text-slate-600">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 4. HOME LAYOUT (Extracted from App to be a distinct route)
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
    { question: "What exactly is Korra?", answer: "Korra is a structured payment platform. You reserve what you want today with a minimum 30% down payment..." },
    { question: "Is Korra a loan app?", answer: "No. Korra does not lend you money, charge interest, or run a credit check..." }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#A54600] selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <img src="/korra_logo_icon.webp" alt="Korra" className="h-12 w-12 object-contain" />
              <span className="font-bold text-xl md:text-2xl tracking-tight text-slate-900">Korra</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#A54600] transition-colors text-sm font-medium">How it Works</button>
              <button onClick={() => scrollToSection('models')} className="hover:text-[#A54600] transition-colors text-sm font-medium">Framework</button>
              <Link to="/merchants" className="hover:text-[#A54600] transition-colors text-sm font-medium">For Merchants</Link>
              <button onClick={() => scrollToSection('faq')} className="hover:text-[#A54600] transition-colors text-sm font-medium">FAQs</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-28 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-slate-900">
            Reserve What You Love. <br />
            <span className="text-[#A54600]">Pay Small Small.</span><br />
            Own It Completely.
          </h1>
          <Link to="/merchants" className="bg-[#A54600] text-white px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-2 mt-8 hover:bg-[#8a3a00]">
             <Store size={20}/> Find Merchants
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 text-slate-600 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Korra Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// ============================================================================
// 5. MAIN APP (This is where React Router wraps everything)
// ============================================================================
export default function App() {
  const [merchantsList, setMerchantsList] = useState([]);
  const [loadingMerchants, setLoadingMerchants] = useState(true);

  // Fetch from Supabase once for the whole app
  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const res = await fetch('https://ltytmqjpektcgwajfzfm.supabase.co/functions/v1/merchants-api', { method: 'GET' });
        const data = await res.json();
        if (data.merchants) setMerchantsList(data.merchants);
      } catch (error) { console.error("Failed to load merchants:", error); } 
      finally { setLoadingMerchants(false); }
    };
    fetchMerchants();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/merchants" element={<MerchantsDirectory liveMerchants={merchantsList} loading={loadingMerchants} />} />
        {/* The dynamic SEO route! */}
        <Route path="/merchant/:slug" element={<MerchantProfile liveMerchants={merchantsList} loading={loadingMerchants} />} />
        <Route path="/admin" element={<AdminPortal liveMerchants={merchantsList} />} />
      </Routes>
    </BrowserRouter>
  );
}