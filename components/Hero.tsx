import React from 'react';
import { MessageCircle, Zap, Globe } from 'lucide-react';

interface HeroProps {
  onStartDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartDemo }) => {
  return (
    <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-whatsapp-light opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-300 flex items-center gap-2">
              <Globe size={14} /> Now Available Across Africa
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Automate Your Business on <span className="text-whatsapp-light">WhatsApp</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            The smartest way for African businesses to handle customers. Instant replies, easy bookings, and 24/7 support—powered by AI. Works with any language.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onStartDemo}
              className="bg-whatsapp-light hover:bg-whatsapp-teal text-slate-900 font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-whatsapp-light/20"
            >
              <MessageCircle size={20} />
              Try Bot Demo Free
            </button>
            <a href="#pricing" className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl backdrop-blur-sm transition-all flex items-center justify-center gap-2">
              <Zap size={20} />
              View Pricing in USD
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-center items-center gap-8 text-gray-400 text-sm">
             <span>Trusted by 100+ African Businesses</span>
             <div className="flex gap-4 opacity-60 grayscale">
                {/* Placeholder for logos */}
                <span className="font-bold text-lg">Salons</span>
                <span className="font-bold text-lg">Retail</span>
                <span className="font-bold text-lg">Logistics</span>
                <span className="font-bold text-lg">Real Estate</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};