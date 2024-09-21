import { Reducer, updateElement } from "~/components/cv/state/reducer";

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

export type SimpleLayoutActions = SetTextAction;

export const simpleLayoutReducer: Reducer = (state, action) => {
  switch (action.type) {
    case SetDirection: {
      return updateElement("simple-layout", action.payload.id, (el) => ({
        ...el,
        options: { ...el.options, direction: action.payload.direction },
      }));
    }
    default:
      return state;
  }
};
