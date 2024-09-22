import { AnyElement, CvSchema } from "~/components/cv/schema";
import { newSimpleLayoutElement } from "~/components/cv/elements/simple-layout/simple-layout.template";

export type ElementTemplate = [AnyElement, Record<string, AnyElement>];

export const newSchema = (args: { elements: ElementTemplate[] }) => {
  const [rootElement, elements] = newSimpleLayoutElement({
    direction: "vertical",
    children: args.elements,
  });

  return {
    size: "DINA4",
    theme: "minimalistic",
    rootElement: rootElement.id,
    elements,
  } satisfies CvSchema;
};

// Resolves an element and any nested elements inside of it into an object of all elements.
// Can be called recursively to resolve all dependencies.
export const template = (
  element: AnyElement,
  nested: ElementTemplate[] = [],
): ElementTemplate => {
  return [
    element,
    {
      [element.id]: element,
      ...nested?.reduce(
        (acc, [, elements = {}]) => ({ ...acc, ...elements }),
        {},
      ),
    },
  ];
};
