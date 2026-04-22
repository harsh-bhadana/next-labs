import Link from "next/link";
import { ArrowRight, Wrench, BarChart3, Search } from "lucide-react";

const specimens = [
  {
    name: "Instrumentation & Tracing",
    description: "Deep observability into server startup and request cycles using instrumentation.ts and mock OTel hooks.",
    href: "/devx-lab/instrumentation",
    icon: <BarChart3 className="w-5 h-5 text-indigo-500" />,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    borderColor: "border-indigo-500/20"
  },
  {
    name: "Custom 404 Routing",
    description: "Demonstrates contextual 404 pages per route segment using notFound() and not-found.tsx boundaries.",
    href: "/devx-lab/not-found-routing",
    icon: <Search className="w-5 h-5 text-rose-500" />,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-500/20"
  }
];

export default function DevXLabHome() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black selection:bg-indigo-500/30">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.05)_0%,transparent_50%)] pointer-events-none"></div>

      <main className="relative flex w-full max-w-5xl flex-col items-center justify-start py-20 px-6 sm:px-12 gap-16">
        
        <header className="flex flex-col items-center gap-6 text-center pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
            <Wrench className="w-4 h-4" />
            DevX & Tooling Lab
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Advanced Tooling
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Probing the internals of Next.js for better observability, debugging, and development velocity.
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
