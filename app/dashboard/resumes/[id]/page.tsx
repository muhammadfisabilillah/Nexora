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
  deleteExperienceAction,
  deleteProjectAction,
  deleteSkillAction,
  updateEducationAction,
  updateExperienceAction,
  updateProjectAction,
  updateResumeProfileAction,
  updateSkillAction,
} from "./actions";
import ResumeProfileSection from "./components/ResumeProfileSection";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";

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


        <section>
          <h2>Skills</h2>

          {resume.skills.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center">
              <p className="text-sm font-medium text-gray-700">
                No skills added yet.
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Add your skills to strengthen your resume.
              </p>
            </div>
          ) : (
            <div>
              {resume.skills.map((skill) => {
                const deleteSkill = deleteSkillAction.bind(
                  null,
                  resume.id,
                  skill.id,
                );
                const updateSkill = updateSkillAction.bind(
                  null,
                  resume.id,
                  skill.id,
                );

                return (
                  <article
                    key={skill.id}
                    className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-5 last:mb-0"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {skill.name}
                    </h3>

                    {skill.level && (
                      <p className="mt-1 text-sm text-gray-600">
                        Level: {skill.level}
                      </p>
                    )}
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <h4 className="mb-4 text-sm font-semibold text-gray-900">
                        Edit Skill
                      </h4>

                      <form action={updateSkill} className="space-y-4">
                        <div className="space-y-2">
                          <label
                            htmlFor={`skill-name-${skill.id}`}
                            className="text-sm font-medium text-gray-700"
                          >
                            Skill Name
                          </label>

                          <input
                            id={`skill-name-${skill.id}`}
                            name="name"
                            type="text"
                            defaultValue={skill.name}
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor={`skill-level-${skill.id}`}
                            className="text-sm font-medium text-gray-700"
                          >
                            Level
                          </label>

                          <input
                            id={`skill-level-${skill.id}`}
                            name="level"
                            type="text"
                            defaultValue={skill.level ?? ""}
                            placeholder="e.g. Beginner, Intermediate, Advanced"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                          />
                        </div>

                        <button
                          type="submit"
                          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                          Save Changes
                        </button>
                      </form>
                    </div>

                    <form action={deleteSkill}>
                      <button
                        type="submit"
                        className="mt-3 text-sm font-medium text-red-600 transition hover:text-red-700"
                      >
                        Delete Skill
                      </button>
                    </form>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Add Skill
            </h3>

            <form action={createSkill} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Skill
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. TypeScript"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="level"
                  className="text-sm font-medium text-gray-700"
                >
                  Level
                </label>

                <select
                  id="level"
                  name="level"
                  defaultValue=""
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Add Skill
              </button>
            </form>
          </div>
        </section>

        <section>
          <h2>Projects</h2>

          {resume.projects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center">
              <p className="text-sm font-medium text-gray-700">
                No projects added yet.
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Add your projects to showcase your experience and skills.
              </p>
            </div>
          ) : (
            <div>
              {resume.projects.map((project) => {
                const deleteProject = deleteProjectAction.bind(
                  null,
                  resume.id,
                  project.id,
                );

                const updateProject = updateProjectAction.bind(
                  null,
                  resume.id,
                  project.id,
                );

                return (
                  <article
                    key={project.id}
                    className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-5 last:mb-0"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.name}
                    </h3>

                    {project.description && (
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {project.description}
                      </p>
                    )}

                    {project.technologies && (
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-medium text-gray-700">
                          Technologies:
                        </span>{" "}
                        {project.technologies}
                      </p>
                    )}

                    {project.url && (
                      <p className="mt-2">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-gray-900 underline underline-offset-4 transition hover:text-gray-600"
                        >
                          Project Link
                        </a>
                      </p>
                    )}

                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <h4 className="mb-4 text-sm font-semibold text-gray-900">
                        Edit Project
                      </h4>

                      <form action={updateProject} className="space-y-4">
                        <div className="space-y-2">
                          <label
                            htmlFor={`project-name-${project.id}`}
                            className="text-sm font-medium text-gray-700"
                          >
                            Project Name
                          </label>

                          <input
                            id={`project-name-${project.id}`}
                            name="name"
                            type="text"
                            defaultValue={project.name}
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor={`project-description-${project.id}`}
                            className="text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>

                          <textarea
                            id={`project-description-${project.id}`}
                            name="description"
                            rows={5}
                            defaultValue={project.description ?? ""}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor={`project-url-${project.id}`}
                            className="text-sm font-medium text-gray-700"
                          >
                            Project URL
                          </label>

                          <input
                            id={`project-url-${project.id}`}
                            name="url"
                            type="url"
                            defaultValue={project.url ?? ""}
                            placeholder="https://example.com"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor={`project-technologies-${project.id}`}
                            className="text-sm font-medium text-gray-700"
                          >
                            Technologies
                          </label>

                          <input
                            id={`project-technologies-${project.id}`}
                            name="technologies"
                            type="text"
                            defaultValue={project.technologies ?? ""}
                            placeholder="e.g. Next.js, Prisma, PostgreSQL"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                          />
                        </div>

                        <button
                          type="submit"
                          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                          Save Changes
                        </button>
                      </form>
                    </div>

                    <form action={deleteProject}>
                      <button
                        type="submit"
                        className="mt-3 text-sm font-medium text-red-600 transition hover:text-red-700"
                      >
                        Delete Project
                      </button>
                    </form>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Add Project
            </h3>

            <form action={createProject} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="project-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Project Name
                </label>

                <input
                  id="project-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Nexora"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="project-description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </label>

                <textarea
                  id="project-description"
                  name="description"
                  rows={5}
                  placeholder="Describe the project..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="project-url"
                  className="text-sm font-medium text-gray-700"
                >
                  Project URL
                </label>

                <input
                  id="project-url"
                  name="url"
                  type="url"
                  placeholder="https://..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="project-technologies"
                  className="text-sm font-medium text-gray-700"
                >
                  Technologies
                </label>

                <input
                  id="project-technologies"
                  name="technologies"
                  type="text"
                  placeholder="e.g. Next.js, Prisma, PostgreSQL"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Add Project
              </button>
            </form>
          </div>
        </section>

        <section>
          <h2>AI Analysis</h2>

          <p>AI-powered resume analysis will be implemented here.</p>
        </section>
      </div>
    </main>
  );
}
