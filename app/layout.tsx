import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "../components/Header";

// ==========================================
// Fonts Configuration
// ==========================================

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ==========================================
// Metadata & SEO Configuration
// ==========================================

export const metadata: Metadata = {
  title: "Next-Labs | Experimental Rendering Specimens",
  description: "A state-of-the-art laboratory for exploring Next.js 16+, React 19, PPR, and advanced rendering patterns.",
};

// ==========================================
// Root Layout
// ==========================================

/**
 * Root layout structure serving as the root shell for the application.
 * Injects Google fonts, applies global provider wrappers, and sets the base dark mode class.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // React nodes representing child page views
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
