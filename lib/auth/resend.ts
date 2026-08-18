import { prisma } from "../prisma";
import {
  generateOtp,
  getOtpExpiry,
  hashOtp,
} from "../otp";
import { sendVerificationOtp } from "../email";

type ResendOtpInput = {
  userId: string;
};

export async function resendUserOtp({
  userId,
}: ResendOtpInput) {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.emailVerified) {
    throw new Error("Email is already verified.");
  }

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const expiresAt = getOtpExpiry();

  await prisma.emailVerification.deleteMany({
    where: {
      userId: user.id,
    },
  });

  await prisma.emailVerification.create({
    data: {
      userId: user.id,
      otpHash,
      expiresAt,
    },
  });

  const result = await sendVerificationOtp(
    user.email,
    otp
  );

  if (result.error) {
    await prisma.emailVerification.deleteMany({
      where: {
        userId: user.id,
      },
    });

    throw new Error(
      result.error.message || "Failed to send verification email."
    );
  }

  return {
    success: true,
    email: user.email,
    expiresAt,
  };
}