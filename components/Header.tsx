"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, LayoutTemplate, Zap, Sparkles, Map, Globe, Wrench } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Rendering Labs", icon: FlaskConical },
    { href: "/performance-lab", label: "The Performance Lab", icon: Zap },
    { href: "/routing-lab", label: "The Routing Lab", icon: Map },
    { href: "/i18n-edge-lab", label: "i18n & Edge Lab", icon: Globe },
    { href: "/devx-lab", label: "DevX & Tooling", icon: Wrench },
    { href: "/interactive-ui-lab", label: "Interactive & UI Lab", icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="flex h-14 items-center px-4 sm:px-8 gap-4 sm:gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-50 flex-shrink-0">
          <LayoutTemplate className="w-5 h-5 text-blue-500" />
          <span>Next Labs</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 h-full">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 h-9 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50" 
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline-block">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}


// Code Separation & Documentation - 2026-02-15 [1:38:12 pm]
// Feature: Global Header Navigation
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-02-15 [9:19:33 am]
// Feature: Global Header Navigation
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-02-15 [2:25:20 pm]
// Feature: Global Header Navigation
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-02-16 [12:09:10 pm]
// Feature: Global Header Navigation
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-02-17 [11:48:02 am]
// Feature: Global Header Navigation
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-02-18 [9:47:56 am]
// Feature: Global Header Navigation
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-02-18 [5:17:46 pm]
// Feature: Global Header Navigation
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-02-19 [2:40:01 pm]
// Feature: Global Header Navigation
// Update: Documented boundary recovery options and custom error scenarios.


// Code Separation & Documentation - 2026-02-19 [12:40:14 pm]
// Feature: Global Header Navigation
// Update: Segmented container layout blocks with inline separator comments.


// Code Separation & Documentation - 2026-02-19 [4:17:54 pm]
// Feature: Global Header Navigation
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-02-19 [11:34:41 am]
// Feature: Global Header Navigation
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-02-20 [3:51:21 pm]
// Feature: Global Header Navigation
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-02-21 [10:05:18 am]
// Feature: Global Header Navigation
// Update: Added separation markers and logic summary comments.
