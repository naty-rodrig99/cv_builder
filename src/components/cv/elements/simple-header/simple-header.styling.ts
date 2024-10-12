import type { SimpleHeaderLevels } from "./simple-header.schema";
import { cn } from "~/lib/utils";

export const simpleHeaderStyling = (level: SimpleHeaderLevels) => {
  return cn("h-auto pb-2 pt-6 font-sans", {
    "text-3xl": level === "h1",
    "text-2xl": level === "h2",
    "text-xl": level === "h3",
    "text-lg": level === "h4",
    "text-base": level === "h5",
    "text-sm": level === "h6",
  });
};
