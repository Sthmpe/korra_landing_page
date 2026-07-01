import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Shield, Smartphone, Briefcase, Lock, 
  Trash2, Mail, FileText, CheckCircle2, Calendar, Building,
  ArrowUp, Check, ExternalLink, Info
} from 'lucide-react';

export const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('part1');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['part1', 'part2', 'part3'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-slate-100 font-sans selection:bg-[#A54600] selection:text-white pb-24">
      {/* Grid background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

      {/* TOP HEADER NAV */}
      <header className="sticky top-0 z-50 bg-[#0A0B0D]/80 backdrop-blur-md border-b border-slate-800/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-200">
            <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center group-hover:border-slate-500 transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="text-xs font-mono tracking-widest uppercase">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <img src="/korra_logo_icon.webp" alt="Korra Logo" className="w-6 h-6 object-contain opacity-80" />
            <span className="text-xs font-mono tracking-widest uppercase font-bold text-slate-400">KORRA // DOCUMENTATION</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
        {/* HERO SECTION */}
        <section className="mb-16 border-b border-slate-800/85 pb-16">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A54600] animate-pulse"></span>
                <span className="text-xs font-mono tracking-widest uppercase text-[#A54600]">PUBLIC POLICY DOCUMENT</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                Privacy Policy
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl font-light leading-relaxed">
                Smart people own things differently. This policy details how we collect, store, and protect your transaction and profile data across the Korra platform.
              </p>
            </div>
            
            {/* DOCUMENT METADATA BLOCK - Industrial Style */}
            <div className="lg:col-span-4 bg-slate-900/40 border border-slate-850 p-6 rounded-xl font-mono text-[11px] text-slate-400 space-y-4">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>REF:</span>
                <span className="text-white font-bold">KOR-PP-26-V1</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>EFFECTIVE:</span>
                <span className="text-white">JUNE 30, 2026</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>PUBLISHER:</span>
                <span className="text-white text-right">KORRAHQ BYTE LTD</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>LOCATION:</span>
                <span className="text-white text-right">ILORIN, KWARA, NIGERIA</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-[#A54600] font-bold">LIVE & COMPLIANT</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* SIDEBAR NAVIGATION - Desktop sticky */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 block mb-4">Table of Contents</span>
                
                <button 
                  onClick={() => scrollToSection('part1')}
                  className={`w-full text-left py-3 px-4 rounded-lg border text-sm flex items-center gap-3 transition-all duration-200 ${
                    activeSection === 'part1' 
                      ? 'bg-slate-900 border-[#A54600]/40 text-white font-medium shadow-md shadow-[#A54600]/5' 
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-slate-900/30'
                  }`}
                >
                  <Smartphone size={16} className={activeSection === 'part1' ? 'text-[#A54600]' : 'text-slate-500'} />
                  <span>01. Customer App</span>
                </button>

                <button 
                  onClick={() => scrollToSection('part2')}
                  className={`w-full text-left py-3 px-4 rounded-lg border text-sm flex items-center gap-3 transition-all duration-200 ${
                    activeSection === 'part2' 
                      ? 'bg-slate-900 border-[#A54600]/40 text-white font-medium shadow-md shadow-[#A54600]/5' 
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-slate-900/30'
                  }`}
                >
                  <Briefcase size={16} className={activeSection === 'part2' ? 'text-[#A54600]' : 'text-slate-500'} />
                  <span>02. Business App</span>
                </button>

                <button 
                  onClick={() => scrollToSection('part3')}
                  className={`w-full text-left py-3 px-4 rounded-lg border text-sm flex items-center gap-3 transition-all duration-200 ${
                    activeSection === 'part3' 
                      ? 'bg-slate-900 border-[#A54600]/40 text-white font-medium shadow-md shadow-[#A54600]/5' 
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-slate-900/30'
                  }`}
                >
                  <Lock size={16} className={activeSection === 'part3' ? 'text-[#A54600]' : 'text-slate-500'} />
                  <span>03. Data Security</span>
                </button>
              </div>

              {/* Quick Contact Info */}
              <div className="p-4 bg-slate-900/20 border border-slate-800 rounded-lg space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#A54600] uppercase block">Need Support?</span>
                <p className="text-xs text-slate-400 leading-relaxed">Have questions or want to request account deletion?</p>
                <a href="mailto:support@korra.com.ng" className="inline-flex items-center gap-1.5 text-xs text-white hover:text-[#A54600] transition-colors font-mono">
                  <Mail size={12} />
                  <span>support@korra.com.ng</span>
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN DOCUMENT TEXT */}
          <div className="lg:col-span-9 space-y-24">
            
            {/* OVERVIEW INTRODUCTION */}
            <div className="bg-slate-900/20 border border-slate-800/80 p-8 rounded-xl relative overflow-hidden">
              <div className="absolute right-4 top-4 text-slate-800 opacity-20">
                <Info size={48} />
              </div>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base font-light">
                This Privacy Policy explains how KorraHQ Byte Ltd (“we,” “us,” or “our”) collects, uses, stores, and protects your personal data — whether you use the Korra Customer App to track your flexible part-payment plans, or the Korra Business App to manage your storefront and settlements.
              </p>
              <p className="text-slate-350 mt-4 leading-relaxed text-sm font-light">
                By using any part of our platform, you agree to the practices described below. For any privacy question, data request, or account deletion, contact us at{' '}
                <a href="mailto:support@korra.com.ng" className="text-white underline hover:text-[#A54600] transition-colors font-mono">
                  support@korra.com.ng
                </a>.
              </p>
            </div>

            {/* PART 1 */}
            <section id="part1" className="scroll-mt-32 space-y-8">
              <div className="border-b border-slate-800 pb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center">
                  <Smartphone className="text-[#A54600]" size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#A54600] uppercase block">PART 01</span>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Korra Customer App Privacy</h2>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="font-mono text-sm text-[#A54600]">1.1</span> Data we collect
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    We collect only the personal information strictly necessary to authenticate your profile and manage your payment plans securely:
                  </p>
                  
                  {/* Grid Cards for Collected Data */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-900/30 border border-slate-850 rounded-lg hover:border-slate-700 transition-colors">
                      <span className="text-[10px] font-mono text-[#A54600] uppercase block mb-1">Identity & Sign-In</span>
                      <h4 className="font-bold text-sm text-white mb-2">Authentication data</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Full name, email address, and profile picture, provided securely through Google Sign-In (OAuth). We do not collect or store manual passwords.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-900/30 border border-slate-850 rounded-lg hover:border-slate-700 transition-colors">
                      <span className="text-[10px] font-mono text-[#A54600] uppercase block mb-1">Direct Contact</span>
                      <h4 className="font-bold text-sm text-white mb-2">Contact data</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Your phone number and email address used for transaction updates and verification.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-900/30 border border-slate-850 rounded-lg hover:border-slate-700 transition-colors">
                      <span className="text-[10px] font-mono text-[#A54600] uppercase block mb-1">Safety & Verification</span>
                      <h4 className="font-bold text-sm text-white mb-2">KYC data</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Standard identity details provided during account setup to protect platform integrity and verify account security.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-900/30 border border-slate-850 rounded-lg hover:border-slate-700 transition-colors">
                      <span className="text-[10px] font-mono text-[#A54600] uppercase block mb-1">Transaction History</span>
                      <h4 className="font-bold text-sm text-white mb-2">Transaction ledger data</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Your purchase history, outstanding plan balances, installment schedules, and merchant confirmation-code logs.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="font-mono text-sm text-[#A54600]">1.2</span> How we use your data
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "To sign you in securely across your devices through Google Sign-In.",
                      "To track ongoing installments and keep your remaining balance with the merchant up to date.",
                      "To send push notifications about payment updates, plan reminders, and order confirmations."
                    ].map((text, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-sm text-slate-400">
                        <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-[#A54600]" />
                        </span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="font-mono text-sm text-[#A54600]">1.3</span> Data sharing & third parties
                  </h3>
                  <div className="space-y-4">
                    <div className="p-5 bg-slate-900/10 border border-slate-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-sm">Monnify (Payment Provider)</span>
                        <span className="text-[9px] font-mono tracking-widest text-[#A54600] border border-[#A54600]/30 px-2 py-0.5 rounded uppercase">SECURE TRANSFER</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        We securely pass the parameters needed to process wallet top-ups and bank transfers directly to Monnify. We do not store financial credentials.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-900/10 border border-slate-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-sm">Korra Merchants</span>
                        <span className="text-[9px] font-mono tracking-widest text-slate-400 border border-slate-800 px-2 py-0.5 rounded uppercase">RESTRICTED DETAILS</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        We share only limited, relevant details (such as your name and confirmation code) so the merchant can confirm your plan and coordinate handover. We never expose your private financial details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PART 2 */}
            <section id="part2" className="scroll-mt-32 space-y-8">
              <div className="border-b border-slate-800 pb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center">
                  <Briefcase className="text-[#A54600]" size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#A54600] uppercase block">PART 02</span>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Korra Business Merchant Privacy</h2>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="font-mono text-sm text-[#A54600]">2.1</span> Data we collect
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    We collect the operational and identity data required to host and maintain your storefront:
                  </p>
                  
                  {/* Grid Cards for Collected Data */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-900/30 border border-slate-850 rounded-lg hover:border-slate-700 transition-colors">
                      <span className="text-[10px] font-mono text-[#A54600] uppercase block mb-1">Store Owner</span>
                      <h4 className="font-bold text-sm text-white mb-2">Authentication data</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Full name, email address, and profile picture, provided securely through Google Sign-In (OAuth).
                      </p>
                    </div>

                    <div className="p-5 bg-slate-900/30 border border-slate-850 rounded-lg hover:border-slate-700 transition-colors">
                      <span className="text-[10px] font-mono text-[#A54600] uppercase block mb-1">Public Display</span>
                      <h4 className="font-bold text-sm text-white mb-2">Business profile</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Your business name, store links, product descriptions, pricing, inventory listings, and business address.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-900/30 border border-slate-850 rounded-lg hover:border-slate-700 transition-colors">
                      <span className="text-[10px] font-mono text-[#A54600] uppercase block mb-1">Verification</span>
                      <h4 className="font-bold text-sm text-white mb-2">KYC data</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Basic verification details provided during merchant onboarding to maintain platform safety and trust.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-900/30 border border-slate-850 rounded-lg hover:border-slate-700 transition-colors">
                      <span className="text-[10px] font-mono text-[#A54600] uppercase block mb-1">Payout Ledger</span>
                      <h4 className="font-bold text-sm text-white mb-2">Settlement & transaction data</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Bank account details used strictly for automatic payout settlements, along with your store’s processing history and active ledger logs.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="font-mono text-sm text-[#A54600]">2.2</span> How we use your data
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "To host, generate, and serve your public store checkout links.",
                      "To manage customer installment tracking and calculate your store wallet balance.",
                      "To notify you when a customer makes a deposit, clears a plan balance, or requests an item release."
                    ].map((text, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-sm text-slate-400">
                        <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-[#A54600]" />
                        </span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="font-mono text-sm text-[#A54600]">2.3</span> Data sharing & third parties
                  </h3>
                  <div className="space-y-4">
                    <div className="p-5 bg-slate-900/10 border border-slate-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-sm">Monnify Settlements</span>
                        <span className="text-[9px] font-mono tracking-widest text-[#A54600] border border-[#A54600]/30 px-2 py-0.5 rounded uppercase">AUTOMATIC PAYOUTS</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Your settlement bank details are securely shared with Monnify to route automatic payouts directly to your business bank account.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-900/10 border border-slate-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-sm">Public Storefront Links</span>
                        <span className="text-[9px] font-mono tracking-widest text-slate-400 border border-slate-800 px-2 py-0.5 rounded uppercase">PUBLIC VISIBILITY</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Your public store name, business address, and inventory are shared openly through your store link so buyers can discover and complete their orders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PART 3 */}
            <section id="part3" className="scroll-mt-32 space-y-8">
              <div className="border-b border-slate-800 pb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center">
                  <Lock className="text-[#A54600]" size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#A54600] uppercase block">PART 03</span>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Retention, Security & Account Deletion</h2>
                </div>
              </div>

              <div className="space-y-8">
                {/* Standard retention details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-lg relative">
                    <div className="font-mono text-xs text-slate-500 mb-2 uppercase">[RULE 3.1] DATA RETENTION</div>
                    <h4 className="text-base font-bold text-white mb-3">12-Month Security Hold</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      To keep accurate ledger records and support dispute handling and accounting, we retain transaction logs, payment histories, and store configurations for a standard cycle of 12 months from the date of each activity.
                    </p>
                    <span className="text-[10px] font-mono text-[#A54600] block mt-4">// Active protection standard</span>
                  </div>

                  <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-lg">
                    <div className="font-mono text-xs text-slate-500 mb-2 uppercase">[RULE 3.1] ACCOUNTS</div>
                    <h4 className="text-base font-bold text-white mb-3">Dormant Accounts</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Accounts inactive for a continuous 12-month period are flagged for closure, and their associated personal files are queued for removal from our storage layers automatically.
                    </p>
                    <span className="text-[10px] font-mono text-slate-500 block mt-9">// Automated clean-up queue</span>
                  </div>
                </div>

                {/* Compliance / Google Play Compliance box */}
                <div className="p-6 bg-[#A54600]/10 border border-[#A54600]/30 rounded-lg space-y-4">
                  <div className="flex items-center gap-2">
                    <Trash2 className="text-[#A54600]" size={18} />
                    <span className="font-bold text-white text-sm uppercase font-mono tracking-wider">3.2 Account Deletion (Google Play Compliant)</span>
                  </div>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    You can request full deletion of your account and data at any time, from either the customer app or the business storefront management app.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 pt-2 font-mono text-[10px] text-slate-400">
                    <div className="border border-slate-800 p-3 rounded bg-slate-900/20">
                      <span className="text-white block mb-1">1. HOW TO REQUEST</span>
                      Send deletion request from registered email to support@korra.com.ng.
                    </div>
                    <div className="border border-slate-800 p-3 rounded bg-slate-900/20">
                      <span className="text-white block mb-1">2. PROCESSING</span>
                      Profile, logs, and OAuth identifiers deleted within 30 days of verification.
                    </div>
                    <div className="border border-slate-800 p-3 rounded bg-slate-900/20">
                      <span className="text-[#A54600] block mb-1">3. EXCEPTION NOTICE</span>
                      Paused if there are live uncompleted plans or active ledger settlements.
                    </div>
                  </div>
                </div>

                {/* Safeguards Grid */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="font-mono text-sm text-[#A54600]">3.3</span> Security Safeguards
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-5 bg-slate-900/20 border border-slate-850 rounded-lg">
                      <span className="text-xs font-mono text-white block mb-2">TLS/SSL Encryption</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        All data moving between your application and our cloud nodes is protected with state of the art transit layers.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-900/20 border border-slate-850 rounded-lg">
                      <span className="text-xs font-mono text-white block mb-2">No Ads or Brokers</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Korra does not sell, rent, or trade your personal records, stores, or ledger details to advertisers or data brokers.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-900/20 border border-slate-850 rounded-lg">
                      <span className="text-xs font-mono text-white block mb-2">PCI/Monnify Stack</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        All deposits are routed over secure NIP channels. Korra never handles, holds, or stores raw customer card details.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

          </div>
        </div>

        {/* BOTTOM SECTION */}
        <section className="mt-24 pt-12 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <span>© 2026 KorraHQ Byte Ltd</span>
            <span>·</span>
            <span>Ilorin, Kwara, Nigeria</span>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-lg"
          >
            <ArrowUp size={14} />
            <span>Back to top</span>
          </button>
        </section>
      </main>
    </div>
  );
};
