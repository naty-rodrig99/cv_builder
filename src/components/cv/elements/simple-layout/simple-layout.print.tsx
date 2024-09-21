import React from "react";
import { cn } from "~/lib/utils";
import DynamicEdit from "~/components/cv/elements/dynamic-element.edit";
import { SimpleLayoutElement } from "./simple-layout.schema";

export interface SimpleLayoutPrintProps {
  element: SimpleLayoutElement;
}

const SimpleLayoutPrint = ({ element }: SimpleLayoutPrintProps) => {
  return (
    <div
      className={cn("relative flex w-full gap-2", {
        "flex-col": element.options.direction === "vertical",
        "flex-row": element.options.direction === "horizontal",
      })}
    >
      {element.slots.children.map((id) => (
        <DynamicEdit elementId={id} />
      ))}
    </div>
  );
};

export default SimpleLayoutPrint;
