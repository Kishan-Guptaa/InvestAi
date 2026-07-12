import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { config } from "dotenv";
config();

async function test() {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemma-4-26b-a4b-it",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.1,
    });
    
    const CompanySchema = z.object({
      companyName: z.string(),
      description: z.string()
    });

    const parser = StructuredOutputParser.fromZodSchema(CompanySchema);

    const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
      `You are a corporate research assistant. Return valid JSON only.
{format_instructions}`
    );

    const humanPrompt = HumanMessagePromptTemplate.fromTemplate(
      `Tell me about Vercel.`
    );

    const prompt = ChatPromptTemplate.fromMessages([systemPrompt, humanPrompt]);
    
    const chain = prompt.pipe(model).pipe(parser);

    const res = await chain.invoke({
      format_instructions: parser.getFormatInstructions()
    });
    console.log("Success! Response:");
    console.log(res);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
