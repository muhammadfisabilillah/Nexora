import { GoogleGenAI } from "@google/genai";
import { toJSONSchema } from "zod/v4/core";
import { resumeAIOutputSchema } from "./schemas";
import type { ResumeAIInput, ResumeAIOutput } from "./schemas";
import { buildResumeAnalysisPrompt } from "./prompt";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not configured.");
}

const ai = new GoogleGenAI({
  apiKey,
});

const MODEL = "gemini-3.6-flash";

export async function analyzeResumeWithAI(
  input: ResumeAIInput
): Promise<ResumeAIOutput> {
  const prompt = buildResumeAnalysisPrompt(input);

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
config: {
  responseMimeType: "application/json",
  responseJsonSchema: toJSONSchema(resumeAIOutputSchema),
},
  });

  const text = response.text;

  if (!text) {
    throw new Error("AI returned an empty response.");
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("AI returned invalid JSON.");
  }

  return resumeAIOutputSchema.parse(parsed);
}