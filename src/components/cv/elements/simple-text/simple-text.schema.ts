import * as z from "zod";
import { abstractElement } from "~/components/cv/schema";

export const simpleTextElement = abstractElement.extend({
  type: z.literal("simple-text"),
  data: z.object({ text: z.string() }),
});

export type SimpleTextElement = z.infer<typeof simpleTextElement>;
