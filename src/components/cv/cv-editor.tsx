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
import { cvFormats, CvSchema } from "~/components/cv/schema";
import DynamicElementEdit from "~/components/cv/elements/dynamic-element.edit";
import { useCvEditorState } from "~/components/cv/state/use-cv-editor-state";
import {
  CvBuilderContextProvider,
  useDispatch,
  useSelector,
} from "~/components/cv/context";
import { cn, format2aspectRatio } from "~/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ZoomInIcon, ZoomOutIcon } from "@radix-ui/react-icons";
import { setFormat, zoom } from "./state/reducer";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { routeProjectExport } from "~/app/routes";
import Paper from "~/components/paper";

const ElementPanel = () => {
  return (
    <ScrollArea className={cn("size-full", "p-8")}>
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
      <ul>
        {[...Array(25)].map((e, i) => (
          <>
            <div key={e}>Add Component here</div>
          </>
        ))}
      </ul>
    </ScrollArea>
  );
};

const PreviewPanel = () => {
  const rootElement = useSelector((state) => state.schema.rootElement);
  const format = useSelector((state) => state.schema.format);
  const zoom = useSelector((state) => state.zoom);

  return (
    <ScrollArea className={cn("size-full", "flex", "justify-center")}>
      <div className="p-10">
        <Paper paperSize={format} className="mx-auto" style={{ zoom: zoom }}>
          <DynamicElementEdit elementId={rootElement} />
        </Paper>
      </div>
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

const FormatSelector = () => {
  const format = useSelector((state) => state.schema.format);
  const dispatch = useDispatch();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("py-0", "rounded-2xl", "leading-tight")}
        >
          Format: {format}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-fit", "p-1")}>
        {cvFormats.map((type, i) => (
          <>
            {i > 0 ? <Separator /> : <></>}
            <Label
              onClick={() => dispatch(setFormat(type))}
              className={cn(
                "w-full",
                "px-6",
                "rounded-l",
                "hover:bg-accent",
                "hover:text-accent-foreground",
              )}
            >
              {type}
            </Label>
          </>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export interface CvEditorProps {
  projectId: string;
  cv: {
    name: string;
    schema: CvSchema;
  };
}

const CvEditor = ({ projectId, cv }: CvEditorProps) => {
  const [state, dispatch] = useCvEditorState(cv.schema);

  return (
    <CvBuilderContextProvider state={state} dispatch={dispatch}>
      <div className="flex size-full flex-col">
        <header className="flex flex-row justify-between p-8">
          <H1>{cv.name}</H1>
          <FormatSelector />
          <Button asChild>
            <Link href={routeProjectExport(projectId)}>Export</Link>
          </Button>
        </header>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={33}>
            <ElementPanel />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={67}>
            <PreviewPanel />
            <ZoomButtons />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </CvBuilderContextProvider>
  );
};

export default CvEditor;
