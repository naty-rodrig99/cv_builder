import React from "react";
import { ProfileElement } from "./profile-element.schema";

import { EditionTools } from "../editor-tools";
import { customOption } from "../editor-tools";
import { Input } from "~/components/ui/input";
import ProfileToolbar from "./toolbar-profile.edit";

export interface ProfileElementEditProps {
  element: ProfileElement;
}

const ProfileElementEdit = ({ element }: ProfileElementEditProps) => {
  const placeholder = "Simple profile";

  return (
    <div>
      <EditionTools
        element={element}
        options={[customOption(<ProfileToolbar element={element} />)]}
      />
      <Input
        value={element.data.aboutMe}
        onChange={(e) => {
          console.log(e.target.value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default ProfileElementEdit;
