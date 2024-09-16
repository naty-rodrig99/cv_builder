"use server";

import * as z from "zod";
import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { db } from "~/server/db";
import { userTable } from "~/server/db/schema";
import { lucia } from "~/server/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { actionError, actionOk, ActionResult } from "~/tools/action-result";

// Everything here is turned into API call so must be serializable

const signupSchema = z.object({
  username: z.string().refine(
    async (username) => {
      const existingUser = await db.query.userTable.findFirst({
        where: eq(userTable.username, username),
      });
      return existingUser == null;
    },
    { message: "Username is already in use." },
  ),
  password: z.string(),
});

export async function signUp(
  formData: FormData,
): ActionResult<null, { message: string; details?: unknown }> {
  "use server";

  const result = await signupSchema.safeParseAsync({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return actionError({
      message: "Invalid form input.",
      details: result.error.flatten(),
    });
  }

  const passwordHash = await hash(result.data.password);
  const userId = generateIdFromEntropySize(10);

  await db.insert(userTable).values({
    id: userId,
    username: result.data.username,
    passwordHash,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  revalidatePath("/auth");
  return redirect("/");
}

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function logIn(
  formData: FormData,
): ActionResult<null, { message: string; details?: unknown }> {
  const result = await loginSchema.safeParseAsync({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return actionError({
      message: "Invalid form input.",
      details: result.error.flatten(),
    });
  }

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.username, result.data.username),
  });

  // Todo: Implement login throttling.

  if (!user) {
    return actionError({ message: "Invalid username or password." });
  }

  if (await verify(user.passwordHash, result.data.password)) {
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } else {
    return actionError({ message: "Invalid username or password." });
  }

  revalidatePath("/auth");
  return actionOk(null);
}

export async function logOut(): ActionResult<null, { message: string }> {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return actionError({ message: "Failed to log out user." });

  const { session } = await lucia.validateSession(sessionId);
  if (!session) return actionError({ message: "Failed to log out user." });

  await lucia.invalidateSession(session.id);

  revalidatePath("/auth");
  return actionOk(null);
}
