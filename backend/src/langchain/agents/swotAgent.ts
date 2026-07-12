import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { config } from "../../config";

export const SwotSchema = z.object({
  strengths: z.array(z.string()).describe("Internal company strengths"),
  weaknesses: z.array(z.string()).describe("Internal company weaknesses, constraints, and concerns"),
  opportunities: z.array(z.string()).describe("External growth routes and expansion opportunities"),
  threats: z.array(z.string()).describe("External threats, technological shifts, and competitor risks")
});

export const createSwotAgent = (apiKey?: string) => {
  const activeKey = apiKey || config.googleApiKey;
  if (!activeKey) throw new Error("GOOGLE_API_KEY is not defined.");

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    apiKey: activeKey,
    temperature: 0.1,
  });

  const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
    `You are a strategic management consultant. Generate a structured SWOT analysis using Google Search to get real-time context. Return valid JSON.`
  );

  const humanPrompt = HumanMessagePromptTemplate.fromTemplate(
    `Generate a SWOT Analysis for {company}. Detail the Strengths, Weaknesses, Opportunities, and Threats. Use search to ensure points are relevant to current market conditions.`
  );

  return ChatPromptTemplate.fromMessages([systemPrompt, humanPrompt]).pipe(model.withStructuredOutput(SwotSchema));
};
