import Link from "next/link";
import { ArrowRight, Database, LayoutTemplate, Zap, RefreshCw, Shield, Map, Activity, Globe, Wrench, Sparkles, Cpu, Layers, GitBranch, Terminal } from "lucide-react";

const labs = [
  {
    name: "The Rendering Lab",
    slug: "the-rendering",
    description: "Server-side innovations and edge-computing experiments. Showcase of streaming SSR, PPR, component-level caching, and interceptors.",
    href: "/the-rendering",
    specimenCount: 6,
    icon: <Layers className="w-6 h-6 text-emerald-500" />,
    color: "from-emerald-500/10 to-teal-500/5 text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
    glowColor: "group-hover:shadow-emerald-500/5",
    specimens: [
      { name: "PPR Dashboard", href: "/the-rendering/ppr-dashboard" },
      { name: "BFF Stock Ticker", href: "/the-rendering/bff-stocks" },
      { name: 'The "use cache" Specimen', href: "/the-rendering/use-cache-specimen" },
      { name: "Proxy Interceptors", href: "/the-rendering/proxy-specimen" },
      { name: "Zero-JS Data Table", href: "/the-rendering/zero-js-table" },
      { name: "Infinite Scroll Native", href: "/the-rendering/infinite-scroll" }
    ]
  },
  {
    name: "The Performance Lab",
    slug: "performance-lab",
    description: "Zero-latency patterns, concurrent rendering priority visualizers, React Compiler auto-memoization proof-of-concepts, and optimistic hooks.",
    href: "/performance-lab",
    specimenCount: 6,
    icon: <Cpu className="w-6 h-6 text-rose-500" />,
    color: "from-rose-500/10 to-pink-500/5 text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-500/20 hover:border-rose-500/40",
    glowColor: "group-hover:shadow-rose-500/5",
    specimens: [
      { name: "Concurrent Priority Scheduler", href: "/performance-lab/priority-scheduler" },
      { name: "The Memo-Free Dashboard", href: "/performance-lab/memo-free" },
      { name: "Streaming useFormStatus Form", href: "/performance-lab/form-status" },
      { name: "Optimistic Mutations", href: "/performance-lab/optimistic-like" },
      { name: "Search-as-you-go", href: "/performance-lab/search-as-you-go" },
      { name: "Zero-State Server CRUD", href: "/performance-lab/server-crud" }
    ]
  },
  {
    name: "Interactive & UI Lab",
    slug: "interactive-ui-lab",
    description: "Buttery-smooth transitions, optimistic UI updates, Framer Motion board animations, and progressive enhancement multi-step wizards.",
    href: "/interactive-ui-lab",
    specimenCount: 3,
    icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
    color: "from-indigo-500/10 to-purple-500/5 text-indigo-600 dark:text-indigo-400",
    borderColor: "border-indigo-500/20 hover:border-indigo-500/40",
    glowColor: "group-hover:shadow-indigo-500/5",
    specimens: [
      { name: "Drag-and-Drop Kanban", href: "/interactive-ui-lab/kanban" },
      { name: "Animated View Transitions", href: "/interactive-ui-lab/view-transitions" },
      { name: "Progressive Form Wizard", href: "/interactive-ui-lab/form-wizard" }
    ]
  },
  {
    name: "The Routing Lab",
    slug: "routing-lab",
    description: "Advanced App Router navigation paradigms, featuring sub-frame modal galleries via Parallel & Intercepting routes.",
    href: "/routing-lab",
    specimenCount: 2,
    icon: <GitBranch className="w-6 h-6 text-blue-500" />,
    color: "from-blue-500/10 to-sky-500/5 text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    glowColor: "group-hover:shadow-blue-500/5",
    specimens: [
      { name: "Modal Gallery", href: "/routing-lab/modal-gallery" },
      { name: "Pure Next.js i18n", href: "/routing-lab/i18n" }
    ]
  },
  {
    name: "i18n & Edge Lab",
    slug: "i18n-edge-lab",
    description: "Globally distributed rendering benchmarks. Comparing TTFB and geo-header detection between Edge and Node.js runtimes.",
    href: "/i18n-edge-lab",
    specimenCount: 1,
    icon: <Globe className="w-6 h-6 text-amber-500" />,
    color: "from-amber-500/10 to-yellow-500/5 text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-500/20 hover:border-amber-500/40",
    glowColor: "group-hover:shadow-amber-500/5",
    specimens: [
      { name: "Edge Runtime RSC", href: "/i18n-edge-lab/edge-runtime" }
    ]
  },
  {
    name: "DevX & Tooling Lab",
    slug: "devx-lab",
    description: "Deep observability, runtime diagnostics, startup lifecycle hooking, and nested error-boundary patterns.",
    href: "/devx-lab",
    specimenCount: 2,
    icon: <Terminal className="w-6 h-6 text-violet-500" />,
    color: "from-violet-500/10 to-fuchsia-500/5 text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-500/20 hover:border-violet-500/40",
    glowColor: "group-hover:shadow-violet-500/5",
    specimens: [
      { name: "Instrumentation & Tracing", href: "/devx-lab/instrumentation" },
      { name: "Custom 404 Routing", href: "/devx-lab/not-found-routing" }
    ]
  }
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black selection:bg-blue-500/30">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <main className="relative flex w-full max-w-6xl flex-col items-center justify-start py-20 px-6 sm:px-12 gap-16">
        
        <header className="flex flex-col items-center gap-6 text-center pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Next.js 16 + React 19 Core
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            NextJS Experimental Labs
          </h1>
          <p className="max-w-3xl text-lg sm:text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            A premium high-performance laboratory for experimental specimens. We isolate advanced architectural patterns, concurrent performance primitives, and edge-native paradigms.
          </p>
        </header>

        <section className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labs.map((lab) => (
            <div 
              key={lab.name}
              className="group flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-zinc-900/40 rounded-[2rem] border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700/80 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle hover background glow */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
              
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${lab.color} border border-zinc-200/50 dark:border-zinc-800`}>
                    {lab.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-lg border border-zinc-200/60 dark:border-zinc-700/40">
                    {lab.specimenCount} SPECIMENS
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {lab.name}
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm h-[72px] overflow-hidden line-clamp-3">
                    {lab.description}
                  </p>
                </div>

                <div className="h-px bg-zinc-100 dark:bg-zinc-800/60 my-1" />

                {/* Specimen Sub-links */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-400 dark:text-zinc-500">Key Specimens</span>
                  <div className="flex flex-wrap gap-2">
                    {lab.specimens.map((spec) => (
                      <Link
                        key={spec.name}
                        href={spec.href}
                        className="text-xs px-2.5 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-blue-500/40 dark:hover:border-blue-400/40 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      >
                        {spec.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link 
                  href={lab.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 dark:text-blue-400 group-hover:translate-x-1 transition-transform"
                >
                  Enter Lab Explorer
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </section>
        
      </main>
    </div>
  );
}
