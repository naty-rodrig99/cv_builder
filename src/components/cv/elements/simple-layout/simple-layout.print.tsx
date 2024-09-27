import React from "react";
import { cn } from "~/lib/utils";
import DynamicElementPrint from "~/components/cv/elements/dynamic-element.print";
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
        <DynamicElementPrint key={id} elementId={id} />
      ))}
    </div>
  );
};

export default SimpleLayoutPrint;
