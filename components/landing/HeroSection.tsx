import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          Resume platform for students & fresh graduates
        </p>

        <h1 className="mx-auto max-w-4xl text-5xl font-semibold tracking-tight text-neutral-950 md:text-7xl">
          Your resume can be better.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
          Nexora helps you build, analyze, and improve your resume based on
          your real experience and target position.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/register">Build My Resume</Button>

          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
