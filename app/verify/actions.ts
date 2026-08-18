"use server";

import { verifyUserOtp } from "../../lib/auth/verify";

export async function verifyAction(
  userId: string,
  otp: string
) {
  try {
    await verifyUserOtp({
      userId,
      otp,
    });

    return {
      success: true as const,
    };
  } catch (error) {
    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "Verification failed.",
    };
  }
}