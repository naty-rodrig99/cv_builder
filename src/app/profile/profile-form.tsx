"use client"; // Ensure this component is a Client Component

import React, { useState, useEffect } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { fetchUser, saveProfile, UserProfile } from "./actions";

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
}

const ProfileForm = ({ profileData }: ProfileFormProps) => {
  const [formProfileData, setFormProfileData] = useState({
    fullName: profileData.fullName,
    birthDate: profileData.birthDate,
    phoneNumber: profileData.phoneNumber,
    email: profileData.email,
    address: profileData.address,
    aboutMe: profileData.aboutMe,
  });

  /*
  // UseEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      const result = await fetchUser();
      console.log("result fetchProfileData: ", result);

      if (!result.ok) {
        console.log("Handle Error from useEffect");
      } else {
        // Check if birthDate is a valid date string before formatting
        const birthDate = result.value.birthDate;

        const formattedBirthDate = birthDate
          ? new Date(birthDate).toISOString().split("T")[0]
          : "yyyy-MM-dd";

        setProfileData({
          ...result.value,
          birthDate: formattedBirthDate, // Format it to yyyy-MM-dd
        });
      }
    };

    void fetchProfileData();
  }, []);

  */

  const validateAndSaveProfile = async () => {
    const saveResult = await saveProfile(profileData);
    if (!saveResult.ok) {
      console.error("Failed to save profile data", saveResult.error);
    } else {
      console.log("Profile saved successfully.");
    }
  };

  const updateProfileField = (field: string, value: string) => {
    setFormProfileData((prev) => ({
      ...prev,
      [field]:
        field === "birthDate"
          ? new Date(value).toISOString().split("T")[0]
          : value, // Handle conversion if necessary
    }));
    void validateAndSaveProfile();
  };

  // Get today's date in YYYY-MM-DD format for the max attribute
  const today = new Date().toISOString().split("T")[0];

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
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            type="text"
            value={formProfileData.phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => updateProfileField("phoneNumber", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            value={formProfileData.email}
            placeholder="Email"
            onChange={(e) => updateProfileField("email", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            value={formProfileData.address}
            placeholder="Address"
            onChange={(e) => updateProfileField("address", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="aboutMe">About Me</Label>
          <Textarea
            value={formProfileData.aboutMe}
            placeholder="About Me"
            onChange={(e) => updateProfileField("aboutMe", e.target.value)}
          />
        </div>

        <div>Placeholder for errors</div>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
