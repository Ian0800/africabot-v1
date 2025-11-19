import React from 'react';
import { Check, CreditCard } from 'lucide-react';
import { PricingTier } from '../types';

interface PricingProps {
  onPlanSelect: (planName: string) => void;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "49",
    features: [
      "Custom Welcome Message",
      "Basic FAQ Menu (Up to 3)",
      "Business Profile Setup",
      "Email Support"
    ]
  },
  {
    name: "Pro Business",
    price: "99",
    features: [
      "Advanced AI Responses",
      "Booking/Order Links",
      "Full Product Catalog Menu",
      "Priority WhatsApp Support",
      "Monthly Performance Report"
    ],
    recommended: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "CRM Integration",
      "Multiple Agent Access",
      "Payment Gateway Link",
      "Dedicated Account Manager",
      "24/7 Priority Support"
    ]
  }
];

export const Pricing: React.FC<PricingProps> = ({ onPlanSelect }) => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600">One-time setup fees in USD. Pay securely from anywhere in Africa.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className={`relative bg-slate-50 rounded-2xl shadow-xl overflow-hidden transition-transform hover:-translate-y-1 border ${tier.recommended ? 'border-whatsapp-light ring-4 ring-whatsapp-light/10' : 'border-gray-100'}`}
            >
              {tier.recommended && (
                <div className="absolute top-0 right-0 bg-whatsapp-light text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-6">
                  {tier.price === "Custom" ? (
                    <span className="text-4xl font-extrabold text-gray-900">Custom</span>
                  ) : (
                    <>
                      <span className="text-gray-500 text-lg font-medium mr-1">$</span>
                      <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                      <span className="text-gray-500 ml-1">USD</span>
                    </>
                  )}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="bg-emerald-100 text-emerald-600 rounded-full p-1 mr-3 mt-0.5">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => onPlanSelect(tier.name)}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    tier.recommended 
                      ? 'bg-whatsapp-teal text-white hover:bg-whatsapp-dark' 
                      : tier.name === 'Enterprise'
                        ? 'bg-slate-800 text-white hover:bg-slate-700'
                        : 'bg-white text-slate-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
              
              {tier.price !== "Custom" && (
                  <div className="bg-white/50 px-8 py-4 border-t border-gray-100 flex flex-col gap-2">
                      <p className="text-xs text-gray-500 text-center">
                          Optional maintenance: <span className="font-bold text-gray-700">$19/mo</span>
                      </p>
                      <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                          <CreditCard size={10} />
                          Pay via Card, Mobile Money, or Bank Transfer
                      </p>
                  </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};