import React from "react";
import DynamicElementEdit from "~/components/cv/elements/dynamic-element.edit";
import { cn } from "~/lib/utils";
import {
  SIMPLE_LAYOUT_DIRECTIONS,
  type SimpleLayoutDirections,
  type SimpleLayoutElement,
} from "./simple-layout.schema";
import { useDispatch } from "~/components/cv/context";
import {
  insertNewElement,
  moveElement,
  setDirection,
} from "~/components/cv/elements/simple-layout/simple-layout.state";
import { DropZone } from "~/components/drag-n-drop";
import { type AnyElement } from "../../schema";
import { EditionTools, selectOneOption } from "../editor-tools";

export interface SimpleLayoutEditProps {
  element: SimpleLayoutElement;
}

const SimpleLayoutEdit = ({ element }: SimpleLayoutEditProps) => {
  // This component weaves view and presenter parts, reflecting the visual nature of the represented element.
  const dispatch = useDispatch();
  const hasChildren = element.slots.children.length > 0;

  return (
    <>
      <EditionTools
        element={element}
        options={[
          selectOneOption<SimpleLayoutDirections>(
            "Direction",
            SIMPLE_LAYOUT_DIRECTIONS as unknown as SimpleLayoutDirections[], // I really hate Typescript at times
            (direction) => dispatch(setDirection(element.id, direction)),
            element.options.direction as string,
          ),
        ]}
      />
      <div
        className={cn(
          "flex min-h-20 w-full py-5 min-w-24 bg-blue-800 bg-opacity-5",

          {
            "flex-col": element.options.direction === "vertical",
            "flex-row": element.options.direction === "horizontal",
          },
        )}
      >
        <div className="relative">
          <DropZone
            id={element.id + "-initial-dropzone"}
            direction={element.options.direction}
            hasChildren={hasChildren}
            onDrop={(event) => {
              if ("elementId" in event.active.data.current!) {
                const targetId = event.active.data.current.elementId as string;
                dispatch(moveElement(element.id, targetId, 0));
                return;
              }
              if ("type" in event.active.data.current!) {
                const elementType = event.active.data.current
                  .type as AnyElement["type"];
                dispatch(insertNewElement(element.id, elementType, 0));
                return;
              }
            }}
          />
        </div>
        {element.slots.children.map((id, index) => (
          <div key={"simple-lyt-edit" + index} className={cn("flex-1")}>
            <DynamicElementEdit key={id} elementId={id} />

            <DropZone
              id={id + "-next-dropzone"}
              direction={element.options.direction}
              hasChildren={true}
              onDrop={(event) => {
                if ("elementId" in event.active.data.current!) {
                  const targetId = event.active.data.current
                    .elementId as string;
                  dispatch(moveElement(element.id, targetId, index + 1));
                  return;
                }
                if ("type" in event.active.data.current!) {
                  const elementType = event.active.data.current
                    .type as AnyElement["type"];
                  dispatch(
                    insertNewElement(element.id, elementType, index + 1),
                  );
                  return;
                }
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SimpleLayoutEdit;
