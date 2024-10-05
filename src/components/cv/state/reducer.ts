import { AnyElement, CvFormat, CvSchema } from "~/components/cv/schema";
import {
  SimpleTextActions,
  simpleTextReducer,
} from "~/components/cv/elements/simple-text/simple-text.state";
import {
  SimpleLayoutActions,
  simpleLayoutReducer,
} from "~/components/cv/elements/simple-layout/simple-layout.state";

export type CvBuilderState = {
  schema: CvSchema;
  selection: string | null;
  zoom: number;
};

type ElementUpdate<I, O = I> = Partial<O> | ((element: I) => Partial<O>);
export const updateElement =
  <E extends AnyElement>(
    type: E["type"],
    id: string,
    update: ElementUpdate<E>,
  ) =>
  (state: CvBuilderState): CvBuilderState => {
    const element = state.schema.elements[id];
    if (element?.type !== type) return state;

    const updatedElement = {
      ...element,
      ...(typeof update === "function" ? update(element as E) : update),
    };

    return {
      ...state,
      schema: {
        ...state.schema,
        elements: { ...state.schema.elements, [id]: updatedElement },
      },
    };
  };

export const removeFromParent =
  (id: string) =>
  (state: CvBuilderState): CvBuilderState => {
    if (id === state.schema.rootElement) return state;

    const elements = state.schema.elements;
    let newElements: Record<string, AnyElement> = { ...elements };
    for (let key in elements) {
      const el = elements[key];
      if (!el || el?.id === id) continue;
      if (el.slots && el.slots.children.indexOf(id) > -1) {
        let newChildren = [...el.slots.children];
        const index = newChildren.indexOf(id, 0);
        if (index > -1) {
          newChildren.splice(index, 1);
        }
        newElements[el.id] = {
          ...el,
          slots: { ...el.slots, children: newChildren },
        };
      }
    }

    return {
      ...state,
      schema: {
        ...state.schema,
        elements: newElements,
      },
    };
  };

const removeSelf =
  (id: string) =>
  (state: CvBuilderState): CvBuilderState => {
    if (id === state.schema.rootElement) return state;
    const element = state.schema.elements[id];

    const elements = state.schema.elements;
    let newElements: Record<string, AnyElement> = { ...elements };
    delete newElements[id];

    let newState = { ...state };
    for (let el in element?.slots) newState = removeElement(el)(newState); //recursively removes children

    return {
      ...newState,
      schema: {
        ...state.schema,
        elements: newElements,
      },
    };
  };

export const removeElement =
  (id: string) =>
  (state: CvBuilderState): CvBuilderState => {
    if (id === state.schema.rootElement) return state;

    return removeSelf(id)(removeFromParent(id)(state));
  };

export type Reducer = (
  state: CvBuilderState,
  action: AnyAction,
) => CvBuilderState | ((state: CvBuilderState) => CvBuilderState);
export type Action<
  Type extends string | symbol,
  Payload extends { [K in keyof Payload]: Payload[K] },
> = {
  type: Type;
  payload?: Payload;
};

const FocusElement = Symbol.for("FocusElement");
export const focusElement = (id: string) => {
  return { type: FocusElement, payload: { id } } as const;
};
export type FocusElementAction = ReturnType<typeof focusElement>;

const selectionReducer: Reducer = (state, action) => {
  switch (action.type) {
    case FocusElement: {
      return { ...state, selection: action.payload.id };
    }
    default:
      return state;
  }
};

const DeleteElement = Symbol.for("DeleteElement");
export const deleteElement = (id: string) =>
  ({
    type: DeleteElement,
    payload: { id },
  }) as const;
type DeleteElementAction = ReturnType<typeof deleteElement>;

const elementReducer: Reducer = (state, action) => {
  switch (action.type) {
    case DeleteElement: {
      return removeElement(action.payload.id);
    }
    default:
      return state;
  }
};

const Zoom = Symbol.for("Zoom");
export const zoom = (multiplier: number) => {
  return { type: Zoom, payload: { multiplier } } as const;
};
export type ZoomAction = ReturnType<typeof zoom>;

const ZoomReducer: Reducer = (state, action) => {
  switch (action.type) {
    case Zoom: {
      if (action.payload.multiplier <= 0) {
        // TODO: deal with that error
      }
      return { ...state, zoom: state.zoom * action.payload.multiplier };
    }
    default:
      return state;
  }
};

const SetFormat = Symbol.for("SetFormat");
export const setFormat = (value: CvFormat) => {
  return { type: SetFormat, payload: { value } } as const;
};
export type SetFormatAction = ReturnType<typeof setFormat>;

const FormatReducer: Reducer = (state, action) => {
  switch (action.type) {
    case SetFormat: {
      return {
        ...state,
        schema: { ...state.schema, format: action.payload.value },
      };
    }
    default:
      return state;
  }
};

export type AnyAction =
  | SimpleTextActions
  | SimpleLayoutActions
  | FocusElementAction
  | DeleteElementAction
  | ZoomAction
  | SetFormatAction;

export const cvStateReducer = (
  state: Readonly<CvBuilderState>,
  action: AnyAction,
): Readonly<CvBuilderState> => {
  const reducers = [
    simpleTextReducer,
    simpleLayoutReducer,
    selectionReducer,
    elementReducer,
    ZoomReducer,
    FormatReducer,
  ];
  return reducers.reduce((s, reducer) => {
    const result = reducer(s, action);
    return typeof result === "function" ? result(state) : result;
  }, state);
};

export const initialCvBuilderState = (schema: CvSchema) => {
  return {
    schema: schema,
    selection: null,
    zoom: 1,
  } satisfies CvBuilderState;
};
