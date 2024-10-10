import { nanoid } from "nanoid";
import { template } from "~/components/cv/schema.template";
import { ProfileElement } from "./profile-element.schema";

export const newProfileElement = (args: {
  fullName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  address: string;
  aboutMe: string;
}) => {
  return template({
    id: nanoid(),
    type: "profile-element",
    data: {
      fullName: args.fullName,
      birthDate: args.birthDate,
      phoneNumber: args.phoneNumber,
      email: args.email,
      address: args.address,
      aboutMe: args.aboutMe,
    },
  } satisfies ProfileElement);
};
