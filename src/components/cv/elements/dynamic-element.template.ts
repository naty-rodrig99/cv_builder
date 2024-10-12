import { type AnyElement } from "../schema";
import { newSimpleLayoutElement } from "./simple-layout/simple-layout.template";
import { newSimpleTextElement } from "./simple-text/simple-text.template";

export const createElement = (elementType: AnyElement["type"]) => {
  switch (elementType) {
    case "simple-layout":
      return newSimpleLayoutElement({});
    case "simple-text":
      return newSimpleTextElement({ text: "" });
    default:
      return null;
  }
};
