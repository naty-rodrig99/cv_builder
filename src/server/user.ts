import { cache } from "react";
import { cookies } from "next/headers";
import { lucia } from "~/server/auth";
import { db } from "./db";
import { cvTable, projectTable } from "./db/schema";
import { eq } from "drizzle-orm";

// https://lucia-auth.com/guides/validate-session-cookies/nextjs-app
export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return user;
});

export const getProjects = cache(async () => {
  const user = await getUser(); // Get user through dedicated method instead of as a passed argument, might prevent abusive API calls
  if (!user) return null;

  const projectList = await db
    .select({
      id: cvTable.id,
      name: cvTable.cvName,
    })
    .from(cvTable)
    .where(eq(cvTable.userId, user.id));
  return projectList;
});
