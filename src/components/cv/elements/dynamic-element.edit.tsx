import React from "react";
import SimpleLayoutEdit from "./simple-layout/simple-layout.edit";
import SimpleTextEdit from "./simple-text/simple-text.edit";
import { selectElement } from "~/components/cv/state/selectors";
import { useDispatch, useSelector } from "~/components/cv/context";
import { focusElement } from "../state/reducer";
import { useDraggable } from "@dnd-kit/core";
import { ElementContextProvider } from "./element-context";
import GenericElementWrapperEdit from "./generic-element-wrapper.edit";

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

  const { attributes, listeners, setNodeRef, setActivatorNodeRef } =
    useDraggable({
      id: element.id,
      data: { elementId: element.id },
    });

  return (
    <ElementContextProvider
      elementId={element.id}
      listeners={listeners}
      setActivatorNodeRef={setActivatorNodeRef}
    >
      <GenericElementWrapperEdit
        elementId={element.id}
        ref={setNodeRef}
        attributes={attributes}
        onClick={(event) => {
          event.stopPropagation();
          dispatch(focusElement(element.id));
        }}
      >
        {elementComponent}
      </GenericElementWrapperEdit>
    </ElementContextProvider>
  );
};

export default DynamicElementEdit;
