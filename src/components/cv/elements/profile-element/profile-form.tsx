"use client"; // Ensure this component is a Client Component

import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { type UserProfile } from "~/app/profile/actions";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useDebounce } from "~/lib/useDebounce";

interface ProfileFormProps {
  profileData: UserProfile;
  saveProfileDataAction: (profile: UserProfile) => Promise<unknown>;
}

const profileSchemaErrorMessages = z.object({
  fullName: z.string().trim().min(1, "Consider adding your full name"),
  birthDate: z.string(),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Your phone number is valuable for recruiters to contact you"),
  email: z.string().email("The email address is invalid"),
  address: z.string(),
  aboutMe: z.string(),
});

const ProfileForm = ({
  profileData,
  saveProfileDataAction,
}: ProfileFormProps) => {
  const [formProfileData, setFormProfileData] = useState({
    fullName: profileData.fullName || "",
    birthDate: profileData.birthDate || "",
    phoneNumber: profileData.phoneNumber || "",
    email: profileData.email || "",
    address: profileData.address || "",
    aboutMe: profileData.aboutMe || "",
  });

  const debouncedSaveProfile = useDebounce(
    async (profile: typeof formProfileData) => {
      try {
        await saveProfileDataAction({
          ...profile,
          userId: profileData.userId,
        });
      } catch (e) {
        console.error("Failed to save profile data", e);
      }
    },
  );

  const updateProfileField = (field: string, value: string) => {
    const profile = {
      ...formProfileData,
      [field]:
        field === "birthDate"
          ? new Date(value).toISOString().split("T")[0]
          : value, // Handle conversion if necessary
    };
    setFormProfileData(profile);
    debouncedSaveProfile(profile);
  };

  // Get today's date in YYYY-MM-DD format for the max attribute
  const today = new Date().toISOString().split("T")[0];

  const errors = profileSchemaErrorMessages
    .safeParse(formProfileData)
    .error?.format();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Profile</CardTitle>
        <CardDescription>
          Enter your profile data to use in your resume.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            value={formProfileData.fullName}
            placeholder="Full Name"
            onChange={(e) => updateProfileField("fullName", e.target.value)}
          />
          {errors?.fullName?._errors}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="birthDate">Birth Date</Label>
          <input
            type="date"
            value={formProfileData.birthDate}
            placeholder="Birth Date"
            max={today}
            onChange={(e) => updateProfileField("birthDate", e.target.value)}
          />
          {errors?.birthDate?._errors}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            type="text"
            value={formProfileData.phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => updateProfileField("phoneNumber", e.target.value)}
          />
          {errors?.phoneNumber?._errors}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            value={formProfileData.email}
            placeholder="Email"
            onChange={(e) => updateProfileField("email", e.target.value)}
          />
          {errors?.email?._errors}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            value={formProfileData.address}
            placeholder="Address"
            onChange={(e) => updateProfileField("address", e.target.value)}
          />
          {errors?.address?._errors}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="aboutMe">About Me</Label>
          <Textarea
            value={formProfileData.aboutMe}
            placeholder="About Me"
            onChange={(e) => updateProfileField("aboutMe", e.target.value)}
          />
          {errors?.aboutMe?._errors}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
