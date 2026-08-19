import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "../../../../lib/auth/session";
import { prisma } from "../../../../lib/prisma";

type ResumePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ResumePage({
  params,
}: ResumePageProps) {
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
  });

  if (!resume) {
    notFound();
  }

  return (
    <main>
      <header>
        <Link href="/dashboard">
          ← Back to Dashboard
        </Link>
      </header>

      <section>
        <h1>{resume.title}</h1>

        <p>
          Target Position:{" "}
          {resume.targetPosition ?? "Not specified"}
        </p>
      </section>

      <section>
        <h2>Resume Workspace</h2>

        <p>
          Your resume workspace is ready.
        </p>
      </section>

      <section>
        <h2>Resume Builder</h2>

        <p>
          Resume content builder will be implemented here.
        </p>
      </section>

      <section>
        <h2>AI Analysis</h2>

        <p>
          AI-powered resume analysis will be implemented here.
        </p>
      </section>
    </main>
  );
}