import React from "react";
import { cn } from "~/lib/utils";
import { ProfileElement } from "./profile-element.schema";

export interface ProfileElementPrintProps {
  element: ProfileElement;
}

const ProfileElementPrint = ({ element }: ProfileElementPrintProps) => {
  const { fullName, birthDate, phoneNumber, email, address, aboutMe } =
    element.data;

  return (
    <div>
      {fullName && (
        <div className="mb-2">
          <strong>Full Name:</strong> {fullName}
        </div>
      )}
      {birthDate && (
        <div className="mb-2">
          <strong>Birth Date:</strong> {birthDate}
        </div>
      )}
      {phoneNumber && (
        <div className="mb-2">
          <strong>Phone Number:</strong> {phoneNumber}
        </div>
      )}
      {email && (
        <div className="mb-2">
          <strong>Email:</strong> {email}
        </div>
      )}
      {address && (
        <div className="mb-2">
          <strong>Address:</strong> {address}
        </div>
      )}
      {aboutMe && (
        <div className="mb-2">
          <strong>About Me:</strong> {aboutMe}
        </div>
      )}
    </div>
  );
};

export default ProfileElementPrint;
