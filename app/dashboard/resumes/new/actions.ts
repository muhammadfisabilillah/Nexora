"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { requireUser } from "../../../../lib/auth/session";

export async function createResumeAction(formData: FormData) {
  const user = await requireUser();

  const title = formData.get("title");
  const targetPosition = formData.get("targetPosition");

  if (
    typeof title !== "string" ||
    !title.trim()
  ) {
    throw new Error("Resume title is required.");
  }

  const normalizedTitle = title.trim();

  const normalizedTargetPosition =
    typeof targetPosition === "string" &&
    targetPosition.trim()
      ? targetPosition.trim()
      : null;

  const resume = await prisma.resume.create({
    data: {
      userId: user.id,
      title: normalizedTitle,
      targetPosition: normalizedTargetPosition,
    },
  });

  redirect(`/dashboard/resumes/${resume.id}`);
}