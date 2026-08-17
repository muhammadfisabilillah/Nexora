import Button from "../ui/Button";

export default function CTASection() {
  return (
    <section className="border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          Start with what you already have
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 md:text-6xl">
          Your experience is already there. Let Nexora help you present it.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
          Build your resume, understand what needs improvement, and prepare
          yourself for the opportunities you want.
        </p>

        <div className="mt-10">
          <Button href="/register">Get Started with Nexora</Button>
        </div>
      </div>
    </section>
  );
}
