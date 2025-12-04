import React, { useState } from 'react';
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
  Clock,
  Lock,
  FileText,
  Briefcase,
  ChevronDown, 
  ChevronUp,
  Users
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
    buttonSecondary: `bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200`,
    text: "text-slate-900", 
    muted: "text-slate-600", 
    border: "border-slate-200",
    borderHover: `hover:border-[#A54600]`,
    lightAccent: "bg-[#A54600]/10"
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

  const faqs = [
    {
      question: "Can I cancel my plan and get a refund?",
      answer: (
        <div className="space-y-2">
          <p>It depends on the plan you chose:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>For "Strict Lock" Plans:</strong> You have a grace period during the Secure Buffer to cancel for a full refund. Immediately after the buffer ends, we release funds to the vendor to lock your price. If you cancel after this, 50% of your paid funds are retained as compensation to the vendor.</li>
            <li><strong>For "Korra Direct" Plans:</strong> The cancellation policy is set by the Vendor (e.g., No Refund, Full Refund, or Exchange). Please check the Vendor's terms before paying.</li>
          </ul>
        </div>
      )
    },
    {
      question: "Why do you charge a cancellation fee?",
      answer: "We don't charge it; the Vendor keeps it. In Nigeria, holding an item for 2 months costs money (inflation). If you fail to complete the payment, the vendor has lost other sales. The fee covers their 'Opportunity Cost' and protects them from losses."
    },
    {
      question: "Is my money safe?",
      answer: "Yes. Korra is a technology service provider that processes funds via regulated partners. We hold funds in a Secure Buffer during the initial grace period to ensure commitment from both parties."
    },
    {
      question: "How do I start?",
      answer: "Download the app, complete your KYC verification, and ask your favorite vendor to send you a Korra link. If they aren't on Korra yet, invite them!"
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
              <img src="/korra_logo_icon.png" alt="Korra Logo" className="h-12 w-12 md:h-12 md:w-12 object-contain" />
              <span className={`font-bold text-xl md:text-2xl tracking-tight ${colors.text}`}>Korra</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#models" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>Our Models</a>
              <a href="#benefits" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>Benefits</a>
              <a href="#about" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>About Us</a>
              <a href="#faq" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>FAQs</a>
              <button 
                onClick={scrollToDownload}
                className={`${colors.button} px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-xl shadow-[#A54600]/20`}
              >
                Get Started
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
              <a href="#models" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50 border border-transparent hover:border-slate-100">Our Models</a>
              <a href="#benefits" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50 border border-transparent hover:border-slate-100">Benefits</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50 border border-transparent hover:border-slate-100">About Us</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50 border border-transparent hover:border-slate-100">FAQs</a>
              <div className="pt-2">
                <button 
                  onClick={scrollToDownload}
                  className={`w-full ${colors.button} px-4 py-3.5 rounded-xl font-bold text-base shadow-md`}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="download-section" className="relative pt-28 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#A54600]/5 rounded-full blur-[60px] md:blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border ${colors.border} shadow-sm mb-6 md:mb-8 mx-auto`}>
            <span className={`flex h-2 w-2 rounded-full bg-[#A54600]`}></span>
            <span className={`text-[10px] md:text-xs font-bold text-[#A54600] tracking-wide uppercase`}>Your Financial Tool for Reservations</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 leading-[1.1] text-slate-900">
            Secure Sales. <br />
            <span className="text-[#A54600]">Lock the Price.</span>
          </h1>
          
          <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-base md:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed px-2">
            Korra is the transaction tool for serious commerce. We provide the payment rails and digital agreements for Vendors and Customers to transact securely over time.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 items-stretch sm:items-center px-4 md:px-0">
            {/* Apple App Store Button */}
            <a href="#" className="flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95 justify-center">
              <svg viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 shrink-0">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 46.9 94.3 83.6 94.3 32.5 0 40.2-22.6 81.1-22.6 42.1 0 50.8 22.6 83.3 22.6 34.5 0 63.6-55.6 77.9-92.4-44.3-17.2-70.5-56-70.5-98.6 0-36.6 23.4-66.7 46.3-83.3zM253 103.1c16.3-19.7 26.6-46.7 22.7-74.1-23.2 1.3-51.5 12.5-66.2 29.8-12.8 15-24.8 39.5-20.7 65.6 24.3 2.1 52.6-11.4 64.2-21.3z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold leading-none opacity-80">Download on the</div>
                <div className="text-lg md:text-xl font-bold leading-tight">App Store</div>
              </div>
            </a>

            {/* Google Play Store Button */}
            <a href="#" className="flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95 justify-center">
               <svg viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 shrink-0">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold leading-none opacity-80">Get it on</div>
                <div className="text-lg md:text-xl font-bold leading-tight">Google Play</div>
              </div>
            </a>
          </div>
          
          <div className="mt-6 text-xs md:text-sm text-slate-500 font-medium">
            A Technology Service Provider.
          </div>
        </div>
      </section>

      {/* --- TWO MODELS SECTION --- */}
      <section id="models" className="py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Two Ways to Transact</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Vendors choose the model that fits the customer relationship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Model A: Strict Lock */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#A54600]/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#A54600] text-white flex items-center justify-center mb-6">
                <Lock size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Strict Lock</h3>
              <p className="text-sm text-[#A54600] font-bold uppercase tracking-wider mb-6">Secure • High Trust</p>
              
              <ul className="space-y-4 text-slate-700 text-sm md:text-base">
                <li className="flex gap-3"><CheckCircle className="text-[#A54600] w-5 h-5 flex-shrink-0" /> <span><strong>Best for:</strong> New customers & Items under ₦100k.</span></li>
                <li className="flex gap-3"><CheckCircle className="text-[#A54600] w-5 h-5 flex-shrink-0" /> <span><strong>Deposit:</strong> Minimum 30% - 40% required.</span></li>
                <li className="flex gap-3"><CheckCircle className="text-[#A54600] w-5 h-5 flex-shrink-0" /> <span><strong>Secure Buffer:</strong> Funds held safely for 10 days.</span></li>
                <li className="flex gap-3"><CheckCircle className="text-[#A54600] w-5 h-5 flex-shrink-0" /> <span><strong>Payout:</strong> 50% credited immediately after Secure Buffer.</span></li>
                <li className="flex gap-3"><AlertCircle className="text-slate-400 w-5 h-5 flex-shrink-0" /> <span className="text-slate-500"><strong>Cancellation:</strong> 50% forfeit penalty after buffer.</span></li>
              </ul>
            </div>

            {/* Model B: Korra Direct */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center mb-6">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Korra Direct</h3>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-6">Flexible • Loyal Customers</p>
              
              <ul className="space-y-4 text-slate-700 text-sm md:text-base">
                <li className="flex gap-3"><CheckCircle className="text-slate-900 w-5 h-5 flex-shrink-0" /> <span><strong>Best for:</strong> Repeat customers & High-value items.</span></li>
                <li className="flex gap-3"><CheckCircle className="text-slate-900 w-5 h-5 flex-shrink-0" /> <span><strong>Flexible Rules:</strong> Vendor sets down payment & duration.</span></li>
                <li className="flex gap-3"><CheckCircle className="text-slate-900 w-5 h-5 flex-shrink-0" /> <span><strong>Instant Settlement:</strong> Funds credited to Vendor wallet immediately.</span></li>
                <li className="flex gap-3"><CheckCircle className="text-slate-900 w-5 h-5 flex-shrink-0" /> <span><strong>Bookkeeping:</strong> Korra tracks balance & sends reminders.</span></li>
                <li className="flex gap-3"><AlertCircle className="text-slate-400 w-5 h-5 flex-shrink-0" /> <span className="text-slate-500"><strong>Disputes:</strong> Resolved directly between parties.</span></li>
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
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
              We employ a Dual-Fee Structure to ensure sustainability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            
            {/* VENDOR FEES */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#A54600] flex items-center justify-center text-white shrink-0">
                  <Store size={20} className="md:w-6 md:h-6"/>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">For Vendors</h3>
              </div>
              
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0"><Banknote className="text-[#A54600] w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">3.5% Platform Fee</h4>
                    <p className="text-xs md:text-sm text-slate-600 mt-1">Deducted automatically upon entry. Covers automated bookkeeping and management.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0"><Lock className="text-[#A54600] w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">50% Payout after Buffer</h4>
                    <p className="text-xs md:text-sm text-slate-600 mt-1">
                      Once the Secure Buffer passes, 50% of funds are credited to your wallet immediately.
                    </p>
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
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">2% Processing Fee</h4>
                    <p className="text-xs md:text-sm text-slate-600 mt-1">Capped at ₦3,000. This is a convenience fee for flexible payments and inflation protection.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0"><Clock className="text-slate-900 w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">10-Day Cooling Off</h4>
                    <p className="text-xs md:text-sm text-slate-600 mt-1">
                      In the Strict Model, you have 10 days to cancel for a refund. After the Secure Buffer, cancelling forfeits 50% of paid funds.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- VENDOR BENEFITS --- */}
      <section id="benefits" className="py-16 md:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           
           {/* Vendor Benefits */}
           <div className="mb-20">
             <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
               <div className="flex-1 w-full">
                 <span className="text-[#A54600] font-bold tracking-wider text-xs md:text-sm uppercase mb-2 block">For Vendors</span>
                 <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">No Manual Bookkeeping. <br/>Just Serious Buyers.</h2>
                 <p className="text-slate-600 mb-6 md:mb-8 text-base md:text-lg">
                   Stop using notebooks to track who owes you what. Korra automates the entire collection process.
                 </p>
                 <div className="space-y-4">
                   <div className="flex items-start gap-3">
                     <CheckCircle className="text-[#A54600] w-5 h-5 md:w-6 md:h-6 mt-1 flex-shrink-0" />
                     <div>
                       <h4 className="font-bold text-slate-900 text-sm md:text-base">Automated Payments</h4>
                       <p className="text-xs md:text-sm text-slate-600">We remind the customer and collect payments automatically.</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-3">
                     <CheckCircle className="text-[#A54600] w-5 h-5 md:w-6 md:h-6 mt-1 flex-shrink-0" />
                     <div>
                       <h4 className="font-bold text-slate-900 text-sm md:text-base">Down Payment Filter</h4>
                       <p className="text-xs md:text-sm text-slate-600">Unserious buyers won't pass the down payment step.</p>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="flex-1 relative w-full mt-8 md:mt-0">
                  {/* Abstract Vendor Dashboard Graphic */}
                  <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-slate-100 relative z-10">
                     <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                       <div>
                         <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase">Pending Release</p>
                         <p className="text-xl md:text-2xl font-bold text-slate-900">₦15,000.00</p>
                       </div>
                       <div className="bg-[#A54600]/10 text-[#A54600] px-2 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-bold">
                         Secure Buffer
                       </div>
                     </div>
                     <div className="space-y-3">
                       <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">JD</div>
                           <div>
                              <p className="text-xs md:text-sm font-bold text-slate-900">John Doe</p>
                              <p className="text-[10px] md:text-xs text-slate-500">Iphone 11 (Strict Lock)</p>
                           </div>
                         </div>
                         <span className="text-[10px] md:text-xs font-bold text-[#A54600]">Paid 40%</span>
                       </div>
                     </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-10 -right-4 w-24 h-24 bg-[#A54600] rounded-full opacity-10 blur-xl"></div>
                  <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-slate-900 rounded-full opacity-5 blur-xl"></div>
               </div>
             </div>
           </div>

           {/* Customer Benefits */}
           <div className="pt-8 border-t border-slate-200">
             <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
               <div className="flex-1 w-full">
                 <span className="text-slate-500 font-bold tracking-wider text-xs md:text-sm uppercase mb-2 block">For Customers</span>
                 <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">Lock Price Today. <br/>Pay Small Small.</h2>
                 <p className="text-slate-600 mb-6 md:mb-8 text-base md:text-lg">
                   Don't let inflation eat your savings. Secure the item you need now and pay at your own pace.
                 </p>
                 <div className="space-y-4">
                   <div className="flex items-start gap-3">
                     <CheckCircle className="text-slate-900 w-5 h-5 md:w-6 md:h-6 mt-1 flex-shrink-0" />
                     <div>
                       <h4 className="font-bold text-slate-900 text-sm md:text-base">Beat Inflation</h4>
                       <p className="text-xs md:text-sm text-slate-600">The price is locked the moment you pay your deposit. No price hikes.</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-3">
                     <CheckCircle className="text-slate-900 w-5 h-5 md:w-6 md:h-6 mt-1 flex-shrink-0" />
                     <div>
                       <h4 className="font-bold text-slate-900 text-sm md:text-base">Zero Stress</h4>
                       <p className="text-xs md:text-sm text-slate-600">No awkward conversations. We handle the schedule and reminders.</p>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="flex-1 relative w-full mt-8 md:mt-0">
                  {/* Abstract Customer Graphic */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 relative z-10 flex flex-col items-center text-center">
                     <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Lock className="text-slate-900 w-8 h-8" />
                     </div>
                     <h3 className="font-bold text-lg text-slate-900">Price Locked</h3>
                     <p className="text-sm text-slate-500 mb-4">You secured this item at ₦80,000</p>
                     <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#A54600] h-full w-2/3"></div>
                     </div>
                     <p className="text-xs text-slate-400 mt-2">65% Paid • 35% Remaining</p>
                  </div>
                  <div className="absolute top-5 -left-5 w-24 h-24 bg-slate-900 rounded-full opacity-5 blur-xl"></div>
               </div>
             </div>
           </div>

        </div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section id="about" className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 mb-6">
            <Users className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">About Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Building the Trust Layer for African Commerce</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Korra is the embedded reservation and price-lock infrastructure designed to protect consumers from inflation while securing sales for vendors.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed">
            We are not a marketplace. We do not list products. We provide the digital agreement and payment rails for Vendors and Customers who already know each other to transact securely over time.
          </p>
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

      {/* --- DISCLAIMER SECTION --- */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col md:flex-row items-start gap-4">
             <AlertCircle className="text-slate-400 flex-shrink-0 w-6 h-6" />
             <div className="text-xs md:text-sm text-slate-500 leading-relaxed">
               <strong>Important Legal Disclaimer:</strong> Korra is a technology service provider. Funds are processed via regulated partners (Monnify/Providus). Korra does not guarantee product quality or delivery. We verify Identities (KYC), but the transaction risk regarding the goods remains with the parties.
             </div>
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
                A Financial Tool for Reservations in African commerce.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:col-span-3">
                <div>
                  <h4 className="text-white font-bold mb-4 text-sm uppercase">Legal</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-[#A54600]">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-[#A54600]">Refund Policy</a></li>
                    <li><a href="#" className="hover:text-[#A54600]">Vendor Agreement</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4 text-sm uppercase">Contact</h4>
                  <ul className="space-y-2 text-sm">
                    <li>support@korra.com.ng</li>
                    <li>+234 800 KORRA</li>
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