import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";
import { config } from "dotenv";
config();

async function test() {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemma-4-26b-a4b-it",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.1,
      maxRetries: 0
    });
    
    const schema = z.object({
      companyName: z.string(),
      description: z.string(),
    });

    const structured = model.withStructuredOutput(schema);
    const res = await structured.invoke("Tell me about Vercel");
    console.log("Success! Response:");
    console.log(res);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
