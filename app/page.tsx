import Link from "next/link";
import { ArrowRight, Database, LayoutTemplate, Zap, RefreshCw, Shield, Map, Activity } from "lucide-react";

const experiments = [
  {
    name: "Route Handler as a BFF",
    description: "A stock ticker that polls an aggregating Route Handler, demonstrating caching and useSyncExternalStore.",
    href: "/the-rendering/bff-stocks",
    icon: <Activity className="w-5 h-5 text-amber-500" />,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-500/20"
  },
  {
    name: "Zero-JS Data Table",
    description: "A high-performance grid using Server Components and URL SearchParams (async) for fetching and filtering.",
    href: "/the-rendering/zero-js-table",
    icon: <Database className="w-5 h-5" />,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-500/20"
  },
  {
    name: "PPR Dashboard",
    description: "Uses the stable experimental.ppr to serve a static shell instantly while streaming dynamic user data into Suspense holes.",
    href: "/the-rendering/ppr-dashboard",
    icon: <LayoutTemplate className="w-5 h-5" />,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    borderColor: "border-purple-500/20"
  },
  {
    name: 'The "use cache" Specimen',
    description: "Demonstrates component-level caching using the new use cache directive and cacheLife profiles.",
    href: "/the-rendering/use-cache-specimen",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-500/20"
  },
  {
    name: "Specimen 03: The proxy.ts Interceptor",
    description: "Uses the new Next.js 16 Proxy layer for centralized JWT rotation, geo-fencing, and request fingerprinting.",
    href: "/the-rendering/proxy-specimen",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    borderColor: "border-indigo-500/20"
  },
  {
    name: "Infinite Scroll w/ useActionState",
    description: "A list that fetches more items using Server Actions, managing pending state and data without a separate library.",
    href: "/the-rendering/infinite-scroll",
    icon: <RefreshCw className="w-5 h-5" />,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500/20"
  },
  {
    name: "The Routing Lab",
    description: "Advanced patterns including Parallel Routes, Intercepting Routes, and Edge-Runtime orchestration for complex layouts.",
    href: "/routing-lab",
    icon: <Map className="w-5 h-5" />,
    color: "bg-red-500/10 text-red-600 dark:text-red-400",
    borderColor: "border-red-500/20"
  },
  {
    name: "i18n & Edge Lab",
    description: "High-performance internationalization leveraging the Edge Runtime for sub-50ms TTFB and global geo-detection.",
    href: "/i18n-edge-lab",
    icon: <Globe className="w-5 h-5" />,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-500/20"
  }
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black selection:bg-blue-500/30">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <main className="relative flex w-full max-w-5xl flex-col items-center justify-start py-20 px-6 sm:px-12 gap-16">
        
        <header className="flex flex-col items-center gap-6 text-center pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Next.js 16 Core
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            The Rendering Lab
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            A comprehensive showcase of modern Next.js 15+ and React 19 capabilities, from Partial Prerendering to Server Actions and bleeding-edge caching strategies.
          </p>
        </header>

        <section className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
          {experiments.map((exp) => (
            <Link 
              key={exp.name}
              href={exp.href}
              className="group flex flex-col gap-4 p-6 sm:p-8 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl border ${exp.color} ${exp.borderColor}`}>
                  {exp.icon}
                </div>
                <div className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 transition-colors">
                   <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mt-2">
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {exp.name}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                  {exp.description}
                </p>
              </div>
            </Link>
          ))}
        </section>
        
      </main>
    </div>
  );
}
