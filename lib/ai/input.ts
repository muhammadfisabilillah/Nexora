import type { ResumeAIInput } from "./schemas";
import { resumeAIInputSchema } from "./schemas";

type ResumeForAI = {
  targetPosition: string | null;
  profile: {
    headline: string | null;
    summary: string | null;
  } | null;
  experiences: {
    company: string;
    position: string;
    location: string | null;
    startDate: Date | null;
    endDate: Date | null;
    current: boolean;
    description: string | null;
  }[];
  education: {
    institution: string;
    degree: string | null;
    fieldOfStudy: string | null;
    location: string | null;
    startDate: Date | null;
    endDate: Date | null;
    description: string | null;
  }[];
  skills: {
    name: string;
    level: string | null;
  }[];
  projects: {
    name: string;
    description: string | null;
    technologies: string | null;
  }[];
};

export function buildResumeAIInput(
  resume: ResumeForAI
): ResumeAIInput {
  const input = {
    targetPosition: resume.targetPosition,

    profile: resume.profile
      ? {
          headline: resume.profile.headline,
          summary: resume.profile.summary,
        }
      : null,

    experiences: resume.experiences.map((experience) => ({
      company: experience.company,
      position: experience.position,
      location: experience.location,
      startDate: experience.startDate?.toISOString() ?? null,
      endDate: experience.endDate?.toISOString() ?? null,
      current: experience.current,
      description: experience.description,
    })),

    education: resume.education.map((education) => ({
      institution: education.institution,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,
      location: education.location,
      startDate: education.startDate?.toISOString() ?? null,
      endDate: education.endDate?.toISOString() ?? null,
      description: education.description,
    })),

    skills: resume.skills.map((skill) => ({
      name: skill.name,
      level: skill.level,
    })),

    projects: resume.projects.map((project) => ({
      name: project.name,
      description: project.description,
      technologies: project.technologies,
    })),
  };

  return resumeAIInputSchema.parse(input);
}