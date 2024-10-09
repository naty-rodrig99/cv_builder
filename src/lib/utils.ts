import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CvFormat } from "~/components/cv/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function format2aspectRatio(format: CvFormat) {
  switch (format) {
    case "DINA4":
      return "21/29.7";
    case "Letter":
      return "8.5/11";
  }
}
