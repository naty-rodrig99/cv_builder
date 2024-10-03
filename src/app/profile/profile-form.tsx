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

const ProfileForm: React.FC = () => {
  const [profileData, setProfileData] = useState<UserProfile>({
    userId: "",
    fullName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    address: "",
    aboutMe: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

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

  const validateAndSaveProfile = async () => {
    const saveResult = await saveProfile(profileData);
    if (!saveResult.ok) {
      console.error("Failed to save profile data", saveResult.error);

      // Initialize an array for error messages
      const errorMessages: string[] = [];

      // Check if there's a message and push it to errorMessages
      if (saveResult.error.message) {
        errorMessages.push(saveResult.error.message);
      }

      // Check if there are field-specific errors
      if (saveResult.error.details?.fieldErrors) {
        const fieldErrors = saveResult.error.details.fieldErrors;
        for (const [field, messages] of Object.entries(fieldErrors)) {
          // Assuming you want to show the first error message for the field
          errorMessages.push(`${messages[0]}`); // You can adjust this to show all messages if needed
          break; // Exit the loop after adding the first field error
        }
      }

      // Set the errors state to display the first error message
      setErrors(errorMessages);
    } else {
      console.log("Profile saved successfully.");

      setErrors([]); // Clear errors if saved successfully
    }
  };

  const updateProfileField = (field: string, value: string) => {
    setProfileData((prev) => ({
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
            value={profileData.fullName}
            placeholder="Full Name"
            onChange={(e) => updateProfileField("fullName", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="birthDate">Birth Date</Label>
          <input
            type="date"
            value={profileData.birthDate}
            placeholder="Birth Date"
            max={today}
            onChange={(e) => updateProfileField("birthDate", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
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
          <Label htmlFor="aboutMe">About Me</Label>
          <Textarea
            value={profileData.aboutMe}
            placeholder="About Me"
            onChange={(e) => updateProfileField("aboutMe", e.target.value)}
          />
        </div>

        {errors.length > 0 && (
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
