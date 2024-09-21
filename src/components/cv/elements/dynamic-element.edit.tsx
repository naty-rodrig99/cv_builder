import React from "react";
import SimpleLayoutEdit from "./simple-layout/simple-layout.edit";
import SimpleTextEdit from "./simple-text/simple-text.edit";
import { selectElement } from "~/components/cv/state/selectors";
import { useSelector } from "~/components/cv/context";

export interface DynamicElementEditProps {
  elementId: string;
}

const DynamicElementEdit = ({ elementId }: DynamicElementEditProps) => {
  const element = useSelector(selectElement(elementId));
  if (!element) return null;

  switch (element.type) {
    case "simple-layout":
      return <SimpleLayoutEdit element={element} />;
    case "simple-text":
      return <SimpleTextEdit element={element} />;
    default:
      return null;
  }
};

export default DynamicElementEdit;
