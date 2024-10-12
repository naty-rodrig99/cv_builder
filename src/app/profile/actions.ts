"use server";

import { z } from "zod";
import { actionError, actionOk, type ActionResult } from "~/lib/action-result";
import { db } from "~/server/db";
import { userTable } from "~/server/db/schema";
import { getUser } from "~/server/user";
import { eq } from "drizzle-orm";

const profileSchemaDatabase = z.object({
  userId: z.string(),
  fullName: z.string().trim(),
  birthDate: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  address: z.string(),
  aboutMe: z.string(),
});

export interface UserProfile {
  userId: string;
  fullName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  address: string;
  aboutMe: string;
}

export async function saveProfile(
  profileData: z.infer<typeof profileSchemaDatabase>,
): ActionResult<null, { message: string; details?: unknown }> {
  try {
    const user = await getUser();
    if (user == null) {
      return actionError({
        message: "Not authenticated.",
      });
    }

    const result = await profileSchemaDatabase.safeParseAsync(profileData);

    if (!result.success) {
      return actionError({
        message: "Invalid form input",
        details: result.error.flatten(),
      });
    }

    // Convert the birthDate string to UNIX timestamp
    const birthDateUnix = Math.floor(
      new Date(result.data.birthDate).getTime() / 1000,
    );

    const birthDate = new Date(birthDateUnix * 1000);

    await db
      .update(userTable)
      .set({
        fullName: result.data.fullName,
        birthDate: birthDate,
        phoneNumber: result.data.phoneNumber,
        email: result.data.email,
        address: result.data.address,
        aboutMe: result.data.aboutMe,
      })
      .where(eq(userTable.id, user.id));

    return actionOk(null);
  } catch (error) {
    return actionError({
      message: "Error from safeProfile function.",
      details: error,
    });
  }
}

export async function fetchUser(): ActionResult<
  UserProfile,
  { message: string; details?: unknown }
> {
  try {
    const user = await getUser();
    if (user == null) {
      return actionError({ message: "Not authenticated!" });
    }

    const profileData = await db.query.userTable.findFirst({
      where: eq(userTable.id, user.id),
    });

    // Convert birthDate to string for the UserProfile interface
    if (!profileData) {
      return actionError({ message: "404 Error" });
    }

    const userProfile = {
      userId: profileData.id,
      fullName: profileData.fullName ?? "",
      birthDate: profileData.birthDate
        ? (new Date(profileData.birthDate).toISOString().split("T")[0] ?? "") // Todo Validate birthdate string
        : "",
      phoneNumber: profileData.phoneNumber ?? "",
      email: profileData.email ?? "",
      address: profileData.address ?? "",
      aboutMe: profileData.aboutMe ?? "",
    } satisfies UserProfile;

    return actionOk(userProfile);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return actionError({ message: "error fetching user data" });
  }
}
