import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { cn } from "~/lib/utils";

interface DraggableProps<E extends string> {
  id: E;
  children: React.ReactNode;
}
export const Draggable = <E extends string>({
  id,
  children,
}: DraggableProps<E>) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  return (
    <button ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </button>
  );
};

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
  return (
    <div id={id} className={cn("relative", "w-full")}>
      <div
        ref={setNodeRef}
        className={cn(
          "outline-radius-5 absolute left-0 right-0 top-0 h-[24px] invisible",
          isOver && "outline-dashed outline-border visible",
        )}
      />
    </div>
  );
}
