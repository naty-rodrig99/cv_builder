"use client";

import { useReducer } from "react";
import { type CvSchema } from "~/components/cv/schema";
import {
  cvStateReducer,
  initialCvBuilderState,
  type initialCvBuilderStateProps,
} from "~/components/cv/state/reducer";

export const useCvEditorState = (
  initialName: string,
  initialSchema: CvSchema,
) => {
  const initialState: initialCvBuilderStateProps = {
    name: initialName,
    schema: initialSchema,
  };
  return useReducer(cvStateReducer, initialState, initialCvBuilderState);
};
