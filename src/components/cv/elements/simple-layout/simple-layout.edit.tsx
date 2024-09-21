import React from "react";
import DynamicElementEdit from "~/components/cv/elements/dynamic-element.edit";
import { cn } from "~/lib/utils";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "~/components/ui/menubar";
import { SimpleLayoutElement } from "./simple-layout.schema";
import { useDispatch } from "~/components/cv/context";
import { setDirection } from "~/components/cv/elements/simple-layout/simple-layout.state";

export interface SimpleLayoutEditProps {
  element: SimpleLayoutElement;
}

const SimpleLayoutEdit = ({ element }: SimpleLayoutEditProps) => {
  const dispatch = useDispatch();

  return (
    <div
      className={cn("flex w-full gap-2", {
        "flex-col": element.options.direction === "vertical",
        "flex-row": element.options.direction === "horizontal",
      })}
    >
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Direction</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup
              value={element.options.direction}
              onValueChange={(value) => {
                const direction = value as "vertical" | "horizontal";
                dispatch(setDirection(element.id, direction));
              }}
            >
              <MenubarRadioItem value="vertical">Vertical</MenubarRadioItem>
              <MenubarRadioItem value="horizontal">Horizontal</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {element.slots.children.map((id) => (
        <DynamicElementEdit key={id} elementId={id} />
      ))}
    </div>
  );
};

export default SimpleLayoutEdit;
