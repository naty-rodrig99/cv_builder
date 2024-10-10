import { Reducer, updateElement } from "~/components/cv/state/reducer";

const SetHeader = Symbol.for("SetHeader");

export const setHeader = (id: string, text: string) =>
  ({
    type: SetHeader,
    payload: { id, text },
  }) as const;

type SetHeaderAction = ReturnType<typeof setHeader>;

export type SimpleHeaderActions = SetHeaderAction;
// This type need to be added in reducer.ts in AnyAction

export const simpleHeaderReducer: Reducer = (state, action) => {
  switch (action.type) {
    case SetHeader: {
      return updateElement("simple-header", action.payload.id, (element) => ({
        ...element,
        data: { ...element.data, text: action.payload.text },
      }));
    }
    default:
      return state;
  }
};
