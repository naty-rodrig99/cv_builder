import { nanoid } from "nanoid";
import { template } from "~/components/cv/schema.template";
import { SimpleHeaderElement } from "./simple-header.schema";

export const newSimpleHeaderElement = (args: {
  heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  text: string;
}) => {
  return template({
    id: nanoid(),
    type: "simple-header",
    headingOptions: { heading: args.heading ?? "h1" },
    data: { text: args.text },
  } satisfies SimpleHeaderElement);
};
