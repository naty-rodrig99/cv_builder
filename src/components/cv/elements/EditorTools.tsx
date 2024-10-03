import {
  Menubar,
  MenubarContent,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "~/components/ui/menubar";
import { useSelector } from "../context";
import { SimpleLayoutElement } from "./simple-layout/simple-layout.schema";
import { SimpleTextElement } from "./simple-text/simple-text.schema";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";
import { TrashIcon } from "@radix-ui/react-icons";

type DynamicElement = SimpleLayoutElement | SimpleTextElement;

interface EditionToolsProps<T extends string> {
  element: DynamicElement;
  options: {
    optionName: string;
    optionList: T[];
    action?: (value: T) => void;
    optionDefault?: T;
  }[];
}

export function EditionTools<T extends string>({
  element,
  options,
}: EditionToolsProps<T>) {
  if (!element) return null;
  const isSelected = useSelector((state) => state.selection) === element.id;

  return (
    <Menubar
      className={cn((isSelected && "absolute -top-10 z-40") || "hidden")}
    >
      <MenubarMenu>
        <MenubarLabel className="flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
          {element.type}
        </MenubarLabel>
      </MenubarMenu>
      {/* TODO: make this a user friendly name*/}
      <Separator orientation="vertical" />
      {options.map(({ optionName, optionList, action, optionDefault }) => (
        <MenubarMenu key={element.id + optionName}>
          <MenubarTrigger>{optionName}</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup
              value={optionDefault}
              onValueChange={action ? (value) => action(value as T) : () => {}}
            >
              {optionList.map((op) => (
                <MenubarRadioItem key={element.id + optionName + op} value={op}>
                  {op}
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      ))}
      <MenubarMenu>
        <MenubarTrigger
          onClick={(event) => {
            // dispatch(deleteElement(element.id));
          }}
        >
          <TrashIcon />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
