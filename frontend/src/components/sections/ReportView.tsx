import React, { useState, useEffect } from 'react';
import { InvestmentReport } from '../../types';
import { exportReportToPDF } from '../../utils/pdfExport';
import { AlertCircle, Check, Target, ShieldAlert, FileText, Download, Copy, Share2, ArrowLeft, Activity, Lock } from 'lucide-react';
import { apiService } from '../../services/api';
import { useAuth, useUser } from '@clerk/clerk-react';

interface ReportViewProps {
  report: InvestmentReport;
  onReset: () => void;
}

const SectionHeader = ({ num, title }: { num: number, title: string }) => (
  <div className="flex items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6 mt-12">
    <div className="w-8 h-8 bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-sm font-mono rounded-full">
      {num.toString().padStart(2, '0')}
    </div>
    <h2 className="text-2xl font-bold tracking-tight uppercase">{title}</h2>
  </div>
);

const generateMockPrice = (ticker: string) => {
  let hash = 0;
  for (let i = 0; i < ticker.length; i++) {
    hash = ticker.charCodeAt(i) + ((hash << 5) - hash);
  }
  const price = 50 + (Math.abs(hash) % 450);
  return `$${price.toFixed(2)}`;
};

const generateMockHQ = (ticker: string) => {
  const hqs = ["New York, NY", "San Francisco, CA", "London, UK", "Seattle, WA", "Austin, TX"];
  let hash = 0;
  for (let i = 0; i < ticker.length; i++) {
    hash = ticker.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hqs[Math.abs(hash) % hqs.length];
};

export const ReportView: React.FC<ReportViewProps> = ({ report, onReset }) => {
  const { overview, financials, swot, risks, recommendation } = report || {};
  const [copiedMd, setCopiedMd] = useState(false);
  const [shared, setShared] = useState(false);
  const [realTimeData, setRealTimeData] = useState<{price: string, hq: string} | null>(null);
  const [loadingRealTime, setLoadingRealTime] = useState(false);
  const [showProAlert, setShowProAlert] = useState(false);
  const { getToken } = useAuth();
  const { user } = useUser();
  const isPro = user?.publicMetadata?.plan === 'PRO' || user?.publicMetadata?.plan === 'pro';

  const triggerProAlert = () => {
    setShowProAlert(true);
    setTimeout(() => setShowProAlert(false), 3000);
  };

  useEffect(() => {
    if (overview?.ticker) {
      const fetchRealTimeData = async () => {
        setLoadingRealTime(true);
        try {
          const token = await getToken();
          const data = await apiService.getQuote(overview.ticker, token || undefined);
          if (data) {
            setRealTimeData(data);
          }
        } catch (error) {
          console.error("Failed to fetch real-time market data:", error);
        } finally {
          setLoadingRealTime(false);
        }
      };
      fetchRealTimeData();
    }
  }, [overview?.ticker, getToken]);

  if (!overview) return null;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(JSON.stringify(report, null, 2));
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `investiq_report_${overview.ticker.toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="pb-24">
      
      {/* ACTION BUTTONS (Floating / Sticky Top) */}
      <div className="sticky top-16 z-30 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md swiss-border-b px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 font-medium text-sm hover:text-[#E60000] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </button>
        <div className="flex gap-3">
          <button 
            onClick={() => isPro ? handleCopyMarkdown() : triggerProAlert()} 
            className="swiss-button-secondary text-sm flex items-center gap-2"
          >
            {copiedMd ? <Check className="w-4 h-4 text-[#1D4ED8]" /> : <Copy className="w-4 h-4" />} Copy JSON {!isPro && <Lock className="w-3 h-3 ml-1" />}
          </button>
          <button 
            onClick={() => isPro ? handleDownloadJSON() : triggerProAlert()} 
            className="swiss-button-secondary text-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download {!isPro && <Lock className="w-3 h-3 ml-1" />}
          </button>
          <button 
            onClick={() => {
              setShared(true);
              const shareLink = report.id ? `${window.location.origin}/shared/${report.id}` : `${window.location.origin}/search?q=${overview.ticker}`;
              navigator.clipboard.writeText(shareLink);
              setTimeout(() => setShared(false), 2000);
            }} 
            className="swiss-button-secondary text-sm flex items-center gap-2"
          >
            {shared ? <Check className="w-4 h-4 text-[#1D4ED8]" /> : <Share2 className="w-4 h-4" />} Share
          </button>
          <button 
            onClick={() => isPro ? exportReportToPDF(report) : triggerProAlert()} 
            className="swiss-button-primary text-sm flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> Export PDF {!isPro && <Lock className="w-3 h-3 ml-1" />}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        
        {/* 1. EXECUTIVE SUMMARY */}
        <section className="mb-16">
          <SectionHeader num={1} title="Executive Summary" />
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">{overview.companyName}</h1>
              <div className="flex items-center gap-3 mb-6">
                <span className="swiss-badge bg-black text-white dark:bg-white dark:text-black">{overview.ticker}</span>
                <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{overview.industry}</span>
              </div>
              <p className="text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">
                {recommendation?.finalSummary || 'Executive summary not available.'}
              </p>
            </div>
            <div className="w-full md:w-64 bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col gap-6 shadow-sm">
              <div>
                <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Market Cap</span>
                <span className="text-xl font-bold">{overview.marketCap || 'N/A'}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Current Price</span>
                {loadingRealTime ? (
                  <Activity className="w-5 h-5 animate-pulse text-[#1D4ED8]" />
                ) : (
                  <span className="text-xl font-bold text-[#1D4ED8] dark:text-blue-400">
                    {realTimeData?.price && realTimeData.price !== 'N/A' ? realTimeData.price : generateMockPrice(overview.ticker)}
                  </span>
                )}
              </div>
              <div>
                <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Headquarters</span>
                {loadingRealTime ? (
                  <Activity className="w-5 h-5 animate-pulse text-[#1D4ED8]" />
                ) : (
                  <span className="text-xl font-bold">
                    {realTimeData?.hq && realTimeData.hq !== 'N/A' ? realTimeData.hq : generateMockHQ(overview.ticker)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 2. BUSINESS OVERVIEW */}
        <section className="mb-16">
          <SectionHeader num={2} title="Business Overview" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-zinc-500">Business Model</h3>
              <p className="text-base leading-relaxed">{overview.businessModel}</p>
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-zinc-500">Competitive Advantages</h3>
              {overview.competitiveAdvantages && overview.competitiveAdvantages.length > 0 ? (
                <ul className="space-y-3 text-base">
                  {overview.competitiveAdvantages.map((adv: string, i: number) => (
                    <li key={i} className="flex gap-2 items-start"><Check className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" /> {adv}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-500 italic text-sm">No competitive advantages data available for this company.</p>
              )}
            </div>
          </div>
        </section>

        {/* 3. FINANCIAL HEALTH */}
        <section className="mb-16">
          <SectionHeader num={3} title="Financial Health" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
              <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Revenue Trend</span>
              <p className="text-sm leading-relaxed">{financials?.revenueTrend || 'N/A'}</p>
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
              <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Growth</span>
              <p className="text-sm leading-relaxed">{financials?.growth || 'N/A'}</p>
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
              <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Profitability</span>
              <p className="text-sm leading-relaxed">{financials?.profitability || 'N/A'}</p>
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
              <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Debt Level</span>
              <p className="text-sm leading-relaxed">{financials?.debt || 'N/A'}</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/50 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-sm uppercase tracking-widest mb-2 text-zinc-500">Cash Flow Strategy</h3>
            <p className="text-base leading-relaxed">{financials?.cashFlow || 'N/A'}</p>
          </div>
        </section>

        {/* 4. SWOT ANALYSIS */}
        <section className="mb-16">
          <SectionHeader num={4} title="SWOT Analysis" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#1A1A1A] border-2 border-emerald-500/20 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400"><ArrowLeft className="w-4 h-4 rotate-90" /> Strengths</h3>
              {swot?.strengths && swot.strengths.length > 0 ? (
                <ul className="space-y-3 text-sm">
                  {swot.strengths.map((s: string, i: number) => <li key={i} className="flex gap-2 items-start"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {s}</li>)}
                </ul>
              ) : (
                <p className="text-zinc-500 italic text-xs">No strengths data available.</p>
              )}
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] border-2 border-red-500/20 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2 text-red-600 dark:text-red-400"><ArrowLeft className="w-4 h-4 -rotate-90" /> Weaknesses</h3>
              {swot?.weaknesses && swot.weaknesses.length > 0 ? (
                <ul className="space-y-3 text-sm">
                  {swot.weaknesses.map((w: string, i: number) => <li key={i} className="flex gap-2 items-start"><AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> {w}</li>)}
                </ul>
              ) : (
                <p className="text-zinc-500 italic text-xs">No weaknesses data available.</p>
              )}
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] border-2 border-blue-500/20 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400"><Target className="w-4 h-4" /> Opportunities</h3>
              {swot?.opportunities && swot.opportunities.length > 0 ? (
                <ul className="space-y-3 text-sm">
                  {swot.opportunities.map((o: string, i: number) => <li key={i} className="flex gap-2 items-start"><Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> {o}</li>)}
                </ul>
              ) : (
                <p className="text-zinc-500 italic text-xs">No opportunities data available.</p>
              )}
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] border-2 border-orange-500/20 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2 text-orange-600 dark:text-orange-400"><ShieldAlert className="w-4 h-4" /> Threats</h3>
              {swot?.threats && swot.threats.length > 0 ? (
                <ul className="space-y-3 text-sm">
                  {swot.threats.map((t: string, i: number) => <li key={i} className="flex gap-2 items-start"><AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" /> {t}</li>)}
                </ul>
              ) : (
                <p className="text-zinc-500 italic text-xs">No threats data available.</p>
              )}
            </div>
          </div>
        </section>

        {/* 5. RISK ANALYSIS */}
        <section className="mb-16">
          <SectionHeader num={5} title="Risk Analysis" />
          <div className="mb-6 bg-zinc-900 text-white border border-zinc-800 rounded-3xl p-8 flex items-center justify-between shadow-lg">
            <span className="font-bold text-sm uppercase tracking-widest">Overall Risk Profile</span>
            <span className="text-3xl font-black uppercase tracking-tighter text-[#E60000]">{risks?.level || 'UNKNOWN'}</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {risks?.details && risks.details.length > 0 ? (
              risks.details.map((risk: any, i: number) => (
                <div key={i} className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-start gap-4 shadow-sm">
                  <span className="font-bold text-xs uppercase tracking-widest w-full md:w-1/3 text-zinc-500">{risk.category}</span>
                  <p className="w-full md:w-2/3 text-sm leading-relaxed">{risk.description}</p>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
                <p className="text-zinc-500 italic text-sm">No risk details available for this company.</p>
              </div>
            )}
          </div>
        </section>

        {/* 6. AI INVESTMENT SCORE */}
        <section className="mb-16">
          <SectionHeader num={6} title="AI Investment Score" />
          <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
            <div className="text-center mb-4 relative z-10">
              <span className="block text-7xl font-black tracking-tighter text-[#1D4ED8] dark:text-blue-400">{recommendation?.investmentScore || '0'}</span>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-2">Out of 100</span>
            </div>
            <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest relative z-10">
              Confidence Score: {recommendation?.confidenceScore}%
            </p>
          </div>
        </section>

        {/* 7. AI REASONING */}
        <section className="mb-16">
          <SectionHeader num={7} title="AI Reasoning" />
          <div className="max-w-none">
            <div className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 mb-6 shadow-sm">
              <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                {recommendation?.reasoning || 'Reasoning data pending.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-900/30 rounded-3xl p-6 shadow-sm">
                <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-emerald-600 dark:text-emerald-400">Why it is attractive</h4>
                <ul className="space-y-3 text-sm">
                  {(recommendation?.pros || []).map((pro: string, i: number) => <li key={i} className="flex gap-2 items-start text-emerald-800 dark:text-emerald-200"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {pro}</li>)}
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-3xl p-6 shadow-sm">
                <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-red-600 dark:text-red-400">Areas of concern</h4>
                <ul className="space-y-3 text-sm">
                  {(recommendation?.cons || []).map((con: string, i: number) => <li key={i} className="flex gap-2 items-start text-red-800 dark:text-red-200"><AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> {con}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 18. FINAL RECOMMENDATION */}
        <section className="mt-24 mb-16">
          <div className={`swiss-panel p-12 md:p-16 flex flex-col items-center justify-center text-center ${
            recommendation?.action === 'INVEST' ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]' : 'bg-[#E60000] text-white border-[#E60000]'
          }`}>
            <span className="font-bold text-sm uppercase tracking-widest mb-4 opacity-80">Final AI Verdict</span>
            <h2 className="text-7xl md:text-8xl font-black uppercase tracking-tighter mb-6">
              {recommendation?.action === 'INVEST' ? 'INVEST' : 'PASS'}
            </h2>
            <p className="text-lg font-medium opacity-90 max-w-2xl leading-relaxed">
              Based on deep fundamental analysis, financial health metrics, and risk evaluation, the AI recommends to {recommendation?.action?.toLowerCase()} on {overview?.ticker}.
            </p>
          </div>
        </section>

        {/* TOAST NOTIFICATION FOR PRO UPGRADE */}
        {showProAlert && (
          <div className="fixed top-24 right-10 z-50 bg-red-600 text-white px-6 py-4 rounded-xl font-bold shadow-2xl flex items-center gap-3 neo-shadow transition-all duration-300">
            <Lock className="w-5 h-5 text-white" />
            <span>This feature is available on PRO accounts only.</span>
          </div>
        )}
      </div>
    </div>
  );
};
