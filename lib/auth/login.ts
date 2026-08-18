import crypto from "crypto";
import argon2 from "argon2";
import { prisma } from "../../lib/prisma";

const SESSION_EXPIRY_DAYS = 7;

type LoginInput = {
  email: string;
  password: string;
};

export async function loginUser({
  email,
  password,
}: LoginInput) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required.");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  if (!user.emailVerified) {
    throw new Error("Please verify your email first.");
  }

  const passwordValid = await argon2.verify(
    user.passwordHash,
    password
  );

  if (!passwordValid) {
    throw new Error("Invalid email or password.");
  }

  const sessionToken = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto
    .createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  const expiresAt = new Date(
    Date.now() +
      SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000
  );

  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
    },
  });

  return {
    success: true,
    userId: user.id,
    sessionToken,
    expiresAt,
  };
}