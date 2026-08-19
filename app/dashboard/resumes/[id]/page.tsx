import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "../../../../lib/auth/session";
import { prisma } from "../../../../lib/prisma";
import {
  createExperienceAction,
  updateResumeProfileAction,
} from "./actions";

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
    include: {
      profile: true,
      experiences: {
        orderBy: {
            startDate: "desc",
            },
      }
    },
  });

  if (!resume) {
    notFound();
  }

  const updateProfile =
    updateResumeProfileAction.bind(null, resume.id);

    const createExperience =
  createExperienceAction.bind(null, resume.id);

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
        <h2>Resume Profile</h2>

        <form action={updateProfile}>
          <div>
            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              defaultValue={
                resume.profile?.fullName ?? ""
              }
              placeholder="e.g. Muhammad Fisabilillah"
            />
          </div>

          <div>
            <label htmlFor="headline">
              Professional Headline
            </label>

            <input
              id="headline"
              name="headline"
              type="text"
              defaultValue={
                resume.profile?.headline ?? ""
              }
              placeholder="e.g. Information Systems Student"
            />
          </div>

          <div>
            <label htmlFor="phone">
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={
                resume.profile?.phone ?? ""
              }
              placeholder="e.g. +62..."
            />
          </div>

          <div>
            <label htmlFor="location">
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              defaultValue={
                resume.profile?.location ?? ""
              }
              placeholder="e.g. Bandung, Indonesia"
            />
          </div>

          <div>
            <label htmlFor="website">
              Website
            </label>

            <input
              id="website"
              name="website"
              type="url"
              defaultValue={
                resume.profile?.website ?? ""
              }
              placeholder="https://..."
            />
          </div>

          <div>
            <label htmlFor="summary">
              Professional Summary
            </label>

            <textarea
              id="summary"
              name="summary"
              rows={6}
              defaultValue={
                resume.profile?.summary ?? ""
              }
              placeholder="Write a short professional summary..."
            />
          </div>

          <button type="submit">
            Save Profile
          </button>
        </form>
      </section>

<section>
  <h2>Experience</h2>

  {resume.experiences.length === 0 ? (
    <p>
      No experience added yet.
    </p>
  ) : (
    <div>
      {resume.experiences.map((experience) => (
        <article key={experience.id}>
          <h3>{experience.position}</h3>

          <p>
            {experience.company}
            {experience.location
              ? ` — ${experience.location}`
              : ""}
          </p>

          <p>
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
            <p>{experience.description}</p>
          )}
        </article>
      ))}
    </div>
  )}

  <h3>Add Experience</h3>

  <form action={createExperience}>
    <div>
      <label htmlFor="company">
        Company
      </label>

      <input
        id="company"
        name="company"
        type="text"
        placeholder="e.g. PT Example Indonesia"
        required
      />
    </div>

    <div>
      <label htmlFor="position">
        Position
      </label>

      <input
        id="position"
        name="position"
        type="text"
        placeholder="e.g. Software Engineer"
        required
      />
    </div>

    <div>
      <label htmlFor="location">
        Location
      </label>

      <input
        id="location"
        name="location"
        type="text"
        placeholder="e.g. Jakarta, Indonesia"
      />
    </div>

    <div>
      <label htmlFor="startDate">
        Start Date
      </label>

      <input
        id="startDate"
        name="startDate"
        type="date"
      />
    </div>

    <div>
      <label htmlFor="endDate">
        End Date
      </label>

      <input
        id="endDate"
        name="endDate"
        type="date"
      />
    </div>

    <div>
      <label>
        <input
          name="current"
          type="checkbox"
        />
        I currently work here
      </label>
    </div>

    <div>
      <label htmlFor="description">
        Description
      </label>

      <textarea
        id="description"
        name="description"
        rows={6}
        placeholder="Describe your responsibilities and achievements..."
      />
    </div>

        <button type="submit">
        Add Experience
        </button>
    </form>
    </section>

    <section>
    <h2>AI Analysis</h2>

    <p>
        AI-powered resume analysis will be
        implemented here.
    </p>
    </section>
    </main>
    );
}
