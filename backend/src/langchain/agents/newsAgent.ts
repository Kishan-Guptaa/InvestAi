import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { config } from "../../config";

export const NewsSchema = z.object({
  positiveNews: z.array(z.string()).describe("Recent positive news regarding the company"),
  negativeNews: z.array(z.string()).describe("Recent negative news or headwinds"),
  overallImpact: z.string().describe("Overall impact of recent news on the company's trajectory")
});

export const createNewsAgent = (apiKey?: string) => {
  const activeKey = apiKey || config.googleApiKey;
  if (!activeKey) throw new Error("GOOGLE_API_KEY is not defined.");

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    apiKey: activeKey,
    temperature: 0.1,
  });

  const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
    `You are a market news analyst. Summarize recent factual news using Google Search to get real-time information. Return valid JSON.`
  );

  const humanPrompt = HumanMessagePromptTemplate.fromTemplate(
    `Summarize the latest important news for {company}. Include positive news, negative news, and the overall impact. Use search to find the latest articles.`
  );

  return ChatPromptTemplate.fromMessages([systemPrompt, humanPrompt]).pipe(model.withStructuredOutput(NewsSchema));
};
