import React, { useState, useRef } from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { WhatsAppPreview } from './components/WhatsAppPreview';
import { PrivacyPolicy, TermsOfService } from './components/LegalDocs';
import { ClientPortal } from './components/ClientPortal';
import { generateBotScript } from './services/gemini';
import { BotConfig, ViewState } from './types';
import { BUSINESS_CONFIG } from './constants';
import { 
  Bot, Scissors, Truck, Utensils, Send, CheckCircle2, MessageCircle, 
  Briefcase, GraduationCap, Home, Wrench, Stethoscope, PartyPopper, Sprout, Car, Globe, AlertCircle, Copy,
  Dumbbell, Camera, Laptop, Shirt, Hammer, Scale, Sparkles, Plane, ShoppingBag, User
} from 'lucide-react';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [activeLegal, setActiveLegal] = useState<'privacy' | 'terms' | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Retail');
  const [language, setLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [botConfig, setBotConfig] = useState<BotConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Ref for scrolling to demo section
  const demoRef = useRef<HTMLDivElement>(null);

  const handleStartDemo = () => {
    setView('demo');
    setTimeout(() => {
       demoRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessName.trim()) {
        alert("Please enter a business name.");
        return;
    }
    if (!businessType) {
        alert("Please select a business type.");
        return;
    }

    setIsLoading(true);
    setBotConfig(null);
    setError(null);
    
    try {
      const config = await generateBotScript(businessName, businessType, language);
      setBotConfig(config);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyScript = () => {
    if (!botConfig) return;
    const script = `*Business:* ${botConfig.businessName} (${botConfig.businessType})
    
*Welcome Message:*
${botConfig.welcomeMessage}

*Menu Options:*
${botConfig.menuOptions.map((opt, i) => `${i+1}. ${opt}`).join('\n')}`;

    navigator.clipboard.writeText(script);
    alert("Script copied to clipboard!");
  };

  // Sales Funnel: Open WhatsApp with pre-filled message
  const handleClaimBot = () => {
    if (!botConfig) return;

    const wantsSubscription = window.confirm(
      `Would you like to add the Monthly Maintenance Plan ($${BUSINESS_CONFIG.pricing.maintenance}/mo)?\n\n` +
      "Benefits include:\n" +
      "✅ Priority Support\n" +
      "✅ Monthly Performance Reports\n" +
      "✅ Minor Menu/Content Updates\n\n" +
      "Click OK to add this plan, or Cancel for one-time setup only."
    );

    let message = `Hello! I just created a demo for *${botConfig.businessName}* (${botConfig.businessType}) on AfricaBot. I want to claim this bot and setup the service.`;
    
    if (wantsSubscription) {
      message += `\n\nI would also like to include the *Monthly Maintenance Plan ($${BUSINESS_CONFIG.pricing.maintenance} USD/mo)*.`;
    } else {
      message += `\n\nI am interested in the *One-time Setup* only.`;
    }

    const url = `https://wa.me/${BUSINESS_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Sales Funnel: Plan Inquiry
  const handlePlanSelect = (planName: string) => {
    const message = `Hello! I am interested in the *${planName}* package for my business. I will be paying in USD (or equivalent). Please help me get set up.`;
    const url = `https://wa.me/${BUSINESS_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const businessTypes = [
    { id: 'Retail', icon: ShoppingBag, label: 'Retail / Shop' },
    { id: 'Fashion', icon: Shirt, label: 'Fashion / Clothing' },
    { id: 'Salon', icon: Scissors, label: 'Beauty / Salon' },
    { id: 'Restaurant', icon: Utensils, label: 'Food / Restaurant' },
    { id: 'Delivery', icon: Truck, label: 'Delivery / Logistics' },
    { id: 'Tech', icon: Laptop, label: 'Tech / IT' },
    { id: 'Services', icon: Wrench, label: 'Services / Repairs' },
    { id: 'Construction', icon: Hammer, label: 'Construction' },
    { id: 'Consulting', icon: Briefcase, label: 'Consulting / Agency' },
    { id: 'Legal', icon: Scale, label: 'Legal / Law Firm' },
    { id: 'Education', icon: GraduationCap, label: 'Education / Tutor' },
    { id: 'RealEstate', icon: Home, label: 'Real Estate' },
    { id: 'Tourism', icon: Plane, label: 'Tourism / Travel' },
    { id: 'Healthcare', icon: Stethoscope, label: 'Health / Clinic' },
    { id: 'Fitness', icon: Dumbbell, label: 'Fitness / Gym' },
    { id: 'Events', icon: PartyPopper, label: 'Events / Party' },
    { id: 'Photography', icon: Camera, label: 'Photography' },
    { id: 'Farming', icon: Sprout, label: 'Farming / Agri' },
    { id: 'Automotive', icon: Car, label: 'Auto / Mechanic' },
    { id: 'Cleaning', icon: Sparkles, label: 'Cleaning Services' },
  ];

  const languages = [
    'English', 'French', 'Portuguese', 'Swahili', 'Arabic', 
    'Hausa', 'Yoruba', 'Igbo', 'Zulu', 'Xhosa', 
    'Shona', 'Tswana', 'Amharic', 'Oromo', 'Somali', 
    'Kinyarwanda', 'Lingala', 'Wolof', 'Afrikaans'
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Legal Modals */}
      {activeLegal === 'privacy' && <PrivacyPolicy onClose={() => setActiveLegal(null)} />}
      {activeLegal === 'terms' && <TermsOfService onClose={() => setActiveLegal(null)} />}

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-whatsapp-teal font-bold text-xl cursor-pointer" onClick={() => setView('landing')}>
            <Bot size={28} />
            <span>{BUSINESS_CONFIG.appName}<span className="text-gray-400 font-normal">.ai</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
             <a href="#" onClick={(e) => { e.preventDefault(); setView('landing'); }} className="hover:text-whatsapp-teal">Home</a>
             <a href="#features" className="hover:text-whatsapp-teal">Features</a>
             <a href="#pricing" className="hover:text-whatsapp-teal">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('login')}
              className="text-gray-600 hover:text-whatsapp-teal font-medium text-sm flex items-center gap-1 px-3 py-2"
            >
              <User size={16} />
              <span className="hidden sm:inline">Client Login</span>
            </button>
            <button 
               onClick={handleStartDemo}
               className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {view === 'login' || view === 'dashboard' ? (
            <ClientPortal 
              onLogout={() => setView('landing')} 
              generatedConfig={botConfig}
            />
        ) : view === 'landing' ? (
          <div className="pt-16">
            <Hero onStartDemo={handleStartDemo} />
            <div id="features">
              <Features />
            </div>
            <Pricing onPlanSelect={handlePlanSelect} />
            <Testimonials />
            
            {/* Footer CTA */}
            <section className="bg-whatsapp-teal py-16 text-white text-center">
               <div className="container mx-auto px-4">
                  <h2 className="text-3xl font-bold mb-6">Ready to Automate Your Business?</h2>
                  <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">Join hundreds of African businesses saving time and making more money with WhatsApp automation.</p>
                  <button onClick={handleStartDemo} className="bg-white text-whatsapp-teal font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                    Create Your Bot Now
                  </button>
               </div>
            </section>
          </div>
        ) : (
          <div ref={demoRef} className="min-h-screen bg-slate-50 py-12 pt-28">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                   <button onClick={() => setView('landing')} className="text-sm text-gray-500 hover:text-whatsapp-teal mb-4">← Back to Home</button>
                   <h2 className="text-3xl font-bold text-gray-900">Build Your Bot Preview</h2>
                   <p className="text-gray-500 mt-2">See exactly how your business will look on WhatsApp.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Form Side */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                     <form onSubmit={handleGenerate} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                          <input 
                            type="text" 
                            required
                            value={businessName}
                            onChange={(e) => {
                              setBusinessName(e.target.value);
                              setError(null);
                            }}
                            placeholder="e.g., Nairobi Coffee House"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-whatsapp-teal focus:ring-2 focus:ring-whatsapp-teal/20 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                          <div className="relative">
                            <select 
                              value={language}
                              onChange={(e) => {
                                setLanguage(e.target.value);
                                setError(null);
                              }}
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-whatsapp-teal focus:ring-2 focus:ring-whatsapp-teal/20 outline-none transition-all appearance-none bg-white"
                            >
                              {languages.map(lang => (
                                <option key={lang} value={lang}>{lang}</option>
                              ))}
                            </select>
                            <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Type <span className="text-gray-400 font-normal">(Select one)</span>
                          </label>
                          <div className="grid grid-cols-3 gap-2 md:grid-cols-3">
                             {businessTypes.map((type) => {
                               const isSelected = businessType === type.id;
                               return (
                               <button
                                 key={type.id}
                                 type="button"
                                 onClick={() => {
                                  setBusinessType(type.id);
                                  setError(null);
                                 }}
                                 className={`relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 group min-h-[90px]
                                   ${isSelected 
                                     ? 'border-whatsapp-teal bg-emerald-50 text-whatsapp-teal shadow-md scale-105 z-10 ring-1 ring-emerald-100' 
                                     : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-white hover:border-whatsapp-teal/30 hover:shadow-md hover:-translate-y-0.5'}`}
                               >
                                  {isSelected && (
                                    <div className="absolute top-1 right-1 text-whatsapp-teal animate-in fade-in zoom-in duration-300">
                                      <CheckCircle2 size={14} className="fill-white" />
                                    </div>
                                  )}
                                  <type.icon 
                                    size={22} 
                                    strokeWidth={isSelected ? 2.5 : 2}
                                    className={`mb-2 transition-all duration-300 ease-out
                                      ${isSelected 
                                        ? 'scale-110 -translate-y-1 drop-shadow-sm' 
                                        : 'group-hover:scale-125 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:text-whatsapp-teal'}`} 
                                  />
                                  <span className={`text-[10px] font-bold text-center leading-tight transition-colors duration-200 ${isSelected ? 'text-emerald-800' : 'text-gray-500 group-hover:text-gray-800'}`}>{type.label}</span>
                               </button>
                               );
                             })}
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          disabled={isLoading || !businessName}
                          className="w-full bg-whatsapp-teal text-white font-bold py-4 rounded-xl hover:bg-whatsapp-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-whatsapp-teal/20"
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                               Generating AI Magic...
                            </span>
                          ) : (
                            <>
                             <Send size={18} /> Generate Preview
                            </>
                          )}
                        </button>

                        {error && (
                          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-start gap-3 animate-in slide-in-from-top-2">
                            <AlertCircle size={18} className="mt-0.5 shrink-0" />
                            <div>
                              <p className="font-semibold">Generation Failed</p>
                              <p>{error}</p>
                            </div>
                          </div>
                        )}
                     </form>
                     
                     {botConfig && (
                        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100 animate-in slide-in-from-bottom-4 fade-in duration-500">
                           <h4 className="font-bold text-blue-900 mb-2">Like what you see?</h4>
                           <p className="text-sm text-blue-700 mb-4">We can deploy this exact bot for your business number within 24 hours.</p>
                           <div className="flex flex-col gap-3">
                               <button 
                                  onClick={handleClaimBot}
                                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                               >
                                 <MessageCircle size={18} />
                                 Claim This Bot (${BUSINESS_CONFIG.pricing.starter} USD)
                               </button>
                               
                               <button 
                                  onClick={handleCopyScript}
                                  className="w-full bg-white text-blue-600 border border-blue-200 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                               >
                                 <Copy size={18} />
                                 Copy Script to Clipboard
                               </button>
                           </div>
                           <p className="text-xs text-center text-blue-400 mt-3">Pay securely via Card/Bank. Clicking opens WhatsApp.</p>
                        </div>
                     )}
                  </div>

                  {/* Preview Side */}
                  <div className="flex justify-center lg:sticky lg:top-24">
                     <div className="relative">
                        {/* Decorative elements behind phone */}
                        <div className="absolute -left-12 top-20 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute -right-12 top-20 w-24 h-24 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        <WhatsAppPreview config={botConfig} isLoading={isLoading} />
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-gray-800 py-12 text-sm text-gray-400">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-2 text-white font-bold text-xl">
                <Bot size={24} className="text-whatsapp-teal"/>
                <span>{BUSINESS_CONFIG.appName}<span className="text-gray-500 font-normal">.ai</span></span>
             </div>
             <div className="text-center md:text-right">
                <p className="mb-2">&copy; 2025 {BUSINESS_CONFIG.appName} Solutions.</p>
                <p className="text-xs text-gray-500">Built with ❤️ in Africa by Ian Tshakalisa</p>
             </div>
           </div>
           <div className="border-t border-gray-800 mt-8 pt-8 flex justify-center gap-8 text-xs">
             <button onClick={() => setActiveLegal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
             <button onClick={() => setActiveLegal('terms')} className="hover:text-white transition-colors">Terms of Service</button>
             <button onClick={() => setView('login')} className="hover:text-white transition-colors">Client Portal</button>
             <a href={`https://wa.me/${BUSINESS_CONFIG.phoneNumber}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Contact Developer</a>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;