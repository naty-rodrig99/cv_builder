"use client";

import React, { useId, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { Button } from "~/components/ui/button";
import { H1, H3, P } from "~/components/ui/typography";
import {
  type AnyElement,
  cvFormats,
  type CvSchema,
} from "~/components/cv/schema";
import DynamicElementEdit from "~/components/cv/elements/dynamic-element.edit";
import { useCvEditorState } from "~/components/cv/state/use-cv-editor-state";
import {
  CvBuilderContextProvider,
  useDispatch,
  useSelector,
} from "~/components/cv/context";
import { DndContext, DragOverlay, useDraggable } from "@dnd-kit/core";
import { cn } from "~/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ZoomInIcon, ZoomOutIcon } from "@radix-ui/react-icons";
import { setFormat, setName, zoom } from "./state/reducer";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { routeProjectExport } from "~/app/routes";
import Paper from "~/components/paper";
import DynamicElementPreview from "./elements/dynamic-element.preview";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

const ELEMENT_LIST = ["simple-layout", "simple-text"] as const;

interface DraggableProps {
  type: (typeof ELEMENT_LIST)[number];
  children: React.ReactNode;
}
const Draggable = ({ type, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: type,
    data: { type: type },
  });

  return (
    <button ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </button>
  );
};

const ElementPanel = () => {
  return (
    <ScrollArea className={cn("size-full", "p-8")}>
      <H3>Elements Panel</H3>
      <P>Todo: Enable drag and drop, creating new elements, etc.</P>
      <br />
      <ul className="flex flex-col gap-4">
        {ELEMENT_LIST.map((type) => {
          return (
            <li key={type}>
              <Draggable type={type}>
                <DynamicElementPreview elementType={type} />
              </Draggable>
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
};

const EditPanel = () => {
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
          <div key={"fs" + i}>
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
          </div>
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
  saveAction: (cvData: {
    name: string | null;
    schema: CvSchema;
  }) => Promise<void>;
}

const CvEditor = ({ projectId, cv, saveAction }: CvEditorProps) => {
  const [state, dispatch] = useCvEditorState(cv.name, cv.schema);
  const [activeElementType, setActiveElementType] = useState<
    AnyElement["type"] | null
  >(null);

  const [savingSchema, setSavingSchema] = useState(false);

  return (
    <CvBuilderContextProvider state={state} dispatch={dispatch}>
      <div className="flex size-full flex-col">
        <header className="flex flex-row justify-between p-8">
          <H1>
            <input
              value={state.name === null ? "Untitled CV" : state.name}
              onChange={(event) => {
                console.log(event.target.value);
                dispatch(setName(event.target.value));
              }}
            ></input>
          </H1>
          <FormatSelector />
          <Button
            variant="secondary"
            disabled={savingSchema}
            onClick={async () => {
              setSavingSchema(true);
              try {
                await saveAction({
                  name: state.name,
                  schema: state.schema,
                });
                toast.success("You can rest now. Your CV is saved 😌");
              } catch (error) {
                console.error(error);
                toast.error(
                  "We could not save your CV. Please try again later.",
                  {
                    dismissible: true,
                    closeButton: true,
                  },
                );
              } finally {
                setSavingSchema(false);
              }
            }}
          >
            {savingSchema && (
              <Loader2Icon className="mr-2 size-4 animate-spin" />
            )}
            Save
          </Button>
          <Button asChild>
            <Link href={routeProjectExport(projectId)}>Export</Link>
          </Button>
        </header>
        <DndContext
          id={useId()}
          onDragStart={(event) => {
            setActiveElementType(event.active.id as AnyElement["type"]);
          }}
          onDragEnd={() => setActiveElementType(null)}
        >
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={33}>
              <ElementPanel />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={67}>
              <EditPanel />
              <ZoomButtons />
            </ResizablePanel>
          </ResizablePanelGroup>
          <DragOverlay>
            {activeElementType ? (
              <DynamicElementPreview elementType={activeElementType} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </CvBuilderContextProvider>
  );
};

export default CvEditor;
