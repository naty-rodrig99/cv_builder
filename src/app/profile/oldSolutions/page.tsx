"use client";

import ProfileForm from "./profile-form";
import React, { useState, useEffect } from "react";
import { fetchUser, saveProfile } from "./actions";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    userId: "",
    fullName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    address: "",
    aboutMe: "",
  });

  const [errors, setErrors] = useState<{ profile?: string[] }>({});

  const validateAndSaveProfile = async () => {
    const saveResult = await saveProfile(profileData);
    if (!saveResult.ok) {
      console.error("Failed to save profile data", saveResult.error);
      setErrors((prev) => ({
        ...prev,
        profile: saveResult.error.message ? [saveResult.error.message] : [],
      }));
    } else {
      console.log("Profile saved successfully.");
      setErrors({ profile: undefined }); // Clear errors if saved successfully
    }
  };

  // UseEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      const result = await fetchUser();
      console.log("result fetchProfileData: ", result);

      if (!result.ok) {
        console.log("Handle Error from useEffect");
      } else {
        setProfileData(result.value);
      }
    };

    void fetchProfileData();
  }, []);

  const updateProfileField = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: field === "birthDate" ? new Date(value) : value,
    }));
    void validateAndSaveProfile();
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-background px-4">
      <div>
        <ProfileForm
          profileData={profileData}
          updateProfileField={updateProfileField}
          errors={errors.profile}
        />
      </div>
    </main>
  );
}
