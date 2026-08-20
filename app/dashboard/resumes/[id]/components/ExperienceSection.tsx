import { deleteExperienceAction, updateExperienceAction } from "../actions";

type ExperienceSectionProps = {
  experiences: {
    id: string;
    company: string;
    position: string;
    location: string | null;
    startDate: Date | null;
    endDate: Date | null;
    current: boolean;
    description: string | null;
  }[];
  resumeId: string;
  createExperience: (formData: FormData) => void | Promise<void>;
};

export default function ExperienceSection({
  experiences,
  resumeId,
  createExperience,
}: ExperienceSectionProps) {
  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-gray-900">
        Experience
      </h2>

      {experiences.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center">
          <p className="text-sm font-medium text-gray-700">
            No experience added yet.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Add your work experience to strengthen your resume.
          </p>
        </div>
      ) : (
        <div>
          {experiences.map((experience) => {
            const deleteExperience = deleteExperienceAction.bind(
              null,
              resumeId,
              experience.id,
            );

            const updateExperience = updateExperienceAction.bind(
              null,
              resumeId,
              experience.id,
            );

            return (
              <article
                key={experience.id}
                className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-5 last:mb-0"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {experience.position}
                </h3>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  {experience.company}
                  {experience.location ? ` — ${experience.location}` : ""}
                </p>

                <p className="mt-2 text-xs text-gray-500">
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
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                    {experience.description}
                  </p>
                )}

                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h4 className="mb-4 text-sm font-semibold text-gray-900">
                    Edit Experience
                  </h4>

                  <form action={updateExperience} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor={`company-${experience.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Company
                      </label>

                      <input
                        id={`company-${experience.id}`}
                        name="company"
                        type="text"
                        defaultValue={experience.company}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`position-${experience.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Position
                      </label>

                      <input
                        id={`position-${experience.id}`}
                        name="position"
                        type="text"
                        defaultValue={experience.position}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`location-${experience.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Location
                      </label>

                      <input
                        id={`location-${experience.id}`}
                        name="location"
                        type="text"
                        defaultValue={experience.location ?? ""}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`startDate-${experience.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Start Date
                      </label>

                      <input
                        id={`startDate-${experience.id}`}
                        name="startDate"
                        type="date"
                        defaultValue={
                          experience.startDate
                            ? experience.startDate.toISOString().slice(0, 10)
                            : ""
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`endDate-${experience.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        End Date
                      </label>

                      <input
                        id={`endDate-${experience.id}`}
                        name="endDate"
                        type="date"
                        defaultValue={
                          experience.endDate
                            ? experience.endDate.toISOString().slice(0, 10)
                            : ""
                        }
                        disabled={experience.current}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition disabled:bg-gray-100 disabled:text-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                      <input
                        id={`current-${experience.id}`}
                        name="current"
                        type="checkbox"
                        defaultChecked={experience.current}
                        className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-300"
                      />

                      <label
                        htmlFor={`current-${experience.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        I currently work here
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`description-${experience.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>

                      <textarea
                        id={`description-${experience.id}`}
                        name="description"
                        rows={6}
                        defaultValue={experience.description ?? ""}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <button
                      type="submit"
                      className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                      Save Changes
                    </button>
                  </form>

                  <form action={deleteExperience}>
                    <button type="submit">Delete</button>
                  </form>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <h3 className="mb-4 mt-8 text-sm font-semibold text-gray-900">
        Add Experience
      </h3>

      <form action={createExperience} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="company"
            className="text-sm font-medium text-gray-700"
          >
            Company
          </label>

          <input
            id="company"
            name="company"
            type="text"
            placeholder="e.g. PT Example Indonesia"
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="position"
            className="text-sm font-medium text-gray-700"
          >
            Position
          </label>

          <input
            id="position"
            name="position"
            type="text"
            placeholder="e.g. Software Engineer"
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="location"
            className="text-sm font-medium text-gray-700"
          >
            Location
          </label>

          <input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. Jakarta, Indonesia"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="startDate"
            className="text-sm font-medium text-gray-700"
          >
            Start Date
          </label>

          <input
            id="startDate"
            name="startDate"
            type="date"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="endDate"
            className="text-sm font-medium text-gray-700"
          >
            End Date
          </label>

          <input
            id="endDate"
            name="endDate"
            type="date"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
          <input
            id="current"
            name="current"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-300"
          />

          <label
            htmlFor="current"
            className="text-sm font-medium text-gray-700"
          >
            I currently work here
          </label>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={6}
            placeholder="Describe your responsibilities and achievements..."
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Add Experience
        </button>
      </form>
    </section>
  );
}
