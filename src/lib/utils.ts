import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function format2twdAspect(format: "DINA4" | "Letter") {
  switch (format) {
    case "DINA4":
      return "21/29.7";
    case "Letter":
      return "8.5/11"
  }
}
