import { notFound, redirect } from "next/navigation";

import { getCurrentUser } from "../../../../../lib/auth/session";
import { prisma } from "../../../../../lib/prisma";

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
      <div className="mx-auto w-full max-w-4xl bg-white px-8 py-10 shadow-sm">
        <header className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {resume.profile?.fullName ?? resume.title}
          </h1>

          {resume.profile?.headline && (
            <p className="mt-2 text-lg text-gray-600">
              {resume.profile.headline}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
            {resume.profile?.phone && <span>{resume.profile.phone}</span>}
            {resume.profile?.location && (
              <span>{resume.profile.location}</span>
            )}
            {resume.profile?.website && (
              <span>{resume.profile.website}</span>
            )}
          </div>
        </header>

        {resume.profile?.summary && (
          <section className="mt-8">
            <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-900">
              Summary
            </h2>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">
              {resume.profile.summary}
            </p>
          </section>
        )}

        <section className="mt-8">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-900">
            Experience
          </h2>

          {resume.experiences.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">
              No experience added.
            </p>
          ) : (
            <div className="mt-4 space-y-6">
              {resume.experiences.map((experience) => (
                <article key={experience.id}>
                  <h3 className="font-semibold text-gray-900">
                    {experience.position}
                  </h3>

                  <p className="text-sm text-gray-700">
                    {experience.company}
                    {experience.location
                      ? ` — ${experience.location}`
                      : ""}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {experience.startDate
                      ? experience.startDate.toLocaleDateString()
                      : "Start date not specified"}
                    {" — "}
                    {experience.current
                      ? "Present"
                      : experience.endDate
                        ? experience.endDate.toLocaleDateString()
                        : "End date not specified"}
                  </p>

                  {experience.description && (
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                      {experience.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-900">
            Education
          </h2>

          {resume.education.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">
              No education added.
            </p>
          ) : (
            <div className="mt-4 space-y-6">
              {resume.education.map((education) => (
                <article key={education.id}>
                  <h3 className="font-semibold text-gray-900">
                    {education.institution}
                  </h3>

                  {(education.degree || education.fieldOfStudy) && (
                    <p className="text-sm text-gray-700">
                      {[education.degree, education.fieldOfStudy]
                        .filter(Boolean)
                        .join(" — ")}
                    </p>
                  )}

                  {education.location && (
                    <p className="text-sm text-gray-600">
                      {education.location}
                    </p>
                  )}

                  {education.description && (
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                      {education.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-900">
            Skills
          </h2>

          {resume.skills.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">
              No skills added.
            </p>
          ) : (
            <div className="mt-4 flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700"
                >
                  {skill.name}
                  {skill.level ? ` — ${skill.level}` : ""}
                </span>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-900">
            Projects
          </h2>

          {resume.projects.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">
              No projects added.
            </p>
          ) : (
            <div className="mt-4 space-y-6">
              {resume.projects.map((project) => (
                <article key={project.id}>
                  <h3 className="font-semibold text-gray-900">
                    {project.name}
                  </h3>

                  {project.technologies && (
                    <p className="text-sm text-gray-700">
                      {project.technologies}
                    </p>
                  )}

                  {project.description && (
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                      {project.description}
                    </p>
                  )}

                  {project.url && (
                    <p className="mt-2 text-sm text-gray-600">
                      {project.url}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
