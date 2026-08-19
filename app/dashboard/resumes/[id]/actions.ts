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