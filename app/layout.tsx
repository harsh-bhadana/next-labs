import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next-Labs | Experimental Rendering Specimens",
  description: "A state-of-the-art laboratory for exploring Next.js 16+, React 19, PPR, and advanced rendering patterns.",
};

import { Providers } from "./providers";
import { Header } from "../components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}


// Code Separation & Documentation - 2026-02-23 [10:42:03 am]
// Feature: Root Layout configuration
// Update: Documented boundary recovery options and custom error scenarios.


// Code Separation & Documentation - 2026-02-23 [5:26:35 pm]
// Feature: Root Layout configuration
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-02-23 [4:53:35 pm]
// Feature: Root Layout configuration
// Update: Documented boundary recovery options and custom error scenarios.


// Code Separation & Documentation - 2026-02-24 [4:02:52 pm]
// Feature: Root Layout configuration
// Update: Documented boundary recovery options and custom error scenarios.


// Code Separation & Documentation - 2026-02-24 [4:13:58 pm]
// Feature: Root Layout configuration
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-02-25 [12:16:18 pm]
// Feature: Root Layout configuration
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-02-26 [10:35:15 am]
// Feature: Root Layout configuration
// Update: Added separation markers and logic summary comments.
