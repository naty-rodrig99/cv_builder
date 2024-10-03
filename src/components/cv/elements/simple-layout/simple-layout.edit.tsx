import React from "react";
import DynamicElementEdit from "~/components/cv/elements/dynamic-element.edit";
import { cn } from "~/lib/utils";
import { SIMPLE_LAYOUT_DIRECTIONS, SimpleLayoutDirections, SimpleLayoutElement } from "./simple-layout.schema";
import { useDispatch } from "~/components/cv/context";
import {
  appendNewElement,
  prependNewElement,
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
        className={cn("flex w-full gap-2", {
          "flex-col": element.options.direction === "vertical",
          "flex-row": element.options.direction === "horizontal",
        })}
      >
        {element.slots.children.map((id, index) => (
          <>
            <DropZone
              id={id + "-previous-dropzone"}
              onDrop={(event) => {
                const elementType = event.active.id as AnyElement["type"];
                dispatch(prependNewElement(element.id, elementType, index));
              }}
            ></DropZone>
            <DynamicElementEdit key={id} elementId={id} />
          </>
        ))}
        <DropZone
          id={element.id + "-final-dropzone"}
          onDrop={(event) => {
            const elementType = event.active.id as AnyElement["type"];
            dispatch(appendNewElement(element.id, elementType));
          }}
        ></DropZone>
      </div>
    </>
  );
};

export default SimpleLayoutEdit;
