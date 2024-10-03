import React from "react";
import SimpleLayoutEdit from "./simple-layout/simple-layout.edit";
import SimpleTextEdit from "./simple-text/simple-text.edit";
import { selectElement } from "~/components/cv/state/selectors";
import { useDispatch, useSelector } from "~/components/cv/context";
import { cn } from "~/lib/utils";
import { focusElement } from "../state/reducer";

export interface DynamicElementEditProps {
  elementId: string;
}

const DynamicElementEdit = ({ elementId }: DynamicElementEditProps) => {
  const element = useSelector(selectElement(elementId));
  if (!element) return null;
  const isSelected = useSelector((state) => state.selection) === element.id;
  let elementComponent: React.ReactNode | null = null;
  const dispatch = useDispatch();

  switch (element.type) {
    case "simple-layout":
      elementComponent = <SimpleLayoutEdit element={element} />;
      break;
    case "simple-text":
      elementComponent = <SimpleTextEdit element={element} />;
      break;
    default:
  }
  return (
    <div
      className={cn(
        "outline-radius-5 relative outline-border",
        isSelected && "outline-dashed",
      )}
      onClick={(event) => {
        event.stopPropagation();
        dispatch(focusElement(element.id));
      }}
    >
      {elementComponent}
    </div>
  );
};

export default DynamicElementEdit;
