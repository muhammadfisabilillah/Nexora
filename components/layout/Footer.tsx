export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold">NEXORA</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-neutral-400">
              Helping students and fresh graduates build better resumes
              from the experience they already have.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-neutral-400">
            <a
              href="#how-it-works"
              className="transition-colors hover:text-white"
            >
              How It Works
            </a>

            <a
              href="#features"
              className="transition-colors hover:text-white"
            >
              Features
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6">
          <p className="text-sm text-neutral-500">
            © 2026 Nexora. Built to help you move forward.
          </p>
        </div>
      </div>
    </footer>
  );
}
