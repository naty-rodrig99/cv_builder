import * as z from "zod";
import { simpleLayoutElement } from "~/components/cv/elements/simple-layout/simple-layout.schema";
import { simpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";
import { simpleHeaderElement } from "~/components/cv/elements/simple-header/simple-header.schema";
import { profileElement } from "./elements/profile-element/profile-element.schema";

export const cvFormats = ["DINA4", "Letter"] as const;
export type CvFormat = (typeof cvFormats)[number];

export const anyElement = z.lazy(() =>
  z.union([
    simpleLayoutElement,
    simpleTextElement,
    simpleHeaderElement,
    profileElement,
    // ... and any other element that we define.
  ]),
);
export type AnyElement = z.infer<typeof anyElement>;

// The CvSchema has two main properties: "rootElement" and "elements".
// The rootElement is just an id reference to the root element (always a simple column layout).
// The elements property contains all elements in a dictionary where the key is the element id.
// This allows different elements to reference each other by their id, however comes with some
// maintenance cost as we have to make sure that any referenced element actually exists.
export const cvSchema = z.object({
  rootElement: z.string(),
  elements: z.record(z.string(), anyElement),
  format: z.literal(cvFormats[0]).or(z.literal(cvFormats[1])),
});
export type CvSchema = z.infer<typeof cvSchema>;
