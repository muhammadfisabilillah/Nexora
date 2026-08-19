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
});

  return (
    <main>
      <header>
        <div>
          <h1>Nexora</h1>
        </div>

        <form action={logoutAction}>
          <button type="submit">
            Logout
          </button>
        </form>
      </header>

      <section>
        <h2>
          Welcome back, {user.name ?? user.email}
        </h2>

        <p>
          Build a better resume and prepare for your next opportunity.
        </p>
      </section>

<section>
  <h2>Your Resumes</h2>

  {resumes.length === 0 ? (
    <div>
      <p>
        You haven&apos;t created a resume yet.
      </p>

      <Link href="/dashboard/resumes/new">
        Create New Resume
      </Link>
    </div>
  ) : (
    <div>
      {resumes.map((resume) => (
        <article key={resume.id}>
          <h3>{resume.title}</h3>

          <p>
            Target Position:{" "}
            {resume.targetPosition ?? "Not specified"}
          </p>

          <Link
            href={`/dashboard/resumes/${resume.id}`}
          >
            Open Resume
          </Link>
        </article>
      ))}

      <Link href="/dashboard/resumes/new">
        Create New Resume
      </Link>
    </div>
  )}
  </section>
    </main>
  );
}