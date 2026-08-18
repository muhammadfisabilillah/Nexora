import "dotenv/config";
import { sendVerificationOtp } from "../lib/email";

async function main() {
  const testEmail = "muhammadfisabilillah90@gmail.com";

  const result = await sendVerificationOtp(testEmail, "123456");

  console.log("Email result:", result);
}

main().catch((error) => {
  console.error("Email test failed:", error);
  process.exit(1);
});