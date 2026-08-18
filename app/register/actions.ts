"use server";

import { registerUser } from "../../lib/auth/register";

export async function registerAction(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return {
      success: false as const,
      error: "Invalid registration data.",
    };
  }

  try {
    const result = await registerUser({
      name,
      email,
      password,
    });

    return {
      success: true as const,
      userId: result.userId,
      email: result.email,
    };
  } catch (error) {
    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "Registration failed.",
    };
  }
}