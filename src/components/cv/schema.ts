import * as z from "zod";
import { simpleLayoutElement } from "~/components/cv/elements/simple-layout/simple-layout.schema";
import { simpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";

export const cvFormats = ["DINA4", "Letter"] as const;
export type CvFormat = typeof cvFormats[number];

// The CvSchema has two main properties: "rootElement" and "elements".
// The rootElement is just an id reference to the root element (always a simple column layout).
// The elements property contains all elements in a dictionary where the key is the element id.
// This allows different elements to reference each other by their id, however comes with some
// maintenance cost as we have to make sure that any referenced element actually exists.
export type CvSchema = {
  rootElement: string;
  elements: Record<string, AnyElement>;
  theme: "professional" | "minimalistic" | "creative";
  format: CvFormat;
};

export const anyElement = z.lazy(() =>
  z.union([
    simpleLayoutElement,
    simpleTextElement,
    // ... and any other element that we define.
  ]),
);
export type AnyElement = z.infer<typeof anyElement>;
