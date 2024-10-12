import { DraggableAttributes } from "@dnd-kit/core";
import { forwardRef, LegacyRef, MouseEventHandler } from "react";
import { cn } from "~/lib/utils";
import { useSelector } from "../context";

export interface ElementWrapperEditProps {
  elementId: string;
  attributes: DraggableAttributes;
  onClick: MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}
const ElementWrapperEdit = forwardRef(
  (
    { elementId, attributes, onClick, children }: ElementWrapperEditProps,
    ref: LegacyRef<HTMLDivElement>,
  ) => {
    const isSelected = useSelector((state) => state.selection) === elementId;
    return (
      <div
        ref={ref}
        {...attributes}
        className={cn(
          "outline-radius-5 relative outline-border",
          isSelected && "outline-dashed",
        )}
        onClick={onClick}
      >
        {children}
      </div>
    );
  },
);

export default ElementWrapperEdit;
