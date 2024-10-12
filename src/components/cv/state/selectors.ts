import { type CvBuilderState } from "~/components/cv/state/reducer";

export const selectElement = (id: string) => (state: CvBuilderState) =>
  state.schema.elements[id] ?? null;
