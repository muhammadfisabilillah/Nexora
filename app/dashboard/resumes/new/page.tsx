import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../../lib/auth/session";
import { createResumeAction } from "./actions";

export default async function NewResumePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            Nexora
          </Link>

          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">Resume Workspace</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Create a New Resume
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Start building your professional resume with Nexora. You can add
            your experience, education, skills, and projects after creating it.
          </p>
        </div>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <form action={createResumeAction} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-900"
              >
                Resume Title
              </label>

              <p className="mt-1 text-sm text-gray-500">
                Give this resume a name so you can easily identify it later.
              </p>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Software Engineer Resume"
                required
                className="mt-3 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="targetPosition"
                className="block text-sm font-medium text-gray-900"
              >
                Target Position
              </label>

              <p className="mt-1 text-sm text-gray-500">
                Specify the position you are targeting. This will help Nexora
                provide more relevant AI analysis later.
              </p>

              <input
                id="targetPosition"
                name="targetPosition"
                type="text"
                placeholder="e.g. Software Engineer"
                className="mt-3 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Create Resume
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
