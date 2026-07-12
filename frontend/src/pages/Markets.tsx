import { useMockTickerData, MOCK_SECTORS, MOCK_MOVERS } from '../services/mockData';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, Globe, TrendingUp, TrendingDown, Calendar, AlertTriangle } from 'lucide-react';

export default function Markets() {
  const tickers = useMockTickerData();

  return (
    <div className="bg-transparent min-h-screen pt-0 pb-12 px-0 md:px-6 text-black dark:text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center pt-4">
          <h1 className="font-scribble text-5xl md:text-6xl font-bold text-black dark:text-white mb-4">Market Overview</h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto">
            Real-time global market performance powered by AI.
          </p>
        </div>

        {/* Top Market Cards (Ticker Strip) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.values(tickers).slice(0, 10).map((ticker) => {
            const isPositive = ticker.change >= 0;
            const colorClass = isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400';
            const bgColorClass = isPositive ? 'bg-emerald-100 dark:bg-emerald-900/20' : 'bg-rose-100 dark:bg-rose-900/20';

            return (
              <div key={ticker.symbol} className="bg-white dark:bg-[#1A1A1A] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-sm">{ticker.symbol}</h3>
                    <p className="text-xs text-zinc-500 truncate max-w-[80px]">{ticker.name}</p>
                  </div>
                  <div className={`p-1 rounded ${bgColorClass}`}>
                    {isPositive ? <ArrowUpRight className={`w-3 h-3 ${colorClass}`} /> : <ArrowDownRight className={`w-3 h-3 ${colorClass}`} />}
                  </div>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-mono font-bold text-lg">{ticker.price.toFixed(2)}</div>
                    <div className={`text-xs font-bold ${colorClass}`}>
                      {isPositive ? '+' : ''}{ticker.change.toFixed(2)} ({ticker.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                  
                  {/* Mini Sparkline */}
                  <div className="w-16 h-8 opacity-60 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ticker.sparkline}>
                        <Line type="monotone" dataKey="value" stroke={isPositive ? '#10b981' : '#f43f5e'} strokeWidth={2} dot={false} isAnimationActive={false} />
                        <YAxis domain={['dataMin', 'dataMax']} hide />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Global Markets Map Placeholder */}
            <section className="bg-white dark:bg-[#1A1A1A] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <Globe className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold">Global Markets</h2>
              </div>
              <div className="relative w-full h-[300px] bg-zinc-50 dark:bg-[#121212] rounded-xl flex items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-700 overflow-hidden">
                <div className="absolute inset-0 opacity-20 dark:opacity-40" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'grid\' width=\'40\' height=\'40\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 40 0 L 0 0 0 40\' fill=\'none\' stroke=\'%23000\' stroke-width=\'0.5\' stroke-opacity=\'0.5\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23grid)\'/%3E%3C/svg%3E")' }}></div>
                <div className="text-center z-10 p-6 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <Globe className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                  <p className="font-bold">Interactive Heatmap Available in Pro</p>
                  <p className="text-sm text-zinc-500">Live data streaming for US, EMEA, and APAC.</p>
                </div>
              </div>
            </section>

            {/* Sector Performance Grid */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#1D4ED8]" /> Sector Performance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_SECTORS.slice(0, 6).map(sector => (
                  <div key={sector.name} className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm hover:border-[#1D4ED8] dark:hover:border-[#3B82F6] transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold">{sector.name}</h3>
                      <div className={`px-2 py-1 rounded text-xs font-bold ${sector.todayReturn >= 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                        {sector.todayReturn >= 0 ? '+' : ''}{sector.todayReturn}%
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2 min-h-[32px]">{sector.summary}</p>
                    <div className="flex justify-between text-xs border-t border-zinc-100 dark:border-zinc-800 pt-3">
                      <div><span className="text-zinc-500">Top:</span> <span className="font-bold text-emerald-600 dark:text-emerald-400">{sector.topStock.symbol} (+{sector.topStock.change}%)</span></div>
                      <div><span className="text-zinc-500">Worst:</span> <span className="font-bold text-rose-600 dark:text-rose-400">{sector.worstStock.symbol} ({sector.worstStock.change}%)</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Sidebar Column */}
          <div className="space-y-8">
            
            {/* AI Market Summary */}
            <section className="bg-black text-white dark:bg-white dark:text-black rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Activity className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-[#1D4ED8] dark:text-[#3B82F6]">
                  <Activity className="w-5 h-5 animate-pulse" />
                  <h2 className="font-bold tracking-widest text-sm uppercase">AI Market Summary</h2>
                </div>
                <p className="text-sm leading-relaxed opacity-90 mb-4">
                  Tech mega-caps are driving index gains today amid heavy options volume, while energy and real estate lag due to sticky inflation data. Market breadth remains narrow, suggesting caution for small-cap exposure in the short term.
                </p>
                <div className="flex items-center justify-between text-xs font-bold border-t border-white/20 dark:border-black/20 pt-4">
                  <span>Sentiment: BULLISH</span>
                  <span className="px-2 py-1 bg-white/20 dark:bg-black/10 rounded">Score: 78/100</span>
                </div>
              </div>
            </section>

            {/* Top Gainers */}
            <section className="bg-white dark:bg-[#1A1A1A] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-5 h-5" /> Top Gainers
              </h2>
              <div className="space-y-4">
                {MOCK_MOVERS.gainers.map(stock => (
                  <div key={stock.symbol} className="flex items-center justify-between group cursor-pointer">
                    <div>
                      <div className="font-bold">{stock.symbol}</div>
                      <div className="text-xs text-zinc-500">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold">${stock.price.toFixed(2)}</div>
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+{stock.change}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Top Losers */}
            <section className="bg-white dark:bg-[#1A1A1A] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <TrendingDown className="w-5 h-5" /> Top Losers
              </h2>
              <div className="space-y-4">
                {MOCK_MOVERS.losers.map(stock => (
                  <div key={stock.symbol} className="flex items-center justify-between group cursor-pointer">
                    <div>
                      <div className="font-bold">{stock.symbol}</div>
                      <div className="text-xs text-zinc-500">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold">${stock.price.toFixed(2)}</div>
                      <div className="text-xs font-bold text-rose-600 dark:text-rose-400">{stock.change}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Economic Calendar */}
            <section className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-zinc-400" /> Economic Calendar
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <div>
                    <div className="font-bold text-rose-600">CPI Inflation Data</div>
                    <div className="text-xs text-zinc-500">Tomorrow, 8:30 AM EST</div>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                </div>
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <div>
                    <div className="font-bold text-amber-600">FOMC Rate Decision</div>
                    <div className="text-xs text-zinc-500">Wed, 2:00 PM EST</div>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold">Initial Jobless Claims</div>
                    <div className="text-xs text-zinc-500">Thu, 8:30 AM EST</div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
