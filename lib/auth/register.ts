import argon2 from "argon2";
import { prisma } from "../../lib/prisma";
import { generateOtp, hashOtp, getOtpExpiry } from "../otp";
import { sendVerificationOtp } from "../email";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser({
  name,
  email,
  password,
}: RegisterInput) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName = name.trim();

  if (!normalizedName) {
    throw new Error("Name is required.");
  }

  if (!normalizedEmail) {
    throw new Error("Email is required.");
  }

  if (!normalizedEmail.includes("@")) {
    throw new Error("Invalid email address.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  const passwordHash = await argon2.hash(password);

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const expiresAt = getOtpExpiry();

  const user = await prisma.user.create({
    data: {
      name: normalizedName,
      email: normalizedEmail,
      passwordHash,
      emailVerified: false,
    },
  });

  await prisma.emailVerification.create({
    data: {
      userId: user.id,
      otpHash,
      expiresAt,
    },
  });

  await sendVerificationOtp(normalizedEmail, otp);

  return {
    success: true,
    userId: user.id,
    email: user.email,
  };
}