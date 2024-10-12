import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "~/lib/utils";
import React from "react";

interface DropZoneProps<E> {
  id: E;
  onDrop: (event: DragEndEvent) => void;
}
export function DropZone<E extends string>({ id, onDrop }: DropZoneProps<E>) {
  // Logic for drag and drop
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });
  useDndMonitor({
    onDragEnd: (event) => {
      if (!event.over) return;
      if (event.over.id === id) {
        onDrop(event);
      }
    },
  });

  // Display/view of the DropZone
  return (
    <div id={id} className={cn("relative z-20 w-full")}>
      <div
        ref={setNodeRef}
        className={cn(
          "outline-radius-5 invisible absolute left-0 right-0 top-0 h-[24px]",
          isOver && "visible outline-dashed outline-border",
        )}
      />
    </div>
  );
}
