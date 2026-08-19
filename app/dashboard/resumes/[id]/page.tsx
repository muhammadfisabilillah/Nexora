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
  }
);

  if (!resume) {
    notFound();
  }

  const updateProfile =
    updateResumeProfileAction.bind(null, resume.id);

    const createExperience =
  createExperienceAction.bind(null, resume.id);

    const createEducation =
  createEducationAction.bind(null, resume.id);

    const createSkill =
  createSkillAction.bind(null, resume.id);

  const createProject =
  createProjectAction.bind(null, resume.id);

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
    {resume.experiences.map((experience) => {
      const deleteExperience =
        deleteExperienceAction.bind(
          null,
          resume.id,
          experience.id
        );

      return (
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

          <form action={deleteExperience}>
            <button type="submit">
              Delete
            </button>
          </form>
        </article>
      );
    })}
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
  <h2>Education</h2>

  {resume.education.length === 0 ? (
    <p>
      No education added yet.
    </p>
  ) : (
<div>
  {resume.education.map((education) => {
    const deleteEducation =
      deleteEducationAction.bind(
        null,
        resume.id,
        education.id
      );

    return (
      <article key={education.id}>
        <h3>{education.institution}</h3>

        <p>
          {education.degree ?? "Degree not specified"}
          {education.fieldOfStudy
            ? ` — ${education.fieldOfStudy}`
            : ""}
        </p>

        {education.location && (
          <p>{education.location}</p>
        )}

        <p>
          {education.startDate
            ? education.startDate.toLocaleDateString()
            : "Start date not specified"}
          {" — "}
          {education.endDate
            ? education.endDate.toLocaleDateString()
            : "Present"}
        </p>

        {education.description && (
          <p>{education.description}</p>
        )}

        <form action={deleteEducation}>
          <button type="submit">
            Delete
          </button>
        </form>
      </article>
    );
  })}
</div>
)}
  <h3>Add Education</h3>

  <form action={createEducation}>
    <div>
      <label htmlFor="institution">
        Institution
      </label>

      <input
        id="institution"
        name="institution"
        type="text"
        placeholder="e.g. Telkom University"
        required
      />
    </div>

    <div>
      <label htmlFor="degree">
        Degree
      </label>

      <input
        id="degree"
        name="degree"
        type="text"
        placeholder="e.g. Bachelor of Information Systems"
      />
    </div>

    <div>
      <label htmlFor="fieldOfStudy">
        Field of Study
      </label>

      <input
        id="fieldOfStudy"
        name="fieldOfStudy"
        type="text"
        placeholder="e.g. Information Systems"
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
        placeholder="e.g. Bandung, Indonesia"
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
      <label htmlFor="description">
        Description
      </label>

      <textarea
        id="description"
        name="description"
        rows={5}
        placeholder="Describe your education, achievements, coursework, or activities..."
      />
    </div>

    <button type="submit">
      Add Education
    </button>
  </form>
</section>

  <section>
  <h2>Skills</h2>

  {resume.skills.length === 0 ? (
    <p>
      No skills added yet.
    </p>
  ) : (
<div>
  {resume.skills.map((skill) => {
    const deleteSkill =
      deleteSkillAction.bind(
        null,
        resume.id,
        skill.id
      );

    return (
      <article key={skill.id}>
        <h3>{skill.name}</h3>

        {skill.level && (
          <p>
            Level: {skill.level}
          </p>
        )}

        <form action={deleteSkill}>
          <button type="submit">
            Delete
          </button>
        </form>
      </article>
    );
  })}
</div>
)}

  <h3>Add Skill</h3>

  <form action={createSkill}>
    <div>
      <label htmlFor="name">
        Skill
      </label>

      <input
        id="name"
        name="name"
        type="text"
        placeholder="e.g. TypeScript"
        required
      />
    </div>

    <div>
      <label htmlFor="level">
        Level
      </label>

      <select
        id="level"
        name="level"
        defaultValue=""
      >
        <option value="">
          Select level
        </option>
        <option value="Beginner">
          Beginner
        </option>
        <option value="Intermediate">
          Intermediate
        </option>
        <option value="Advanced">
          Advanced
        </option>
      </select>
    </div>

    <button type="submit">
      Add Skill
    </button>
  </form>
</section>

<section>
  <h2>Projects</h2>

  {resume.projects.length === 0 ? (
    <p>
      No projects added yet.
    </p>
  ) : (
<div>
  {resume.projects.map((project) => {
    const deleteProject =
      deleteProjectAction.bind(
        null,
        resume.id,
        project.id
      );

    return (
      <article key={project.id}>
        <h3>{project.name}</h3>

        {project.description && (
          <p>{project.description}</p>
        )}

        {project.technologies && (
          <p>
            Technologies: {project.technologies}
          </p>
        )}

        {project.url && (
          <p>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              Project Link
            </a>
          </p>
        )}

        <form action={deleteProject}>
          <button type="submit">
            Delete
          </button>
        </form>
      </article>
    );
  })}
</div>
)}

  <h3>Add Project</h3>

  <form action={createProject}>
    <div>
      <label htmlFor="project-name">
        Project Name
      </label>

      <input
        id="project-name"
        name="name"
        type="text"
        placeholder="e.g. Nexora"
        required
      />
    </div>

    <div>
      <label htmlFor="project-description">
        Description
      </label>

      <textarea
        id="project-description"
        name="description"
        rows={5}
        placeholder="Describe the project..."
      />
    </div>

    <div>
      <label htmlFor="project-url">
        Project URL
      </label>

      <input
        id="project-url"
        name="url"
        type="url"
        placeholder="https://..."
      />
    </div>

    <div>
      <label htmlFor="project-technologies">
        Technologies
      </label>

      <input
        id="project-technologies"
        name="technologies"
        type="text"
        placeholder="e.g. Next.js, Prisma, PostgreSQL"
      />
    </div>

    <button type="submit">
      Add Project
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
