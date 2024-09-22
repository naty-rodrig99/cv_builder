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
import {
  CvBuilderContextProvider,
  useDispatch,
  useSelector,
} from "~/components/cv/context";
import { cn, format2twdAspect } from "~/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ZoomInIcon, ZoomOutIcon } from "@radix-ui/react-icons";
import { zoom } from "./state/reducer";

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

const PreviewPanel = () => {
  const rootElement = useSelector((state) => state.schema.rootElement);
  const ratio = format2twdAspect(useSelector((state) => state.schema.format));
  const zoom = useSelector((state) => state.zoom);
  // TODO: add aspect ratio selection
  // TODO: include zoom

  return (
    <ScrollArea className={cn("size-full", "p-8", "flex", "justify-center")}>
      <Card
        className={cn("p-12", "w-[250mm]", "mx-auto")}
        style={{ zoom: zoom, aspectRatio: ratio }}
      >
        <DynamicElementEdit elementId={rootElement} />
      </Card>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

const ZOOM_RATIO = 1.1;
const ZoomButtons = () => {
  const dispatch = useDispatch();
  return (
    <div className={cn("absolute", "right-16", "top-[50%]", "object-right")}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => dispatch(zoom(ZOOM_RATIO))}
      >
        <ZoomInIcon />
      </Button>
      <br />
      <Button
        variant="outline"
        size="icon"
        onClick={() => dispatch(zoom(1 / ZOOM_RATIO))}
      >
        <ZoomOutIcon />
      </Button>
    </div>
  );
};

export interface CvEditorProps {
  cv: {
    name: string;
    schema: CvSchema;
  };
}

const CvEditor = ({ cv }: CvEditorProps) => {
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
          <ResizablePanel defaultSize={67} className="p-0">
            <PreviewPanel />
            <ZoomButtons />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </CvBuilderContextProvider>
  );
};

export default CvEditor;
