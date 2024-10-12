import React from "react";
import { Card } from "~/components/ui/card";
import { CvFormat } from "~/components/cv/schema";
import { cn } from "~/lib/utils";

export function format2aspectRatio(format: CvFormat) {
  switch (format) {
    case "DINA4":
      return "21/29.7";
    case "Letter":
      return "8.5/11";
  }
}

export interface PaperProps extends React.HTMLProps<HTMLDivElement> {
  paperSize: CvFormat;
  children: React.ReactNode;
}

const Paper = ({ paperSize, className, ...props }: PaperProps) => {
  const paperSizes: Record<CvFormat, string> = {
    DINA4: "h-[297mm] w-[210mm]",
    Letter: "h-[279.4mm] w-[215.9mm]",
  };

  return (
    <Card
      className={cn(
        paperSizes[paperSize],
        "rounded-sm print:rounded-none print:border-none print:shadow-none",
        className,
      )}
      {...props}
    />
  );
};

export default Paper;
