import { AnyElement } from "../schema";
import { newSimpleLayoutElement } from "./simple-layout/simple-layout.template";
import { newSimpleTextElement } from "./simple-text/simple-text.template";
import { newSimpleHeaderElement } from "./simple-header/simple-header.template";

export const createElement = (elementType: AnyElement["type"]) => {
  switch (elementType) {
    case "simple-layout":
      return newSimpleLayoutElement({});
    case "simple-text":
      return newSimpleTextElement({ text: "" });
    case "simple-header":
      return newSimpleHeaderElement({ text: "" });
    default:
      return null;
  }
};
