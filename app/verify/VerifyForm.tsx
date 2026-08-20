"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyAction } from "./actions";
import { resendAction } from "./resend-action";

const RESEND_COOLDOWN = 120;

export default function VerifyForm() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!userId) {
      setError("User verification session is missing.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must contain 6 digits.");
      return;
    }

    setLoading(true);

    const result = await verifyAction(userId, otp);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    window.location.href = "/login";
  }

  async function handleResend() {
    if (!userId || countdown > 0 || resending) {
      return;
    }

    setError("");
    setResending(true);

    const result = await resendAction(userId);

    if (!result.success) {
      setError(result.error);
      setResending(false);
      return;
    }

    setOtp("");
    setCountdown(RESEND_COOLDOWN);
    setResending(false);
  }

  function formatCountdown(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-lg font-bold text-white">
            N
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Verify your email
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Enter the 6-digit verification code sent to your email.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Verification code
              </label>

              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(event) =>
                  setOtp(event.target.value.replace(/\D/g, ""))
                }
                placeholder="000000"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-center text-xl font-semibold tracking-[0.5em] text-gray-900 outline-none transition placeholder:text-gray-300 placeholder:tracking-[0.5em] focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <p className="text-center text-xs text-gray-400">
              This code expires in 2 minutes.
            </p>

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
              {loading ? "Verifying..." : "Verify email"}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-6 text-center">
            {countdown > 0 ? (
              <p className="text-sm text-gray-500">
                You can request a new code in{" "}
                <span className="font-medium text-gray-900">
                  {formatCountdown(countdown)}
                </span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-sm font-medium text-gray-900 transition hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {resending ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Secure your Nexora account before getting started.
        </p>
      </div>
    </main>
  );
}
