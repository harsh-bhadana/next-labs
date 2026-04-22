import Link from "next/link";
import { ArrowRight, BarChart2, Table, Zap, Database, MousePointer2, Shield } from "lucide-react";

const specimens = [
  {
    name: "BFF Stock Ticker",
    description: "Backend-for-Frontend pattern aggregating multiple APIs into a single cached route.",
    href: "/the-rendering/bff-stocks",
    icon: <BarChart2 className="w-5 h-5" />,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500/20"
  },
  {
    name: "Zero-JS Data Table",
    description: "Server-filtered tables with 0kb client-side JS using asynchronous searchParams.",
    href: "/the-rendering/zero-js-table",
    icon: <Table className="w-5 h-5" />,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-500/20"
  },
  {
    name: "PPR Dashboard",
    description: "Partial Prerendering: Instant static shells with streamed dynamic components.",
    href: "/the-rendering/ppr-dashboard",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-500/20"
  },
  {
    name: "The 'use cache' Directive",
    description: "Experimental component-level caching for granular performance control across requests.",
    href: "/the-rendering/use-cache-specimen",
    icon: <Database className="w-5 h-5" />,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    borderColor: "border-purple-500/20"
  },
  {
    name: "Infinite Scroll Native",
    description: "Progressively enhanced infinite feeds using useActionState and Server Actions.",
    href: "/the-rendering/infinite-scroll",
    icon: <MousePointer2 className="w-5 h-5" />,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    borderColor: "border-indigo-500/20"
  },
  {
    name: "Proxy Interceptors",
    description: "Bleeding-edge proxying in Next.js 16 for intercepting requests at the framework level.",
    href: "/the-rendering/proxy-specimen",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-500/20"
  }
];

export default function RenderingLabHome() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black selection:bg-emerald-500/30">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.05)_0%,transparent_50%)] pointer-events-none"></div>

      <main className="relative flex w-full max-w-5xl flex-col items-center justify-start py-20 px-6 sm:px-12 gap-16">
        
        <header className="flex flex-col items-center gap-6 text-center pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
            <Zap className="w-4 h-4 text-emerald-500" />
            The Rendering Lab
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Rendering Strategies
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Mastering the spectrum of rendering from Static to Streaming, and from Node to Edge.
          </p>
        </header>

        <section className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specimens.map((spec) => (
            <Link 
              key={spec.name}
              href={spec.href}
              className="group flex flex-col gap-4 p-6 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl border ${spec.color} ${spec.borderColor}`}>
                  {spec.icon}
                </div>
                <div className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 transition-colors">
                   <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mt-2">
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {spec.name}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-xs">
                  {spec.description}
                </p>
              </div>
            </Link>
          ))}
        </section>
        
      </main>
    </div>
  );
}
