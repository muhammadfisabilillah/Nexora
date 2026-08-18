import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationOtp(
  email: string,
  otp: string
) {
  return resend.emails.send({
    from: "Nexora <onboarding@resend.dev>",
    to: email,
    subject: "Nexora Email Verification",
    html: `
      <div>
        <h1>Verify your Nexora account</h1>

        <p>Your verification code is:</p>

        <h2>${otp}</h2>

        <p>This code will expire in 2 minutes.</p>

        <p>
          If you did not create a Nexora account,
          you can safely ignore this email.
        </p>
      </div>
    `,
  });
}