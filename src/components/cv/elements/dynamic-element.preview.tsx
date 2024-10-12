import React from "react";
import { SimpleTextPreview } from "./simple-text/simple-text.preview";
import { SimpleLayoutPreview } from "./simple-layout/simple-layout.preview";
import { type AnyElement } from "../schema";

export interface DynamicElementEditProps {
  elementType: AnyElement["type"];
}

const DynamicElementPreview = ({ elementType }: DynamicElementEditProps) => {
  switch (elementType) {
    case "simple-layout":
      return <SimpleLayoutPreview />;
    case "simple-text":
      return <SimpleTextPreview />;
    default:
      return null;
  }
};

export default DynamicElementPreview;
