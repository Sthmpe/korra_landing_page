import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ShieldCheck, 
  TrendingUp, 
  Store, 
  Hexagon,
  CheckCircle,
  AlertCircle,
  Banknote,
  Lock,
  Briefcase,
  ChevronDown, 
  ChevronUp,
  Users,
  Wallet,
  RefreshCcw,
  Smartphone,
  Globe,
  UploadCloud,
  FileText
} from 'lucide-react';

// ============================================================================
// 🛑 SECRET UPLOAD PORTAL (Accessible via /secret-upload)
// ============================================================================
const SecretUploadPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
          <div className="w-10 h-10 rounded-full bg-[#A54600] flex items-center justify-center">
            <Lock size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Secure Upload Portal</h1>
            <p className="text-xs text-slate-400">Authorized personnel only</p>
          </div>
        </div>

        <div className="border-2 border-dashed border-slate-600 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-[#A54600] hover:bg-slate-800/50 transition-colors cursor-pointer">
          <UploadCloud size={48} className="text-slate-400 mb-4" />
          <p className="text-sm font-bold mb-1">Click to browse or drag file here</p>
          <p className="text-xs text-slate-500">Supports JSON, CSV, or ZIP files</p>
        </div>

        <button className="w-full mt-6 bg-[#A54600] hover:bg-[#8a3a00] text-white font-bold py-3 rounded-xl transition-colors">
          Upload Securely
        </button>

        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-slate-500 hover:text-white transition-colors">← Return to main site</a>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 🌍 MAIN LANDING PAGE
// ============================================================================
export default function App() {
  const [currentPath, setCurrentPath] = useState('');// 1. ALL HOOKS MUST GO AT THE VERY TOP
  const [currentPath, setCurrentPath] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeModal, setActiveModal] = useState(null); /

  // Simple router logic for the secret URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  if (currentPath === '/secret-upload') {
    return <SecretUploadPage />;
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'terms', 'privacy', 'merchant'

  const openModal = (type) => {
    setActiveModal(type);
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setActiveModal(null);
    if (typeof document !== 'undefined') document.body.style.overflow = 'unset';
  };

  // BRAND COLORS 
  const colors = {
    primaryBg: "bg-white", 
    secondaryBg: "bg-slate-50",
    accent: `text-[#A54600]`, 
    button: `bg-[#A54600] hover:bg-[#8a3a00] text-white`, 
    buttonSecondary: `bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200`,
    text: "text-slate-900", 
    muted: "text-slate-600", 
    border: "border-slate-200",
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToDownload = () => {
    const element = document.getElementById('download-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // --- EXPANDED FAQS (WITH CAPS, LIMITS & SECURITY) ---
  const faqs = [
    {
      question: "Is there a limit (Cap) to how much I can lock?",
      answer: (
        <div className="space-y-3">
          <p>Yes. To encourage responsible spending, single items are capped at <strong>₦100,000</strong>.</p>
          <p>Additionally, new customers start on the <strong>Starter Tier</strong>, which allows a maximum of <strong>3 active plans</strong> at any time. As you successfully complete plans, your account automatically levels up to unlock more slots.</p>
        </div>
      )
    },
    {
      question: "How do I get my item after paying? (Pickup PIN)",
      answer: "Once your plan reaches 100%, the app generates a secure Pickup PIN. If you are picking up in-store, show this PIN to the merchant. If ordering online, the merchant will process your delivery. Do NOT share your PIN until you have physically received your item."
    },
    {
      question: "Can I cancel my plan? (Refund Policy)",
      answer: (
        <div className="space-y-3">
          <p>Yes, you can cancel a plan, but <span className="text-[#A54600] font-bold">we do not offer cash refunds.</span></p>
          <p>To protect merchants who hold stock for you, canceled plans are immediately converted into <strong>Store Credit</strong>.</p>
        </div>
      )
    },
    {
      question: "What is Store Credit and how do I use it?",
      answer: "Store Credit is a digital wallet balance tied to a specific Merchant. If you cancel an iPhone plan, that money sits in your Store Credit wallet. You can use it later to buy AirPods, a Samsung, or any other item from that exact same merchant."
    },
    {
      question: "Why isn't the app on the Play Store/App Store yet?",
      answer: "We are currently in a Direct Release phase. This allows us to push critical financial updates instantly without waiting for third-party approvals. If you cannot install the APK, simply use our Web App version which works perfectly on all devices (iOS and Android)."
    },
    {
      question: "What is the 3.5% Initiation Fee?",
      answer: "This is a one-time architecture fee added to your down payment. It covers the secure payment rails, automated bookkeeping, and the Price Lock guarantee. It is non-refundable."
    },
    {
      question: "I am a business owner. What is Korra Biz?",
      answer: "Korra Biz is our dedicated app for Merchants. It allows you to generate checkout codes, track customer payments automatically, and withdraw your funds instantly. Click 'Get Korra Biz' in the download section to start."
    }
  ];

  return (
    <div className={`min-h-screen ${colors.primaryBg} ${colors.text} font-sans selection:bg-[#A54600] selection:text-white overflow-x-hidden`}>

      {/* --- MODALS --- */}
      {activeModal === 'terms' && <LegalModal title="Customer Terms of Service" sections={customerTermsData} onClose={closeModal} />}
      {activeModal === 'merchant' && <LegalModal title="Merchant Agreement" sections={merchantAgreementData} onClose={closeModal} />}
      {activeModal === 'privacy' && <LegalModal title="Privacy Policy" sections={privacyData} onClose={closeModal} />}
      
      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-50 bg-white/95 backdrop-blur-md border-b ${colors.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <img src="/korra_logo_icon.webp" alt="Korra Logo" className="h-12 w-12 md:h-12 md:w-12 object-contain" />
              <span className={`font-bold text-xl md:text-2xl tracking-tight ${colors.text}`}>Korra</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#models" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>Models</a>
              <a href="#benefits" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>Benefits</a>
              <a href="#about" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>About</a>
              <a href="#faq" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>FAQs</a>
              <button onClick={scrollToDownload} className={`${colors.button} px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-xl shadow-[#A54600]/20`}>
                Get The App
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 hover:text-slate-900 p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden bg-white border-b ${colors.border} absolute w-full left-0 top-16 shadow-lg`}>
            <div className="px-4 pt-4 pb-6 space-y-3">
              <a href="#models" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50">Models</a>
              <a href="#benefits" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50">Benefits</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50">FAQs</a>
              <div className="pt-2">
                <button onClick={scrollToDownload} className={`w-full ${colors.button} px-4 py-3.5 rounded-xl font-bold text-base shadow-md`}>
                  Get The App
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#A54600]/5 rounded-full blur-[60px] md:blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border ${colors.border} shadow-sm mb-6 md:mb-8 mx-auto`}>
            <span className={`flex h-2 w-2 rounded-full bg-[#A54600]`}></span>
            <span className={`text-[10px] md:text-xs font-bold text-[#A54600] tracking-wide uppercase`}>Total Commitment. Zero Risk.</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 leading-[1.1] text-slate-900">
            Command Your Commerce. <br />
            <span className="text-[#A54600]">Lock the Deal.</span>
          </h1>
          
          <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-base md:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed px-2">
            Korra is the standard for those who demand precision. We provide the payment rails and digital agreements for serious transactions. Stop negotiating. Start closing.
          </p>

          <div className="flex justify-center">
            <button onClick={scrollToDownload} className={`${colors.button} px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-[#A54600]/20`}>
              Choose Your Platform
            </button>
          </div>
        </div>
      </section>

      {/* --- TWO MODELS SECTION --- */}
      <section id="models" className="py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Two Ways to Transact</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Choose the model that fits the relationship.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#A54600]/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#A54600] text-white flex items-center justify-center mb-6">
                <Lock size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Strict Lock</h3>
              <p className="text-sm text-[#A54600] font-bold uppercase tracking-wider mb-6">Secure • High Trust</p>
              
              <ul className="space-y-4 text-slate-700 text-sm md:text-base">
                <li className="flex gap-3"><CheckCircle className="text-[#A54600] w-5 h-5 flex-shrink-0" /> <span><strong>Best for:</strong> New customers & High Value items.</span></li>
                <li className="flex gap-3"><CheckCircle className="text-[#A54600] w-5 h-5 flex-shrink-0" /> <span><strong>Deposit:</strong> Minimum 30% required.</span></li>
                <li className="flex gap-3"><Lock className="text-[#A54600] w-5 h-5 flex-shrink-0" /> <span><strong>Total Commitment:</strong> Funds locked immediately.</span></li>
                <li className="flex gap-3"><Wallet className="text-slate-400 w-5 h-5 flex-shrink-0" /> <span className="text-slate-500"><strong>Cancellation:</strong> No Refunds. Converts to <strong>Store Credit</strong>.</span></li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center mb-6">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Korra Direct</h3>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-6">Flexible • Loyal Customers</p>
              
              <ul className="space-y-4 text-slate-700 text-sm md:text-base">
                <li className="flex gap-3"><CheckCircle className="text-slate-900 w-5 h-5 flex-shrink-0" /> <span><strong>Best for:</strong> Repeat customers.</span></li>
                <li className="flex gap-3"><CheckCircle className="text-slate-900 w-5 h-5 flex-shrink-0" /> <span><strong>Flexible Rules:</strong> Merchant sets the terms.</span></li>
                <li className="flex gap-3"><CheckCircle className="text-slate-900 w-5 h-5 flex-shrink-0" /> <span><strong>Instant Settlement:</strong> Funds credited immediately.</span></li>
                <li className="flex gap-3"><RefreshCcw className="text-slate-400 w-5 h-5 flex-shrink-0" /> <span className="text-slate-500"><strong>Cancellation:</strong> 100% <strong>Store Credit</strong> only. No cash refunds.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- RULES & FEES --- */}
      <section id="economics" className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-slate-900">Transparent Fee Structure</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">Dual-Fee Structure. Sustainability. Security.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            
            {/* MERCHANT FEES */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#A54600] flex items-center justify-center text-white shrink-0">
                  <Store size={20} className="md:w-6 md:h-6"/>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">For Merchants</h3>
              </div>
              
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0"><Banknote className="text-[#A54600] w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">3.5% Platform Fee</h4>
                    <p className="text-xs md:text-sm text-slate-600 mt-1">Deducted automatically. Covers automated bookkeeping and payout infrastructure.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0"><Lock className="text-[#A54600] w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">Instant Settlement</h4>
                    <p className="text-xs md:text-sm text-slate-600 mt-1">Funds are credited to your wallet immediately after customer payment is verified.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* CUSTOMER FEES */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 flex items-center justify-center text-white shrink-0">
                  <ShieldCheck size={20} className="md:w-6 md:h-6"/>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">For Customers</h3>
              </div>
              
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0"><TrendingUp className="text-slate-900 w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">3.5% Plan Initiation Fee</h4>
                    <p className="text-xs md:text-sm text-slate-600 mt-1">A one-time fee added to your down payment. This secures the "Price Lock" technology.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0"><CheckCircle className="text-slate-900 w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">Commitment Policy</h4>
                    <p className="text-xs md:text-sm text-slate-600 mt-1">We do not offer refunds. Cancellation results in Store Credit only.</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- DOWNLOAD APPS SECTION (UPDATED) --- */}
      <section id="download-section" className="py-16 md:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Get The App</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Choose your platform. If you cannot install the APK, use the Web App (Works perfectly on iOS & Android).</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            
            {/* 1. CUSTOMER DOWNLOAD */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center flex flex-col h-full">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-6">
                <img src="/korra_logo_icon.webp" alt="Korra" className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Korra</h3>
              <p className="text-sm text-slate-500 mb-8 flex-grow">For shoppers. Lock prices, manage active plans, and pay small-small over time.</p>
              
              <div className="space-y-4">
                {/* TODO: UPDATE CUSTOMER APK LINK HERE */}
                <a 
                  href="https://app.korra.com.ng/downloads/korra.apk" 
                  className="flex items-center justify-center gap-3 bg-slate-900 text-white w-full py-4 rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95"
                >
                  <Smartphone className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold leading-none opacity-80">Android Direct</div>
                    <div className="text-lg font-bold leading-tight">Download APK</div>
                  </div>
                </a>

                {/* TODO: UPDATE CUSTOMER WEB APP LINK HERE */}
                <a 
                  href="https://app.korra.com.ng" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-white text-slate-900 w-full py-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-all shadow-sm active:scale-95"
                >
                  <Globe className="w-6 h-6 text-[#A54600]" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold leading-none opacity-80 text-slate-500">iOS / Desktop / Android</div>
                    <div className="text-lg font-bold leading-tight">Open Web App</div>
                  </div>
                </a>
              </div>
            </div>

            {/* 2. MERCHANT DOWNLOAD */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-100 flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#A54600] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">FOR BUSINESS</div>
              <div className="w-16 h-16 bg-slate-900 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <Store className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Korra Biz</h3>
              <p className="text-sm text-slate-500 mb-8 flex-grow">For merchants. Generate checkout codes, track inventory, and withdraw funds instantly.</p>
              
              <div className="space-y-4">
                {/* TODO: UPDATE MERCHANT APK LINK HERE */}
                <a 
                  href="https://app.korra.com.ng/downloads/korra_biz.apk" 
                  className="flex items-center justify-center gap-3 bg-[#A54600] text-white w-full py-4 rounded-xl hover:bg-[#8a3a00] transition-all shadow-md active:scale-95"
                >
                  <Smartphone className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold leading-none opacity-80">Android Direct</div>
                    <div className="text-lg font-bold leading-tight">Download APK</div>
                  </div>
                </a>

                {/* TODO: UPDATE MERCHANT WEB APP LINK HERE */}
                <a 
                  href="https://biz.korra.com.ng" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-white text-slate-900 w-full py-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                >
                  <Globe className="w-6 h-6 text-slate-500" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold leading-none opacity-80 text-slate-500">Merchant Dashboard</div>
                    <div className="text-lg font-bold leading-tight">Open Web App</div>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-sm md:text-base pr-4">{faq.question}</span>
                  {openFaq === index ? <ChevronUp className="text-[#A54600] flex-shrink-0" /> : <ChevronDown className="text-slate-400 flex-shrink-0" />}
                </button>
                {openFaq === index && (
                  <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-0 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-10 md:py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-2 mb-4">
                <Hexagon className="h-6 w-6 text-[#A54600]" fill="currentColor" />
                <span className="font-bold text-xl text-white">Korra</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                The Financial Tool for Reservations in African commerce.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:col-span-3">
                <div>
                  <h4 className="text-white font-bold mb-4 text-sm uppercase">Legal</h4>
                  <ul className="space-y-2 text-sm">
                    <li><button onClick={() => openModal('terms')} className="hover:text-[#A54600] text-left">Terms of Service</button></li>
                    <li><button onClick={() => openModal('privacy')} className="hover:text-[#A54600] text-left">Privacy Policy</button></li>
                    <li><button onClick={() => openModal('merchant')} className="hover:text-[#A54600] text-left">Merchant Agreement</button></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4 text-sm uppercase">Contact</h4>
                  <ul className="space-y-2 text-sm">
                    <li>support@korra.com.ng</li>
                    <li>Lagos, Nigeria</li>
                  </ul>
                </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-xs md:text-sm">© {new Date().getFullYear()} Korra Financial Services.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// LEGAL MODALS & CONTENT
// ============================================================================
const LegalModal = ({ title, sections, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500"><X size={20} /></button>
        </div>
        <div className="overflow-y-auto p-6 space-y-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A54600]"></span>
                {section.heading}
              </h3>
              <ul className="space-y-2 pl-4 border-l-2 border-slate-100">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm text-slate-600 leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          <button onClick={onClose} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800">Close</button>
        </div>
      </div>
    </div>
  );
};

const merchantAgreementData = [
  {
    heading: '1. The Merchant Program',
    items: ['Korra is a financial infrastructure tool. We are not a marketplace.', 'You choose between "Strict Lock" or "Korra Direct".']
  },
  {
    heading: '2. Fees & Commission',
    items: ['Korra charges a flat 3.5% Platform Fee on credits to your Merchant Wallet.', 'This fee covers automated bookkeeping and payment infrastructure.']
  },
  {
    heading: '3. No Refunds Policy',
    items: ['All transactions are considered final once settled to your wallet.', 'Korra does not facilitate cash reversals for "change of mind". Cancellations are processed strictly as Store Credit.']
  }
];

const customerTermsData = [
  {
    heading: '1. About Korra Reservation',
    items: ['Korra allows you to structure "Reserve & Pay" agreements.', 'We are NOT a retailer. We provide the payment agreement.']
  },
  {
    heading: '2. Plan Limits & Caps',
    items: ['Single item values are capped at ₦100,000 for standard accounts.', 'Active plan slots are determined by your loyalty tier.']
  },
  {
    heading: '3. Commitment Policy (No Refunds)',
    items: ['By initiating a plan, you commit to the purchase.', 'We do not offer cash refunds. Canceled plans convert to Store Credit valid only with that Merchant.']
  }
];

const privacyData = [
  { heading: '1. Data Collection', items: ['We collect personal details and transaction history to provide our service.'] },
  { heading: '2. Security', items: ['We employ bank-grade encryption to protect your data.', 'Your financial data is processed by regulated partners.'] }
];