import React from "react";
import DynamicElementPrint from "~/components/cv/elements/dynamic-element.print";
import { CvSchema } from "~/components/cv/schema";

export interface CvPrintProps {
  schema: CvSchema;
}

const CvPrint = ({ schema }: CvPrintProps) => {
  return (
    <div>
      <header className="print:hidden">
        <h1>Export CV</h1>
        <p>Please print this page and choose "Save as PDF".</p>
      </header>
      <div>
        <DynamicElementPrint elementId={schema.rootElement} />
      </div>
    </div>
  );
};

export default CvPrint;
