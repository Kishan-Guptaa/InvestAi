import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { config } from "../../config";

export const RecommendationSchema = z.object({
  action: z.enum(["INVEST", "HOLD", "PASS"]).describe("The final investment recommendation action"),
  confidenceScore: z.number().min(0).max(100).describe("Confidence score of the analyst in this recommendation (0-100)"),
  investmentScore: z.number().min(0).max(100).describe("Overall rating of company quality/investment viability (0-100)"),
  reasoning: z.string().describe("Rigorous analyst logic behind the recommended action")
});

export const createRecommendationAgent = (apiKey?: string) => {
  const activeKey = apiKey || config.googleApiKey;
  if (!activeKey) throw new Error("GOOGLE_API_KEY is not defined.");

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    apiKey: activeKey,
    temperature: 0.1,
  });

  const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
    `You are a Lead Investment Strategist. Synthesize data into a final recommendation. Return valid JSON.`
  );

  const humanPrompt = HumanMessagePromptTemplate.fromTemplate(
    `Based on the following data for {company}, provide a final recommendation.
Company Data Context:
{context}

Provide an Investment Score (0-100), Recommendation (INVEST, HOLD, PASS), Confidence Score (0-100), and detailed Reasoning.`
  );

  return ChatPromptTemplate.fromMessages([systemPrompt, humanPrompt]).pipe(model.withStructuredOutput(RecommendationSchema));
};
