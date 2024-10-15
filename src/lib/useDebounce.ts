// This hook is based on https://www.developerway.com/posts/debouncing-in-react

import { useRef, useEffect, useMemo } from "react";
import { debounce, type DebouncedFunc } from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <Fn extends (...args: any[]) => any>(
  functionToCallback: Fn,
): DebouncedFunc<Fn> => {
  // creating ref that will be used for the input callback
  const ref = useRef<Fn>();

  useEffect(() => {
    // ref.current will have the latest callback with access to the latest state
    ref.current = functionToCallback;
  }, [functionToCallback]);

  const debouncedCallback = useMemo(() => {
    const func = (...args: Parameters<Fn>) => {
      ref.current?.(...args);
    };

    return debounce(func, 1000);
  }, []);

  return debouncedCallback;
};
