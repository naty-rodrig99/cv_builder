import * as z from "zod";
import { abstractElement } from "../../abstract-element";

export const SIMPLE_LAYOUT_DIRECTIONS = ["vertical", "horizontal"] as const;
export type SimpleLayoutDirections = (typeof SIMPLE_LAYOUT_DIRECTIONS)[number];

export const simpleLayoutElement = abstractElement.extend({
  type: z.literal("simple-layout"),
  options: z.object({
    direction: z.union([z.literal("vertical"), z.literal("horizontal")]),
  }),
  slots: z.object({ children: z.array(z.string()) }),
});

export type SimpleLayoutElement = z.infer<typeof simpleLayoutElement>;
