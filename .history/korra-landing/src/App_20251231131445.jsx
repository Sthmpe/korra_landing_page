import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ShieldCheck, 
  TrendingUp, 
  Store, 
  CheckCircle,
  Banknote,
  Clock,
  Lock,
  Briefcase,
  Wallet,
  Smartphone,
  Globe,
  Download,
  AlertTriangle,
  RefreshCcw 
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // BRAND COLORS CONFIGURATION
  const colors = {
    primaryBg: "bg-white", 
    secondaryBg: "bg-slate-50",
    accent: `text-[#A54600]`, 
    button: `bg-[#A54600] hover:bg-[#8a3a00] text-white`, 
    text: "text-slate-900", 
    muted: "text-slate-600", 
    border: "border-slate-200",
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToDownload = () => {
    const element = document.getElementById('get-started');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // UPDATED FAQS - PITCH ANYTHING STYLE (SIMPLE & DIRECT)
  const faqs = [
    {
      question: "Is this a loan app?",
      answer: "No. We do not give loans. We are a Price-Lock Tool. You reserve an item, the price is frozen, and you pay small-small. We protect you from inflation, and we protect the vendor from time-wasters."
    },
    {
      question: "What happens if I cancel?",
      answer: (
        <div className="space-y-2">
          <p>We have a strict <strong>No Cash Refund</strong> policy to protect Vendor inventory.</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>First 24 Hours (Strict Lock):</strong> You can cancel for a full refund.</li>
            <li><strong>After 24 Hours:</strong> Your money is converted to <strong>Store Credit</strong>. You cannot withdraw it, but you can use it to buy other items from the same vendor.</li>
          </ul>
        </div>
      )
    },
    {
      question: "How do you make money?",
      answer: "We charge a simple service fee to keep the platform secure. The Customer pays a one-time 3.5% Processing Fee when starting a plan. The Vendor pays a 3.5% Platform Fee when withdrawing funds."
    },
    {
      question: "Can I extend my payment time?",
      answer: "Only serious buyers can extend. You must have paid at least 80% of the total price to unlock a 'Grace Period' extension. This ensures vendors only wait for committed customers."
    }
  ];

  return (
    <div className={`min-h-screen ${colors.primaryBg} ${colors.text} font-sans selection:bg-[#A54600] selection:text-white overflow-x-hidden`}>
      
      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-50 bg-white/95 backdrop-blur-md border-b ${colors.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              {/* Placeholder for Logo Image */}
              <div className="h-10 w-10 bg-[#A54600] rounded-lg flex items-center justify-center text-white font-bold text-xl">K</div>
              <span className={`font-bold text-xl md:text-2xl tracking-tight ${colors.text}`}>Korra</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>How It Works</a>
              <a href="#vendors" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>For Vendors</a>
              <a href="#customers" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>For Customers</a>
              <a href="#fees" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>Fees</a>
              <button 
                onClick={scrollToDownload}
                className={`${colors.button} px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-xl shadow-[#A54600]/20`}
              >
                Use Korra
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 hover:text-slate-900 p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className={`md:hidden bg-white border-b ${colors.border} absolute w-full left-0 top-16 shadow-lg`}>
            <div className="px-4 pt-4 pb-6 space-y-3">
              <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50">How It Works</a>
              <a href="#vendors" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50">For Vendors</a>
              <a href="#customers" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50">For Customers</a>
              <div className="pt-2">
                <button 
                  onClick={scrollToDownload}
                  className={`w-full ${colors.button} px-4 py-3.5 rounded-xl font-bold text-base shadow-md`}
                >
                  Use Korra
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#A54600]/5 rounded-full blur-[60px] md:blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border ${colors.border} shadow-sm mb-6 md:mb-8 mx-auto`}>
            <span className={`flex h-2 w-2 rounded-full bg-[#A54600]`}></span>
            <span className={`text-[10px] md:text-xs font-bold text-[#A54600] tracking-wide uppercase`}>Sales Recovery Tool</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 leading-[1.1] text-slate-900">
            Secure Sales. <br />
            <span className="text-[#A54600]">Lock the Price.</span>
          </h1>
          
          <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-base md:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed px-2">
            We are the high-velocity reservation tool for serious commerce. Customers beat inflation by locking prices. Vendors stop losing sales to "I will come back."
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
             <button 
                onClick={scrollToDownload}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-95 text-lg font-bold flex items-center gap-3"
              >
                Start Using Korra
                <TrendingUp size={20} />
              </button>
              <p className="text-sm text-slate-500">Available on Web, Android & Tablet.</p>
          </div>
        </div>
      </section>

      {/* --- DOWNLOAD / ACCESS SECTION (High Priority) --- */}
      <section id="get-started" className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Choose Your Platform</h2>
            <p className="text-slate-500 mt-2">Official App Stores (Apple & Google) are coming soon. Use the direct links below.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* iPhone / Web Users */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center hover:border-[#A54600] transition-colors group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">iPhone & PC Users</h3>
              <p className="text-slate-600 mb-6 text-sm">Access the full Korra experience directly through your browser. No download needed.</p>
              <a 
                href="https://app.korra.com.ng" 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Open Web App
              </a>
            </div>

            {/* Android Users */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center hover:border-[#A54600] transition-colors group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-8 h-8 text-[#A54600]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Android Users</h3>
              <p className="text-slate-600 mb-6 text-sm">Download the secure APK directly to your device.</p>
              
              <div className="w-full space-y-3">
                <a href="https://app.korra.com.ng/downloads/korra-modern.apk" className="flex items-center justify-between w-full px-4 py-3 bg-white border border-slate-300 rounded-xl hover:border-[#A54600] hover:text-[#A54600] transition-all group/btn">
                  <span className="font-bold text-sm">Download Modern Android</span>
                  <Download size={18} className="text-slate-400 group-hover/btn:text-[#A54600]" />
                </a>
                <div className="flex gap-3">
                   <a href="https://app.korra.com.ng/downloads/korra-legacy.apk" className="flex-1 flex items-center justify-center px-2 py-2 bg-transparent border border-slate-200 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all">
                    Older Androids
                  </a>
                  <a href="https://app.korra.com.ng/downloads/korra-tablet.apk" className="flex-1 flex items-center justify-center px-2 py-2 bg-transparent border border-slate-200 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all">
                    Tablet Version
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Models) --- */}
      <section id="how-it-works" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Two Ways to Transact</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Vendors choose the rules. Customers follow the plan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Model A: Strict Lock */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#A54600]/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#A54600] text-white flex items-center justify-center mb-6">
                <Lock size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Strict Lock</h3>
              <p className="text-sm text-[#A54600] font-bold uppercase tracking-wider mb-6">Best for New Customers</p>
              
              <ul className="space-y-4 text-slate-700 text-sm md:text-base">
                <li className="flex gap-3"><CheckCircle className="text-[#A54600] w-5 h-5 flex-shrink-0" /> <span><strong>Price:</strong> Locked immediately.</span></li>
                <li className="flex gap-3"><CheckCircle className="text-[#A54600] w-5 h-5 flex-shrink-0" /> <span><strong>Cooling Period:</strong> Full refund allowed within first 24 hours.</span></li>
                <li className="flex gap-3"><ShieldCheck className="text-[#A54600] w-5 h-5 flex-shrink-0" /> <span><strong>Security:</strong> Funds held in buffer for 24h.</span></li>
                <li className="flex gap-3"><RefreshCcw className="text-slate-400 w-5 h-5 flex-shrink-0" /> <span className="text-slate-500"><strong>Cancellation:</strong> No cash refunds after 24h. Funds convert to <strong>Store Credit</strong>.</span></li>
              </ul>
            </div>

            {/* Model B: Korra Direct */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center mb-6">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Korra Direct</h3>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-6">Best for Loyal Customers</p>
              
              <ul className="space-y-4 text-slate-700 text-sm md:text-base">
                <li className="flex gap-3"><CheckCircle className="text-slate-900 w-5 h-5 flex-shrink-0" /> <span><strong>Flexibility:</strong> Vendor sets the Down Payment.</span></li>
                <li className="flex gap-3"><CheckCircle className="text-slate-900 w-5 h-5 flex-shrink-0" /> <span><strong>Speed:</strong> Instant payout to Vendor wallet.</span></li>
                <li className="flex gap-3"><CheckCircle className="text-slate-900 w-5 h-5 flex-shrink-0" /> <span><strong>High Value:</strong> Ideal for items above ₦300k.</span></li>
                <li className="flex gap-3"><RefreshCcw className="text-slate-400 w-5 h-5 flex-shrink-0" /> <span className="text-slate-500"><strong>Cancellation:</strong> 100% <strong>Store Credit</strong> only. No cash withdrawals.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEES (Transparent Economics) --- */}
      <section id="fees" className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-slate-900">Simple, Clear Fees.</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We split the cost to keep the ecosystem sustainable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            
            {/* Vendor Fee */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Store className="text-[#A54600]" />
                <h3 className="text-xl font-bold text-slate-900">For Vendors</h3>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-2">3.5% <span className="text-base font-normal text-slate-500">Platform Fee</span></div>
              <p className="text-slate-600 text-sm">Deducted automatically from incoming payments. We handle the bookkeeping, reminders, and security so you don't have to.</p>
            </div>

            {/* Customer Fee */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-slate-900" />
                <h3 className="text-xl font-bold text-slate-900">For Customers</h3>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-2">3.5% <span className="text-base font-normal text-slate-500">Processing Fee</span></div>
              <p className="text-slate-600 text-sm">A one-time fee added when you start a plan. This locks your price and secures your product against inflation.</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- BENEFITS PITCH --- */}
      <section id="vendors" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
           {/* Vendor Pitch */}
           <div className="mb-20">
             <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
               <div className="flex-1 w-full">
                 <span className="text-[#A54600] font-bold tracking-wider text-xs md:text-sm uppercase mb-2 block">Vendor Benefits</span>
                 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">You are a "Sales Recovery" Machine.</h2>
                 <p className="text-slate-600 mb-6 text-lg">
                   You know those customers who say "I will buy it" but don't want a loan? Korra catches them. We turn "maybe" into "paid".
                 </p>
                 <div className="space-y-4">
                   <div className="flex items-start gap-3">
                     <CheckCircle className="text-[#A54600] mt-1 shrink-0" />
                     <div>
                       <h4 className="font-bold text-slate-900">High Speed Turnover</h4>
                       <p className="text-sm text-slate-600">Items under ₦15k must be paid in 14 days. We don't tie down your stock.</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-3">
                     <CheckCircle className="text-[#A54600] mt-1 shrink-0" />
                     <div>
                       <h4 className="font-bold text-slate-900">No Debt Chasing</h4>
                       <p className="text-sm text-slate-600">We send the reminders. We collect the money. You just check your wallet.</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-3">
                     <CheckCircle className="text-[#A54600] mt-1 shrink-0" />
                     <div>
                       <h4 className="font-bold text-slate-900">Strict Extensions</h4>
                       <p className="text-sm text-slate-600">Customer wants more time? They must pay 80% first.</p>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="flex-1 w-full flex justify-center">
                 <div className="bg-slate-900 text-white p-6 rounded-2xl max-w-sm w-full shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-slate-400 text-xs font-bold uppercase">Wallet Balance</span>
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-3xl font-bold mb-1">₦450,000.00</div>
                    <div className="text-sm text-slate-400 mb-6">Available to Withdraw</div>
                    <div className="space-y-3">
                        <div className="bg-slate-800 p-3 rounded-lg flex justify-between items-center">
                            <span className="text-sm">iPhone 13 Reserve</span>
                            <span className="text-green-400 text-sm font-bold">+ ₦40,000</span>
                        </div>
                        <div className="bg-slate-800 p-3 rounded-lg flex justify-between items-center">
                            <span className="text-sm">Samsung TV (Direct)</span>
                            <span className="text-green-400 text-sm font-bold">+ ₦120,000</span>
                        </div>
                    </div>
                 </div>
               </div>
             </div>
           </div>

           {/* Customer Pitch */}
           <div id="customers" className="pt-16 border-t border-slate-100">
             <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
               <div className="flex-1 w-full">
                 <span className="text-slate-500 font-bold tracking-wider text-xs md:text-sm uppercase mb-2 block">Customer Benefits</span>
                 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Own it now. Possess it later.</h2>
                 <p className="text-slate-600 mb-6 text-lg">
                   The price of things goes up every day. Korra lets you freeze the price today, even if you don't have all the money yet.
                 </p>
                 <div className="space-y-4">
                   <div className="flex items-start gap-3">
                     <CheckCircle className="text-slate-900 mt-1 shrink-0" />
                     <div>
                       <h4 className="font-bold text-slate-900">Beat Inflation</h4>
                       <p className="text-sm text-slate-600">If the market price doubles next week, you still pay the old price.</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-3">
                     <CheckCircle className="text-slate-900 mt-1 shrink-0" />
                     <div>
                       <h4 className="font-bold text-slate-900">Secure Pickup</h4>
                       <p className="text-sm text-slate-600">You get a unique Secure Code. The vendor cannot give your item to anyone else.</p>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="flex-1 w-full flex justify-center">
                 <div className="bg-white border border-slate-200 p-6 rounded-2xl max-w-sm w-full shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                            <Lock size={20}/>
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">Price Locked</div>
                            <div className="text-xs text-slate-500">Secure Reservation</div>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 mb-4">₦180,000</div>
                    <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                        <div className="bg-[#A54600] h-2 rounded-full w-[60%]"></div>
                    </div>
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-[#A54600]">60% Paid</span>
                        <span className="text-slate-400">40% Remaining</span>
                    </div>
                 </div>
               </div>
             </div>
           </div>

        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-slate-900">{faq.question}</span>
                  {openFaq === index ? <X className="text-slate-400" /> : <Menu className="text-slate-400 rotate-90" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-8 w-8 bg-[#A54600] rounded-md flex items-center justify-center text-white font-bold">K</div>
                <span className="font-bold text-xl text-slate-900">Korra</span>
            </div>
            <p className="text-slate-500 text-sm mb-6">
                Technology Service Provider. Payments powered by Monnify (Moniepoint Inc).
            </p>
            <div className="flex justify-center gap-6 text-sm font-medium text-slate-600">
                <a href="#" className="hover:text-[#A54600]">Privacy Policy</a>
                <a href="#" className="hover:text-[#A54600]">Terms of Service</a>
                <a href="#" className="hover:text-[#A54600]">Vendor Agreement</a>
            </div>
            <p className="text-slate-400 text-xs mt-8">
                © 2024 Korra Networks. All rights reserved.
            </p>
        </div>
      </footer>

    </div>
  );
}