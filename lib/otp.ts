import crypto from "crypto";
import argon2 from "argon2";

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 2;

export function generateOtp() {
  const max = 10 ** OTP_LENGTH;

  const otp = crypto.randomInt(0, max).toString().padStart(OTP_LENGTH, "0");

  return otp;
}

export async function hashOtp(otp: string) {
  return argon2.hash(otp);
}

export function getOtpExpiry() {
  return new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
}

export async function verifyOtp(otp: string, otpHash: string) {
  return argon2.verify(otpHash, otp);
}