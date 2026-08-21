import { z } from "zod";

export const resumeAIInputSchema = z.object({
  targetPosition: z.string().nullable(),

  profile: z
    .object({
      headline: z.string().nullable(),
      summary: z.string().nullable(),
    })
    .nullable(),

  experiences: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      location: z.string().nullable(),
      startDate: z.string().nullable(),
      endDate: z.string().nullable(),
      current: z.boolean(),
      description: z.string().nullable(),
    })
  ),

  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string().nullable(),
      fieldOfStudy: z.string().nullable(),
      location: z.string().nullable(),
      startDate: z.string().nullable(),
      endDate: z.string().nullable(),
      description: z.string().nullable(),
    })
  ),

  skills: z.array(
    z.object({
      name: z.string(),
      level: z.string().nullable(),
    })
  ),

  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string().nullable(),
      technologies: z.string().nullable(),
    })
  ),
});

export const resumeAIOutputSchema = z.object({
  overallScore: z.number().min(0).max(100),

  targetPositionFit: z.object({
    score: z.number().min(0).max(100),
    summary: z.string(),
  }),

  strengths: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),

  weaknesses: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),

  skillsGap: z.array(
    z.object({
      skill: z.string(),
      importance: z.enum(["high", "medium", "low"]),
      reason: z.string(),
    })
  ),

  experienceFeedback: z.array(
    z.object({
      experience: z.string(),
      score: z.number().min(0).max(100),
      feedback: z.string(),
    })
  ),

  improvementSuggestions: z.array(
    z.object({
      priority: z.enum(["high", "medium", "low"]),
      area: z.string(),
      suggestion: z.string(),
    })
  ),
});

export type ResumeAIInput = z.infer<typeof resumeAIInputSchema>;

export type ResumeAIOutput = z.infer<typeof resumeAIOutputSchema>;