"use server";

import { generateIdFromEntropySize } from "lucia";
import { actionError, actionOk, ActionResult } from "~/lib/action-result";
import { db } from "~/server/db";
import { cvTable } from "~/server/db/schema";
import { getUser } from "~/server/user";
import { cvSchema, CvSchema } from "~/components/cv/schema";
import { eq } from "drizzle-orm";

export async function createDummyProject(): ActionResult<
  null,
  { message: string; details?: unknown }
> {
  const user = await getUser(); // Get user through dedicated method instead of as a passed argument, might prevent abusive API calls
  if (!user) {
    return actionError({
      message:
        "Invalid user retrieved. Something went bad with the authentication process.",
      details: user,
    });
  }

  const cvId = generateIdFromEntropySize(10);
  const cvValues = {
    id: cvId,
    userId: user.id,
    cvName: "testCV" + cvId,
  };
  try {
    const result = await db.insert(cvTable).values(cvValues).returning();
  } catch {
    return actionError({
      message: "Error while inserting data to the db",
      details: cvValues,
    });
  }
  return actionOk(null);
}

export async function saveCvSchema(
  cvId: string,
  schema: CvSchema,
): ActionResult<null, { message: string; details?: unknown }> {
  const user = await getUser();
  if (!user) {
    return actionError({
      message: "401 Unauthenticated",
      details: user,
    });
  }

  const cv = await db.query.cvTable.findFirst({
    where: eq(cvTable.id, cvId),
  });

  if (cv == null) {
    return actionError({ message: `404 Not Found` });
  }

  if (cv.userId !== user.id) {
    return actionError({
      message: "403 Unauthorized",
      details: user,
    });
  }

  const result = await cvSchema.safeParseAsync(schema);
  if (!result.success) {
    return actionError({
      message: "400 Invalid Arguments",
      details: result.error.format(),
    });
  }

  await db
    .update(cvTable)
    .set({ cvData: result.data })
    .where(eq(cvTable.id, cvId));

  return actionOk(null);
}
