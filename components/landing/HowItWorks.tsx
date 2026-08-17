export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create your resume",
      description:
        "Build your resume using your real education, experience, projects, and skills.",
    },
    {
      number: "02",
      title: "Get AI feedback",
      description:
        "Nexora analyzes your resume and gives you a clear evaluation of its strengths and weaknesses.",
    },
    {
      number: "03",
      title: "Improve your resume",
      description:
        "Follow practical recommendations to improve how your experience is presented.",
    },
    {
      number: "04",
      title: "Match your target position",
      description:
        "See how well your resume aligns with the position you want to apply for.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="border-b border-neutral-200"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            How it works
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
            From experience to a better resume.
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Nexora helps you turn the experience you already have into a
            resume that is clearer, stronger, and more relevant.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl border border-neutral-200 p-8"
            >
              <span className="text-sm font-medium text-neutral-400">
                {step.number}
              </span>

              <h3 className="mt-10 text-2xl font-semibold tracking-tight text-neutral-950">
                {step.title}
              </h3>

              <p className="mt-4 max-w-md text-sm leading-6 text-neutral-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
