import { useDraggable } from "@dnd-kit/core";

interface DraggableProps<E extends string> {
  id: E;
  children: React.ReactNode;
}
export const Draggable = <E extends string>({ id, children }: DraggableProps<E>) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  return (
    <button ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </button>
  );
};

