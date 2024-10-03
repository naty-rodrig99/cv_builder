"use server";

import { actionError, actionOk, ActionResult } from "~/lib/action-result";
import * as z from "zod";
import { db } from "~/server/db";
import { userTable } from "~/server/db/schema";
import { getUser } from "~/server/user";
import { eq } from "drizzle-orm";

const formSchema = z.object({
  fullName: z.string(),
  birthday: z.string().date(),
  phoneNumber: z.string(),
  email: z.string().email({
    message: "Invalid email",
  }),
  address: z.string().optional(),
  aboutMe: z.string().optional(),
});

export async function editProfile(
  formData: FormData,
): ActionResult<null, { message: string }> {
  // console.log(formData);

  const user = await getUser();

  if (user === null) {
    return actionError({ message: "Not authenticated!" });
  }

  const result = await formSchema.safeParseAsync(
    Object.fromEntries(formData.entries()),
  );

  if (!result.success) {
    return actionError({
      message: "Invalid form input.",
      details: result.error.flatten(),
    });
  }

  await db
    .update(userTable)
    .set({
      fullName: result.data.fullName,
      birthDate: new Date(result.data.birthday), // CHANGE LATER DUDE!!!
      phoneNumber: result.data.phoneNumber,
      email: result.data.email,
      address: result.data.address,
      aboutMe: result.data.aboutMe,
    })
    .where(eq(userTable.id, user.id));

  return actionOk(null);
}

export async function resetProfileData(): ActionResult<
  null,
  { message: string }
> {
  const user = await getUser();

  if (user === null) {
    return actionError({ message: "Not authenticated!" });
  }

  await db
    .update(userTable)
    .set({
      fullName: undefined,
      birthDate: undefined,
      phoneNumber: undefined,
      email: undefined,
      address: undefined,
      aboutMe: undefined,
    })
    .where(eq(userTable.id, user.id));

  return actionOk(null);
}
