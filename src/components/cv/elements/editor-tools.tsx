import {
  Menubar,
  MenubarContent,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "~/components/ui/menubar";
import { useDispatch, useSelector } from "../context";
import { SimpleLayoutElement } from "./simple-layout/simple-layout.schema";
import { SimpleTextElement } from "./simple-text/simple-text.schema";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";
import { TrashIcon, DragHandleDots2Icon } from "@radix-ui/react-icons";
import { deleteElement } from "../state/reducer";
import { retrieveElementContext } from "./element-context";
import React, { useId } from "react";
import { AnyElement } from "../schema";

type DynamicElement = SimpleLayoutElement | SimpleTextElement;

type SelectOneOptions<SelOne> = {
  type: "select-one";
  optionName: string;
  optionList: SelOne[];
  action?: (value: SelOne) => void;
  optionDefault?: string;
};

type CustomOptions = {
  type: "custom";
  children: React.ReactNode;
};

type Option = SelectOneOptions<any> | CustomOptions;

export function selectOneOption<SelOne>(
  optionName: string,
  optionList: SelOne[],
  action?: (value: SelOne) => void,
  optionDefault?: string,
): SelectOneOptions<SelOne> {
  return {
    type: "select-one",
    optionName: optionName,
    optionList: optionList,
    action: action!,
    optionDefault: optionDefault!,
  };
}

export function customOption(component: React.ReactNode): CustomOptions {
  return {
    type: "custom",
    children: component,
  };
}

interface OptionLayoutProps {
  option: Option;
  element: AnyElement;
}
const OptionLayout = ({ option, element }: OptionLayoutProps) => {
  switch (option.type) {
    case "select-one":
      return (
        <MenubarMenu key={element.id + option.optionName}>
          <MenubarTrigger>{option.optionName}</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup
              value={option.optionDefault}
              onValueChange={
                option.action
                  ? (value) => option.action!(value as typeof value)
                  : () => {}
              }
            >
              {option.optionList.map((op) => (
                <MenubarRadioItem
                  key={element.id + option.optionName + op}
                  value={op}
                >
                  {op}
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      );

    case "custom":
      return option.children;

    default:
      return null;
  }
};

interface EditionToolsProps {
  element: DynamicElement;
  options: Option[];
}
export function EditionTools({ element, options }: EditionToolsProps) {
  if (!element) return null;
  const isSelected = useSelector((state) => state.selection) === element.id;
  const dispatch = useDispatch();
  const rootElement = useSelector((state) => state.schema.rootElement);

  const { listeners, setActivatorNodeRef } = retrieveElementContext(element.id);

  return (
    <Menubar
      className={cn((isSelected && "absolute -top-10 z-40") || "hidden")}
    >
      {element.id !== rootElement ? (
        <>
          <MenubarMenu>
            <div ref={setActivatorNodeRef} {...listeners}>
              <DragHandleDots2Icon />
            </div>
          </MenubarMenu>
          <Separator orientation="vertical" />
        </>
      ) : null}
      <MenubarMenu>
        <MenubarLabel className="flex cursor-default select-none items-center whitespace-nowrap rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
          {element.type}
        </MenubarLabel>
      </MenubarMenu>
      {/* TODO: make this a user friendly name*/}
      {options.map((option) => (
        <div key={useId()}>
          <Separator orientation="vertical" />
          <OptionLayout element={element} option={option} />
        </div>
      ))}
      {element.id !== rootElement ? (
        <>
          <Separator orientation="vertical" />
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => {
                dispatch(deleteElement(element.id));
              }}
            >
              <TrashIcon />
            </MenubarTrigger>
          </MenubarMenu>
        </>
      ) : null}
    </Menubar>
  );
}
