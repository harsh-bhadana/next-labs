import Link from "next/link";
import { ArrowRight, Image as ImageIcon, Maximize2 } from "lucide-react";

const experiments = [
  {
    name: "View Transition Gallery",
    description: "Native CSS View Transitions integrated with Next.js router for app-like fluid motion between product pages.",
    href: "/interactive-ui-lab/view-transitions",
    icon: <ImageIcon className="w-5 h-5" />,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    borderColor: "border-indigo-500/20"
  },
  {
    name: "Drag-and-Drop Kanban",
    description: "High-fidelity board with optimistic reordering, server actions, and Framer Motion animations.",
    href: "/interactive-ui-lab/kanban",
    icon: <Maximize2 className="w-5 h-5" />,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-500/20"
  }
];

export default function InteractiveLabHome() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black selection:bg-indigo-500/30">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(99,102,241,0.05)_0%,transparent_50%)] pointer-events-none"></div>

      <main className="relative flex w-full max-w-5xl flex-col items-center justify-start py-20 px-6 sm:px-12 gap-16">
        
        <header className="flex flex-col items-center gap-6 text-center pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Fluid Interactions
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            The Interactive & UI Lab
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            A sandbox for cutting-edge animations, native browser APIs, and immersive UI patterns bridging the gap between web and native applications.
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
