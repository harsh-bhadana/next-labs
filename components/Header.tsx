"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, LayoutTemplate, Database, Zap, RefreshCw, Home, Sparkles } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Rendering Labs", icon: FlaskConical },
    { href: "/performance-lab", label: "The Performance Lab", icon: Zap },
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
