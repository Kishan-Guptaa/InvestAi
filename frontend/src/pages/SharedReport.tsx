import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { InvestmentReport } from '../types';
import { ReportView } from '../components/sections/ReportView';
import { Activity, Search } from 'lucide-react';

export default function SharedReport() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<InvestmentReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedReport = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await apiService.getSharedReport(id);
        
        // Map the backend DB structure to the InvestmentReport type
        // if necessary, or just use the JSON
        if (data.reportJson) {
          setReport({ ...data.reportJson, id: data.id });
        } else {
          setError("Report format is invalid.");
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load shared report.');
      } finally {
        setLoading(false);
      }
    };

    fetchSharedReport();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Activity className="w-12 h-12 text-[#1D4ED8] animate-pulse" />
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Shared Report...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
        <div className="bg-white dark:bg-[#1A1A1A] p-8 border-[3px] border-black dark:border-white rounded-2xl neo-shadow max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Report Not Found</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
            {error || "This report link is invalid or may have been deleted."}
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="swiss-button-primary w-full"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-6 mb-8 flex justify-between items-center bg-blue-50 dark:bg-blue-900/10 border-[3px] border-[#1D4ED8] dark:border-blue-500 rounded-2xl p-4 neo-shadow">
        <div>
          <span className="font-bold text-[#1D4ED8] dark:text-blue-400 block text-sm uppercase tracking-widest mb-1">Public View</span>
          <h1 className="text-xl font-bold">You are viewing a shared report</h1>
        </div>
        <button onClick={() => navigate('/')} className="swiss-button-primary text-sm whitespace-nowrap">
          Create Your Own
        </button>
      </div>
      <ReportView report={report} onReset={() => navigate('/')} />
    </div>
  );
}
