import React from 'react';
import { X } from 'lucide-react';

interface LegalProps {
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<LegalProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
        <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-200 rounded-full">
          <X size={24} />
        </button>
      </div>
      <div className="p-8 overflow-y-auto prose prose-slate text-sm text-gray-600 leading-relaxed">
        <p className="font-bold text-gray-900">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">1. Information We Collect</h3>
        <p>We collect information you provide directly to us, such as your business name, phone number, and business details when you generate a bot script or request our services. We do not store credit card information; payments are processed via secure third-party gateways.</p>
        
        <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">2. How We Use Your Information</h3>
        <p>We use your information to:</p>
        <ul className="list-disc pl-5 space-y-1">
            <li>Create, configure, and deploy your WhatsApp chatbot.</li>
            <li>Communicate with you about your service status and updates.</li>
            <li>Improve our AI models and service offerings.</li>
        </ul>
        
        <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">3. Data Security</h3>
        <p>We implement appropriate security measures to protect your personal information. Your WhatsApp chats are end-to-end encrypted by WhatsApp itself. We do not share your business data with third parties for marketing purposes.</p>
        
        <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">4. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us via the developer contact link in the website footer.</p>
      </div>
      <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end">
         <button onClick={onClose} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">Close</button>
      </div>
    </div>
  </div>
);

export const TermsOfService: React.FC<LegalProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
        <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-200 rounded-full">
          <X size={24} />
        </button>
      </div>
      <div className="p-8 overflow-y-auto prose prose-slate text-sm text-gray-600 leading-relaxed">
        <p className="font-bold text-gray-900">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">1. Acceptance of Terms</h3>
        <p>By accessing and using AfricaBot AI, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">2. Description of Service</h3>
        <p>AfricaBot AI provides WhatsApp chatbot automation setup services. We use artificial intelligence to generate scripts and configure third-party tools. We are an independent service provider and are not directly affiliated with Meta Platforms, Inc. or WhatsApp LLC.</p>
        
        <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">3. User Conduct</h3>
        <p>You agree not to use the service for any unlawful purpose, including but not limited to transmitting spam, scams, or unsolicited bulk messages. We reserve the right to terminate services for businesses found violating WhatsApp's Commerce Policy.</p>
        
        <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">4. Payments and Refunds</h3>
        <p>Setup fees are one-time payments. Monthly maintenance fees are billed on a recurring basis. Refunds are handled on a case-by-case basis within 7 days of service deployment if the bot fails to function as described.</p>
      </div>
      <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end">
         <button onClick={onClose} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">Close</button>
      </div>
    </div>
  </div>
);