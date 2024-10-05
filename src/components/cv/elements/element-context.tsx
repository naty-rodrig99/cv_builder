"use client";

import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import React, { useContext, useMemo } from "react";

export interface ElementContext {
  elementId: string;
  listeners: SyntheticListenerMap | undefined;
  setActivatorNodeRef: (element: HTMLElement | null) => void;
}

const elementContext = React.createContext<ElementContext | null>(null);

export interface ElementContextProviderProps {
  elementId: string;
  listeners: SyntheticListenerMap | undefined;
  setActivatorNodeRef: (element: HTMLElement | null) => void;
  children: React.ReactNode;
}

export const ElementContextProvider = ({
  elementId,
  listeners,
  setActivatorNodeRef,
  children,
}: ElementContextProviderProps) => {
  const ctxValue = useMemo(
    () => ({ elementId, listeners, setActivatorNodeRef }),
    [elementId, listeners, setActivatorNodeRef],
  );
  return (
    <elementContext.Provider value={ctxValue}>
      {children}
    </elementContext.Provider>
  );
};

export function retrieveElementContext(elementId: string): ElementContext {
  const ctx = useContext(elementContext);
  if (ctx == null) {
    throw new Error(
      "retrieveElementContext(elementId) must be used within elementContext provider.",
    );
  }
  if (ctx.elementId !== elementId) {
    try {
      return retrieveElementContext(elementId);
    } catch {
      throw new Error(
        "retrieveElementContext(elementId) must be used within the requested element's elementContext provider",
      );
    }
  }
  return ctx;
}
