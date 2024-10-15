import { Reducer, updateElement } from "~/components/cv/state/reducer";
import { ProfileElement } from "./profile-element.schema";

const SetUserProfileElement = Symbol.for("SetUserProfileElement");

export const setUserProfileElement = (
  id: string,
  data: ProfileElement["data"],
) =>
  ({
    type: SetUserProfileElement,
    payload: { id, data },
  }) as const;

export type UserProfileElementAction = ReturnType<typeof setUserProfileElement>;

export const userProfileElementReducer: Reducer = (state, action) => {
  switch (action.type) {
    case SetUserProfileElement: {
      return updateElement(
        "profile-element",
        action.payload.id,
        (element: ProfileElement) => ({
          ...element,
          data: { ...element.data, ...action.payload.data },
        }),
      );
    }
    default:
      return state;
  }
};
