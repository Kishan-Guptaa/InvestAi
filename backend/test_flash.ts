import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
config();

async function test() {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-flash-latest",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.1,
      maxRetries: 0
    });
    
    const res = await model.invoke("hi");
    console.log("Success:", res.content);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
