import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ShieldCheck, Store, 
  CheckCircle, Lock, Briefcase,
  ChevronDown, ChevronUp, RefreshCcw,
  Smartphone, Globe, Upload, Plus,
  ArrowLeft, Search, ArrowRight, UserCheck
} from 'lucide-react';

// ============================================================================
// REAL SOCIAL MEDIA SVG ICONS
// ============================================================================
const XIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>;
const InstagramIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const TikTokIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>;
const LinkedInIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const WhatsAppIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;

const KorraLinks = {
  vendorTermsPdf: 'https://drive.google.com/uc?export=download&id=1hYJ1ZFdH2J7znT7zz_E2xm--CWO7fGAL',
  vendorPartnershipPdf: 'https://drive.google.com/uc?export=download&id=1K2jqJ0XB3lS_w1b64MCyvfUaPnaJyFJP',
  vendorPrivacyPdf: 'https://drive.google.com/uc?export=download&id=1P9rBibP5HASwzaGaFcnRTwSFjOlMBtNk',
  customerTermsPdf: 'https://drive.google.com/uc?export=download&id=1hYJ1ZFdH2J7znT7zz_E2xm--CWO7fGAL',
  customerPrivacyPdf: 'https://drive.google.com/uc?export=download&id=1P9rBibP5HASwzaGaFcnRTwSFjOlMBtNk'
};

// ... [Keep your AdminPortal component exactly the same] ...

// ============================================================================
// 2. DEDICATED MERCHANTS DIRECTORY PAGE (WITH PAGINATION)
// ============================================================================
const MerchantsDirectory = ({ goHome, liveMerchants = [], loading }) => {
  const [merchantFilter, setMerchantFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  
  const categories = ['All', ...new Set(liveMerchants.map(m => m.category))];
  
  const filteredMerchants = liveMerchants.filter(m => {
    const matchesCategory = merchantFilter === 'All' || m.category === merchantFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (m.name || '').toLowerCase().includes(searchLower) || 
                          (m.location || '').toLowerCase().includes(searchLower) || 
                          (m.category || '').toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  // Reset pagination if filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [merchantFilter, searchQuery]);

  const totalPages = Math.ceil(filteredMerchants.length / ITEMS_PER_PAGE);
  const currentMerchants = filteredMerchants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

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
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentMerchants.map((merchant) => (
                <div key={merchant.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wide z-10">{merchant.category}</div>
                    <img src={merchant.imageUrl} alt={`${merchant.name} - Korra flexible payment gateway`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{merchant.name}</h3>
                    <p className="text-xs font-bold text-[#A54600] mb-3 flex items-center gap-1"><Store size={12}/> {merchant.location}</p>
                    <p className="text-sm text-slate-600 mb-6 flex-1">{merchant.description}</p>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      {merchant.socials?.whatsapp && (<a href={merchant.socials.whatsapp} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors" title="WhatsApp"><WhatsAppIcon className="w-4 h-4" /></a>)}
                      {merchant.socials?.instagram && (<a href={merchant.socials.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors" title="Instagram"><InstagramIcon className="w-4 h-4" /></a>)}
                      {merchant.socials?.tiktok && (<a href={merchant.socials.tiktok} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-200 transition-colors" title="TikTok"><TikTokIcon className="w-4 h-4" /></a>)}
                      {merchant.socials?.website && (<a href={merchant.socials.website} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors" title="Website"><Globe size={16} /></a>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="px-4 py-2 border border-slate-200 bg-white rounded-lg font-bold text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm font-bold text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 border border-slate-200 bg-white rounded-lg font-bold text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ... [Keep your App component state and useEffects the same] ...

      {/* 🚀 COMPLIANCE & SECURITY BADGES */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted, Secure & Fully Compliant</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Replace src with your actual image paths from public/assets folder */}
            <div className="flex flex-col items-center">
               <img src="/monnify-logo.png" alt="Monnify by Moniepoint" className="h-8 md:h-10 object-contain mb-2" />
               <span className="text-[10px] font-bold text-slate-500">Payment Gateway</span>
            </div>
            <div className="flex flex-col items-center">
               <img src="/fccpc-logo.png" alt="FCCPC Compliant" className="h-8 md:h-10 object-contain mb-2" />
               <span className="text-[10px] font-bold text-slate-500">FCCPC Approved</span>
            </div>
            <div className="flex flex-col items-center">
               <img src="/ndpc-logo.png" alt="NDPC Compliant" className="h-8 md:h-10 object-contain mb-2" />
               <span className="text-[10px] font-bold text-slate-500">Data Protection</span>
            </div>
            <div className="flex flex-col items-center">
               <img src="/cbn-logo.png" alt="CBN Compliant" className="h-8 md:h-10 object-contain mb-2" />
               <span className="text-[10px] font-bold text-slate-500">CBN Regulated Partner</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 FOOTER */}
      <footer className="bg-slate-50 text-slate-600 py-12 md:py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-2 mb-4"><img src="/korra_logo_icon.webp" alt="Korra" className="w-8 h-8 opacity-80" /><span className="font-bold text-xl text-slate-900">Korra</span></div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Structured ownership infrastructure for deliberate buyers and smart merchants.</p>
              
              {/* REAL SOCIAL MEDIA ICONS */}
              <div className="flex flex-wrap gap-4 mt-6">
                 <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors" title="X (Twitter)"><XIcon className="w-5 h-5"/></a>
                 <a href="#" className="text-slate-400 hover:text-pink-600 transition-colors" title="Instagram"><InstagramIcon className="w-5 h-5"/></a>
                 <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors" title="TikTok"><TikTokIcon className="w-5 h-5"/></a>
                 <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors" title="LinkedIn"><LinkedInIcon className="w-5 h-5"/></a>
                 <a href="#" className="text-slate-400 hover:text-green-600 transition-colors" title="WhatsApp Channel"><WhatsAppIcon className="w-5 h-5"/></a>
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
            <p className="text-slate-500 text-xs md:text-sm font-medium">© {new Date().getFullYear()} Korra Ltd. All rights reserved.</p>
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