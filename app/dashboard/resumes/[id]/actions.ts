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