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
      {element.id !== rootElement ? (
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => {
              dispatch(deleteElement(element.id));
            }}
          >
            <TrashIcon />
          </MenubarTrigger>
        </MenubarMenu>
      ) : null}
    </Menubar>
  );
}
