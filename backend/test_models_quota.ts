import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
config();

async function test(modelName: string) {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: modelName,
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.1,
    });
    
    const res = await model.invoke("Reply 'hi' if this works.");
    console.log(`Success with ${modelName}! Response:`, res.content);
    return true;
  } catch (err: any) {
    console.error(`Error with ${modelName}:`, err.message);
    return false;
  }
}

async function run() {
  const models = [
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro-latest"
  ];
  for (const m of models) {
    await test(m);
  }
}
run();
