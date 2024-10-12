import { nanoid } from "nanoid";
import { type SimpleLayoutElement } from "./simple-layout.schema";
import { type ElementTemplate, template } from "~/components/cv/schema.template";

export const newSimpleLayoutElement = (args: {
  direction?: "vertical" | "horizontal";
  children?: ElementTemplate[];
}) => {
  const element = {
    id: nanoid(),
    type: "simple-layout",
    options: { direction: args.direction ?? "vertical" },
    slots: { children: args.children?.map(([element]) => element.id) ?? [] },
  } satisfies SimpleLayoutElement;

  return template(element, args.children);
};
