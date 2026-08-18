import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "../../lib/prisma";

const SESSION_COOKIE_NAME = "nexora_session";

export async function logoutUser() {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get(
    SESSION_COOKIE_NAME
  )?.value;

  if (sessionToken) {
    const tokenHash = crypto
      .createHash("sha256")
      .update(sessionToken)
      .digest("hex");

    await prisma.session.deleteMany({
      where: {
        tokenHash,
      },
    });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}