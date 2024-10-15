import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarItem,
  MenubarSeparator,
} from "~/components/ui/menubar";

import { useDispatch } from "../../context";
import { ProfileElement } from "./profile-element.schema";
import { useState } from "react";
import { fetchUser } from "~/app/profile/actions";

interface ProfileToolbarProps {
  element: ProfileElement;
}

const ProfileToolbar = ({ element }: ProfileToolbarProps) => {
  const dispatch = useDispatch();

  const [isClicked, setIsClicked] = useState<boolean>(false);

  async function onClickHandler() {
    try {
      setIsClicked(true);
      const result = await fetchUser();
      if (result.ok) {
        const data = {
          fullName: result.value.fullName,
          birthDate: result.value.birthDate,
          phoneNumber: result.value.phoneNumber,
          email: result.value.email,
          address: result.value.address,
          aboutMe: result.value.aboutMe,
        } satisfies ProfileElement["data"];

        // dispatch() useReduce
      }
    } catch {}
  }

  return (
    <>
      <MenubarMenu>
        <MenubarTrigger
          disabled={isClicked ? true : false}
          onClick={(e) => {
            onClickHandler();
          }}
        >
          Load Profile Data
        </MenubarTrigger>
      </MenubarMenu>
    </>
  );
};

export default ProfileToolbar;
