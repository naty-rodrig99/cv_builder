import * as z from "zod";

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
