type ProjectsSectionProps = {
  projects: {
    id: string;
    name: string;
    description: string | null;
    url: string | null;
    technologies: string | null;
  }[];
  resumeId: string;
  createProject: (formData: FormData) => void | Promise<void>;
  deleteProjectAction: (
    resumeId: string,
    projectId: string,
  ) => void | Promise<void>;
  updateProjectAction: (
    resumeId: string,
    projectId: string,
    formData: FormData,
  ) => void | Promise<void>;
};

export default function ProjectsSection({
  projects,
  resumeId,
  createProject,
  deleteProjectAction,
  updateProjectAction,
}: ProjectsSectionProps) {
  return (
    <section>
      <h2>Projects</h2>

      {projects.length === 0 ? (
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
          {projects.map((project) => {
            const deleteProject = deleteProjectAction.bind(
              null,
              resumeId,
              project.id,
            );

            const updateProject = updateProjectAction.bind(
              null,
              resumeId,
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
                  <p className="mt-2 text-sm">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-900 underline"
                    >
                      View Project
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
                        placeholder="https://..."
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
  );
}
