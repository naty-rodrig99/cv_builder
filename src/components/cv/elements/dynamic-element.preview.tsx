import React from "react";
import { SimpleTextPreview } from "./simple-text/simple-text.preview";
import { SimpleLayoutPreview } from "./simple-layout/simple-layout.preview";
import { AnyElement } from "../schema";
import { SimpleHeaderPreview } from "./simple-header/simple-header.preview";

export interface DynamicElementEditProps {
  elementType: AnyElement["type"];
}

const DynamicElementPreview = ({ elementType }: DynamicElementEditProps) => {
  switch (elementType) {
    case "simple-layout":
      return <SimpleLayoutPreview />;
    case "simple-text":
      return <SimpleTextPreview />;
    case "simple-header":
      return <SimpleHeaderPreview />;
    default:
      return null;
  }
};

export default DynamicElementPreview;
