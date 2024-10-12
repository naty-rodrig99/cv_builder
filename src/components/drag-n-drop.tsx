import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "~/lib/utils";

interface DroppableProps<E extends string> {
  id: E;
  children: React.ReactNode;
}
export function Droppable<E extends string>({
  id,
  children,
}: DroppableProps<E>) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return <div ref={setNodeRef}>{children}</div>;
}

interface DropZoneProps<E> {
  id: E;
  onDrop: (event: DragEndEvent) => void;
  direction: "horizontal" | "vertical";
  hasChildren: boolean;
}
export function DropZone<E extends string>({ id, onDrop }: DropZoneProps<E>) {
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

  /*
  console.log(`DropZone - Layout ID: ${id}`);
  console.log(`Has children: ${hasChildren}`);
  console.log(`Direction: ${direction}`);
  */

  // Display/view of the DropZone
  return (
    <div id={id} className={cn("relative z-20 flex-1 bg-yellow-200")}>
      <div
        ref={setNodeRef}
        className={cn(
          "outline-radius-5 invisible absolute left-0 right-0 top-0 h-[10px]",
          isOver &&
            "visible bg-green-200 bg-opacity-80 outline-dashed outline-border",
        )}
      />
    </div>
  );
}
