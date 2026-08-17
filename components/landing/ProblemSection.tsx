export default function ProblemSection() {
  const problems = [
    {
      number: "01",
      title: "Is my resume good enough?",
      description:
        "Students and fresh graduates often struggle to know whether their resume is ready for an internship or job application.",
    },
    {
      number: "02",
      title: "What should I improve?",
      description:
        "Knowing what to change can be difficult when you don't have clear feedback about your resume.",
    },
    {
      number: "03",
      title: "Does it match the position?",
      description:
        "A resume can contain good experience but still fail to communicate why you are relevant for a specific position.",
    },
  ];

  return (
    <section className="border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            The problem
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
            Your experience matters. Your resume should show it.
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Creating a resume can be overwhelming when you are still figuring
            out how to present your experience and make it relevant.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {problems.map((problem) => (
            <article
              key={problem.number}
              className="rounded-2xl border border-neutral-200 p-6"
            >
              <span className="text-sm font-medium text-neutral-400">
                {problem.number}
              </span>

              <h3 className="mt-12 text-xl font-semibold tracking-tight text-neutral-950">
                {problem.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-neutral-600">
                {problem.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
