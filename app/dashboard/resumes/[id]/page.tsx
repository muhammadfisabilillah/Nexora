import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "../../../../lib/auth/session";
import { prisma } from "../../../../lib/prisma";
import {
  createEducationAction,
  createExperienceAction,
  createProjectAction,
  createSkillAction,
  deleteEducationAction,
  deleteProjectAction,
  deleteSkillAction,
  updateEducationAction,
  updateProjectAction,
  updateResumeProfileAction,
  updateSkillAction,
} from "./actions";
import ResumeProfileSection from "./components/ResumeProfileSection";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";

type ResumePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ResumePage({ params }: ResumePageProps) {
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

  const updateProfile = updateResumeProfileAction.bind(null, resume.id);

  const createExperience = createExperienceAction.bind(null, resume.id);

  const createEducation = createEducationAction.bind(null, resume.id);

  const createSkill = createSkillAction.bind(null, resume.id);

  const createProject = createProjectAction.bind(null, resume.id);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            ← Back to Dashboard
          </Link>
        </header>

        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Resume</p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {resume.title}
            </h1>

            <p className="text-sm text-gray-600">
              Target Position:{" "}
              <span className="font-medium text-gray-900">
                {resume.targetPosition ?? "Not specified"}
              </span>
            </p>
          </div>
        </section>

<ResumeProfileSection
  profile={resume.profile}
  updateProfile={updateProfile}
/>

<ExperienceSection
  experiences={resume.experiences}
  resumeId={resume.id}
  createExperience={createExperience}
/>

<EducationSection
  education={resume.education}
  resumeId={resume.id}
  createEducation={createEducation}
  deleteEducationAction={deleteEducationAction}
  updateEducationAction={updateEducationAction}
/>


        <SkillsSection
          skills={resume.skills}
          resumeId={resume.id}
          createSkill={createSkill}
          deleteSkillAction={deleteSkillAction}
          updateSkillAction={updateSkillAction}
        />


        <ProjectsSection
          projects={resume.projects}
          resumeId={resume.id}
          createProject={createProject}
          deleteProjectAction={deleteProjectAction}
          updateProjectAction={updateProjectAction}
        />


        <section>
          <h2>AI Analysis</h2>

          <p>AI-powered resume analysis will be implemented here.</p>
        </section>
      </div>
    </main>
  );
}
