"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { Button } from "~/components/ui/button";
import { H1, H3, P } from "~/components/ui/typography";
import { CvSchema } from "~/components/cv/schema";
import DynamicElementEdit from "~/components/cv/elements/dynamic-element.edit";
import { useCvEditorState } from "~/components/cv/state/use-cv-editor-state";
import { CvBuilderContextProvider, useSelector } from "~/components/cv/context";
import { cn } from "~/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const ElementPanel = () => {
  return (
    <>
      <H3>Elements Panel</H3>
      <P>Todo: Enable drag and drop, creating new elements, etc.</P>
      <br />
      <ul className="flex flex-col gap-4">
        <li>
          <Card>
            <CardHeader>
              <CardTitle>Simple Layout</CardTitle>
            </CardHeader>
            <CardContent>
              Simple concatenating layout. Choose between vertical and
              horizontal direction.
            </CardContent>
          </Card>
        </li>
        <li>
          <Card>
            <CardHeader>
              <CardTitle>Simple Text</CardTitle>
            </CardHeader>
            <CardContent>A very simple text element.</CardContent>
          </Card>
        </li>
      </ul>
    </>
  );
};

export interface CvPreviewProps {
  cv: {
    name: string;
    schema: CvSchema;
  };
}

const PreviewPanel = () => {
  const rootElement = useSelector((state) => state.schema.rootElement);
  const ratio = useSelector((state) => state.schema.size);
  // TODO: adapt ratio to ratio
  // TODO: include zoom

  return (
    <ScrollArea className={cn("size-full", "pr-10", "pb-10")}>
      <Card
        className={cn(
          "zoom-[2.5]",
          "p-12",
          "m-300",
          "w-[500mm]",
          "aspect-[21/29.7]",
        )}
      >
        <DynamicElementEdit elementId={rootElement} />
      </Card>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

const CvEditor = ({ cv }: CvPreviewProps) => {
  const [state, dispatch] = useCvEditorState(cv.schema);

  return (
    <CvBuilderContextProvider state={state} dispatch={dispatch}>
      <div className="flex size-full flex-col">
        <header className="flex flex-row justify-between p-8">
          <H1>{cv.name}</H1>
          <Button>Export</Button>
        </header>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={33} className="p-8">
            <ElementPanel />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={67} className="p-8">
            <PreviewPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </CvBuilderContextProvider>
  );
};

export default CvEditor;
