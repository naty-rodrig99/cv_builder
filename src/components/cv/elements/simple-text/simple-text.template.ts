import { nanoid } from "nanoid";
import { type SimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";
import { template } from "~/components/cv/schema.template";

export const newSimpleTextElement = (args: { text: string }) => {
  return template({
    id: nanoid(),
    type: "simple-text",
    data: { text: args.text },
  } satisfies SimpleTextElement);
};
