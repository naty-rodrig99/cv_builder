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
import Paper from "~/components/paper";
import DynamicElementPreview from "./elements/dynamic-element.preview";
import { toast } from "sonner";
import { ChevronLeftIcon, Loader2Icon, PrinterIcon } from "lucide-react";
import Link from "next/link";
import { routeProject, routeProjects } from "~/app/routes";

const ELEMENT_LIST = [
  "simple-layout",
  "simple-text",
  "simple-header",
  "profile-element",
] as const;

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

interface EditorHeaderProps {
  projectName: string;
  onRename: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saving: boolean;
  onSave: () => void;
  onExport: () => void;
}
export const EditorHeader = ({
  projectName,
  onRename,
  saving,
  onSave,
  onExport,
}: EditorHeaderProps) => {
  return (
    <header className="w-full space-y-6 p-10 pb-0 pt-16">
      <div className="flex w-full">
        <div className="space-y-">
          <div className="flex items-center">
            <Button asChild variant="outline" size="icon" className="mr-4">
              <Link href={routeProjects()} aria-label="Back">
                <ChevronLeftIcon />
              </Link>
            </Button>
            <H1>
              <input value={projectName} onChange={onRename} />
            </H1>
          </div>
          <P className="max-w-prose text-muted-foreground">
            Drag and drop elements from the left panel to the preview. Then
            export your CV using the "Export" button.
          </P>
        </div>
        <div className="ml-auto flex gap-2">
          <FormatSelector />
          <Button variant="secondary" disabled={saving} onClick={onSave}>
            {saving && <Loader2Icon className="mr-2 size-4 animate-spin" />}
            Save
          </Button>
          <Button onClick={onExport}>Export</Button>
        </div>
      </div>
      <Separator className="my-6" />
    </header>
  );
};

export interface CvEditorProps {
  cv: {
    name: string;
    schema: CvSchema;
  };
  saveAction: (cvData: {
    name: string | null;
    schema: CvSchema;
  }) => Promise<void>;
  exportAction: (cvData: {
    name: string | null;
    schema: CvSchema;
  }) => Promise<void>;
}

const CvEditor = ({ cv, saveAction, exportAction }: CvEditorProps) => {
  const [state, dispatch] = useCvEditorState(cv.name, cv.schema);
  const [activeElementType, setActiveElementType] = useState<
    AnyElement["type"] | null
  >(null);

  const [savingSchema, setSavingSchema] = useState(false);

  const onSave = async () => {
    setSavingSchema(true);
    try {
      await saveAction({
        name: state.name,
        schema: state.schema,
      });
      toast.success("You can rest now. Your CV is saved 😌");
    } catch (error) {
      console.error(error);
      toast.error("We could not save your CV. Please try again later.", {
        dismissible: true,
        closeButton: true,
      });
    } finally {
      setSavingSchema(false);
    }
  };

  const onExport = async () => {
    setSavingSchema(true);
    try {
      await exportAction({
        name: state.name,
        schema: state.schema,
      });
      toast.success("Your CV has been saved");
    } catch (error) {
      console.error(error);
      toast.error("We could not save your CV. Please try again later.", {
        dismissible: true,
        closeButton: true,
      });
    } finally {
      setSavingSchema(false);
    }
  };

  return (
    <CvBuilderContextProvider state={state} dispatch={dispatch}>
      <div className="flex size-full flex-col">
        <EditorHeader
          projectName={state.name === null ? "Untitled CV" : state.name}
          onRename={(event) => dispatch(setName(event.target.value))}
          saving={savingSchema}
          onSave={onSave}
          onExport={onExport}
        />
        <DndContext
          id={useId()}
          onDragStart={(event) =>
            setActiveElementType(event.active.id as AnyElement["type"])
          }
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
