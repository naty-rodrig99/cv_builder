import React from "react";
import { ProfileElement } from "./profile-element.schema";

import { EditionTools } from "../editor-tools";
import { customOption } from "../editor-tools";
import { Input } from "~/components/ui/input";
import ProfileToolbar from "./toolbar-profile.edit";
import { useDispatch } from "~/components/cv/context";
import { setUserProfileElement } from "./profile-element.state";

export interface ProfileElementEditProps {
  element: ProfileElement;
}

const ProfileElementEdit = ({ element }: ProfileElementEditProps) => {
  const placeholder = "Simple profile";
  const dispatch = useDispatch();

  const handleChange =
    (key: keyof ProfileElement["data"]) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setUserProfileElement(element.id, {
          ...element.data,
          [key]: e.target.value,
        }),
      );
    };

  return (
    <div>
      <EditionTools
        element={element}
        options={[customOption(<ProfileToolbar element={element} />)]}
      />
      <Input
        value={element.data.fullName}
        onChange={handleChange("fullName")}
        placeholder="Full Name"
      />
      <Input
        value={element.data.birthDate}
        onChange={handleChange("birthDate")}
        placeholder="Birth Date"
      />
      <Input
        value={element.data.phoneNumber}
        onChange={handleChange("phoneNumber")}
        placeholder="Phone Number"
      />
      <Input
        value={element.data.email}
        onChange={handleChange("email")}
        placeholder="Email"
      />
      <Input
        value={element.data.address}
        onChange={handleChange("address")}
        placeholder="Address"
      />
      <Input
        value={element.data.aboutMe}
        onChange={handleChange("aboutMe")}
        placeholder="About Me"
      />
    </div>
  );
};

export default ProfileElementEdit;
