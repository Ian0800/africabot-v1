import React from 'react';
import { BotConfig } from '../types';
import { Send, Phone, Video, MoreVertical, ChevronLeft } from 'lucide-react';

interface WhatsAppPreviewProps {
  config: BotConfig | null;
  isLoading: boolean;
}

export const WhatsAppPreview: React.FC<WhatsAppPreviewProps> = ({ config, isLoading }) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="w-full max-w-[320px] mx-auto bg-gray-100 rounded-[30px] shadow-2xl border-8 border-gray-800 overflow-hidden relative h-[600px] flex flex-col">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-20"></div>

      {/* Header */}
      <div className="bg-whatsapp-dark p-3 pt-8 flex items-center justify-between text-white z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <ChevronLeft size={20} />
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs overflow-hidden">
             {config ? (
                <img src={`https://picsum.photos/seed/${config.businessName}/100/100`} alt="Logo" className="w-full h-full object-cover" />
             ) : (
                <span className="text-xs">AI</span>
             )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm truncate max-w-[120px]">
              {config ? config.businessName : 'Bot Preview'}
            </span>
            <span className="text-[10px] text-gray-200">Business Account</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Video size={18} />
          <Phone size={18} />
          <MoreVertical size={18} />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-whatsapp-bg p-4 overflow-y-auto flex flex-col gap-3 relative">
        {/* Background Pattern Overlay (Optional CSS trick, keeping it simple here with color) */}
        
        {/* Date Bubble */}
        <div className="flex justify-center mb-2">
            <span className="bg-[#E1F3FB] text-gray-600 text-[10px] px-2 py-1 rounded-lg shadow-sm uppercase">
                Today
            </span>
        </div>

        {/* Security Message */}
        <div className="flex justify-center mb-4 px-4">
            <p className="text-[10px] text-center text-gray-500 bg-[#FFF5C4] p-2 rounded-lg shadow-sm border border-[#FFE8A5]">
                Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
            </p>
        </div>

        {isLoading ? (
          <div className="self-start bg-white p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-sm max-w-[80%]">
             <div className="flex gap-1">
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
             </div>
          </div>
        ) : config ? (
          <>
            <div className="self-start bg-white p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-sm max-w-[90%] text-sm text-gray-800 relative group">
               <p>{config.welcomeMessage}</p>
               <span className="text-[10px] text-gray-400 absolute bottom-1 right-2">{currentTime}</span>
            </div>

            <div className="self-start flex flex-col gap-2 max-w-[90%]">
                <div className="text-[10px] text-gray-500 ml-1 font-medium">MENU OPTIONS</div>
                {config.menuOptions.map((option, idx) => (
                     <button key={idx} className="bg-white text-whatsapp-teal font-medium py-2 px-4 rounded-lg shadow-sm text-sm border border-gray-100 text-center active:bg-gray-50 transition-colors">
                        {option}
                     </button>
                ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center px-4">
            <p className="text-sm">Enter your business details to see your AI bot in action.</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-gray-100 p-2 flex items-center gap-2 z-10">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-500">
            <span className="text-lg">+</span>
        </div>
        <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400 shadow-sm">
            Type a message
        </div>
        <div className="w-10 h-10 bg-whatsapp-teal rounded-full flex items-center justify-center text-white shadow-sm">
            <Send size={18} />
        </div>
      </div>
    </div>
  );
};