import * as z from "zod";
import { abstractElement } from "../../abstract-element";

export const SIMPLE_HEADER_OPTIONS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
export type SimpleHeaderOptions = (typeof SIMPLE_HEADER_OPTIONS)[number];

export const simpleHeaderElement = abstractElement.extend({
  type: z.literal("simple-header"),
  headingOptions: z.object({
    heading: z.union([
      z.literal("h1"),
      z.literal("h2"),
      z.literal("h3"),
      z.literal("h4"),
      z.literal("h5"),
      z.literal("h6"),
    ]),
  }),
  data: z.object({ text: z.string() }),
});

export type SimpleHeaderElement = z.infer<typeof simpleHeaderElement>;
