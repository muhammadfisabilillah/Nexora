import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../../lib/auth/session";
import { createResumeAction } from "./actions";

export default async function NewResumePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Create a New Resume</h1>

      <p>
        Start building your resume with Nexora.
      </p>

      <form action={createResumeAction}>
        <div>
          <label htmlFor="title">
            Resume Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Software Engineer Resume"
            required
          />
        </div>

        <div>
          <label htmlFor="targetPosition">
            Target Position
          </label>

          <input
            id="targetPosition"
            name="targetPosition"
            type="text"
            placeholder="e.g. Software Engineer"
          />
        </div>

        <button type="submit">
          Create Resume
        </button>
      </form>
    </main>
  );
}