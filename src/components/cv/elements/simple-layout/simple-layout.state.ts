import { Reducer, updateElement } from "~/components/cv/state/reducer";
import { AnyElement } from "../../schema";
import { createElement } from "../dynamic-element.template";

const SetDirection = Symbol.for("SetDirection");
export const setDirection = (
  id: string,
  direction: "vertical" | "horizontal",
) =>
  ({
    type: SetDirection,
    payload: { id, direction },
  }) as const;
type SetTextAction = ReturnType<typeof setDirection>;

const AppendNewElement = Symbol.for("AppendNewElement");
export const appendNewElement = (id: string, elementType: AnyElement["type"]) =>
  ({
    type: AppendNewElement,
    payload: { id, elementType },
  }) as const;
type AppendNewElementAction = ReturnType<typeof appendNewElement>;

export type SimpleLayoutActions = SetTextAction | AppendNewElementAction;

export const simpleLayoutReducer: Reducer = (state, action) => {
  switch (action.type) {
    case SetDirection: {
      return updateElement("simple-layout", action.payload.id, (el) => ({
        ...el,
        options: { ...el.options, direction: action.payload.direction },
      }));
    }
    case AppendNewElement: {
      const newElementTemplate = createElement(action.payload.elementType);
      console.log(newElementTemplate);
      console.log(state.schema);
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
