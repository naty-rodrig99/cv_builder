import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

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
  useDndMonitor({
    onDragEnd: (event) => {
      if (!event.over) return;
      if (event.over.id === id) {
        onDrop(event);
      }
    },
  });
  return (
    <Droppable id={id}>
      Drop Here
    </Droppable>
  );
}
