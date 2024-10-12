import { type Reducer, updateElement } from "~/components/cv/state/reducer";
import { SimpleTextElement } from "./simple-text.schema";

const SetText = Symbol.for("SetText");
export const setText = (id: string, text: string) =>
  ({
    type: SetText,
    payload: { id, text },
  }) as const;
type SetTextAction = ReturnType<typeof setText>;

export type SimpleTextActions = SetTextAction;

export const simpleTextReducer: Reducer = (state, action) => {
  switch (action.type) {
    case SetText: {
      return updateElement(
        "simple-text",
        action.payload.id,
        (el: SimpleTextElement) => ({
          ...el,
          data: { ...el.data, text: action.payload.text },
        }),
      );
    }
    default:
      return state;
  }
};
