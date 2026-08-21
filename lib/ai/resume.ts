import { prisma } from "../prisma";
import { requireUser } from "../auth/session";
import { buildResumeAIInput } from "./input";

export async function getResumeAIInput(resumeId: string) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
    select: {
      targetPosition: true,

      profile: {
        select: {
          headline: true,
          summary: true,
        },
      },

      experiences: {
        select: {
          company: true,
          position: true,
          location: true,
          startDate: true,
          endDate: true,
          current: true,
          description: true,
        },
        orderBy: {
          startDate: "desc",
        },
      },

      education: {
        select: {
          institution: true,
          degree: true,
          fieldOfStudy: true,
          location: true,
          startDate: true,
          endDate: true,
          description: true,
        },
        orderBy: {
          startDate: "desc",
        },
      },

      skills: {
        select: {
          name: true,
          level: true,
        },
        orderBy: {
          name: "asc",
        },
      },

      projects: {
        select: {
          name: true,
          description: true,
          technologies: true,
        },
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  return buildResumeAIInput(resume);
}