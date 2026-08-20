type SkillsSectionProps = {
  skills: {
    id: string;
    name: string;
    level: string | null;
  }[];
  resumeId: string;
  createSkill: (formData: FormData) => void | Promise<void>;
  deleteSkillAction: (
    resumeId: string,
    skillId: string,
  ) => void | Promise<void>;
  updateSkillAction: (
    resumeId: string,
    skillId: string,
    formData: FormData,
  ) => void | Promise<void>;
};

export default function SkillsSection({
  skills,
  resumeId,
  createSkill,
  deleteSkillAction,
  updateSkillAction,
}: SkillsSectionProps) {
  return (
    <section>
      <h2>Skills</h2>

      {skills.length === 0 ? (
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
          {skills.map((skill) => {
            const deleteSkill = deleteSkillAction.bind(
              null,
              resumeId,
              skill.id,
            );

            const updateSkill = updateSkillAction.bind(
              null,
              resumeId,
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
  );
}
