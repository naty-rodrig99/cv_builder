import React from "react";
import DynamicElementEdit from "~/components/cv/elements/dynamic-element.edit";
import { cn } from "~/lib/utils";
import {
  SIMPLE_LAYOUT_DIRECTIONS,
  SimpleLayoutDirections,
  SimpleLayoutElement,
} from "./simple-layout.schema";
import { useDispatch } from "~/components/cv/context";
import {
  insertNewElement,
  moveElement,
  setDirection,
} from "~/components/cv/elements/simple-layout/simple-layout.state";
import { DropZone } from "~/components/drag-n-drop";
import { AnyElement } from "../../schema";
import { EditionTools } from "../EditorTools";

export interface SimpleLayoutEditProps {
  element: SimpleLayoutElement;
}

const SimpleLayoutEdit = ({ element }: SimpleLayoutEditProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <EditionTools<SimpleLayoutDirections>
        element={element}
        options={[
          {
            optionName: "Direction",
            optionList: SIMPLE_LAYOUT_DIRECTIONS,
            action: (direction) =>
              dispatch(setDirection(element.id, direction)),
            optionDefault: element.options.direction,
          },
        ]}
      />
      <div
        className={cn(
          "flex min-h-24 w-full min-w-24 gap-2 bg-blue-500 bg-opacity-10",
          {
            "flex-col": element.options.direction === "vertical",
            "flex-row": element.options.direction === "horizontal",
          },
        )}
      >
        <DropZone
          id={element.id + "-initial-dropzone"}
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
        {element.slots.children.map((id, index) => (
          <div key={"simple-lyt-edit" + index}>
            <DynamicElementEdit key={id} elementId={id} />
            <DropZone
              id={id + "-next-dropzone"}
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
