import { Reducer, updateElement } from "~/components/cv/state/reducer";
import {
  SimpleHeaderElement,
  SimpleHeaderLevels,
} from "./simple-header.schema";

const SetHeaderText = Symbol.for("SetHeaderText");
export const setHeaderText = (id: string, text: string) =>
  ({
    type: SetHeaderText,
    payload: { id, text },
  }) as const;

const SetHeadingOption = Symbol.for("SetHeadingOption");
export const setHeadingOption = (id: string, options: SimpleHeaderLevels) =>
  ({
    type: SetHeadingOption,
    payload: { id, options },
  }) as const;

type SetHeadingOptionAction = ReturnType<typeof setHeadingOption>;
type SetHeaderTextAction = ReturnType<typeof setHeaderText>;

export type SimpleHeaderActions = SetHeaderTextAction | SetHeadingOptionAction;

export const simpleHeaderReducer: Reducer = (state, action) => {
  switch (action.type) {
    case SetHeaderText: {
      return updateElement(
        "simple-header",
        action.payload.id,
        (element: SimpleHeaderElement) => ({
          ...element,
          data: { ...element.data, text: action.payload.text },
        }),
      );
    }
    case SetHeadingOption: {
      return updateElement(
        "simple-header",
        action.payload.id,
        (element: SimpleHeaderElement) => ({
          ...element,
          options: { ...element.options, heading: action.payload.options },
        }),
      );
    }
    default:
      return state;
  }
};
