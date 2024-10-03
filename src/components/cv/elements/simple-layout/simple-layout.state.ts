import { Reducer, updateElement } from "~/components/cv/state/reducer";
import { AnyElement } from "../../schema";
import { createElement } from "../dynamic-element.template";
import { SimpleLayoutDirections } from "./simple-layout.schema";

const SetDirection = Symbol.for("SetDirection");
export const setDirection = (id: string, direction: SimpleLayoutDirections) =>
  ({
    type: SetDirection,
    payload: { id, direction },
  }) as const;
type SetTextAction = ReturnType<typeof setDirection>;

const PrependNewElement = Symbol.for("PrependNewElement");
export const prependNewElement = (
  id: string,
  elementType: AnyElement["type"],
  index: number,
) =>
  ({
    type: PrependNewElement,
    payload: { id, elementType, index },
  }) as const;
type PrependNewElementAction = ReturnType<typeof prependNewElement>;

const AppendNewElement = Symbol.for("AppendNewElement");
export const appendNewElement = (id: string, elementType: AnyElement["type"]) =>
  ({
    type: AppendNewElement,
    payload: { id, elementType },
  }) as const;
type AppendNewElementAction = ReturnType<typeof appendNewElement>;

export type SimpleLayoutActions =
  | SetTextAction
  | AppendNewElementAction
  | PrependNewElementAction;

export const simpleLayoutReducer: Reducer = (state, action) => {
  switch (action.type) {
    case SetDirection: {
      return updateElement("simple-layout", action.payload.id, (el) => ({
        ...el,
        options: { ...el.options, direction: action.payload.direction },
      }));
    }
    case PrependNewElement: {
      const newElementTemplate = createElement(action.payload.elementType);
      if (!newElementTemplate) return state;
      const [newElement, elements] = newElementTemplate;
      const nextState = updateElement(
        "simple-layout",
        action.payload.id,
        (el) => {
          const newChildren = [...el.slots!.children];
          newChildren.splice(action.payload.index, 0, newElement.id);
          return {
            ...el,
            slots: { children: newChildren },
          };
        },
      )(state);
      return {
        ...nextState,
        schema: {
          ...nextState.schema,
          elements: { ...nextState.schema.elements, ...elements },
        },
      };
    }
    case AppendNewElement: {
      const newElementTemplate = createElement(action.payload.elementType);
      if (!newElementTemplate) return state;
      const [newElement, elements] = newElementTemplate;
      const nextState = updateElement(
        "simple-layout",
        action.payload.id,
        (el) => ({
          ...el,
          slots: { children: [...el.slots!.children, newElement.id] },
        }),
      )(state);
      return {
        ...nextState,
        schema: {
          ...nextState.schema,
          elements: { ...nextState.schema.elements, ...elements },
        },
      };
    }
    default:
      return state;
  }
};
