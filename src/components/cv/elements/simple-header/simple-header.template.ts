import { nanoid } from "nanoid";
import { template } from "~/components/cv/schema.template";
import { SimpleHeaderElement } from "./simple-header.schema";

export const newSimpleHeaderElement = (args: { text: string }) => {
  return template({
    id: nanoid(),
    type: "simple-header",
    data: { text: args.text },
  } satisfies SimpleHeaderElement);
};
