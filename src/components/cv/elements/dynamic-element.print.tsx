import React from "react";
import SimpleLayoutPrint from "./simple-layout/simple-layout.print";
import SimpleTextPrint from "~/components/cv/elements/simple-text/simple-text.print";
import { useSelector } from "~/components/cv/context";
import { selectElement } from "~/components/cv/state/selectors";
import SimpleHeaderPrint from "./simple-header/simple-header.print";
import ProfileElementPrint from "./profile-element/profile-element.print";

export interface PrintDynamicElementProps {
  elementId: string;
}

const PrintDynamicElement = ({ elementId }: PrintDynamicElementProps) => {
  const element = useSelector(selectElement(elementId));
  if (!element) return null;

  switch (element.type) {
    case "simple-layout":
      return <SimpleLayoutPrint element={element} />;
    case "simple-text":
      return <SimpleTextPrint element={element} />;
    case "simple-header":
      return <SimpleHeaderPrint element={element} />;
    case "profile-element":
      return <ProfileElementPrint element={element} />;
    default:
      return null;
  }
};

export default PrintDynamicElement;
