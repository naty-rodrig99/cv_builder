"use client";

import React from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { UserProfile } from "./actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface ProfileFormProps {
  profileData: UserProfile;
  errors?: string[];
  updateProfileField: (field: string, value: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profileData,
  updateProfileField,
  errors,
}) => {
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
            value={profileData.fullName}
            placeholder="Full Name"
            onChange={(e) => updateProfileField("fullName", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <input
            type="string"
            value={profileData.birthDate}
            placeholder="Birth Date"
            onChange={(e) => updateProfileField("birthDate", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone number</Label>
          <Input
            type="text"
            value={profileData.phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => updateProfileField("phoneNumber", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            value={profileData.email}
            placeholder="Email"
            onChange={(e) => updateProfileField("email", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            value={profileData.address}
            placeholder="Address"
            onChange={(e) => updateProfileField("address", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="aboutMe">About me</Label>
          <Textarea
            value={profileData.aboutMe}
            placeholder="About Me"
            onChange={(e) => updateProfileField("aboutMe", e.target.value)}
          />
        </div>

        {errors && (
          <div style={{ color: "red" }}>
            {errors.map((error, idx) => (
              <p key={idx}>{error}</p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
