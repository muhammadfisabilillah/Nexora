"use server";

import { cookies } from "next/headers";
import { loginUser } from "../../lib/auth/login";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return {
      success: false as const,
      error: "Invalid login data.",
    };
  }

  try {
    const result = await loginUser({
      email,
      password,
    });

    const cookieStore = await cookies();

    cookieStore.set("nexora_session", result.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: result.expiresAt,
      path: "/",
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
          : "Login failed.",
    };
  }
}