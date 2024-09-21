import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CV Builder",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning={true}
    >
      <body suppressHydrationWarning={true}>
        <div className="flex min-h-screen w-full flex-col">{children}</div>
      </body>
    </html>
  );
}
