import { useState } from 'react';
import { Brain, Target, ShieldAlert, Sparkles, Zap, MessageSquare, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const TRENDING_THEMES = ['Artificial Intelligence', 'Semiconductors', 'Cloud Computing', 'Electric Vehicles', 'Renewable Energy', 'Cybersecurity', 'Space Economy', 'GLP-1 Drugs'];

const SENTIMENT_DATA = Array.from({ length: 30 }).map((_, i) => ({
  day: `Day ${i + 1}`,
  sentiment: 50 + Math.random() * 40 - 20,
  risk: 40 + Math.random() * 20 - 10
}));

export default function Insights() {
  const [chatInput, setChatInput] = useState('');

  return (
    <div className="bg-transparent min-h-screen pt-0 pb-12 px-0 md:px-6 text-black dark:text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center pt-4">
          <h1 className="font-scribble text-5xl md:text-6xl font-bold text-black dark:text-white mb-4 flex items-center justify-center gap-4">
            <Brain className="w-12 h-12" /> AI Insights
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto">
            Daily market intelligence, thematic analysis, and risk models generated entirely by AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Today's AI Summary */}
            <section className="bg-white dark:bg-[#1A1A1A] p-8 rounded-2xl border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              <div className="flex items-center gap-3 mb-6 border-b-2 border-black dark:border-white pb-4">
                <Sparkles className="w-6 h-6 text-[#1D4ED8] dark:text-[#3B82F6]" />
                <h2 className="text-2xl font-bold uppercase tracking-widest">State of the Market</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Overall Market Context</h3>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    The S&P 500 continues its consolidation phase above the 5,400 level. AI models detect a slight rotation out of mega-cap technology and into defensive sectors, particularly Utilities and Consumer Staples, suggesting institutions are hedging against upcoming CPI data.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Technology Sector</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      Semiconductor capital equipment providers are showing highly bullish divergences. Inference chip demand is outpacing training chip demand in the latest supply chain checks.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-rose-600 dark:text-rose-400 mb-2">Global Economy</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      European industrial production metrics missed estimates for the third consecutive month, raising the probability of an ECB rate cut in the upcoming cycle to 82%.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Predictions Grid */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" /> Algorithmic Signals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Bullish Signal</div>
                  <h3 className="font-bold mb-2">Uranium Miners (URA)</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">Unprecedented long-term contracting from tech companies for data center power.</p>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Confidence: 94%</div>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/10 p-5 rounded-xl border border-rose-200 dark:border-rose-800">
                  <div className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-2">Bearish Signal</div>
                  <h3 className="font-bold mb-2">Commercial RE (XLRE)</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">Refinancing wall approaching amid structurally lower office occupancy rates.</p>
                  <div className="text-xs font-bold text-rose-700 dark:text-rose-300">Confidence: 88%</div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">Volatility Alert</div>
                  <h3 className="font-bold mb-2">Crypto Equities</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">Options markets pricing in a 15% move for miners post-halving event stabilization.</p>
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-300">Confidence: 91%</div>
                </div>
              </div>
            </section>

            {/* Trending Themes */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" /> Capital Flow Themes
              </h2>
              <div className="flex flex-wrap gap-2">
                {TRENDING_THEMES.map(theme => (
                  <span key={theme} className="px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-full text-sm font-medium hover:border-black dark:hover:border-white cursor-pointer transition-colors">
                    {theme}
                  </span>
                ))}
              </div>
            </section>

            {/* Company Spotlight */}
            <section className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">AI Spotlight Selection</div>
                  <h2 className="text-3xl font-bold">CrowdStrike (CRWD)</h2>
                </div>
                <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold rounded-lg text-sm">
                  Strong Buy
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Why it's selected</h4>
                  <p className="text-zinc-600 dark:text-zinc-300">Our NLP models detected a 300% increase in enterprise intent to consolidate security vendors onto a single platform. CrowdStrike's Falcon platform is the primary beneficiary of this consolidation trend.</p>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Key Risk</h4>
                  <p className="text-zinc-600 dark:text-zinc-300">Valuation premium. At 20x forward sales, the stock requires flawless execution and zero deceleration in ARR growth metrics to maintain current multiples.</p>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Ask AI Interface */}
            <section className="bg-zinc-900 text-white dark:bg-white dark:text-black rounded-2xl p-6 shadow-xl">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" /> InvestIQ Copilot
              </h2>
              <div className="bg-black/50 dark:bg-zinc-100 p-4 rounded-xl mb-4 h-48 overflow-y-auto font-mono text-sm space-y-4">
                <div className="text-zinc-400">Ask a question to begin...</div>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Why is NVDA dropping?" 
                  className="w-full bg-transparent border-2 border-zinc-700 dark:border-zinc-300 rounded-lg p-3 pr-12 text-sm focus:outline-none focus:border-white dark:focus:border-black transition-colors"
                />
                <button className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-white text-black dark:bg-black dark:text-white rounded-md">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-white/10 dark:bg-black/5 rounded">Explain Inflation</button>
                <button className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-white/10 dark:bg-black/5 rounded">Buy AAPL?</button>
              </div>
            </section>

            {/* AI Sentiment Trend Chart */}
            <section className="bg-white dark:bg-[#1A1A1A] p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6">Market Sentiment vs Risk</h2>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SENTIMENT_DATA}>
                    <XAxis dataKey="day" hide />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', color: 'white', border: 'none', borderRadius: '8px' }} />
                    <Line type="monotone" name="Bull Sentiment" dataKey="sentiment" stroke="#10b981" strokeWidth={2} dot={false} />
                    <Line type="monotone" name="Systemic Risk" dataKey="risk" stroke="#f43f5e" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Top Macro Risks */}
            <section className="bg-white dark:bg-[#1A1A1A] p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <ShieldAlert className="w-5 h-5" /> Active Macro Risks
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-sm">Sticky Services Inflation</h4>
                    <p className="text-xs text-zinc-500">Delaying anticipated rate cuts until Q4.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-sm">Consumer Credit Defaults</h4>
                    <p className="text-xs text-zinc-500">Auto and credit card delinquencies approaching 2008 levels.</p>
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
