import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
config();

async function test() {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemma-4-26b-a4b-it",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.1,
    });
    
    const prompt = `You are an AI. Return a raw JSON object with keys "companyName" and "description" about Vercel. DO NOT include markdown backticks like \`\`\`json. Just the raw JSON string.`;
    
    const res = await model.invoke(prompt);
    console.log("Success! Output:");
    console.log(res.content);
    console.log("Parsed:", JSON.parse(res.content as string));
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
