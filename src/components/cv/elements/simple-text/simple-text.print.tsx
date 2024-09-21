import React from "react";
import { SimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";

export interface SimpleTextPrintProps {
  element: SimpleTextElement;
}

const SimpleTextPrint = ({ element }: SimpleTextPrintProps) => {
  return <p>{element.data.text}</p>;
};

export default SimpleTextPrint;
