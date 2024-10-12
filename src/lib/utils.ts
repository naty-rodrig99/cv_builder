import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const safeJSON = (input: string): string | null => {
  try {
    const parsed = JSON.parse(input);
    if (parsed && typeof parsed === "object") {
      return input;
    }
  } catch {
    return null;
  }
  return null;
};
