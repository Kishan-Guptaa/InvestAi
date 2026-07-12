import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { config } from "../../config";

export const RiskSchema = z.object({
  marketRisk: z.string().describe("Overall market risk and macroeconomic exposure"),
  competition: z.string().describe("Risks from competitors and industry shifts"),
  economicRisk: z.string().describe("Economic vulnerabilities, supply chain, and regulatory risks"),
  financialRisk: z.string().describe("Liquidity, solvency, and balance sheet risks"),
  technologyRisk: z.string().describe("Technological disruption or obsolescence risks"),
  overallRisk: z.enum(["Low", "Medium", "High"]).describe("Overall synthesized risk level")
});

export const createRiskAgent = (apiKey?: string) => {
  const activeKey = apiKey || config.googleApiKey;
  if (!activeKey) throw new Error("GOOGLE_API_KEY is not defined.");

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    apiKey: activeKey,
    temperature: 0.1,
  });

  const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
    `You are a senior risk assessment analyst. Evaluate company risks critically using Google Search for live context. Return valid JSON.`
  );

  const humanPrompt = HumanMessagePromptTemplate.fromTemplate(
    `Analyze investment risks for {company}. Detail the Market Risk, Competition, Economic Risk, Financial Risk, Technology Risk, and an Overall Risk level (Low, Medium, High). Use search to verify the latest risks.`
  );

  return ChatPromptTemplate.fromMessages([systemPrompt, humanPrompt]).pipe(model.withStructuredOutput(RiskSchema));
};
