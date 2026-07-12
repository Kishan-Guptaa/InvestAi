import { createResearchChain, ResearchReport } from "../langchain/researchChain";
import { createCompanyAgent } from "../langchain/agents/companyAgent";
import { createFinanceAgent } from "../langchain/agents/financeAgent";
import { createNewsAgent } from "../langchain/agents/newsAgent";
import { createSwotAgent } from "../langchain/agents/swotAgent";
import { createRiskAgent } from "../langchain/agents/riskAgent";
import { createRecommendationAgent } from "../langchain/agents/recommendationAgent";
import { createChatAgent } from "../langchain/agents/chatAgent";
import { apiKeyManager } from "../utils/apiKeyManager";

const withRetry = async <T>(userApiKey: string | undefined, fn: (activeKey: string) => Promise<T>): Promise<T> => {
  let attempts = 0;
  // If user provides a key, we just retry on that single key a few times.
  // If using system keys, we can retry as many times as we have keys.
  const maxAttempts = userApiKey ? 3 : apiKeyManager.getTotalKeys() * 2; 

  while (attempts < maxAttempts) {
    try {
      let activeKey = userApiKey;
      if (!activeKey) {
        // May throw if ALL keys are currently rate limited
        activeKey = apiKeyManager.getNextAvailableKey();
      }
      return await fn(activeKey);
    } catch (error: any) {
      attempts++;
      const msg = error.message || '';
      
      if (msg.includes('429') || msg.toLowerCase().includes('quota') || msg.includes('retry')) {
        if (attempts >= maxAttempts) throw error;
        
        // Try to parse wait time from error message, e.g. "Please retry in 47.47s."
        const match = msg.match(/retry in ([\d\.]+)s/);
        const waitSeconds = match ? parseFloat(match[1]) : 15; 
        
        if (userApiKey) {
          // If it's a user's custom key, we must wait
          console.warn(`⚠️ [Rate Limit] Custom key quota exceeded. Retrying in ${Math.round(waitSeconds)}s... (Attempt ${attempts}/${maxAttempts})`);
          await new Promise(res => setTimeout(res, (waitSeconds + 2) * 1000));
        } else {
          // It's a system key, so we mark it exhausted and instantly loop to grab the next key!
          const failedKey = apiKeyManager.getNextAvailableKey(); // gets the one that just failed
          apiKeyManager.markKeyExhausted(failedKey, waitSeconds);
        }
      } else if (msg.includes('[ALL_KEYS_EXHAUSTED]')) {
         // This is thrown by apiKeyManager when all keys are dead.
         // We must parse the wait time from that error and actually wait.
         const match = msg.match(/retry in ([\d\.]+)s/);
         const waitSeconds = match ? parseFloat(match[1]) : 15;
         console.warn(`⚠️ [Rate Limit] ALL system keys exhausted. Waiting ${waitSeconds}s...`);
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
    return await withRetry(apiKey, (activeKey) => {
      const chain = createCompanyAgent(activeKey);
      return chain.invoke({ company });
    });
  }

  public async analyzeFinance(company: string, apiKey?: string): Promise<any> {
    return await withRetry(apiKey, (activeKey) => {
      const chain = createFinanceAgent(activeKey);
      return chain.invoke({ company });
    });
  }

  public async analyzeNews(company: string, apiKey?: string): Promise<any> {
    return await withRetry(apiKey, (activeKey) => {
      const chain = createNewsAgent(activeKey);
      return chain.invoke({ company });
    });
  }

  public async analyzeSwot(company: string, apiKey?: string): Promise<any> {
    return await withRetry(apiKey, (activeKey) => {
      const chain = createSwotAgent(activeKey);
      return chain.invoke({ company });
    });
  }

  public async analyzeRisk(company: string, apiKey?: string): Promise<any> {
    return await withRetry(apiKey, (activeKey) => {
      const chain = createRiskAgent(activeKey);
      return chain.invoke({ company });
    });
  }

  public async analyzeRecommendation(company: string, context: any, apiKey?: string): Promise<any> {
    return await withRetry(apiKey, (activeKey) => {
      const chain = createRecommendationAgent(activeKey);
      return chain.invoke({ company, context });
    });
  }

  public async chat(question: string, context: any, apiKey?: string): Promise<any> {
    const response = await withRetry(apiKey, (activeKey) => {
      const chain = createChatAgent(activeKey);
      return chain.invoke({ question, context });
    });
    return response.content;
  }

  // Legacy single analysis (keep for backward compatibility)
  public async analyzeLegacy(company: string, apiKey?: string): Promise<ResearchReport> {
    const chain = createResearchChain(apiKey);
    return await chain.invoke({ company }) as ResearchReport;
  }
}

export const langchainService = new LangchainService();
