import { prisma } from "../../lib/prisma";
import { verifyOtp } from "../otp";

type VerifyOtpInput = {
  userId: string;
  otp: string;
};

export async function verifyUserOtp({
  userId,
  otp,
}: VerifyOtpInput) {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  if (!/^\d{6}$/.test(otp)) {
    throw new Error("OTP must be 6 digits.");
  }

  const verification = await prisma.emailVerification.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!verification) {
    throw new Error("Verification code not found.");
  }

  if (verification.expiresAt <= new Date()) {
    await prisma.emailVerification.delete({
      where: {
        id: verification.id,
      },
    });

    throw new Error("Verification code has expired.");
  }

  const isValid = await verifyOtp(
    otp,
    verification.otpHash
  );

  if (!isValid) {
    throw new Error("Invalid verification code.");
  }

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: true,
      },
    }),
    prisma.emailVerification.delete({
      where: {
        id: verification.id,
      },
    }),
  ]);

  return {
    success: true,
  };
}