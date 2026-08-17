const features = [
  {
    title: "Resume Builder",
    description:
      "Build a structured resume based on your real experience, skills, education, and achievements.",
  },
  {
    title: "AI Resume Analysis",
    description:
      "Get an AI-powered evaluation of your resume and understand what already works and what needs improvement.",
  },
  {
    title: "Personalized Improvement",
    description:
      "Receive practical suggestions tailored to your background instead of generic resume advice.",
  },
  {
    title: "Position Matching",
    description:
      "Align your resume with the position you are targeting and identify areas that can strengthen your application.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="border-b border-neutral-200"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            What Nexora offers
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Everything you need to build a better resume.
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Nexora combines resume building and AI-powered guidance to help
            students and fresh graduates present their experience more
            effectively.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="bg-white p-8 md:p-10"
            >
              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-neutral-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
