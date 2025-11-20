import React, { useState, useEffect } from 'react';
import { QrCode, BarChart3, Settings, LogOut, MessageSquare, Users, Smartphone, CheckCircle, AlertCircle, Server, Key, Wifi, Send, Save, RefreshCw, UploadCloud } from 'lucide-react';
import { BotConfig } from '../types';
import { testWhatsAppConnection, sendWhatsAppText, updateBusinessProfile } from '../services/whatsapp';

interface ClientPortalProps {
  onLogout: () => void;
  generatedConfig: BotConfig | null;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({ onLogout, generatedConfig }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'connect' | 'settings'>('overview');
  const [isScanning, setIsScanning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState<'qr' | 'api'>('api');
  
  // API State
  const [phoneNumberId, setPhoneNumberId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [testNumber, setTestNumber] = useState('');
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  // Message Testing State
  const [testMessage, setTestMessage] = useState('');
  const [isSendingMsg, setIsSendingMsg] = useState(false);

  // Settings Sync State
  const [isSyncingProfile, setIsSyncingProfile] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Load saved credentials on mount
  useEffect(() => {
    const savedId = localStorage.getItem('wa_phone_id');
    const savedToken = localStorage.getItem('wa_token');
    if (savedId) setPhoneNumberId(savedId);
    if (savedToken) setAccessToken(savedToken);
    
    // Pre-fill test message with bot welcome message if available
    if (generatedConfig) {
        setTestMessage(generatedConfig.welcomeMessage);
    } else {
        setTestMessage("Hello! This is a test message from your AfricaBot.");
    }
  }, [generatedConfig]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation: Any code ending in "123" works, or "DEMO"
    if (accessCode.length > 3) {
        setIsAuthenticated(true);
    } else {
        alert("Please enter a valid access code provided by support.");
    }
  };

  const simulateConnection = () => {
      setIsScanning(true);
      setTimeout(() => {
          setIsScanning(false);
          setIsConnected(true);
      }, 3000);
  };

  const handleApiConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiLoading(true);
    setApiError(null);
    setApiSuccess(null);

    try {
      if (!phoneNumberId || !accessToken || !testNumber) {
        throw new Error("Please fill in all fields.");
      }

      // Attempt to send a template message via Meta API
      await testWhatsAppConnection(
        { phoneNumberId, accessToken },
        testNumber
      );

      setIsConnected(true);
      setApiSuccess("Success! Connected to WhatsApp Servers. You can now send live messages.");
      
      // Persist credentials
      localStorage.setItem('wa_phone_id', phoneNumberId);
      localStorage.setItem('wa_token', accessToken);

    } catch (err: any) {
      setApiError(err.message);
      setIsConnected(false);
    } finally {
      setApiLoading(false);
    }
  };

  const handleSendLiveMessage = async () => {
    if (!testMessage || !testNumber) return;
    
    setIsSendingMsg(true);
    setApiError(null);
    setApiSuccess(null);

    try {
        await sendWhatsAppText(
            { phoneNumberId, accessToken },
            testNumber,
            testMessage
        );
        setApiSuccess("Message sent successfully via Cloud API!");
    } catch (err: any) {
        setApiError(err.message);
    } finally {
        setIsSendingMsg(false);
    }
  };

  const handleSyncProfile = async () => {
    if (!generatedConfig || !phoneNumberId || !accessToken) {
        alert("Please ensure you are connected to the API and have a generated bot config.");
        return;
    }

    setIsSyncingProfile(true);
    setSyncStatus('idle');
    
    try {
        await updateBusinessProfile(
            { phoneNumberId, accessToken },
            {
                description: generatedConfig.welcomeMessage.substring(0, 256), // WhatsApp limit for description
                about: `Official WhatsApp Account for ${generatedConfig.businessName}`,
                email: "support@africabot.ai",
                vertical: "OTHER"
            }
        );
        setSyncStatus('success');
    } catch (err) {
        console.error(err);
        setSyncStatus('error');
    } finally {
        setIsSyncingProfile(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-20">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
          <div className="text-center mb-8">
             <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <Smartphone size={32} />
             </div>
             <h2 className="text-2xl font-bold text-gray-900">Client Access</h2>
             <p className="text-gray-500 mt-2">Enter the Access Code provided in your payment confirmation email.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Access Code</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g., BOT-8392-X"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                />
            </div>
            <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors">
                Access Dashboard
            </button>
          </form>
          <div className="mt-6 text-center">
             <p className="text-xs text-gray-400">Protected Area. Authorized Clients Only.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
        <div className="container mx-auto px-4">
            {/* Dashboard Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        B
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            {generatedConfig?.businessName || 'My Business Bot'}
                        </h1>
                        <div className="flex items-center gap-2 text-sm">
                            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                            <span className="text-gray-500">{isConnected ? 'Online & Active' : 'Pending Connection'}</span>
                        </div>
                    </div>
                </div>
                <button onClick={onLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-50">
                    <LogOut size={18} /> Sign Out
                </button>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <nav className="flex flex-col p-2">
                            <button 
                                onClick={() => setActiveTab('overview')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <BarChart3 size={20} /> Overview
                            </button>
                            <button 
                                onClick={() => setActiveTab('connect')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'connect' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Wifi size={20} /> Connect Device
                            </button>
                            <button 
                                onClick={() => setActiveTab('settings')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Settings size={20} /> Bot Settings
                            </button>
                        </nav>
                    </div>
                    
                    {/* Support Card */}
                    <div className="bg-blue-50 rounded-xl p-5 mt-4 border border-blue-100">
                        <h3 className="font-bold text-blue-900 text-sm mb-2">Need Help?</h3>
                        <p className="text-xs text-blue-700 mb-3">Contact your bot manager for urgent changes.</p>
                        <button className="w-full bg-white text-blue-600 text-xs font-bold py-2 rounded border border-blue-200 hover:bg-blue-50">Contact Support</button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><MessageSquare size={20}/></div>
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+12%</span>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900">1,240</div>
                                    <div className="text-sm text-gray-500 mt-1">Auto-Replies Sent</div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Users size={20}/></div>
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">+5%</span>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900">85</div>
                                    <div className="text-sm text-gray-500 mt-1">New Leads Captured</div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Smartphone size={20}/></div>
                                        <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">Active</span>
                                    </div>
                                    <div className="text-xl font-bold text-gray-900">24h 12m</div>
                                    <div className="text-sm text-gray-500 mt-1">Uptime</div>
                                </div>
                            </div>

                            {!isConnected && (
                                <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl flex items-start gap-4">
                                    <AlertCircle className="text-orange-500 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-orange-800">WhatsApp Not Connected</h3>
                                        <p className="text-sm text-orange-700 mt-1">Your bot is currently offline. Please go to the "Connect Device" tab.</p>
                                        <button onClick={() => setActiveTab('connect')} className="mt-3 text-sm font-bold text-orange-700 underline">Connect Now</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'connect' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Connect WhatsApp</h2>
                                {isConnected && <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Connected</span>}
                            </div>

                            {isConnected ? (
                                <div className="space-y-8">
                                    <div className="flex flex-col items-center justify-center py-8 border-b border-gray-100">
                                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-4 animate-in zoom-in duration-500">
                                            <CheckCircle size={32} />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">System Online</h3>
                                        <p className="text-gray-500 text-sm mt-1 text-center max-w-md">
                                            Connected via {connectionMethod === 'api' ? 'Cloud API' : 'Linked Device'}.
                                        </p>
                                        <button 
                                            onClick={() => {
                                                setIsConnected(false);
                                                setApiSuccess(null);
                                                localStorage.removeItem('wa_phone_id');
                                                localStorage.removeItem('wa_token');
                                                setPhoneNumberId('');
                                                setAccessToken('');
                                            }}
                                            className="mt-4 text-red-500 text-xs hover:underline"
                                        >
                                            Disconnect & Clear Credentials
                                        </button>
                                    </div>

                                    {/* Live Test Section */}
                                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <Send size={18} className="text-emerald-600" />
                                                <h3 className="font-bold text-gray-900">Live Message Tester</h3>
                                            </div>
                                            {generatedConfig && (
                                                <button 
                                                    onClick={() => setTestMessage(generatedConfig.welcomeMessage)}
                                                    className="text-xs flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium px-2 py-1 bg-emerald-50 rounded border border-emerald-200"
                                                >
                                                    <RefreshCw size={12} /> Load Bot Welcome Msg
                                                </button>
                                            )}
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Recipient Phone</label>
                                                <input 
                                                    type="tel" 
                                                    value={testNumber}
                                                    onChange={(e) => setTestNumber(e.target.value)}
                                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
                                                    placeholder="e.g. 15551234567"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Message Body</label>
                                                <textarea 
                                                    value={testMessage}
                                                    onChange={(e) => setTestMessage(e.target.value)}
                                                    rows={3}
                                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-mono text-xs"
                                                />
                                            </div>

                                            {apiSuccess && (
                                                <div className="p-3 bg-emerald-50 text-emerald-700 text-sm rounded-lg flex items-center gap-2">
                                                    <CheckCircle size={16} />
                                                    {apiSuccess}
                                                </div>
                                            )}
                                            
                                            {apiError && (
                                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                                    <AlertCircle size={16} />
                                                    {apiError}
                                                </div>
                                            )}

                                            <button 
                                                onClick={handleSendLiveMessage}
                                                disabled={isSendingMsg}
                                                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50"
                                            >
                                                {isSendingMsg ? 'Sending...' : 'Send Test Message'}
                                                <Send size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {/* Connection Method Toggle */}
                                    <div className="flex p-1 bg-gray-100 rounded-lg mb-8">
                                        <button 
                                            onClick={() => setConnectionMethod('qr')}
                                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${connectionMethod === 'qr' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
                                        >
                                            Scan QR Code
                                        </button>
                                        <button 
                                            onClick={() => setConnectionMethod('api')}
                                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${connectionMethod === 'api' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
                                        >
                                            Cloud API (Server)
                                        </button>
                                    </div>

                                    {connectionMethod === 'qr' ? (
                                        <div className="grid md:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-left-4 duration-300">
                                            <div className="space-y-6">
                                                <h4 className="font-bold text-gray-900">Option 1: Web Connection</h4>
                                                <div className="flex gap-4">
                                                    <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                                                    <p className="text-gray-700 pt-1">Open WhatsApp on your phone.</p>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                                                    <p className="text-gray-700 pt-1">Tap <strong>Linked Devices</strong>.</p>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                                                    <p className="text-gray-700 pt-1">Tap <strong>Link a Device</strong> and scan.</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col items-center justify-center bg-gray-50 p-8 rounded-2xl border border-gray-200">
                                                {isScanning ? (
                                                    <div className="w-48 h-48 flex items-center justify-center relative">
                                                        <div className="w-full h-full border-4 border-emerald-500 rounded-lg absolute animate-ping opacity-20"></div>
                                                        <div className="text-emerald-600 font-semibold animate-pulse">Linking...</div>
                                                    </div>
                                                ) : (
                                                    <div className="bg-white p-4 shadow-lg rounded-lg cursor-pointer group" onClick={simulateConnection}>
                                                        <div className="w-48 h-48 bg-gray-900 grid grid-cols-6 grid-rows-6 gap-1 p-2 relative overflow-hidden">
                                                            {[...Array(36)].map((_, i) => (
                                                                <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                                                            ))}
                                                            <div className="absolute inset-0 flex items-center justify-center bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <span className="font-bold text-slate-900">Click to Scan</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm flex items-start gap-3">
                                                <Server size={18} className="mt-0.5 shrink-0" />
                                                <div>
                                                    <strong>Official Server Connection:</strong> Use credentials from the Meta for Developers Dashboard (WhatsApp &gt; API Setup).
                                                </div>
                                            </div>

                                            <form onSubmit={handleApiConnect} className="space-y-6 max-w-lg mx-auto">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number ID</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                        placeholder="e.g. 10083928475123"
                                                        value={phoneNumberId}
                                                        onChange={e => setPhoneNumberId(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Temporary or Permanent Access Token</label>
                                                    <div className="relative">
                                                        <input 
                                                            type="password" 
                                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none pl-10"
                                                            placeholder="EAAG..."
                                                            value={accessToken}
                                                            onChange={e => setAccessToken(e.target.value)}
                                                        />
                                                        <Key size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Verify Connection (Sends 'Hello World' Template)</label>
                                                    <input 
                                                        type="tel" 
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                        placeholder="Your Phone Number (with Country Code)"
                                                        value={testNumber}
                                                        onChange={e => setTestNumber(e.target.value)}
                                                    />
                                                    <p className="text-xs text-gray-400 mt-1">This number must be added to your Meta 'Test Numbers' list if using a trial account.</p>
                                                </div>

                                                {apiError && (
                                                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                                        <AlertCircle size={16} />
                                                        {apiError}
                                                    </div>
                                                )}

                                                <button 
                                                    type="submit"
                                                    disabled={apiLoading}
                                                    className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                                >
                                                    {apiLoading ? 'Verifying...' : (
                                                        <>
                                                            <Save size={18} />
                                                            Verify & Connect
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                             <div className="text-center mb-8">
                                <Settings size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900">Bot Configuration</h3>
                                <p className="text-gray-500 mt-2">View and sync your AI generated business details.</p>
                             </div>
                             
                             {generatedConfig ? (
                                 <div className="space-y-6">
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <h4 className="font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Current Configuration</h4>
                                        <div className="grid gap-4 text-sm">
                                            <div>
                                                <span className="font-semibold text-gray-600 block mb-1">Business Name</span>
                                                <div className="bg-white p-2 rounded border border-gray-200">{generatedConfig.businessName}</div>
                                            </div>
                                            <div>
                                                <span className="font-semibold text-gray-600 block mb-1">Welcome Message</span>
                                                <div className="bg-white p-2 rounded border border-gray-200 whitespace-pre-wrap h-24 overflow-y-auto">{generatedConfig.welcomeMessage}</div>
                                            </div>
                                            <div>
                                                <span className="font-semibold text-gray-600 block mb-1">Menu Options</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {generatedConfig.menuOptions.map((opt, i) => (
                                                        <span key={i} className="bg-white px-2 py-1 rounded border border-gray-200 text-xs">{opt}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {isConnected ? (
                                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                                <UploadCloud size={18} />
                                                Sync to WhatsApp Profile
                                            </h4>
                                            <p className="text-sm text-blue-700 mb-4">
                                                This will update your official WhatsApp Business "About" and "Description" fields on Meta's servers with the details above.
                                            </p>
                                            
                                            {syncStatus === 'success' && (
                                                <div className="mb-4 p-2 bg-green-100 text-green-800 text-sm rounded flex items-center gap-2">
                                                    <CheckCircle size={14} /> Profile Updated Successfully!
                                                </div>
                                            )}
                                            
                                            {syncStatus === 'error' && (
                                                <div className="mb-4 p-2 bg-red-100 text-red-800 text-sm rounded flex items-center gap-2">
                                                    <AlertCircle size={14} /> Update Failed. Check API Permissions.
                                                </div>
                                            )}

                                            <button 
                                                onClick={handleSyncProfile}
                                                disabled={isSyncingProfile}
                                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                            >
                                                {isSyncingProfile ? 'Uploading...' : 'Sync Configuration Now'}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-800 text-sm text-center">
                                            Please connect via Cloud API in the "Connect Device" tab to sync these settings to your live WhatsApp profile.
                                        </div>
                                    )}
                                 </div>
                             ) : (
                                 <div className="text-center p-8 bg-gray-50 rounded-lg text-gray-500">
                                     No bot configuration found. Please request a setup.
                                 </div>
                             )}
                         </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};