import { createOpenAI } from "@ai-sdk/openai";

export function createAIProvider() {
  return createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}
