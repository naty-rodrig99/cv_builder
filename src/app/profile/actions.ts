"use server";

import { z } from "zod";
import { actionError, actionOk, ActionResult } from "~/lib/action-result";
import { db } from "~/server/db";
import { userTable } from "~/server/db/schema";
import { getUser } from "~/server/user";
import { eq } from "drizzle-orm";

const profileSchema = z.object({
  userId: z.string(),
  fullName: z.string().trim(),
  birthDate: z.string(),
  phoneNumber: z.string(),
  email: z.string().email("Invalid email"),
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
  profileData: z.infer<typeof profileSchema>,
): ActionResult<null, { message: string; details?: unknown }> {
  try {
    const user = await getUser();
    if (user === null) {
      return actionError({
        message: "Not authenticated.",
      });
    }

    console.log("Validation passed");
    const result = await profileSchema.safeParseAsync(profileData);

    if (!result.success) {
      console.log("safeParseAsync Failed");
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

    const update = await db
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

    console.log("update: ", update);

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
    if (user === null) {
      return actionError({ message: "Not authenticated!" });
    }

    const profileData = await db
      .select({
        userId: userTable.id,
        fullName: userTable.fullName,
        birthDate: userTable.birthDate,
        phoneNumber: userTable.phoneNumber,
        email: userTable.email,
        address: userTable.address,
        aboutMe: userTable.aboutMe,
      })
      .from(userTable)
      .where(eq(userTable.id, user.id));

    // Convert birthDate to string for the UserProfile interface
    const userProfile: UserProfile = {
      userId: profileData[0].userId,
      fullName: profileData[0].fullName || "",
      birthDate: profileData[0].birthDate
        ? new Date(profileData[0].birthDate).toISOString().split("T")[0]
        : "",
      phoneNumber: profileData[0].phoneNumber || "",
      email: profileData[0].email || "",
      address: profileData[0].address || "",
      aboutMe: profileData[0].aboutMe || "",
    };

    return actionOk(userProfile);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return actionError({ message: "error fetching user data" });
  }
}
