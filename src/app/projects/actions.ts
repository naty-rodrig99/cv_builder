"use server";

import { generateIdFromEntropySize } from "lucia";
import { actionError, actionOk, ActionResult } from "~/lib/action-result";
import { db } from "~/server/db";
import { cvTable } from "~/server/db/schema";
import { getUser } from "~/server/user";

export async function createDummyProject(): ActionResult<
  null,
  { message: string; details?: unknown }
> {
  const user = await getUser(); // Get user through dedicated method instead of as a passed argument, might prevent abusive API calls
  if (!user)
    return actionError({
      message:
        "Invalid user retrieved. Something went bad with the authentication process.",
      details: user,
    });

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
