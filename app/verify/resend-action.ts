"use server";

import { resendUserOtp } from "../../lib/auth/resend";

export async function resendAction(userId: string) {
  try {
    await resendUserOtp({ userId });

    return {
      success: true as const,
    };
  } catch (error) {
    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "Failed to resend verification code.",
    };
  }
}