"use client";

import React, { useContext, useMemo } from "react";
import { AnyAction, CvBuilderState } from "~/components/cv/state/reducer";

export interface CvBuilderContext {
  state: CvBuilderState;
  dispatch: (action: AnyAction) => void;
}

const cvBuilderContext = React.createContext<CvBuilderContext | null>(null);

export interface CvBuilderContextProviderProps {
  state: CvBuilderState;
  dispatch: CvBuilderContext["dispatch"];
  children: React.ReactNode;
}

export const CvBuilderContextProvider = ({
  state,
  dispatch,
  children,
}: CvBuilderContextProviderProps) => {
  const ctxValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <cvBuilderContext.Provider value={ctxValue}>
      {children}
    </cvBuilderContext.Provider>
  );
};

export const useDispatch = () => {
  const ctx = useContext(cvBuilderContext);
  if (ctx == null) {
    throw new Error(
      "useDispatch() must be used within cvBuilderContext provider.",
    );
  }
  return ctx.dispatch;
};

export const useSelector = <S extends (state: CvBuilderState) => ReturnType<S>>(
  selector: S,
): ReturnType<S> => {
  const ctx = useContext(cvBuilderContext);
  if (ctx == null) {
    throw new Error(
      "useSelector() must be used within cvBuilderContext provider.",
    );
  }
  return selector(ctx.state);
};
