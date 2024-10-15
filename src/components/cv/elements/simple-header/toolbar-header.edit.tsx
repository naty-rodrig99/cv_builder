import {
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarRadioGroup,
  MenubarRadioItem,
} from "~/components/ui/menubar";

import {
  SimpleHeaderLevels,
  SIMPLE_HEADER_LEVELS,
} from "./simple-header.schema";

import { setHeadingOption } from "./simple-header.state";
import { useDispatch } from "../../context";
import type { SimpleHeaderElement } from "./simple-header.schema";

interface HeaderToolbarProps {
  element: SimpleHeaderElement;
}

const HeaderToolbar = ({ element }: HeaderToolbarProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <MenubarMenu>
        <MenubarTrigger>Heading: {element.options?.heading}</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup
            value={element.options?.heading}
            onValueChange={(v) => {
              dispatch(setHeadingOption(element.id, v as SimpleHeaderLevels));
            }}
          >
            {SIMPLE_HEADER_LEVELS.map((op) => (
              <MenubarRadioItem key={op} value={op}>
                {op}
              </MenubarRadioItem>
            ))}
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </>
  );
};

export default HeaderToolbar;
