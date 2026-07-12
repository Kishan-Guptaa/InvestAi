import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
config();

async function test() {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-flash-latest",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.1,
      maxRetries: 3
    });
    
    const res = await model.invoke("Reply 'hi' if this works.");
    console.log("Success with gemini-flash-latest:", res.content);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
