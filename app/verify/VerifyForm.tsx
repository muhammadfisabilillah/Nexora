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

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <main>
      <h1>Verify your email</h1>

      <p>
        Enter the 6-digit verification code sent to your email.
      </p>

      <p>This code expires in 2 minutes.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp">Verification Code</label>

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
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      <div>
        {countdown > 0 ? (
          <p>
            You can request a new code in{" "}
            {formatCountdown(countdown)}
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>
        )}
      </div>
    </main>
  );
}