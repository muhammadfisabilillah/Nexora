import Button from "../ui/Button";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-neutral-200">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          NEXORA
        </Link>

        <div className="hidden items-center gap-8 text-sm text-neutral-600 md:flex">
          <a href="#how-it-works" className="transition hover:text-black">
            How It Works
          </a>

          <a href="#features" className="transition hover:text-black">
            Features
          </a>

          <Link href="/login" className="transition hover:text-black">
            Login
          </Link>

          <Button href="/register">Get Started</Button>
        </div>
      </nav>
    </header>
  );
}