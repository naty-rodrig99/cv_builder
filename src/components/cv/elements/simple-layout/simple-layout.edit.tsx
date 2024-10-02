import React from "react";
import DynamicElementEdit from "~/components/cv/elements/dynamic-element.edit";
import { cn } from "~/lib/utils";
import { SimpleLayoutElement } from "./simple-layout.schema";
import { useDispatch } from "~/components/cv/context";
import { setDirection } from "~/components/cv/elements/simple-layout/simple-layout.state";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";

export interface SimpleLayoutEditProps {
  element: SimpleLayoutElement;
}

const SimpleLayoutEdit = ({ element }: SimpleLayoutEditProps) => {
  const dispatch = useDispatch();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn("flex w-full gap-2", {
            "flex-col": element.options.direction === "vertical",
            "flex-row": element.options.direction === "horizontal",
          })}
        >
          {element.slots.children.map((id) => (
            <DynamicElementEdit key={id} elementId={id} />
          ))}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel inset>Direction</ContextMenuLabel>
        <ContextMenuRadioGroup
          value={element.options.direction}
          onValueChange={(value) => {
            const direction = value as "vertical" | "horizontal";
            dispatch(setDirection(element.id, direction));
          }}
        >
          <ContextMenuRadioItem value="vertical">Vertical</ContextMenuRadioItem>
          <ContextMenuRadioItem value="horizontal">
            Horizontal
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default SimpleLayoutEdit;
