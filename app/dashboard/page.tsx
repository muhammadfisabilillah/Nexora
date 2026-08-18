import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth/session";
import { logoutAction } from "./actions";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Welcome to Nexora</h1>

      <p>
        Hello, {user.name ?? user.email}
      </p>

      <p>
        You are successfully logged in.
      </p>

      <form action={logoutAction}>
        <button type="submit">
          Logout
        </button>
      </form>
    </main>
  );
}