import { useState } from 'react';
import { apiService } from '../services/api';
import { InvestmentReport, HistoryItem } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useAnalysis() {
  const [report, setReport] = useState<InvestmentReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code?: string } | null>(null);

  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('investiq_recent_searches', []);
  const [dbSearchHistory, setDbSearchHistory] = useState<any[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [customApiKey, setCustomApiKey] = useLocalStorage<string>('investiq_custom_api_key', '');

  const [currentStage, setCurrentStage] = useState<any>('COMPANY');

  const loadHistory = async (token?: string) => {
    try {
      const list = await apiService.getHistory(token);
      setHistory(list);
      
      if (token) {
        const searches = await apiService.getSearchHistory(token);
        setDbSearchHistory(searches);
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  const runAnalysis = async (companyName: string, token?: string) => {
    const trimmed = companyName.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setReport(null);
    setCurrentStage('COMPANY');
    
    let fullContext = {};

    try {
      // Stage 1: Company
      setCurrentStage('COMPANY');
      const companyInfo = await apiService.analyzeCompany(trimmed, customApiKey, token);
      fullContext = { ...fullContext, overview: companyInfo };

      // Stage 2: Finance
      setCurrentStage('FINANCE');
      const financeInfo = await apiService.analyzeFinance(trimmed, customApiKey, token);
      fullContext = { ...fullContext, financials: financeInfo };

      // Stage 3: News
      setCurrentStage('NEWS');
      const newsInfo = await apiService.analyzeNews(trimmed, customApiKey, token);
      fullContext = { ...fullContext, news: newsInfo }; // News schema isn't in original ResearchReport schema but we'll include it

      // Stage 4: SWOT
      setCurrentStage('SWOT');
      const swotInfo = await apiService.analyzeSwot(trimmed, customApiKey, token);
      fullContext = { ...fullContext, swot: swotInfo };

      // Stage 5: Risk
      setCurrentStage('RISK');
      const riskInfo = await apiService.analyzeRisk(trimmed, customApiKey, token);
      fullContext = { ...fullContext, risks: riskInfo }; // Mapped to original schema structure if needed

      // Stage 6: Recommendation
      setCurrentStage('RECOMMENDATION');
      const recommendationInfo = await apiService.analyzeRecommendation(trimmed, fullContext, customApiKey, token);
      
      const finalReport = {
        overview: companyInfo,
        financials: financeInfo,
        swot: swotInfo,
        risks: {
          level: riskInfo.overallRisk,
          details: [
            { category: "Market", description: riskInfo.marketRisk },
            { category: "Competition", description: riskInfo.competition },
            { category: "Economic", description: riskInfo.economicRisk },
            { category: "Financial", description: riskInfo.financialRisk },
            { category: "Technology", description: riskInfo.technologyRisk }
          ]
        },
        recommendation: {
          action: recommendationInfo.action,
          confidenceScore: recommendationInfo.confidenceScore,
          investmentScore: recommendationInfo.investmentScore,
          reasoning: recommendationInfo.reasoning,
          pros: swotInfo.strengths,
          cons: swotInfo.weaknesses,
          finalSummary: recommendationInfo.reasoning.substring(0, 200) + '...'
        },
        news: newsInfo // Extension
      };

      // Save report
      setCurrentStage('COMPLETE');
      const saveResponse = await apiService.saveReport(finalReport, customApiKey, token);
      
      if (saveResponse && saveResponse.id) {
        (finalReport as any).id = saveResponse.id;
      }

      setReport(finalReport as any);

      setRecentSearches((prev) => {
        const filtered = prev.filter(s => s.toLowerCase() !== trimmed.toLowerCase());
        return [finalReport.overview.companyName, ...filtered].slice(0, 5);
      });
      
      try {
        await apiService.saveSearchQuery(finalReport.overview.companyName, token);
      } catch (e) {
        console.error('Failed to save search to DB', e);
      }

      await loadHistory(token);
    } catch (err: any) {
      setError({
        message: err.message || 'An error occurred during report generation. Please try again.',
        code: err.code || 'API_FAIL'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadFromHistory = (item: HistoryItem) => {
    setReport(item.report);
    setError(null);
  };

  const deleteHistoryItem = async (id: string, token?: string) => {
    try {
      await apiService.deleteHistory(id, token);
      setHistory((prev) => prev.filter(item => item.id !== id));
      if (report && history.find(h => h.id === id)?.report.overview.companyName === report.overview.companyName) {
        setReport(null);
      }
    } catch (err) {
      console.error('Failed to delete history item:', err);
    }
  };

  return {
    report,
    loading,
    error,
    recentSearches,
    dbSearchHistory,
    history,
    customApiKey,
    setCustomApiKey,
    runAnalysis,
    loadFromHistory,
    deleteHistoryItem,
    loadHistory,
    setReport,
    setError,
    currentStage
  };
}
