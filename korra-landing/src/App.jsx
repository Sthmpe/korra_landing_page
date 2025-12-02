import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  TrendingUp, 
  Store, 
  Hexagon,
  CheckCircle,
  AlertCircle,
  Banknote,
  Clock,
  Lock,
  FileText
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

  return (
    <div className={`min-h-screen ${colors.primaryBg} ${colors.text} font-sans selection:bg-[#A54600] selection:text-white`}>
      
      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-50 bg-white/90 backdrop-blur-md border-b ${colors.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              {/* Logo Icon */}
              <Hexagon className={`h-8 w-8 ${colors.accent}`} fill="currentColor" fillOpacity={0.1} strokeWidth={2.5} />
              <span className={`font-bold text-2xl tracking-tight ${colors.text}`}>Korra</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#economics" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>Rules & Fees</a>
              <a href="#vendors" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>For Vendors</a>
              <a href="#customers" className={`hover:${colors.accent} transition-colors text-sm font-medium`}>For Customers</a>
              <button 
                onClick={scrollToDownload}
                className={`${colors.button} px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-xl shadow-[#A54600]/20`}
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 hover:text-slate-900">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className={`md:hidden bg-white border-b ${colors.border}`}>
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#economics" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50">Rules & Fees</a>
              <a href="#vendors" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50">For Vendors</a>
              <a href="#customers" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50">For Customers</a>
              <div className="pt-4">
                <button 
                  onClick={scrollToDownload}
                  className={`w-full ${colors.button} px-4 py-3 rounded-lg font-bold`}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="download-section" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#A54600]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border ${colors.border} shadow-sm mb-8`}>
            <span className={`flex h-2 w-2 rounded-full bg-[#A54600]`}></span>
            <span className={`text-xs font-bold text-[#A54600] tracking-wide uppercase`}>The Financial Tool for Reservations</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900">
            Secure Commitments. <br />
            <span className="text-[#A54600]">Zero Risk Trading.</span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
            Korra is the financial layer between serious buyers and verified vendors. 
            We automate the reservation process, enforce commitment, and ensure fair play for everyone.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            {/* Apple App Store Button */}
            <a href="#" className="flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto justify-center min-w-[200px]">
              <svg viewBox="0 0 384 512" fill="currentColor" className="w-8 h-8">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 46.9 94.3 83.6 94.3 32.5 0 40.2-22.6 81.1-22.6 42.1 0 50.8 22.6 83.3 22.6 34.5 0 63.6-55.6 77.9-92.4-44.3-17.2-70.5-56-70.5-98.6 0-36.6 23.4-66.7 46.3-83.3zM253 103.1c16.3-19.7 26.6-46.7 22.7-74.1-23.2 1.3-51.5 12.5-66.2 29.8-12.8 15-24.8 39.5-20.7 65.6 24.3 2.1 52.6-11.4 64.2-21.3z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold leading-none opacity-80">Download on the</div>
                <div className="text-xl font-bold leading-tight">App Store</div>
              </div>
            </a>

            {/* Google Play Store Button */}
            <a href="#" className="flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto justify-center min-w-[200px]">
               <svg viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold leading-none opacity-80">Get it on</div>
                <div className="text-xl font-bold leading-tight">Google Play</div>
              </div>
            </a>
          </div>
          
          <div className="mt-6 text-sm text-slate-500">
            Available for both <span className="font-bold text-slate-700">Vendors</span> and <span className="font-bold text-slate-700">Customers</span>
          </div>
        </div>
      </section>

      {/* --- THE RULES OF ENGAGEMENT (ECONOMICS) --- */}
      <section id="economics" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Transparent Rules & Economics</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We are not a marketplace. We are a financial tool. Here is exactly how the money works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* VENDOR ECONOMICS CARD */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-[#A54600]/30 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#A54600] flex items-center justify-center text-white">
                  <Store size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">For Vendors</h3>
              </div>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1"><Banknote className="text-[#A54600] w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">7.5% Service Charge</h4>
                    <p className="text-sm text-slate-600">We charge a flat percentage on the total transaction value. No monthly fees.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1"><Clock className="text-[#A54600] w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">50% Payout After 10 Days</h4>
                    <p className="text-sm text-slate-600">
                      Once the 10-day cooling-off period passes, 50% of funds are released to you. This confirms the sale is locked in.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1"><Lock className="text-[#A54600] w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Default Protection</h4>
                    <p className="text-sm text-slate-600">
                      Default occurs if the customer's plan <strong>ends</strong> without full payment. Since the 10-day cooling-off window has passed, you keep the funds already released to you to cover your opportunity cost.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* CUSTOMER ECONOMICS CARD */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-[#A54600]/30 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">For Customers</h3>
              </div>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1"><TrendingUp className="text-slate-900 w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">3% Transaction Fee</h4>
                    <p className="text-sm text-slate-600">Charged on every deposit, capped at ₦4,000. <span className="font-bold text-[#A54600]">No Interest Rates.</span></p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1"><AlertCircle className="text-slate-900 w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">The 10-Day Rule</h4>
                    <p className="text-sm text-slate-600">
                      You have 10 days to change your mind and cancel for a refund. After 10 days, you are <strong>obligated</strong> to complete the plan.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1"><FileText className="text-slate-900 w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Liability Disclaimer</h4>
                    <p className="text-sm text-slate-600">
                      Korra processes the money. We do not ship items. You are reserving directly from the vendor. Always trust who you buy from.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- VENDOR BENEFITS --- */}
      <section id="vendors" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row items-center gap-12">
             <div className="flex-1">
               <span className="text-[#A54600] font-bold tracking-wider text-sm uppercase mb-2 block">Vendor Benefits</span>
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">No Manual Bookkeeping. <br/>Just Serious Buyers.</h2>
               <p className="text-slate-600 mb-8 text-lg">
                 Stop using notebooks to track who owes you what. Korra automates the entire collection process and filters out time-wasters.
               </p>
               
               <div className="space-y-4">
                 <div className="flex items-start gap-3">
                   <CheckCircle className="text-[#A54600] w-6 h-6 mt-1 flex-shrink-0" />
                   <div>
                     <h4 className="font-bold text-slate-900">Automated Payments</h4>
                     <p className="text-sm text-slate-600">We remind the customer and collect payments automatically.</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-3">
                   <CheckCircle className="text-[#A54600] w-6 h-6 mt-1 flex-shrink-0" />
                   <div>
                     <h4 className="font-bold text-slate-900">Down Payment Filter</h4>
                     <p className="text-sm text-slate-600">Customers must pay a down payment based on their limit to start. Unserious buyers won't pass this step.</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-3">
                   <CheckCircle className="text-[#A54600] w-6 h-6 mt-1 flex-shrink-0" />
                   <div>
                     <h4 className="font-bold text-slate-900">Strict Cancellation Policy</h4>
                     <p className="text-sm text-slate-600">We protect your inventory reservation. Late cancellations result in penalties that favor you.</p>
                   </div>
                 </div>
               </div>
             </div>

             <div className="flex-1 relative">
                {/* Abstract Vendor Dashboard Graphic */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 relative z-10">
                   <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                     <div>
                       <p className="text-xs text-slate-400 font-bold uppercase">Pending Payout</p>
                       <p className="text-2xl font-bold text-slate-900">₦250,000.00</p>
                     </div>
                     <div className="bg-[#A54600]/10 text-[#A54600] px-3 py-1 rounded-full text-xs font-bold">
                       Available in 2 Days
                     </div>
                   </div>
                   <div className="space-y-3">
                     <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">JD</div>
                         <div>
                            <p className="text-sm font-bold text-slate-900">John Doe</p>
                            <p className="text-xs text-slate-500">Iphone 13 Pro Max</p>
                         </div>
                       </div>
                       <span className="text-xs font-bold text-[#A54600]">Paid 50%</span>
                     </div>
                     <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg opacity-50">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">AS</div>
                         <div>
                            <p className="text-sm font-bold text-slate-900">Amaka Smith</p>
                            <p className="text-xs text-slate-500">Wig Installation</p>
                         </div>
                       </div>
                       <span className="text-xs font-bold text-slate-400">Locked (Day 11)</span>
                     </div>
                   </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-10 -right-10 w-24 h-24 bg-[#A54600] rounded-full opacity-10 blur-xl"></div>
                <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-slate-900 rounded-full opacity-5 blur-xl"></div>
             </div>
           </div>
        </div>
      </section>

      {/* --- CUSTOMER TRUST SECTION --- */}
      <section id="customers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-12">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">You Request. Vendor Approves. We Secure.</h2>
             <p className="text-slate-600">
               Korra is built to help you plan your finances, not to sell you products. You find the vendor, you agree on the price, and you use Korra to pay securely over time.
             </p>
           </div>

           <div className="grid md:grid-cols-3 gap-8 text-center">
             <div className="p-6">
               <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                 <Store className="text-slate-900" />
               </div>
               <h3 className="font-bold text-lg mb-2">1. Find Your Vendor</h3>
               <p className="text-sm text-slate-600">
                 You initiate the request. Whether it's an Instagram seller or a local shop, ask them to accept Korra.
               </p>
             </div>
             <div className="p-6">
               <div className="w-16 h-16 mx-auto bg-[#A54600]/10 rounded-full flex items-center justify-center mb-4">
                 <Lock className="text-[#A54600]" />
               </div>
               <h3 className="font-bold text-lg mb-2">2. Lock It Down</h3>
               <p className="text-sm text-slate-600">
                 Pay your down payment (based on your limit). The item is reserved. You have a 10-day grace period to cancel if needed.
               </p>
             </div>
             <div className="p-6">
               <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                 <CheckCircle className="text-slate-900" />
               </div>
               <h3 className="font-bold text-lg mb-2">3. Complete & Collect</h3>
               <p className="text-sm text-slate-600">
                 Finish your payments. Korra releases the final funds to the vendor, and you pick up your item. Zero debt carried forward.
               </p>
             </div>
           </div>
           
           <div className="mt-12 bg-orange-50 border border-orange-100 p-6 rounded-xl flex items-start gap-4 max-w-2xl mx-auto">
             <AlertCircle className="text-orange-600 flex-shrink-0" />
             <div className="text-sm text-orange-800">
               <strong>Important Disclaimer:</strong> We are a financial technology company, not a delivery service or eCommerce store. We ensure the money is safe and the commitment is real. Product quality and delivery are the responsibility of your chosen vendor.
             </div>
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-2 mb-4">
                <Hexagon className="h-6 w-6 text-[#A54600]" fill="currentColor" />
                <span className="font-bold text-xl text-white">Korra</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                The smart reservation limit for modern commerce.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#A54600]">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#A54600]">Refund Policy</a></li>
                <li><a href="#" className="hover:text-[#A54600]">Vendor Agreement</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>support@korra.ng</li>
                <li>+234 800 KORRA</li>
                <li>Lagos, Nigeria</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Korra Financial Services.</p>
             <div className="flex gap-4">
               {/* App Store Badges would go here */}
               <div className="text-xs border border-slate-700 rounded px-2 py-1">Download on App Store</div>
               <div className="text-xs border border-slate-700 rounded px-2 py-1">Get it on Google Play</div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}