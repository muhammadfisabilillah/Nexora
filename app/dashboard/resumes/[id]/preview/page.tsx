import { notFound, redirect } from "next/navigation";

import { getCurrentUser } from "../../../../../lib/auth/session";
import { prisma } from "../../../../../lib/prisma";
import ResumePreview from "./components/ResumePreview";

type ResumePreviewPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ResumePreviewPage({
  params,
}: ResumePreviewPageProps) {

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const resume = await prisma.resume.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      profile: true,
      experiences: {
        orderBy: {
          startDate: "desc",
        },
      },
      education: {
        orderBy: {
          startDate: "desc",
        },
      },
      skills: {
        orderBy: {
          name: "asc",
        },
      },
      projects: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  if (!resume) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <ResumePreview resume={resume} />
    </main>
  );
}
