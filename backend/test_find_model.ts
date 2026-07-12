import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
config();

async function test(modelName: string) {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: modelName,
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.1,
      maxRetries: 0 // Disable retries to fail fast
    });
    
    const res = await model.invoke("Reply 'hi' if this works.");
    console.log(`Success with ${modelName}! Response:`, res.content);
    return true;
  } catch (err: any) {
    if (err.message.includes("429")) {
      console.error(`Rate limit / Quota for ${modelName}`);
    } else {
      console.error(`Error with ${modelName}:`, err.message);
    }
    return false;
  }
}

async function run() {
  const models = [
    "gemini-flash-latest",
    "gemini-2.0-flash-lite",
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash"
  ];
  for (const m of models) {
    console.log("Testing:", m);
    if (await test(m)) {
      console.log("Found working model:", m);
      break;
    }
  }
}
run();
