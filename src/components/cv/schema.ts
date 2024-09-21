import * as z from "zod";
import { simpleLayoutElement } from "~/components/cv/elements/simple-layout/simple-layout.schema";
import { simpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";

// The CvSchema has two main properties: "rootElement" and "elements".
// The rootElement is just an id reference to the root element (always a simple column layout).
// The elements property contains all elements in a dictionary where the key is the element id.
// This allows different elements to reference each other by their id, however comes with some
// maintenance cost as we have to make sure that any referenced element actually exists.
export type CvSchema = {
  rootElement: string;
  elements: Record<string, AnyElement>;
  theme: "professional" | "minimalistic" | "creative";
  size: "DINA4" | "Letter";
};

// Using zod for type definitions, which allows for runtime validation to be baked right in.
// https://zod.dev/

export const abstractElement = z.object({
  id: z.string(), // Unique identifier for this element instance.
  type: z.string(), // Element type. Should be literal type.
  options: z.optional(z.object({})), // Options that influence how this element behaves.
  data: z.optional(z.object({})), // Any data that this element might require. Needs to be wired up with available data.
  slots: z.optional(z.record(z.string(), z.array(z.string()))), // Slots for recursive element definitions. Commonly used by layout elements.
});
export type AbstractElement = z.infer<typeof abstractElement>;

export const anyElement = z.lazy(() =>
  z.union([
    simpleLayoutElement,
    simpleTextElement,
    // ... and any other element that we define.
  ]),
);
export type AnyElement = z.infer<typeof anyElement>;
