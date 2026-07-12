import { useState } from 'react';
import { Search, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SavedReports({ analysisState }: any) {
  const { history, deleteHistoryItem, loadFromHistory } = analysisState;
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredHistory = history?.filter((h: any) => 
    h.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-transparent min-h-screen pt-0 pb-12 px-0 md:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="font-scribble text-4xl font-bold text-[#2D2B2A] dark:text-[#E8E6E3]">Watchlist</h1>
          
          <div className="relative w-full md:w-72">
            <input 
              type="text"
              placeholder="Filter by name or ticker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-[#1A1A1A] border border-black dark:border-white rounded-lg shadow-sm p-3 pr-10 hover:border-[#1D4ED8] dark:hover:border-[#3B82F6] focus:border-[#1D4ED8] dark:focus:border-[#3B82F6] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] dark:focus:ring-[#3B82F6] transition-all"
            />
            <Search className="absolute right-3 top-3.5 w-5 h-5 text-zinc-400" />
          </div>
        </div>

        <div className="space-y-4">
          {filteredHistory?.length === 0 ? (
            <div className="p-12 text-center text-zinc-500 font-scribble text-2xl border-2 border-dashed border-zinc-300">
              No reports found matching "{searchTerm}"
            </div>
          ) : (
            filteredHistory?.map((item: any) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-[#1C1B22] p-6 scribble-border hover:-translate-y-1 transition-transform flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h3 className="font-scribble text-2xl font-bold text-[#1D4ED8]">{item.companyName}</h3>
                  <p className="text-zinc-500 font-bold">{item.ticker}</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Score</span>
                    <span className="font-black text-xl">{item.investmentScore}/100</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Action</span>
                    <span className={`px-2 py-1 font-bold ${item.action === 'INVEST' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'}`}>
                      {item.action}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        loadFromHistory(item);
                        navigate('/report');
                      }}
                      className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                      title="View Report"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => deleteHistoryItem(item.id)}
                      className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-600 transition-colors"
                      title="Delete Report"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
