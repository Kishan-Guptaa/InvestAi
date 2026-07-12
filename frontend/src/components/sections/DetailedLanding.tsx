import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignInButton } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Search,
  ShieldCheck, Check,
  ChevronDown, MessageSquare, Activity,
  Sun, Moon, Zap, Database
} from 'lucide-react';

export const DetailedLanding: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  };

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const faqItems = [
    { q: 'How does the AI analyze companies?', a: 'We use a pipeline of LLMs to parse SEC filings, earnings transcripts, and real-time news, mapping them to strict evaluation matrices.' },
    { q: 'Is the data real-time?', a: 'Yes. Market data and latest news are fetched dynamically at the exact moment you run the analysis.' },
    { q: 'Can I export the reports?', a: 'Absolutely. Every analysis generates a structured PDF dossier and a raw JSON payload for developers.' },
    { q: 'Is this financial advice?', a: 'No. InvestIQ AI provides quantitative analysis and automated research. Always consult a certified financial advisor before trading.' }
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#2D2B2A] dark:text-[#EAE6DF] font-sans selection:bg-[#2D2B2A] selection:text-[#F2F0E9] dark:selection:bg-[#EAE6DF] dark:selection:text-[#121212]">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-[#F2F0E9] dark:bg-[#121212] border-b-[3px] border-[#2D2B2A] dark:border-white z-50 flex items-center justify-between px-6 md:px-12">
        <div className="font-black tracking-tighter text-3xl uppercase flex items-center gap-2">
          InvestIQ
          <div className="bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 text-sm border-2 border-black dark:border-white rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">AI</div>
        </div>
        <div className="hidden lg:flex items-center gap-8 font-bold text-sm tracking-widest uppercase">
          <a href="#features" className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors">Features</a>
          <a href="#api" className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors">API</a>
          <a href="#pricing" className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors">Pricing</a>
          <Link to="/legal" className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors">Trust Center</Link>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="p-2 border-2 border-transparent hover:border-[#2D2B2A] dark:hover:border-white rounded-full transition-all">
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          <SignInButton mode="modal">
            <button className="hidden md:block bg-white dark:bg-black text-black dark:text-white font-bold uppercase tracking-widest px-8 py-2.5 border-[3px] border-black dark:border-white rounded-xl hover:-translate-y-1 hover:translate-x-[-1px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all">
              Sign In
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="pt-32 pb-12 px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-4xl">

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
            Research <br/>
            <span className="text-black dark:text-white" style={{ WebkitTextStroke: isDark ? '2px white' : '3px black' }}>
              Reimagined.
            </span>
          </h1>
          <p className="text-lg md:text-xl font-medium text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto mb-10">
            The world's most aggressive AI analyst. Uncovering risks, projecting growth, and stripping away market noise in seconds.
          </p>

          <div className="relative w-full max-w-xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-0 bg-white dark:bg-[#1a1a1a] p-2 rounded-2xl border border-black dark:border-white shadow-sm hover:border-[#1D4ED8] dark:hover:border-[#3B82F6] transition-colors focus-within:border-[#1D4ED8] dark:focus-within:border-[#3B82F6] focus-within:ring-1 focus-within:ring-[#1D4ED8] dark:focus-within:ring-[#3B82F6]">
            <Search className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-black dark:text-white" />
            <input 
              type="text" 
              placeholder="Enter ticker (e.g., NVDA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-bold text-lg md:text-xl px-4 sm:pl-12 py-2 text-black dark:text-white placeholder:text-zinc-400"
            />
            <SignInButton mode="modal">
              <button className="bg-white dark:bg-black text-black dark:text-white font-black uppercase tracking-widest text-base md:text-lg px-6 py-3 border-[3px] border-black dark:border-white rounded-xl hover:-translate-y-1 hover:translate-x-[-1px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all whitespace-nowrap">
                Analyze
              </button>
            </SignInButton>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['AAPL', 'TSLA', 'PLTR', 'SNOW', 'CRWD'].map(ticker => (
              <SignInButton mode="modal" key={ticker}>
                <button className="bg-white dark:bg-[#1a1a1a] font-bold text-xs border-2 border-black dark:border-white px-3 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-0.5 transition-transform">
                  {ticker}
                </button>
              </SignInButton>
            ))}
          </div>
        </motion.div>
      </main>

      {/* TICKER MARQUEE */}
      <div className="w-full bg-white dark:bg-black border-y-[3px] border-black dark:border-white py-3 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="font-black text-xl md:text-2xl uppercase tracking-widest flex gap-12 text-black dark:text-white"
        >
          {Array(4).fill(['NVIDIA +4.2%', 'TESLA -1.8%', 'APPLE +0.5%', 'MICROSOFT +1.1%', 'PALANTIR +8.4%']).flat().map((item, i) => (
            <span key={i} className="flex items-center gap-4">
              <Activity className="w-5 h-5 md:w-6 md:h-6" /> {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* BENTO GRID FEATURES */}
      <section id="features" className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10">System Core</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5 h-auto md:h-[450px]">
          
          {/* Bento 1: Large Feature */}
          <div className="md:col-span-2 md:row-span-1 bg-white dark:bg-[#1a1a1a] p-6 border-[3px] border-black dark:border-white rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex flex-col justify-between text-black dark:text-white">
            <Database className="w-8 h-8 mb-4 text-black dark:text-white" />
            <div>
              <h3 className="text-2xl font-black uppercase mb-2">Live SEC Parsing</h3>
              <p className="text-base font-medium text-zinc-600 dark:text-zinc-400 max-w-md">Instantly ingests 10-Ks, 10-Qs, and earnings transcripts. Bypasses the noise directly to the numbers.</p>
            </div>
          </div>

          {/* Bento 2: Small Feature */}
          <div className="md:col-span-1 md:row-span-1 bg-white dark:bg-[#1a1a1a] p-6 border-[3px] border-black dark:border-white rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex flex-col justify-between">
            <ShieldCheck className="w-8 h-8 mb-4 text-black dark:text-white" />
            <div>
              <h3 className="text-xl font-black uppercase mb-2">Risk Engine</h3>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Detects extreme leverage, cash burn, and governance red flags.</p>
            </div>
          </div>

          {/* Bento 3: Small Feature */}
          <div className="md:col-span-1 md:row-span-1 bg-white dark:bg-[#1a1a1a] p-6 border-[3px] border-black dark:border-white rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] text-black dark:text-white flex flex-col justify-between">
            <Zap className="w-8 h-8 mb-4 text-black dark:text-white" />
            <div>
              <h3 className="text-xl font-black uppercase mb-2">Instant Output</h3>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">From query to complete dossier in under 15 seconds.</p>
            </div>
          </div>

          {/* Bento 4: Large Feature */}
          <div className="md:col-span-2 md:row-span-1 bg-white dark:bg-[#1a1a1a] p-6 border-[3px] border-black dark:border-white rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex flex-col justify-between relative overflow-hidden text-black dark:text-white">
            <MessageSquare className="w-8 h-8 mb-4 text-black dark:text-white" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black uppercase mb-2">Conversational AI</h3>
              <p className="text-base font-medium text-zinc-600 dark:text-zinc-400 max-w-md">Chat directly with the intelligence agent. Ask specific questions about debt structures or management.</p>
            </div>
            {/* Decorative BG element */}
            <div className="absolute right-[-5%] bottom-[-10%] opacity-20 pointer-events-none">
              <MessageSquare className="w-48 h-48 text-black dark:text-white" />
            </div>
          </div>

        </div>
      </section>

      {/* THE PIPELINE */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t-[3px] border-black dark:border-white mt-8 mb-8">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10">The Analysis Pipeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Ingestion', desc: 'Real-time extraction of 10-Ks, 10-Qs, and live earnings call transcripts.' },
            { step: '02', title: 'Processing', desc: 'LLM agents parse millions of tokens to identify risk factors and hidden debt.' },
            { step: '03', title: 'Synthesis', desc: 'Mapping qualitative data to quantitative financial models and projections.' },
            { step: '04', title: 'Verdict', desc: 'A conclusive INVEST or PASS recommendation delivered in seconds.' }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#1a1a1a] p-6 border-[3px] border-black dark:border-white rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] relative hover:-translate-y-2 transition-transform">
              <div className="text-6xl font-black text-zinc-200 dark:text-zinc-800 mb-4">{item.step}</div>
              <h3 className="text-xl font-black uppercase mb-2 text-black dark:text-white">{item.title}</h3>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-16 px-6 md:px-12 border-y-[3px] border-black dark:border-white bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 text-center">The Edge</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border-[3px] border-black dark:border-white bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
              <thead>
                <tr>
                  <th className="p-5 border-[3px] border-black dark:border-white font-black uppercase text-xl">Metric</th>
                  <th className="p-5 border-[3px] border-black dark:border-white font-black uppercase text-xl bg-black text-white dark:bg-white dark:text-black">InvestIQ AI</th>
                  <th className="p-5 border-[3px] border-black dark:border-white font-black uppercase text-xl text-zinc-500 dark:text-zinc-400">Human Analyst</th>
                </tr>
              </thead>
              <tbody className="font-bold text-lg">
                <tr>
                  <td className="p-5 border-[3px] border-black dark:border-white">Speed to Insight</td>
                  <td className="p-5 border-[3px] border-black dark:border-white bg-black text-white dark:bg-white dark:text-black">~15 Seconds</td>
                  <td className="p-5 border-[3px] border-black dark:border-white text-zinc-500 dark:text-zinc-400">3-5 Days</td>
                </tr>
                <tr>
                  <td className="p-5 border-[3px] border-black dark:border-white">Data Breadth</td>
                  <td className="p-5 border-[3px] border-black dark:border-white bg-black text-white dark:bg-white dark:text-black">Full SEC DB + News</td>
                  <td className="p-5 border-[3px] border-black dark:border-white text-zinc-500 dark:text-zinc-400">Limited by reading speed</td>
                </tr>
                <tr>
                  <td className="p-5 border-[3px] border-black dark:border-white">Emotional Bias</td>
                  <td className="p-5 border-[3px] border-black dark:border-white bg-black text-white dark:bg-white dark:text-black">Zero</td>
                  <td className="p-5 border-[3px] border-black dark:border-white text-zinc-500 dark:text-zinc-400">High</td>
                </tr>
                <tr>
                  <td className="p-5 border-[3px] border-black dark:border-white">Cost per Report</td>
                  <td className="p-5 border-[3px] border-black dark:border-white bg-black text-white dark:bg-white dark:text-black">$0.50 (API)</td>
                  <td className="p-5 border-[3px] border-black dark:border-white text-zinc-500 dark:text-zinc-400">$500 - $2000+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* API DOCS SECTION */}
      <section className="py-16 px-6 md:px-12 border-y-[3px] border-black dark:border-white bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-black dark:text-white">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Developers First.</h2>
            <p className="text-xl font-bold mb-6 max-w-lg">
              Integrate world-class financial intelligence directly into your app with a single REST endpoint.
            </p>
            <ul className="space-y-3 font-bold text-lg mb-6">
              <li className="flex items-center gap-2"><Check strokeWidth={4} className="w-5 h-5" /> Validated Zod Schemas</li>
              <li className="flex items-center gap-2"><Check strokeWidth={4} className="w-5 h-5" /> Sub-20s Latency</li>
              <li className="flex items-center gap-2"><Check strokeWidth={4} className="w-5 h-5" /> Edge Cached</li>
            </ul>
          </div>
          <div className="flex-1 w-full bg-black dark:bg-[#1a1a1a] border-[3px] border-black dark:border-white rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] p-5">
            <div className="flex gap-2 mb-4 border-b-[3px] border-zinc-800 pb-3">
              <div className="w-3 h-3 rounded-full bg-white/20 border-2 border-transparent"></div>
              <div className="w-3 h-3 rounded-full bg-white/40 border-2 border-transparent"></div>
              <div className="w-3 h-3 rounded-full bg-white/60 border-2 border-transparent"></div>
            </div>
            <pre className="font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
<span className="text-white">curl</span> -X POST https://api.investiq.ai/v1/analyze \
  -H <span className="text-zinc-400">"Authorization: Bearer YOUR_API_KEY"</span> \
  -H <span className="text-zinc-400">"Content-Type: application/json"</span> \
  -d <span className="text-zinc-300">'{'{'} "ticker": "AAPL", "depth": "full" {'}'}'</span>
            </pre>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 text-center">Access Levels</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Starter */}
          <div className="bg-white dark:bg-[#1a1a1a] p-6 border-[3px] border-black dark:border-white rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
            <h3 className="text-xl font-black uppercase mb-1">Starter</h3>
            <div className="text-5xl font-black mb-6">$0</div>
            <ul className="space-y-3 mb-6 font-bold text-base">
              <li className="flex items-center gap-2"><Check className="text-black dark:text-white w-5 h-5" strokeWidth={3} /> 10 Reports / mo</li>
              <li className="flex items-center gap-2"><Check className="text-black dark:text-white w-5 h-5" strokeWidth={3} /> Core Analysis</li>
            </ul>
            <SignInButton mode="modal">
              <button className="w-full bg-[#e5e5e5] dark:bg-zinc-800 text-black dark:text-white font-black uppercase px-6 py-3 border-[3px] border-black dark:border-white rounded-xl hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform">
                Begin
              </button>
            </SignInButton>
          </div>

          {/* Pro */}
          <div className="bg-black text-white dark:bg-[#111111] dark:text-white p-8 border-[3px] border-black dark:border-white rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] scale-100 md:scale-105 relative z-10">
            <div className="absolute -top-3 -right-3 bg-white dark:bg-black text-black dark:text-white font-black uppercase px-3 py-1 text-xs border-[3px] border-black dark:border-white rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              Maximum Power
            </div>
            <h3 className="text-xl font-black uppercase mb-1">Professional</h3>
            <div className="text-5xl font-black mb-6">$49<span className="text-xl text-zinc-500">/mo</span></div>
            <ul className="space-y-3 mb-6 font-bold text-base">
              <li className="flex items-center gap-2"><Check className="text-white w-5 h-5" strokeWidth={3} /> Unlimited Reports</li>
              <li className="flex items-center gap-2"><Check className="text-white w-5 h-5" strokeWidth={3} /> AI Chat Access</li>
              <li className="flex items-center gap-2"><Check className="text-white w-5 h-5" strokeWidth={3} /> PDF Exports</li>
            </ul>
            <SignInButton mode="modal">
              <button className="w-full bg-white dark:bg-black text-black dark:text-white font-black uppercase px-6 py-3 border-[3px] border-black dark:border-white rounded-xl hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform">
                Upgrade Now
              </button>
            </SignInButton>
          </div>

          {/* Enterprise */}
          <div className="bg-white dark:bg-[#1a1a1a] p-6 border-[3px] border-black dark:border-white rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
            <h3 className="text-xl font-black uppercase mb-1">Enterprise</h3>
            <div className="text-5xl font-black mb-6">Custom</div>
            <ul className="space-y-3 mb-6 font-bold text-base">
              <li className="flex items-center gap-2"><Check className="text-black dark:text-white w-5 h-5" strokeWidth={3} /> High-vol API</li>
              <li className="flex items-center gap-2"><Check className="text-black dark:text-white w-5 h-5" strokeWidth={3} /> Custom Webhooks</li>
            </ul>
            <button className="w-full bg-[#e5e5e5] dark:bg-zinc-800 text-black dark:text-white font-black uppercase px-6 py-3 border-[3px] border-black dark:border-white rounded-xl hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10 text-center">Interrogation</h2>
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="bg-white dark:bg-[#1a1a1a] border-[3px] border-black dark:border-white rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <button 
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center p-5 md:p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <span className="text-lg md:text-xl font-black text-left">{item.q}</span>
                  <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 md:p-6 pt-0 text-base md:text-lg font-medium border-t-[3px] border-black dark:border-white mt-1 pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-20 px-6 border-t-[3px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 max-w-4xl mx-auto leading-[0.9]">
          Stop guessing. <br/> Start knowing.
        </h2>
        <SignInButton mode="modal">
          <button className="bg-white dark:bg-black text-black dark:text-white text-xl md:text-2xl font-black uppercase px-8 py-4 border-[3px] border-black dark:border-white rounded-2xl hover:-translate-y-2 hover:translate-x-[-2px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all flex items-center gap-3 mx-auto">
            Initialize Engine <ArrowRight strokeWidth={4} className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </SignInButton>
      </section>

      {/* ACTUAL FOOTER */}
      <footer className="border-t-[3px] border-[#2D2B2A] dark:border-white bg-[#F2F0E9] dark:bg-[#121212] pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="font-black tracking-tighter text-3xl uppercase flex items-center gap-2 mb-4">
              InvestIQ
              <div className="bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 text-sm border-2 border-black dark:border-white rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">AI</div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium max-w-sm">
              The world's most aggressive quantitative AI analyst. Built for funds, designed for you.
            </p>
          </div>
          
          <div>
            <h4 className="font-black uppercase tracking-widest mb-6">Product</h4>
            <ul className="space-y-4 font-bold text-zinc-600 dark:text-zinc-400">
              <li><a href="#features" className="hover:text-black dark:hover:text-white transition-colors">Core System</a></li>
              <li><a href="#pricing" className="hover:text-black dark:hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 font-bold text-zinc-600 dark:text-zinc-400">
              <li><Link to="/trust-center" className="hover:text-black dark:hover:text-white transition-colors">Trust Center</Link></li>
              <li><Link to="/legal/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal/security" className="hover:text-black dark:hover:text-white transition-colors">Data Security</Link></li>
              <li><Link to="/legal/disclaimer" className="hover:text-black dark:hover:text-white transition-colors">Financial Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t-[3px] border-black dark:border-white flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-bold text-zinc-600 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} InvestIQ AI. All rights reserved.
          </p>
          <div className="flex gap-4 font-bold text-sm">
            <a href="#" className="hover:underline">Twitter / X</a>
            <a href="#" className="hover:underline">LinkedIn</a>
            <a href="#" className="hover:underline">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
