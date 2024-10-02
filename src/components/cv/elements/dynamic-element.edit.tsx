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
  let elementComponent: React.ReactNode | null = null;

  switch (element.type) {
    case "simple-layout":
      elementComponent = <SimpleLayoutEdit element={element} />;
      break;
    case "simple-text":
      elementComponent = <SimpleTextEdit element={element} />;
      break;
    default:
  }
  return <div className="hover:outline-dashed outline-border outline-radius-5">{elementComponent}</div>;
};

export default DynamicElementEdit;
