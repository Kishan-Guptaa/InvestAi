import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { config } from "../config";

// 1. Define the Structured JSON output schema using Zod
export const ResearchReportSchema = z.object({
  overview: z.object({
    companyName: z.string().describe("Official name of the company"),
    ticker: z.string().describe("Stock exchange ticker symbol (e.g. AAPL, NVDA)"),
    description: z.string().describe("Detailed business overview and description"),
    industry: z.string().describe("Primary industry classification"),
    marketCap: z.string().describe("Current estimated market capitalization (e.g. $3.2T)"),
    businessModel: z.string().describe("How the company generates revenue and operates"),
    competitiveAdvantages: z.array(z.string()).describe("Core economic moats and competitive strengths")
  }),
  financials: z.object({
    revenueTrend: z.string().describe("Revenue trajectory and analysis over the last 3-5 years"),
    growth: z.string().describe("Analysis of revenue and earnings growth rates"),
    profitability: z.string().describe("Margins (gross, operating, net) and return metrics (ROE, ROIC)"),
    debt: z.string().describe("Debt-to-equity ratio, balance sheet solvency, and coverage ratios"),
    cashFlow: z.string().describe("Free cash flow generation, cash conversion cycle, and capital allocation strategy")
  }),
  swot: z.object({
    strengths: z.array(z.string()).describe("Internal company strengths"),
    weaknesses: z.array(z.string()).describe("Internal company weaknesses, constraints, and concerns"),
    opportunities: z.array(z.string()).describe("External growth routes and expansion opportunities"),
    threats: z.array(z.string()).describe("External threats, technological shifts, and competitor risks")
  }),
  risks: z.object({
    level: z.enum(["Low", "Medium", "High"]).describe("Overall risk rating score level"),
    details: z.array(z.object({
      category: z.string().describe("Risk type (e.g., Valuation, Regulation, Customer Concentration)"),
      description: z.string().describe("Detailed context regarding the specific risk factor")
    })).describe("List of top risk factors")
  }),
  recommendation: z.object({
    action: z.enum(["INVEST", "PASS"]).describe("The final investment recommendation action"),
    confidenceScore: z.number().min(0).max(100).describe("Confidence score of the analyst in this recommendation (0-100)"),
    investmentScore: z.number().min(0).max(100).describe("Overall rating of company quality/investment viability (0-100)"),
    reasoning: z.string().describe("Rigorous analyst logic behind the recommended action"),
    pros: z.array(z.string()).describe("Core arguments in favor of the recommendation"),
    cons: z.array(z.string()).describe("Core counter-arguments or potential blindspots"),
    finalSummary: z.string().describe("A concise 3-sentence summary of the investment thesis")
  })
});

export type ResearchReport = z.infer<typeof ResearchReportSchema>;

/**
 * Builds and returns the LangChain sequence for analyzing a company.
 * The function accepts an override API key if provided at runtime.
 */
export function createResearchChain(apiKey?: string) {
  const activeKey = apiKey || config.googleApiKey;

  if (!activeKey) {
    throw new Error("GOOGLE_API_KEY is not defined. Please set it in your environment or configuration.");
  }

  // 2. Initialize the Gemini Chat model
  // Note: We use gemini-3.5-flash as requested
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    apiKey: activeKey,
    temperature: 0.1, // Low temperature for high objectivity and adherence to facts
  });

  // 3. Define the System and Human Prompt templates
  const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
    `You are an experienced Wall Street investment analyst. 
Your task is to analyze the requested company with absolute objectivity using Google Search to get real-time data. 
You must base your analysis on accurate, public business data, financial records, and market positioning. 
Never hallucinate or invent data. If specific information is missing or uncertain, mention it clearly as an assumption or a point of uncertainty.

Format the entire output as a single valid JSON object following the schema requested. 
Be rigorous, detailed, and clear.`
  );

  const humanPrompt = HumanMessagePromptTemplate.fromTemplate(
    `Perform a comprehensive investment research analysis on the following company:
Company Name / Query: {company}

Analyze their business model, financial trends, competitive advantages, SWOT profile, key risks, and provide a clear investment rating (INVEST or PASS), confidence score, investment score, pros, cons, and a final summary. Use search to get live and accurate market context.
`
  );

  const prompt = ChatPromptTemplate.fromMessages([
    systemPrompt,
    humanPrompt
  ]);

  // 4. Create the model with structured output using native Gemini JSON capabilities
  const structuredModel = model.withStructuredOutput(ResearchReportSchema);

  // 5. Connect prompt and structuredModel using LCEL
  // This constructs a RunnableSequence which compiles inputs and outputs parsed JSON
  const chain = prompt.pipe(structuredModel);

  return chain;
}
