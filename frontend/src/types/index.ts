export interface CompanyOverview {
  companyName: string;
  ticker: string;
  description: string;
  industry: string;
  marketCap: string;
  businessModel: string;
  competitiveAdvantages: string[];
}

export interface Financials {
  revenueTrend: string;
  growth: string;
  profitability: string;
  debt: string;
  cashFlow: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface RiskDetail {
  category: string;
  description: string;
}

export interface RiskAnalysis {
  level: 'Low' | 'Medium' | 'High';
  details: RiskDetail[];
}

export interface Recommendation {
  action: 'INVEST' | 'PASS';
  confidenceScore: number;
  investmentScore: number;
  reasoning: string;
  pros: string[];
  cons: string[];
  finalSummary: string;
}

export interface InvestmentReport {
  id?: string;
  overview: CompanyOverview;
  financials: Financials;
  swot: SwotAnalysis;
  risks: RiskAnalysis;
  recommendation: Recommendation;
}

export interface HistoryItem {
  id: string;
  companyName: string;
  ticker: string;
  action: 'INVEST' | 'PASS';
  investmentScore: number;
  timestamp: string;
  report: InvestmentReport;
}
