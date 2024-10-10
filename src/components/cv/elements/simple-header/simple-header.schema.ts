import * as z from "zod";
import { abstractElement } from "../../abstract-element";

export const simpleHeaderElement = abstractElement.extend({
  type: z.literal("simple-header"),
  data: z.object({ text: z.string() }),
});

export type SimpleHeaderElement = z.infer<typeof simpleHeaderElement>;
