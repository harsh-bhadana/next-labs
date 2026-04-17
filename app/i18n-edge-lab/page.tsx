import Link from "next/link";
import { ArrowRight, Globe, Zap, Cpu } from "lucide-react";

const specimens = [
  {
    name: "Edge Runtime RSC",
    description: "A server component running on the Edge Runtime. Reads geo headers and browser language for instant localization.",
    href: "/i18n-edge-lab/edge-runtime",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-500/20"
  },
  {
    name: "Node.js Runtime RSC",
    description: "A baseline server component running on the standard Node.js runtime for performance comparison.",
    href: "/i18n-edge-lab/node-runtime",
    icon: <Cpu className="w-5 h-5" />,
    color: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
    borderColor: "border-zinc-500/20"
  }
];

export default function I18nEdgeLabHome() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black selection:bg-blue-500/30">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.05)_0%,transparent_50%)] pointer-events-none"></div>

      <main className="relative flex w-full max-w-5xl flex-col items-center justify-start py-20 px-6 sm:px-12 gap-16">
        
        <header className="flex flex-col items-center gap-6 text-center pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
            <Globe className="w-4 h-4" />
            i18n & Edge Lab
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Global Performance
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Exploring the intersection of internationalization and the Edge Runtime. Compare latency, geo-detection, and streaming speeds.
          </p>
        </header>

        <section className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
          {specimens.map((spec) => (
            <Link 
              key={spec.name}
              href={spec.href}
              className="group flex flex-col gap-4 p-6 sm:p-8 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg transition-all duration-300"
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
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {spec.name}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
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
