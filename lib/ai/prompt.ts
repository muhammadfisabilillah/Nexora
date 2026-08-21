import type { ResumeAIInput } from "./schemas";

export function buildResumeAnalysisPrompt(
  input: ResumeAIInput
): string {
  return `Analyze the following resume for the target position.

TARGET POSITION:
${input.targetPosition ?? "Not specified"}

RESUME DATA:
${JSON.stringify(input, null, 2)}

ANALYSIS REQUIREMENTS:
1. Evaluate the overall quality of the resume.
2. Evaluate how well the resume fits the target position.
3. Identify important skill gaps based only on the target position and provided resume.
4. Evaluate the quality and relevance of the candidate's experience.
5. Provide concrete and actionable improvement suggestions.

IMPORTANT RULES:
- Base your analysis only on the provided resume data.
- Do not invent experience, skills, education, achievements, certifications, or other facts.
- Do not assume information that is not present.
- Be specific and useful rather than generic.
- Scores must be numbers from 0 to 100.
- Return only valid JSON.
- The JSON must match the required Nexora AI output structure.`;
}