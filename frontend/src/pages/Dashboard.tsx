import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, TrendingDown, ArrowRight, Activity, Calendar, History } from 'lucide-react';
import { DetailedLanding } from '../components/sections/DetailedLanding';

export default function Dashboard({ analysisState, isSignedIn }: any) {
  const { history, dbSearchHistory } = analysisState;
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  if (!isSignedIn) {
    return <DetailedLanding />;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const marketData = [
    { name: 'S&P 500', value: '5,432.10', change: '+1.2%', up: true },
    { name: 'NASDAQ', value: '17,890.40', change: '+1.5%', up: true },
    { name: 'DOW JONES', value: '39,120.33', change: '-0.3%', up: false },
    { name: 'BITCOIN', value: '$64,230', change: '+4.2%', up: true },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center max-w-3xl mx-auto pb-12 md:pb-20 pt-0 w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
          Welcome back.
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 mb-10">
          What company would you like to research today?
        </p>

        <form onSubmit={handleSearch} className="w-full relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any company..." 
            className="w-full bg-transparent py-4 pl-14 pr-32 text-xl font-medium border border-black dark:border-white rounded-2xl shadow-sm hover:border-[#1D4ED8] dark:hover:border-[#3B82F6] focus:border-[#1D4ED8] dark:focus:border-[#3B82F6] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] dark:focus:ring-[#3B82F6] transition-all"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-2 bottom-2 swiss-button-primary flex items-center gap-2"
          >
            Analyze <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-3 w-full">
          {['Apple', 'Microsoft', 'NVIDIA', 'Tesla', 'Amazon', 'Meta', 'Netflix', 'Palantir'].map(ticker => (
            <button 
              key={ticker} 
              onClick={() => navigate(`/search?q=${ticker}`)}
              className="px-4 py-1.5 text-sm font-medium bg-zinc-50 dark:bg-zinc-900 swiss-border hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {ticker}
            </button>
          ))}
        </div>
      </section>

      {/* Grid Layout for Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Market & AI Insights */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Market Overview */}
          <section className="swiss-panel">
            <div className="p-4 swiss-border-b flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
              <h2 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <Activity className="w-4 h-4" /> Market Overview
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-black dark:divide-zinc-800">
              {marketData.map((data, idx) => (
                <div key={idx} className="p-4 flex flex-col gap-1">
                  <span className="text-xs font-bold text-zinc-500">{data.name}</span>
                  <span className="text-lg font-bold">{data.value}</span>
                  <span className={`text-sm font-medium ${data.up ? 'text-[#1D4ED8]' : 'text-[#E60000]'} flex items-center gap-1`}>
                    {data.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {data.change}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Today's AI Summary */}
          <section className="swiss-panel p-6 flex flex-col gap-4">
            <h2 className="font-bold text-xl tracking-tight">Today's AI Market Summary</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
              The tech sector continues to show strong momentum, heavily driven by advancements in generative AI and semiconductor earnings. Inflation data came in slightly below expectations, fueling optimism for rate cuts later this year. AI models predict heightened volatility in the consumer discretionary sector next week as major retail earnings approach.
            </p>
          </section>

          {/* Recent Searches */}
          <section className="swiss-panel">
            <div className="p-4 swiss-border-b flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
              <h2 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <History className="w-4 h-4" /> Recent Searches
              </h2>
            </div>
            <div className="divide-y divide-black dark:divide-zinc-800">
              {dbSearchHistory && dbSearchHistory.length > 0 ? (
                dbSearchHistory.map((search: any) => (
                  <div key={search.id} className="p-4 flex justify-between items-center swiss-panel-hover cursor-pointer" onClick={() => navigate(`/search?q=${search.query}`)}>
                    <div>
                      <span className="font-medium text-sm block">{search.query}</span>
                      <span className="text-xs text-zinc-500">{new Date(search.createdAt).toLocaleDateString()}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-zinc-500">
                  No recent searches. Try looking up a company!
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Calendar & Recent */}
        <div className="flex flex-col gap-6">
          
          {/* Quick Actions */}
          <div className="flex flex-col gap-3">
            <button data-tour="company-research" onClick={() => navigate('/search')} className="swiss-button-primary w-full py-3 text-center justify-center">
              Analyze New Company
            </button>
            <button onClick={() => navigate('/compare')} className="swiss-button-secondary w-full py-3 text-center justify-center">
              Compare Companies
            </button>
          </div>

          {/* Economic Calendar */}
          <section className="swiss-panel">
            <div className="p-4 swiss-border-b flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
              <h2 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Upcoming Earnings
              </h2>
            </div>
            <div className="divide-y divide-black dark:divide-zinc-800">
              <div className="p-4 flex justify-between text-sm">
                <span className="font-bold">NVIDIA (NVDA)</span>
                <span className="text-zinc-500">Tomorrow</span>
              </div>
              <div className="p-4 flex justify-between text-sm">
                <span className="font-bold">Snowflake (SNOW)</span>
                <span className="text-zinc-500">May 24</span>
              </div>
              <div className="p-4 flex justify-between text-sm">
                <span className="font-bold">CrowdStrike (CRWD)</span>
                <span className="text-zinc-500">May 30</span>
              </div>
            </div>
          </section>

          {/* Recently Analyzed */}
          <section className="swiss-panel">
            <div className="p-4 swiss-border-b bg-zinc-50 dark:bg-zinc-900/50">
              <h2 className="font-bold uppercase tracking-wider text-sm">Recently Analyzed</h2>
            </div>
            <div className="divide-y divide-black dark:divide-zinc-800 flex flex-col">
              {history && history.length > 0 ? (
                history.slice(0, 4).map((h: any) => (
                  <div key={h.id} className="p-4 flex flex-col gap-1 swiss-panel-hover cursor-pointer">
                    <span className="font-bold text-sm">{h.report.overview?.companyName || 'Unknown'}</span>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-zinc-500">{new Date(h.timestamp).toLocaleDateString()}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase ${
                        h.report.recommendation?.action === 'INVEST' ? 'bg-[#1D4ED8]/10 text-[#1D4ED8]' : 'bg-[#E60000]/10 text-[#E60000]'
                      }`}>
                        {h.report.recommendation?.action || 'N/A'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-zinc-500">
                  No recent research history found.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
