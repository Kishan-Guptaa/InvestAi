import { useState } from 'react';
import { MOCK_PORTFOLIO_HOLDINGS, generatePortfolioHistory } from '../services/mockData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Wallet, TrendingUp, ShieldCheck, Activity, Download, AlertCircle } from 'lucide-react';

const PORTFOLIO_HISTORY = generatePortfolioHistory(30);

const ALLOCATION_DATA = [
  { name: 'Technology', value: 45, color: '#1D4ED8' },
  { name: 'Finance', value: 15, color: '#059669' },
  { name: 'Healthcare', value: 10, color: '#D97706' },
  { name: 'Crypto', value: 20, color: '#7C3AED' },
  { name: 'Cash', value: 10, color: '#52525B' },
];

export default function Portfolio() {
  const [timeframe, setTimeframe] = useState('1M');

  const totalValue = 158240.50;
  const dayGain = 1245.20;
  const totalReturn = 45210.30;
  
  return (
    <div className="bg-transparent min-h-screen pt-0 pb-12 px-0 md:px-6 text-black dark:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header / Hero */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-3 text-zinc-500 mb-2">
              <Wallet className="w-5 h-5" />
              <h1 className="font-bold uppercase tracking-widest text-sm">My Portfolio</h1>
            </div>
            <div className="text-5xl md:text-6xl font-bold tracking-tighter">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <TrendingUp className="w-4 h-4" />
                <span>+${dayGain.toLocaleString()} (Today)</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <span>+${totalReturn.toLocaleString()} (All Time)</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Total Invested</div>
            <div className="text-xl font-bold">$113,030.20</div>
          </div>
          <div className="p-4 bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Annual Return</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">18.4%</div>
          </div>
          <div className="p-4 bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Risk Score</div>
            <div className="text-xl font-bold text-amber-600 dark:text-amber-400">High (7.2)</div>
          </div>
          <div className="p-4 bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Diversification</div>
            <div className="text-xl font-bold text-rose-600 dark:text-rose-400">Poor (3.1)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Performance Chart */}
            <section className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Performance History</h2>
                <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg">
                  {['1D', '1W', '1M', '6M', '1Y', 'ALL'].map(tf => (
                    <button 
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${timeframe === tf ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-500 hover:text-black dark:hover:text-white'}`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PORTFOLIO_HISTORY}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" hide />
                    <YAxis domain={['auto', 'auto']} hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', color: 'white', border: 'none', borderRadius: '8px' }}
                      formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Value']}
                    />
                    <Area type="monotone" dataKey="value" stroke="#1D4ED8" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Holdings Table */}
            <section className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-lg font-bold">Holdings</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                    <tr>
                      <th className="p-4">Asset</th>
                      <th className="p-4">Shares</th>
                      <th className="p-4">Avg Price</th>
                      <th className="p-4">Current Price</th>
                      <th className="p-4">Today's Change</th>
                      <th className="p-4">Total P/L</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-medium">
                    {MOCK_PORTFOLIO_HOLDINGS.map(holding => {
                      const pl = (holding.currentPrice - holding.avgPrice) * holding.shares;
                      const plPercent = ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
                      return (
                        <tr key={holding.symbol} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">{holding.symbol.substring(0,2)}</div>
                            <div>
                              <div className="font-bold">{holding.symbol}</div>
                              <div className="text-xs text-zinc-500">{holding.name}</div>
                            </div>
                          </td>
                          <td className="p-4">{holding.shares}</td>
                          <td className="p-4">${holding.avgPrice.toFixed(2)}</td>
                          <td className="p-4 font-bold">${holding.currentPrice.toFixed(2)}</td>
                          <td className={`p-4 font-bold ${holding.dayChange >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                            {holding.dayChange >= 0 ? '+' : ''}{holding.dayChange}%
                          </td>
                          <td className={`p-4 font-bold ${pl >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                            ${Math.abs(pl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            <span className="text-xs ml-1 opacity-70">({plPercent.toFixed(2)}%)</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Allocation */}
            <section className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Allocation</h2>
              <div className="h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ALLOCATION_DATA}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ALLOCATION_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', color: 'white', border: 'none', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <span className="text-2xl font-bold tracking-tighter">5</span>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Assets</span>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                {ALLOCATION_DATA.map(item => (
                  <div key={item.name} className="flex justify-between items-center text-sm font-bold">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      {item.name}
                    </div>
                    <span>{item.value}%</span>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Portfolio Analysis */}
            <section className="bg-[#1D4ED8] text-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 animate-pulse text-blue-200" />
                <h2 className="font-bold tracking-widest text-sm uppercase">AI Health Check</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <h3 className="font-bold text-sm mb-1 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-amber-300" /> Overexposure Risk</h3>
                  <p className="text-xs text-blue-100">Your portfolio is highly concentrated in mega-cap technology (45%). A sector rotation could cause outsized drawdowns.</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <h3 className="font-bold text-sm mb-1 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-300" /> Profit Taking Suggestion</h3>
                  <p className="text-xs text-blue-100">NVDA is up 98% from your average cost. Consider trimming 10-15% of your position to lock in gains and redeploy to defensive sectors.</p>
                </div>
              </div>
              <button className="w-full mt-4 bg-white text-[#1D4ED8] font-bold py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                Generate Full Strategy Report
              </button>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
