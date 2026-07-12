import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2, Search } from 'lucide-react';
import { AITimeline } from '../components/ui/AITimeline';
import { useAuth } from '@clerk/clerk-react';

export default function CompanySearch({ analysisState }: any) {
  const { runAnalysis, loading, currentStage, report, error, recentSearches } = analysisState;
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q && !loading && !report) {
      setQuery(q);
      executeSearch(q);
    }
  }, [location.search]);

  useEffect(() => {
    if (hasSearched && report && !loading) {
      navigate('/report');
    }
  }, [hasSearched, report, loading, navigate]);

  const executeSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    try {
      setHasSearched(true);
      const token = await getToken();
      await runAnalysis(searchQuery, token || undefined);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4">
      <div className="max-w-2xl w-full flex flex-col gap-12 relative">

        
        {/* Search Header */}
        {!loading && (
          <div className="text-center flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Start your research.
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 max-w-md mx-auto">
              Enter a company name or ticker symbol to begin the deep dive.
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 p-4 swiss-border font-medium text-center shadow-sm">
            {error.message}
          </div>
        )}

        {/* Loading / Timeline State */}
        {loading ? (
          <div className="mt-8">
            <AITimeline currentStage={currentStage} />
          </div>
        ) : (
          /* Search Input State */
          <div className="flex flex-col gap-10 w-full">
            <form onSubmit={handleSearch} className="relative w-full group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. MSFT, Apple, Tesla..." 
                className="w-full bg-transparent text-black dark:text-white py-5 pl-16 pr-32 text-2xl font-medium border border-black dark:border-white rounded-2xl shadow-sm hover:border-[#1D4ED8] dark:hover:border-[#3B82F6] focus:border-[#1D4ED8] dark:focus:border-[#3B82F6] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] dark:focus:ring-[#3B82F6] transition-all placeholder:text-zinc-400"
                autoFocus
              />
              <button 
                type="submit" 
                className="absolute right-2 top-2 bottom-2 swiss-button-primary"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : 'Analyze'}
              </button>
            </form>

            {/* Suggestions */}
            {recentSearches && recentSearches.length > 0 && (
              <div className="flex flex-col items-center gap-6 mt-4">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Recent Searches</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {recentSearches.map((s: string) => (
                    <button 
                      key={s} 
                      onClick={() => { setQuery(s); executeSearch(s); }}
                      className="px-4 py-1.5 bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white swiss-border font-medium text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
