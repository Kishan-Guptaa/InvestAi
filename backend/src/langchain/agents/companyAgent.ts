import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { config } from "../../config";

export const CompanySchema = z.object({
  companyName: z.string().describe("Official name of the company"),
  ticker: z.string().describe("Stock exchange ticker symbol (e.g. AAPL, NVDA)"),
  description: z.string().describe("Detailed business overview and description"),
  industry: z.string().describe("Primary industry classification"),
  marketCap: z.string().describe("Current estimated market capitalization (e.g. $3.2T)"),
  businessModel: z.string().describe("How the company generates revenue and operates"),
  ceo: z.string().describe("Current CEO of the company"),
  headquarters: z.string().describe("Location of headquarters"),
  founded: z.string().describe("Year the company was founded"),
  employees: z.string().describe("Estimated number of employees")
});

export const createCompanyAgent = (apiKey?: string) => {
  const activeKey = apiKey || config.googleApiKey;
  if (!activeKey) throw new Error("GOOGLE_API_KEY is not defined.");

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    apiKey: activeKey,
    temperature: 0.1,
  });

  const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
    `You are a corporate research assistant. Your job is to extract factual company information using Google Search to get real-time data. Return valid JSON.`
  );

  const humanPrompt = HumanMessagePromptTemplate.fromTemplate(
    `Tell me about {company}. I need the overview, industry, CEO, headquarters, business model, founded year, and employees. Use search to ensure the data is accurate and up-to-date.`
  );

  return ChatPromptTemplate.fromMessages([systemPrompt, humanPrompt]).pipe(model.withStructuredOutput(CompanySchema));
};
