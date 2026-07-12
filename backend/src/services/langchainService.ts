import { createResearchChain, ResearchReport } from "../langchain/researchChain";
import { createCompanyAgent } from "../langchain/agents/companyAgent";
import { createFinanceAgent } from "../langchain/agents/financeAgent";
import { createNewsAgent } from "../langchain/agents/newsAgent";
import { createSwotAgent } from "../langchain/agents/swotAgent";
import { createRiskAgent } from "../langchain/agents/riskAgent";
import { createRecommendationAgent } from "../langchain/agents/recommendationAgent";
import { createChatAgent } from "../langchain/agents/chatAgent";

const withRetry = async <T>(fn: () => Promise<T>): Promise<T> => {
  let attempts = 0;
  while (attempts < 3) {
    try {
      return await fn();
    } catch (error: any) {
      attempts++;
      const msg = error.message || '';
      
      if (msg.includes('429') || msg.toLowerCase().includes('quota') || msg.includes('retry')) {
        if (attempts >= 3) throw error;
        
        // Try to parse wait time from error message, e.g. "Please retry in 47.47s."
        const match = msg.match(/retry in ([\d\.]+)s/);
        const waitSeconds = match ? parseFloat(match[1]) + 2 : 15; 
        
        console.warn(`⚠️ [Rate Limit] Gemini quota exceeded. Retrying in ${Math.round(waitSeconds)} seconds... (Attempt ${attempts}/3)`);
        await new Promise(res => setTimeout(res, waitSeconds * 1000));
      } else {
        throw error;
      }
    }
  }
  throw new Error("Max retries exceeded");
};

export class LangchainService {
  public async analyzeCompany(company: string, apiKey?: string): Promise<any> {
    const chain = createCompanyAgent(apiKey);
    return await withRetry(() => chain.invoke({ company }));
  }

  public async analyzeFinance(company: string, apiKey?: string): Promise<any> {
    const chain = createFinanceAgent(apiKey);
    return await withRetry(() => chain.invoke({ company }));
  }

  public async analyzeNews(company: string, apiKey?: string): Promise<any> {
    const chain = createNewsAgent(apiKey);
    return await withRetry(() => chain.invoke({ company }));
  }

  public async analyzeSwot(company: string, apiKey?: string): Promise<any> {
    const chain = createSwotAgent(apiKey);
    return await withRetry(() => chain.invoke({ company }));
  }

  public async analyzeRisk(company: string, apiKey?: string): Promise<any> {
    const chain = createRiskAgent(apiKey);
    return await withRetry(() => chain.invoke({ company }));
  }

  public async analyzeRecommendation(company: string, context: string, apiKey?: string): Promise<any> {
    const chain = createRecommendationAgent(apiKey);
    return await withRetry(() => chain.invoke({ company, context }));
  }

  public async chat(question: string, context: string, apiKey?: string): Promise<any> {
    const chain = createChatAgent(apiKey);
    const response = await withRetry(() => chain.invoke({ question, context }));
    return response.content;
  }

  // Legacy single analysis (keep for backward compatibility)
  public async analyzeLegacy(company: string, apiKey?: string): Promise<ResearchReport> {
    const chain = createResearchChain(apiKey);
    return await chain.invoke({ company }) as ResearchReport;
  }
}

export const langchainService = new LangchainService();
