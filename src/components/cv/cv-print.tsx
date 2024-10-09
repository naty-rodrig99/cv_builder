"use client";

import React from "react";
import DynamicElementPrint from "~/components/cv/elements/dynamic-element.print";
import { CvSchema } from "~/components/cv/schema";
import { useCvEditorState } from "~/components/cv/state/use-cv-editor-state";
import { CvBuilderContextProvider } from "~/components/cv/context";
import { Button } from "~/components/ui/button";
import Paper from "~/components/paper";
import { H1, P } from "~/components/ui/typography";
import Link from "next/link";
import { routeProject } from "~/app/routes";
import { Separator } from "~/components/ui/separator";
import { ChevronLeftIcon, PrinterIcon } from "lucide-react";

export interface CvPrintProps {
  projectId: string;
  schema: CvSchema;
}

const CvPrint = ({ projectId, schema }: CvPrintProps) => {
  const [state] = useCvEditorState(schema);
  const paperSize = state.schema.format;

  return (
    <CvBuilderContextProvider state={state} dispatch={() => {}}>
      <header className="w-full space-y-6 p-10 pb-0 pt-16 print:hidden">
        <div className="flex w-full">
          <div className="space-y-">
            <div className="flex items-center">
              <Button asChild variant="outline" size="icon" className="mr-4">
                <Link href={routeProject(projectId)} aria-label="Back">
                  <ChevronLeftIcon />
                </Link>
              </Button>
              <H1>Export CV</H1>
            </div>
            <P className="max-w-prose text-muted-foreground">
              Choose "Save as PDF", select the paper size "{paperSize}" and
              finally remove any margins from the print.
            </P>
          </div>
          <Button className="ml-auto" onClick={() => window.print()}>
            <PrinterIcon className="ml-[-1px] mr-2 size-4" />
            Print
          </Button>
        </div>
        <Separator className="my-6" />
      </header>
      <div className="flex w-full items-center justify-center p-10 pb-16 print:contents">
        <Paper paperSize={paperSize}>
          <DynamicElementPrint elementId={schema.rootElement} />
        </Paper>
      </div>
    </CvBuilderContextProvider>
  );
};

export default CvPrint;
