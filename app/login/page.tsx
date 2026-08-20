"use client";

import { FormEvent, useState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const result = await loginAction(formData);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-lg font-bold text-white">
            N
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue building your resume with Nexora.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-6 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="font-medium text-gray-900 transition hover:text-gray-600"
              >
                Create one
              </a>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Build a resume that works for you.
        </p>
      </div>
    </main>
  );
}
