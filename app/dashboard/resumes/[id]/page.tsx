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

      const updateExperience =
        updateExperienceAction.bind(
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

          <h4>Edit Experience</h4>

<form action={updateExperience}>
  <div>
    <label htmlFor={`company-${experience.id}`}>
      Company
    </label>

    <input
      id={`company-${experience.id}`}
      name="company"
      type="text"
      defaultValue={experience.company}
      required
    />
  </div>

  <div>
    <label htmlFor={`position-${experience.id}`}>
      Position
    </label>

    <input
      id={`position-${experience.id}`}
      name="position"
      type="text"
      defaultValue={experience.position}
      required
    />
  </div>

  <div>
    <label htmlFor={`location-${experience.id}`}>
      Location
    </label>

    <input
      id={`location-${experience.id}`}
      name="location"
      type="text"
      defaultValue={experience.location ?? ""}
    />
  </div>

  <div>
    <label htmlFor={`startDate-${experience.id}`}>
      Start Date
    </label>

    <input
      id={`startDate-${experience.id}`}
      name="startDate"
      type="date"
      defaultValue={
        experience.startDate
          ? experience.startDate
              .toISOString()
              .slice(0, 10)
          : ""
      }
    />
  </div>

  <div>
    <label htmlFor={`endDate-${experience.id}`}>
      End Date
    </label>

    <input
      id={`endDate-${experience.id}`}
      name="endDate"
      type="date"
      defaultValue={
        experience.endDate
          ? experience.endDate
              .toISOString()
              .slice(0, 10)
          : ""
      }
    />
  </div>

  <div>
    <label>
      <input
        name="current"
        type="checkbox"
        defaultChecked={experience.current}
      />
      I currently work here
    </label>
  </div>

  <div>
    <label htmlFor={`description-${experience.id}`}>
      Description
    </label>

    <textarea
      id={`description-${experience.id}`}
      name="description"
      rows={6}
      defaultValue={
        experience.description ?? ""
      }
    />
  </div>

  <button type="submit">
    Save Changes
  </button>
</form>

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

   const updateEducation =
  updateEducationAction.bind(
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

        <h4>Edit Education</h4>

<form action={updateEducation}>
  <div>
    <label htmlFor={`institution-${education.id}`}>
      Institution
    </label>

    <input
      id={`institution-${education.id}`}
      name="institution"
      type="text"
      defaultValue={education.institution}
      required
    />
  </div>

  <div>
    <label htmlFor={`degree-${education.id}`}>
      Degree
    </label>

    <input
      id={`degree-${education.id}`}
      name="degree"
      type="text"
      defaultValue={education.degree ?? ""}
    />
  </div>

  <div>
    <label htmlFor={`fieldOfStudy-${education.id}`}>
      Field of Study
    </label>

    <input
      id={`fieldOfStudy-${education.id}`}
      name="fieldOfStudy"
      type="text"
      defaultValue={
        education.fieldOfStudy ?? ""
      }
    />
  </div>

  <div>
    <label htmlFor={`location-${education.id}`}>
      Location
    </label>

    <input
      id={`location-${education.id}`}
      name="location"
      type="text"
      defaultValue={education.location ?? ""}
    />
  </div>

  <div>
    <label htmlFor={`startDate-${education.id}`}>
      Start Date
    </label>

    <input
      id={`startDate-${education.id}`}
      name="startDate"
      type="date"
      defaultValue={
        education.startDate
          ? education.startDate
              .toISOString()
              .slice(0, 10)
          : ""
      }
    />
  </div>

  <div>
    <label htmlFor={`endDate-${education.id}`}>
      End Date
    </label>

    <input
      id={`endDate-${education.id}`}
      name="endDate"
      type="date"
      defaultValue={
        education.endDate
          ? education.endDate
              .toISOString()
              .slice(0, 10)
          : ""
      }
    />
  </div>

  <div>
    <label htmlFor={`description-${education.id}`}>
      Description
    </label>

    <textarea
      id={`description-${education.id}`}
      name="description"
      rows={6}
      defaultValue={
        education.description ?? ""
      }
    />
  </div>

  <button type="submit">
    Save Changes
  </button>
</form>

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
  const updateSkill =
  updateSkillAction.bind(
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
    <h4>Edit Skill</h4>

<form action={updateSkill}>
  <div>
    <label htmlFor={`skill-name-${skill.id}`}>
      Skill Name
    </label>

    <input
      id={`skill-name-${skill.id}`}
      name="name"
      type="text"
      defaultValue={skill.name}
      required
    />
  </div>

  <div>
    <label htmlFor={`skill-level-${skill.id}`}>
      Level
    </label>

    <input
      id={`skill-level-${skill.id}`}
      name="level"
      type="text"
      defaultValue={skill.level ?? ""}
      placeholder="e.g. Beginner, Intermediate, Advanced"
    />
  </div>

  <button type="submit">
    Save Changes
  </button>
</form>

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

const updateProject =
  updateProjectAction.bind(
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

        <h4>Edit Project</h4>

<form action={updateProject}>
  <div>
    <label htmlFor={`project-name-${project.id}`}>
      Project Name
    </label>

    <input
      id={`project-name-${project.id}`}
      name="name"
      type="text"
      defaultValue={project.name}
      required
    />
  </div>

  <div>
    <label htmlFor={`project-description-${project.id}`}>
      Description
    </label>

    <textarea
      id={`project-description-${project.id}`}
      name="description"
      rows={5}
      defaultValue={project.description ?? ""}
    />
  </div>

  <div>
    <label htmlFor={`project-url-${project.id}`}>
      Project URL
    </label>

    <input
      id={`project-url-${project.id}`}
      name="url"
      type="url"
      defaultValue={project.url ?? ""}
    />
  </div>

  <div>
    <label htmlFor={`project-technologies-${project.id}`}>
      Technologies
    </label>

    <input
      id={`project-technologies-${project.id}`}
      name="technologies"
      type="text"
      defaultValue={
        project.technologies ?? ""
      }
    />
  </div>

  <button type="submit">
    Save Changes
  </button>
</form>

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
