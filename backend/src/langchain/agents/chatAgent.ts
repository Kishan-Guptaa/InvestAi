import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { config } from "../../config";

export const createChatAgent = (apiKey?: string) => {
  const activeKey = apiKey || config.googleApiKey;
  if (!activeKey) throw new Error("GOOGLE_API_KEY is not defined.");

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    apiKey: activeKey,
    temperature: 0.3,
  });

  const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
    `You are an AI investment assistant. Answer the user's questions based on the provided company report context.
    Keep your answers concise, insightful, and strictly related to the company context.
    
    Context:
    {context}`
  );

  const humanPrompt = HumanMessagePromptTemplate.fromTemplate(`{question}`);

  return ChatPromptTemplate.fromMessages([systemPrompt, humanPrompt]).pipe(model);
};
