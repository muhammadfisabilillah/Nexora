import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth/session";
import { prisma } from "../../lib/prisma";
import { logoutAction } from "./actions";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const resumes = await prisma.resume.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      aiAnalyses: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  const analyzedResumeCount = resumes.filter(
    (resume) => resume.aiAnalyses.length > 0,
  ).length;

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

          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Dashboard</p>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Welcome back, {user.name ?? user.email}
              </h1>

              <p className="max-w-2xl text-sm leading-6 text-gray-600">
                Build a better resume and prepare for your next opportunity.
              </p>
            </div>

            <Link
              href="/dashboard/resumes/new"
              className="inline-flex w-fit items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              + Create Resume
            </Link>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Resumes</p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {resumes.length}
            </p>

            <p className="mt-1 text-sm text-gray-500">Resumes created</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Resume Workspace
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {resumes.length > 0 ? "Active" : "Empty"}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Keep building your profile
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">AI Analysis</p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {analyzedResumeCount} / {resumes.length}
            </p>

            <p className="mt-1 text-sm text-gray-500">Resumes analyzed</p>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Your Resumes
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage and improve your resumes.
              </p>
            </div>

            {resumes.length > 0 && (
              <Link
                href="/dashboard/resumes/new"
                className="text-sm font-medium text-gray-900 hover:underline"
              >
                + New Resume
              </Link>
            )}
          </div>

          {resumes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                No resumes yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Create your first resume to start building your professional
                profile and analyzing it with Nexora AI.
              </p>

              <Link
                href="/dashboard/resumes/new"
                className="mt-6 inline-flex rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Create Your First Resume
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {resumes.map((resume) => (
                <article
                  key={resume.id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold text-gray-900">
                        {resume.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        Target Position
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {resume.targetPosition ?? "Not specified"}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      Resume
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500">
                      Updated{" "}
                      {resume.updatedAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>

                    <Link
                      href={`/dashboard/resumes/${resume.id}`}
                      className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                      Open Resume
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
