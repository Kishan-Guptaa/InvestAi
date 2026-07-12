import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { config } from "../../config";

export const FinanceSchema = z.object({
  revenueTrend: z.string().describe("Revenue trajectory and analysis over the last 3-5 years"),
  growth: z.string().describe("Analysis of revenue and earnings growth rates"),
  profitability: z.string().describe("Margins (gross, operating, net) and return metrics (ROE, ROIC)"),
  debt: z.string().describe("Debt-to-equity ratio, balance sheet solvency, and coverage ratios"),
  cashFlow: z.string().describe("Free cash flow generation, cash conversion cycle, and capital allocation strategy"),
  peRatio: z.string().describe("Current or forward Price to Earnings Ratio")
});

export const createFinanceAgent = (apiKey?: string) => {
  const activeKey = apiKey || config.googleApiKey;
  if (!activeKey) throw new Error("GOOGLE_API_KEY is not defined.");

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    apiKey: activeKey,
    temperature: 0.1,
  });

  const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
    `You are a financial analyst. Analyze financial performance with objective data using Google Search to get real-time metrics. Return valid JSON.`
  );

  const humanPrompt = HumanMessagePromptTemplate.fromTemplate(
    `Analyze {company}'s financial performance. Focus on revenue, growth, profitability, debt, cash flow, and PE ratio. Use search to ensure accurate and up-to-date data.`
  );

  return ChatPromptTemplate.fromMessages([systemPrompt, humanPrompt]).pipe(model.withStructuredOutput(FinanceSchema));
};
