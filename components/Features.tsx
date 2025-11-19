import React from 'react';
import { 
  Clock, 
  TrendingUp, 
  Smartphone
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { month: 'Month 1', leads: 20 },
  { month: 'Month 2', leads: 45 },
  { month: 'Month 3', leads: 85 },
  { month: 'Month 4', leads: 130 },
  { month: 'Month 5', leads: 200 },
  { month: 'Month 6', leads: 350 },
];

export const Features: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why African Businesses Need Automation</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            With mobile usage skyrocketing across the continent, your customers expect instant responses. Don't leave them waiting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Features */}
          <div className="space-y-8">
             <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
                   <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">24/7 Auto-Replies</h3>
                  <p className="text-gray-600 mt-2">Never miss a customer query, even when you are sleeping. Instant greetings and FAQ answers in your local language.</p>
                </div>
             </div>

             <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                   <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Boost Sales Automatically</h3>
                  <p className="text-gray-600 mt-2">Guide customers to your product catalog or booking link instantly. Turn chats into cash.</p>
                </div>
             </div>

             <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                   <Smartphone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">No New Apps Needed</h3>
                  <p className="text-gray-600 mt-2">Everything happens right inside WhatsApp. Your customers already use it every day.</p>
                </div>
             </div>
          </div>

          {/* Chart Visualization */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 text-gray-800 text-center">Projected Lead Growth with AI Bot</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="month" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="leads" stroke="#10B981" fillOpacity={1} fill="url(#colorLeads)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span> With Bot
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-300"></span> Manual
                </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};