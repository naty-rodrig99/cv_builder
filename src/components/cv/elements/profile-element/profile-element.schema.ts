import * as z from "zod";
import { abstractElement } from "../../abstract-element";

export const profileElement = abstractElement.extend({
  type: z.literal("profile-element"),
  data: z.object({
    fullName: z.string().trim(),
    birthDate: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    address: z.string(),
    aboutMe: z.string(),
  }),
});

export type ProfileElement = z.infer<typeof profileElement>;
