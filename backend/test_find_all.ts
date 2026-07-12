import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
import * as fs from "fs";
config();

async function test(modelName: string) {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: modelName,
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.1,
      maxRetries: 0
    });
    
    const res = await model.invoke("Reply 'hi' if this works.");
    console.log(`Success with ${modelName}! Response:`, res.content);
    return true;
  } catch (err: any) {
    if (err.message.includes("429")) {
      // ignore
    } else {
      console.log(`Error with ${modelName}:`, err.message.substring(0, 100));
    }
    return false;
  }
}

async function run() {
  let s = fs.readFileSync('models.json', 'utf16le');
  s = s.replace(/^\uFEFF/, '');
  const data = JSON.parse(s);
  const models = data.models.map((m: any) => m.name.replace('models/', ''));
  
  for (const m of models) {
    if (m.includes("embedding") || m.includes("imagen") || m.includes("veo") || m.includes("audio")) continue;
    process.stdout.write(`Testing: ${m}... `);
    const success = await test(m);
    if (success) {
      console.log("\n>>> FOUND WORKING MODEL:", m);
      return;
    }
  }
}
run();
