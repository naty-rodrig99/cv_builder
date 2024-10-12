import {
  type CvBuilderState,
  type Reducer,
  removeFromParent,
  updateElement,
} from "~/components/cv/state/reducer";
import { type AnyElement } from "../../schema";
import { createElement } from "../dynamic-element.template";
import {
  type SimpleLayoutDirections,
  SimpleLayoutElement,
} from "./simple-layout.schema";

const SetDirection = Symbol.for("SetDirection");
export const setDirection = (id: string, direction: SimpleLayoutDirections) =>
  ({
    type: SetDirection,
    payload: { id, direction },
  }) as const;
type SetTextAction = ReturnType<typeof setDirection>;

const InsertNewElement = Symbol.for("InsertNewElement");
export const insertNewElement = (
  id: string,
  elementType: AnyElement["type"],
  index: number,
) =>
  ({
    type: InsertNewElement,
    payload: { id, elementType, index },
  }) as const;
type InsertNewElementAction = ReturnType<typeof insertNewElement>;

const MoveElement = Symbol.for("MoveElement");
export const moveElement = (
  targetId: string,
  sourceId: string,
  index: number,
) =>
  ({
    type: MoveElement,
    payload: { targetId, sourceId, index },
  }) as const;
type MoveElementAction = ReturnType<typeof moveElement>;

export type SimpleLayoutActions =
  | SetTextAction
  | InsertNewElementAction
  | MoveElementAction;

export const simpleLayoutReducer: Reducer = (state, action) => {
  switch (action.type) {
    case SetDirection: {
      return updateElement(
        "simple-layout",
        action.payload.id,
        (el: SimpleLayoutElement) => ({
          ...el,
          options: { ...el.options, direction: action.payload.direction },
        }),
      );
    }
    case InsertNewElement: {
      const newElementTemplate = createElement(action.payload.elementType);
      if (!newElementTemplate) return state;
      const [newElement, elements] = newElementTemplate;
      const nextState = insertElement(
        newElement.id,
        action.payload.id,
        action.payload.index,
      )(state);
      return {
        ...nextState,
        schema: {
          ...nextState.schema,
          elements: { ...nextState.schema.elements, ...elements },
        },
      };
    }
    case MoveElement: {
      if (action.payload.sourceId === state.schema.rootElement) return state;
      const siblings =
        state.schema.elements[action.payload.targetId]?.slots?.children;
      const movedForward =
        siblings &&
        siblings.indexOf(action.payload.sourceId) < action.payload.index;
      const index = movedForward
        ? action.payload.index - 1
        : action.payload.index;
      const nextState = insertElement(
        action.payload.sourceId,
        action.payload.targetId,
        index,
      )(removeFromParent(action.payload.sourceId)(state));
      return {
        ...nextState,
      };
    }
    default:
      return state;
  }
};

const insertElement = (
  elementId: string,
  parentId: string,
  index: number,
): ((state: CvBuilderState) => CvBuilderState) => {
  return updateElement("simple-layout", parentId, (el) => {
    const newChildren = [...el.slots!.children];
    newChildren.splice(index, 0, elementId);
    return {
      ...el,
      slots: { children: newChildren },
    };
  });
};
