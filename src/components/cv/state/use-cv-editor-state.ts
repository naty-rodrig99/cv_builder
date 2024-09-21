"use client";

import { useReducer } from "react";
import { CvSchema } from "~/components/cv/schema";
import {
  cvStateReducer,
  initialCvBuilderState,
} from "~/components/cv/state/reducer";

export const useCvEditorState = (initialSchema: CvSchema) => {
  return useReducer(cvStateReducer, initialSchema, initialCvBuilderState);
};
