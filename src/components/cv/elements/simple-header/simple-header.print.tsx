import React from "react";
import type { SimpleHeaderElement } from "./simple-header.schema";
import { simpleHeaderStyling } from "./simple-header.styling";
export interface SimpleHeaderPrintProps {
  element: SimpleHeaderElement;
}

const SimpleHeaderPrint = ({ element }: SimpleHeaderPrintProps) => {
  const Heading = element.options.heading;

  return (
    <Heading className={simpleHeaderStyling(element.options.heading)}>
      {element.data.text}
    </Heading>
  );
};

export default SimpleHeaderPrint;
