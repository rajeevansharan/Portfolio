// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import dynamic from "next/dynamic";

import "./globals.css";

// Dynamically import client components with SSR disabled to prevent hydration errors
const ScrollToTop = dynamic(
  () => import("@/components/ui/ScrollToTop").then((mod) => mod.ScrollToTop),
  { ssr: false }
);

// Optimize font loading with display swap to prevent layout shift
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Sharan | Software Engineer",
  description:
    "I'm Sharan, a software engineer passionate about building modern, efficient, and user-friendly digital solutions.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#18181b" />{" "}
        {/* Updated to zinc theme color */}
        <link rel="manifest" href="/manifest.json" />
        {/* Devicon for colored brand logos */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${inter.className} bg-zinc-50 dark:bg-zinc-900 antialiased`}
      >
        <div id="content-container" className="content-container">
          {children}
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
