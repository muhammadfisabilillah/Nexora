type EducationSectionProps = {
  education: {
    id: string;
    institution: string;
    degree: string | null;
    fieldOfStudy: string | null;
    location: string | null;
    startDate: Date | null;
    endDate: Date | null;
    description: string | null;
  }[];
  resumeId: string;
  createEducation: (formData: FormData) => void | Promise<void>;
  deleteEducationAction: (
    resumeId: string,
    educationId: string,
  ) => void | Promise<void>;
  updateEducationAction: (
    resumeId: string,
    educationId: string,
    formData: FormData,
  ) => void | Promise<void>;
};

export default function EducationSection({
  education,
  resumeId,
  createEducation,
  deleteEducationAction,
  updateEducationAction,
}: EducationSectionProps) {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-gray-900">
        Education
      </h2>

      {education.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center">
          <p className="text-sm font-medium text-gray-700">
            No education added yet.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Add your educational background to strengthen your resume.
          </p>
        </div>
      ) : (
        <div>
          {education.map((education) => {
            const deleteEducation = deleteEducationAction.bind(
              null,
              resumeId,
              education.id,
            );

            const updateEducation = updateEducationAction.bind(
              null,
              resumeId,
              education.id,
            );

            return (
              <article
                key={education.id}
                className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-5 last:mb-0"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {education.institution}
                </h3>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  {education.degree ?? "Degree not specified"}
                  {education.fieldOfStudy ? ` — ${education.fieldOfStudy}` : ""}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  {education.startDate
                    ? education.startDate.toLocaleDateString()
                    : "Start date not specified"}
                  {" — "}
                  {education.endDate
                    ? education.endDate.toLocaleDateString()
                    : "Present"}
                </p>

                {education.description && (
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                    {education.description}
                  </p>
                )}

                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h4 className="mb-4 text-sm font-semibold text-gray-900">
                    Edit Education
                  </h4>

                  <form action={updateEducation} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor={`institution-${education.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Institution
                      </label>

                      <input
                        id={`institution-${education.id}`}
                        name="institution"
                        type="text"
                        defaultValue={education.institution}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`degree-${education.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Degree
                      </label>

                      <input
                        id={`degree-${education.id}`}
                        name="degree"
                        type="text"
                        defaultValue={education.degree ?? ""}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`fieldOfStudy-${education.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Field of Study
                      </label>

                      <input
                        id={`fieldOfStudy-${education.id}`}
                        name="fieldOfStudy"
                        type="text"
                        defaultValue={education.fieldOfStudy ?? ""}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`location-${education.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Location
                      </label>

                      <input
                        id={`location-${education.id}`}
                        name="location"
                        type="text"
                        defaultValue={education.location ?? ""}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`startDate-${education.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Start Date
                      </label>

                      <input
                        id={`startDate-${education.id}`}
                        name="startDate"
                        type="date"
                        defaultValue={
                          education.startDate
                            ? education.startDate.toISOString().slice(0, 10)
                            : ""
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`endDate-${education.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        End Date
                      </label>

                      <input
                        id={`endDate-${education.id}`}
                        name="endDate"
                        type="date"
                        defaultValue={
                          education.endDate
                            ? education.endDate.toISOString().slice(0, 10)
                            : ""
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`description-${education.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>

                      <textarea
                        id={`description-${education.id}`}
                        name="description"
                        rows={6}
                        defaultValue={education.description ?? ""}
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

                  <form action={deleteEducation}>
                    <button
                      type="submit"
                      className="mt-3 text-sm font-medium text-red-600 transition hover:text-red-700"
                    >
                      Delete Education
                    </button>
                  </form>
                </div>
              </article>
            );
          })}
        </div>
      )}
      <h3>Add Education</h3>

      <form action={createEducation}>
        <div className="space-y-2">
          <label
            htmlFor="institution"
            className="text-sm font-medium text-gray-700"
          >
            Institution
          </label>

          <input
            id="institution"
            name="institution"
            type="text"
            placeholder="e.g. Telkom University"
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="degree" className="text-sm font-medium text-gray-700">
            Degree
          </label>

          <input
            id="degree"
            name="degree"
            type="text"
            placeholder="e.g. Bachelor of Information Systems"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="fieldOfStudy"
            className="text-sm font-medium text-gray-700"
          >
            Field of Study
          </label>

          <input
            id="fieldOfStudy"
            name="fieldOfStudy"
            type="text"
            placeholder="e.g. Information Systems"
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
            placeholder="e.g. Bandung, Indonesia"
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
            rows={5}
            placeholder="Describe your education, achievements, coursework, or activities..."
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Add Education
        </button>
      </form>
    </section>
  );
}
