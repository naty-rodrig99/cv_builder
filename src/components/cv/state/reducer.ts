import { AnyElement, CvSchema } from "~/components/cv/schema";
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

const SelectElement = Symbol.for("SelectElement");
export const selectElement = (id: string) => {
  return { type: SelectElement, payload: { id } } as const;
};
export type SelectElementAction = ReturnType<typeof selectElement>;

const selectionReducer: Reducer = (state, action) => {
  switch (action.type) {
    case SelectElement: {
      return { ...state, selection: action.payload.id };
    }
    default:
      return state;
  }
};

export type AnyAction =
  | SimpleTextActions
  | SimpleLayoutActions
  | SelectElementAction;

export const cvStateReducer = (
  state: Readonly<CvBuilderState>,
  action: AnyAction,
): Readonly<CvBuilderState> => {
  const reducers = [simpleTextReducer, simpleLayoutReducer, selectionReducer];
  return reducers.reduce((s, reducer) => {
    const result = reducer(s, action);
    return typeof result === "function" ? result(state) : result;
  }, state);
};

export const initialCvBuilderState = (schema: CvSchema) => {
  return {
    schema: schema,
    selection: null,
  } satisfies CvBuilderState;
};
