import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Globe } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, TikTokIcon } from '../components/icons';

export const MerchantsDirectory = ({ liveMerchants = [], loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = liveMerchants.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans selection:bg-[#A54600] selection:text-white">
      {/* NAVIGATION BAR */}
      <nav className="bg-white sticky top-0 z-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-colors duration-200">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="text-xs font-mono tracking-widest uppercase">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <img src="/korra_logo_icon.webp" alt="Korra Logo" className="w-6 h-6 object-contain" />
            <span className="text-xs font-mono tracking-widest uppercase font-bold text-slate-800">KORRA</span>
          </div>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 pt-16">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A54600]"></span>
            <span className="text-xs font-mono tracking-widest uppercase text-[#A54600]">VERIFIED PLATFORM PARTNERS</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 font-sans">
            Merchant Directory
          </h1>
          <p className="text-base text-slate-500 leading-relaxed font-light">
            Discover and connect with verified businesses across Nigeria that accept flexible layaway and part-payment options structured through Korra.
          </p>
        </div>

        {/* SEARCH BAR BAR */}
        <div className="relative max-w-lg mb-12 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#A54600] transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search merchants by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:border-[#A54600] focus:ring-2 focus:ring-[#A54600]/10 transition-all font-sans text-sm text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* DIRECTORY GRID */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block w-8 h-8 border-4 border-[#A54600]/20 border-t-[#A54600] rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-mono tracking-widest uppercase text-slate-400">LOADING VERIFIED MERCHANTS...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((merchant) => {
              const initials = merchant.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();

              return (
                <Link
                  to={`/merchant/${merchant.name.toLowerCase().replace(/\s+/g, '-')}`}
                  key={merchant.id}
                  className="merchant-card block border border-slate-200/80 bg-white hover:border-[#A54600] hover:shadow-lg transition-all duration-300 rounded-2xl p-6 relative overflow-hidden group"
                >
                  <div className="merchant-top flex items-center gap-4 mb-5">
                    <div className="merchant-logo w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white bg-slate-900 group-hover:bg-[#A54600] transition-colors duration-300">
                      {initials}
                    </div>
                    <div>
                      <div className="merchant-name font-bold text-slate-800 text-base leading-snug group-hover:text-[#A54600] transition-colors">
                        {merchant.name}
                      </div>
                      <div className="merchant-cat text-xs text-slate-400 font-medium mt-0.5">
                        {merchant.category}
                      </div>
                    </div>
                  </div>

                  <div className="merchant-meta flex items-center gap-2 text-xs text-slate-500 mb-6 font-light">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>{merchant.location}</span>
                  </div>

                  <div className="merchant-socials pt-4 border-t border-slate-100 flex gap-2">
                    {merchant.socials?.whatsapp && (
                      <a 
                        href={merchant.socials.whatsapp} 
                        onClick={(e) => e.stopPropagation()} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="social-btn w-8 h-8 rounded-lg bg-slate-50 hover:bg-[#25D366] hover:text-white text-slate-600 flex items-center justify-center transition-colors" 
                        aria-label="WhatsApp"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                      </a>
                    )}
                    {merchant.socials?.instagram && (
                      <a 
                        href={merchant.socials.instagram} 
                        onClick={(e) => e.stopPropagation()} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="social-btn w-8 h-8 rounded-lg bg-slate-50 hover:bg-[#E1306C] hover:text-white text-slate-600 flex items-center justify-center transition-colors" 
                        aria-label="Instagram"
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                    )}
                    {merchant.socials?.website && (
                      <a 
                        href={merchant.socials.website} 
                        onClick={(e) => e.stopPropagation()} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="social-btn w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-600 flex items-center justify-center transition-colors" 
                        aria-label="Website"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                    {merchant.socials?.tiktok && (
                      <a 
                        href={merchant.socials.tiktok} 
                        onClick={(e) => e.stopPropagation()} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="social-btn w-8 h-8 rounded-lg bg-slate-50 hover:bg-[#000000] hover:text-white text-slate-600 flex items-center justify-center transition-colors" 
                        aria-label="TikTok"
                      >
                        <TikTokIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-slate-200 rounded-3xl bg-white">
            <p className="text-slate-400 text-sm font-light">No verified merchants match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
