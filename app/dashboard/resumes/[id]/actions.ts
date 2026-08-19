"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { requireUser } from "../../../../lib/auth/session";

export async function updateResumeProfileAction(
  resumeId: string,
  formData: FormData
) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const fullName = formData.get("fullName");
  const headline = formData.get("headline");
  const phone = formData.get("phone");
  const location = formData.get("location");
  const website = formData.get("website");
  const summary = formData.get("summary");

  const normalizedFullName =
    typeof fullName === "string" && fullName.trim()
      ? fullName.trim()
      : null;

  const normalizedHeadline =
    typeof headline === "string" && headline.trim()
      ? headline.trim()
      : null;

  const normalizedPhone =
    typeof phone === "string" && phone.trim()
      ? phone.trim()
      : null;

  const normalizedLocation =
    typeof location === "string" && location.trim()
      ? location.trim()
      : null;

  const normalizedWebsite =
    typeof website === "string" && website.trim()
      ? website.trim()
      : null;

  const normalizedSummary =
    typeof summary === "string" && summary.trim()
      ? summary.trim()
      : null;

  await prisma.resumeProfile.upsert({
    where: {
      resumeId,
    },
    update: {
      fullName: normalizedFullName,
      headline: normalizedHeadline,
      phone: normalizedPhone,
      location: normalizedLocation,
      website: normalizedWebsite,
      summary: normalizedSummary,
    },
    create: {
      resumeId,
      fullName: normalizedFullName,
      headline: normalizedHeadline,
      phone: normalizedPhone,
      location: normalizedLocation,
      website: normalizedWebsite,
      summary: normalizedSummary,
    },
  });

  redirect(`/dashboard/resumes/${resumeId}`);
}

export async function createExperienceAction(
  resumeId: string,
  formData: FormData
) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const company = formData.get("company");
  const position = formData.get("position");
  const location = formData.get("location");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const current = formData.get("current");
  const description = formData.get("description");

  if (
    typeof company !== "string" ||
    !company.trim()
  ) {
    throw new Error("Company is required.");
  }

  if (
    typeof position !== "string" ||
    !position.trim()
  ) {
    throw new Error("Position is required.");
  }

  const normalizedCompany = company.trim();
  const normalizedPosition = position.trim();

  const normalizedLocation =
    typeof location === "string" && location.trim()
      ? location.trim()
      : null;

  const normalizedStartDate =
    typeof startDate === "string" && startDate
      ? new Date(startDate)
      : null;

  const normalizedEndDate =
    typeof endDate === "string" && endDate
      ? new Date(endDate)
      : null;

  const normalizedCurrent = current === "on";

  const normalizedDescription =
    typeof description === "string" && description.trim()
      ? description.trim()
      : null;

  await prisma.experience.create({
    data: {
      resumeId,
      company: normalizedCompany,
      position: normalizedPosition,
      location: normalizedLocation,
      startDate: normalizedStartDate,
      endDate: normalizedCurrent
        ? null
        : normalizedEndDate,
      current: normalizedCurrent,
      description: normalizedDescription,
    },
  });

  redirect(`/dashboard/resumes/${resumeId}`);
}

export async function createEducationAction(
  resumeId: string,
  formData: FormData
) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const institution = formData.get("institution");
  const degree = formData.get("degree");
  const fieldOfStudy = formData.get("fieldOfStudy");
  const location = formData.get("location");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const description = formData.get("description");

  if (
    typeof institution !== "string" ||
    !institution.trim()
  ) {
    throw new Error("Institution is required.");
  }

  const normalizedInstitution = institution.trim();

  const normalizedDegree =
    typeof degree === "string" && degree.trim()
      ? degree.trim()
      : null;

  const normalizedFieldOfStudy =
    typeof fieldOfStudy === "string" &&
    fieldOfStudy.trim()
      ? fieldOfStudy.trim()
      : null;

  const normalizedLocation =
    typeof location === "string" && location.trim()
      ? location.trim()
      : null;

  const normalizedStartDate =
    typeof startDate === "string" && startDate
      ? new Date(startDate)
      : null;

  const normalizedEndDate =
    typeof endDate === "string" && endDate
      ? new Date(endDate)
      : null;

  const normalizedDescription =
    typeof description === "string" &&
    description.trim()
      ? description.trim()
      : null;

  await prisma.education.create({
    data: {
      resumeId,
      institution: normalizedInstitution,
      degree: normalizedDegree,
      fieldOfStudy: normalizedFieldOfStudy,
      location: normalizedLocation,
      startDate: normalizedStartDate,
      endDate: normalizedEndDate,
      description: normalizedDescription,
    },
  });

  redirect(`/dashboard/resumes/${resumeId}`);
}

export async function createSkillAction(
  resumeId: string,
  formData: FormData
) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const name = formData.get("name");
  const level = formData.get("level");

  if (
    typeof name !== "string" ||
    !name.trim()
  ) {
    throw new Error("Skill name is required.");
  }

  const normalizedName = name.trim();

  const normalizedLevel =
    typeof level === "string" && level.trim()
      ? level.trim()
      : null;

  await prisma.skill.create({
    data: {
      resumeId,
      name: normalizedName,
      level: normalizedLevel,
    },
  });

  redirect(`/dashboard/resumes/${resumeId}`);
}

export async function createProjectAction(
  resumeId: string,
  formData: FormData
) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const name = formData.get("name");
  const description = formData.get("description");
  const url = formData.get("url");
  const technologies = formData.get("technologies");

  if (
    typeof name !== "string" ||
    !name.trim()
  ) {
    throw new Error("Project name is required.");
  }

  const normalizedName = name.trim();

  const normalizedDescription =
    typeof description === "string" &&
    description.trim()
      ? description.trim()
      : null;

  const normalizedUrl =
    typeof url === "string" && url.trim()
      ? url.trim()
      : null;

  const normalizedTechnologies =
    typeof technologies === "string" &&
    technologies.trim()
      ? technologies.trim()
      : null;

  await prisma.project.create({
    data: {
      resumeId,
      name: normalizedName,
      description: normalizedDescription,
      url: normalizedUrl,
      technologies: normalizedTechnologies,
    },
  });

  redirect(`/dashboard/resumes/${resumeId}`);
}

export async function deleteExperienceAction(
  resumeId: string,
  experienceId: string
) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const experience = await prisma.experience.findFirst({
    where: {
      id: experienceId,
      resumeId,
    },
  });

  if (!experience) {
    throw new Error("Experience not found.");
  }

  await prisma.experience.delete({
    where: {
      id: experienceId,
    },
  });

  redirect(`/dashboard/resumes/${resumeId}`);
}

export async function deleteEducationAction(
  resumeId: string,
  educationId: string
) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const education = await prisma.education.findFirst({
    where: {
      id: educationId,
      resumeId,
    },
  });

  if (!education) {
    throw new Error("Education not found.");
  }

  await prisma.education.delete({
    where: {
      id: educationId,
    },
  });

  redirect(`/dashboard/resumes/${resumeId}`);
}

export async function deleteSkillAction(
  resumeId: string,
  skillId: string
) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const skill = await prisma.skill.findFirst({
    where: {
      id: skillId,
      resumeId,
    },
  });

  if (!skill) {
    throw new Error("Skill not found.");
  }

  await prisma.skill.delete({
    where: {
      id: skillId,
    },
  });

  redirect(`/dashboard/resumes/${resumeId}`);
}

export async function deleteProjectAction(
  resumeId: string,
  projectId: string
) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      resumeId,
    },
  });

  if (!project) {
    throw new Error("Project not found.");
  }

  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  redirect(`/dashboard/resumes/${resumeId}`);
}

export async function updateExperienceAction(
  resumeId: string,
  experienceId: string,
  formData: FormData
) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const experience = await prisma.experience.findFirst({
    where: {
      id: experienceId,
      resumeId,
    },
  });

  if (!experience) {
    throw new Error("Experience not found.");
  }

  const company = formData.get("company");
  const position = formData.get("position");
  const location = formData.get("location");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const current = formData.get("current");
  const description = formData.get("description");

  if (
    typeof company !== "string" ||
    !company.trim()
  ) {
    throw new Error("Company is required.");
  }

  if (
    typeof position !== "string" ||
    !position.trim()
  ) {
    throw new Error("Position is required.");
  }

  const normalizedCompany = company.trim();
  const normalizedPosition = position.trim();

  const normalizedLocation =
    typeof location === "string" && location.trim()
      ? location.trim()
      : null;

  const normalizedStartDate =
    typeof startDate === "string" && startDate
      ? new Date(startDate)
      : null;

  const normalizedEndDate =
    typeof endDate === "string" && endDate
      ? new Date(endDate)
      : null;

  const normalizedCurrent =
    current === "on";

  const normalizedDescription =
    typeof description === "string" &&
    description.trim()
      ? description.trim()
      : null;

  await prisma.experience.update({
    where: {
      id: experienceId,
    },
    data: {
      company: normalizedCompany,
      position: normalizedPosition,
      location: normalizedLocation,
      startDate: normalizedStartDate,
      endDate: normalizedCurrent
        ? null
        : normalizedEndDate,
      current: normalizedCurrent,
      description: normalizedDescription,
    },
  });

  redirect(`/dashboard/resumes/${resumeId}`);
}

export async function updateEducationAction(
  resumeId: string,
  educationId: string,
  formData: FormData
) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const education = await prisma.education.findFirst({
    where: {
      id: educationId,
      resumeId,
    },
  });

  if (!education) {
    throw new Error("Education not found.");
  }

  const institution = formData.get("institution");
  const degree = formData.get("degree");
  const fieldOfStudy = formData.get("fieldOfStudy");
  const location = formData.get("location");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const description = formData.get("description");

  if (
    typeof institution !== "string" ||
    !institution.trim()
  ) {
    throw new Error("Institution is required.");
  }

  const normalizedInstitution =
    institution.trim();

  const normalizedDegree =
    typeof degree === "string" && degree.trim()
      ? degree.trim()
      : null;

  const normalizedFieldOfStudy =
    typeof fieldOfStudy === "string" &&
    fieldOfStudy.trim()
      ? fieldOfStudy.trim()
      : null;

  const normalizedLocation =
    typeof location === "string" && location.trim()
      ? location.trim()
      : null;

  const normalizedStartDate =
    typeof startDate === "string" && startDate
      ? new Date(startDate)
      : null;

  const normalizedEndDate =
    typeof endDate === "string" && endDate
      ? new Date(endDate)
      : null;

  const normalizedDescription =
    typeof description === "string" &&
    description.trim()
      ? description.trim()
      : null;

  await prisma.education.update({
    where: {
      id: educationId,
    },
    data: {
      institution: normalizedInstitution,
      degree: normalizedDegree,
      fieldOfStudy: normalizedFieldOfStudy,
      location: normalizedLocation,
      startDate: normalizedStartDate,
      endDate: normalizedEndDate,
      description: normalizedDescription,
    },
  });

  redirect(`/dashboard/resumes/${resumeId}`);
}

export async function updateSkillAction(
  resumeId: string,
  skillId: string,
  formData: FormData
) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const skill = await prisma.skill.findFirst({
    where: {
      id: skillId,
      resumeId,
    },
  });

  if (!skill) {
    throw new Error("Skill not found.");
  }

  const name = formData.get("name");
  const level = formData.get("level");

  if (
    typeof name !== "string" ||
    !name.trim()
  ) {
    throw new Error("Skill name is required.");
  }

  const normalizedName = name.trim();

  const normalizedLevel =
    typeof level === "string" && level.trim()
      ? level.trim()
      : null;

  await prisma.skill.update({
    where: {
      id: skillId,
    },
    data: {
      name: normalizedName,
      level: normalizedLevel,
    },
  });

  redirect(`/dashboard/resumes/${resumeId}`);
}

export async function updateProjectAction(
  resumeId: string,
  projectId: string,
  formData: FormData
) {
  const user = await requireUser();

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      resumeId,
    },
  });

  if (!project) {
    throw new Error("Project not found.");
  }

  const name = formData.get("name");
  const description = formData.get("description");
  const url = formData.get("url");
  const technologies = formData.get("technologies");

  if (
    typeof name !== "string" ||
    !name.trim()
  ) {
    throw new Error("Project name is required.");
  }

  const normalizedName = name.trim();

  const normalizedDescription =
    typeof description === "string" &&
    description.trim()
      ? description.trim()
      : null;

  const normalizedUrl =
    typeof url === "string" && url.trim()
      ? url.trim()
      : null;

  const normalizedTechnologies =
    typeof technologies === "string" &&
    technologies.trim()
      ? technologies.trim()
      : null;

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      name: normalizedName,
      description: normalizedDescription,
      url: normalizedUrl,
      technologies: normalizedTechnologies,
    },
  });

  redirect(`/dashboard/resumes/${resumeId}`);
}