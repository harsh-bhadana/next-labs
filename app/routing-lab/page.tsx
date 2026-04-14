import Link from "next/link";
import { ArrowRight, Maximize2, Map, Globe } from "lucide-react";

const experiments = [
  {
    name: "Modal Gallery",
    description: "One of the most complex Next.js patterns: Parallel Routes + Intercepting Routes for 'context-preserving' navigation.",
    href: "/routing-lab/modal-gallery",
    icon: <Maximize2 className="w-5 h-5" />,
    color: "bg-red-500/10 text-red-600 dark:text-red-400",
    borderColor: "border-red-500/20"
  },
  {
    name: "Edge Runtime Specimen",
    description: "Coming Soon: High-performance geo-detected routing served entirely from the Edge.",
    href: "/routing-lab",
    icon: <Globe className="w-5 h-5 opacity-50" />,
    color: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-600",
    borderColor: "border-zinc-500/10",
    disabled: true
  },
  {
    name: "Internationalized Routing",
    description: "Coming Soon: Pure Next.js i18n without external libraries, using dynamic [locale] segments.",
    href: "/routing-lab",
    icon: <Map className="w-5 h-5 opacity-50" />,
    color: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-600",
    borderColor: "border-zinc-500/10",
    disabled: true
  }
];

export default function RoutingLabHome() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black selection:bg-red-500/30">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.05)_0%,transparent_50%)] pointer-events-none"></div>

      <main className="relative flex w-full max-w-5xl flex-col items-center justify-start py-20 px-6 sm:px-12 gap-16">
        
        <header className="flex flex-col items-center gap-6 text-center pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Advanced Routing
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            The Routing Lab
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Pushing the limits of the Next.js App Router with parallel slots, intercepting segments, and complex layout orchestration.
          </p>
        </header>

        <section className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
          {experiments.map((exp) => (
            <Link 
              key={exp.name}
              href={exp.href}
              className={`
                group flex flex-col gap-4 p-6 sm:p-8 bg-white dark:bg-zinc-900/50 rounded-2xl border transition-all duration-300
                ${exp.disabled 
                  ? "opacity-50 cursor-not-allowed border-zinc-200 dark:border-zinc-800" 
                  : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl border ${exp.color} ${exp.borderColor}`}>
                  {exp.icon}
                </div>
                {!exp.disabled && (
                  <div className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 transition-colors">
                     <ArrowRight className="w-4 h-4" />
                  </div>
                )}
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
