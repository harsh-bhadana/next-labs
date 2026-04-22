"use client";

import { TransitionLink } from "@/components/TransitionLink";
import { useViewTransition, TransitionMode } from "@/components/TransitionProvider";
import { ArrowLeft, Sparkles, Layers, MoveRight, Maximize2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const galleryItems = [
  { id: "1", title: "Neon Cyberpunk", color: "bg-fuchsia-500", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" },
  { id: "2", title: "Minimal Zenith", color: "bg-sky-500", url: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop" },
  { id: "3", title: "Abstract Terra", color: "bg-emerald-500", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
];

export default function ViewTransitionsGallery() {
  const { mode, setMode } = useViewTransition();

  const modes: { id: TransitionMode; label: string; icon: any; description: string }[] = [
    { id: "crossfade", label: "Crossfade", icon: Layers, description: "Smooth root opacity transition" },
    { id: "slide", label: "Slide", icon: MoveRight, description: "Content slides across the screen" },
    { id: "morph", label: "Morph", icon: Maximize2, description: "Elements warp to new positions" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans p-8 sm:p-20">
      
      {/* Dynamic View Transition Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Default timing for all transitions */
        ::view-transition-group(*) {
          animation-duration: 0.6s;
          animation-timing-function: cubic-bezier(0.85, 0, 0.15, 1);
        }

        /* --- CROSSFADE MODE --- */
        .vt-crossfade::view-transition-old(root) {
          animation: fade-out 0.5s ease-in-out forwards;
        }
        .vt-crossfade::view-transition-new(root) {
          animation: fade-in 0.5s ease-in-out forwards;
        }

        /* --- SLIDE MODE --- */
        .vt-slide::view-transition-old(root) {
          animation: slide-out-left 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }
        .vt-slide::view-transition-new(root) {
          animation: slide-in-right 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }

        /* --- MORPH MODE --- */
        /* Morph relies on individual view-transition-names. 
           We disable the root fade to emphasize element motion. */
        .vt-morph::view-transition-old(root),
        .vt-morph::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }

        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-out-left {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100px); opacity: 0; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}} />

      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        
        <header className="flex flex-col gap-6">
          <Link
            href="/interactive-ui-lab"
            className="group flex w-fit items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Interactive & UI Lab
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight flex items-center gap-3">
              View Transition Gallery
              <span className="text-xs font-mono px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-md border border-amber-200 dark:border-amber-800/50">React 19 + API</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
              Programmatic control over the <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm">View Transitions API</code>. 
              Toggle between modes to see different orchestration patterns.
            </p>
          </div>
        </header>

        {/* Mode Selector */}
        <div className="bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl flex flex-wrap gap-2 w-fit border border-zinc-200 dark:border-zinc-800">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                mode === m.id
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <m.icon className={`w-4 h-4 ${mode === m.id ? "text-blue-500" : ""}`} />
              {m.label}
            </button>
          ))}
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <TransitionLink 
              key={item.id} 
              href={`/interactive-ui-lab/view-transitions/${item.id}`}
              className="group flex flex-col relative overflow-hidden rounded-3xl aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20"
              style={{ viewTransitionName: `card-${item.id}` }}
            >
              <div className="absolute inset-0 z-0">
                <Image 
                  src={item.url} 
                  alt={item.title}
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ viewTransitionName: `image-${item.id}` }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="relative z-10 mt-auto p-8 flex flex-col gap-3">
                <span 
                  className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest w-fit rounded-lg ${item.color} text-white shadow-lg`}
                  style={{ viewTransitionName: `badge-${item.id}` }}
                >
                  {mode.toUpperCase()} MODE
                </span>
                <h2 
                  className="text-3xl font-black text-white leading-none tracking-tighter"
                  style={{ viewTransitionName: `title-${item.id}` }}
                >
                  {item.title}
                </h2>
                <div className="flex items-center gap-2 text-white/60 text-xs font-medium group-hover:text-white transition-colors">
                  <span>Explore detail</span>
                  <MoveRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </TransitionLink>
          ))}
        </section>

        <footer className="mt-10 p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
          <h3 className="font-bold text-blue-900 dark:text-blue-400 flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4" /> Why this matters
          </h3>
          <p className="text-sm text-blue-800/80 dark:text-blue-400/80 leading-relaxed">
            Standard CSS transitions are reactive to DOM changes. By wrapping navigation in <code className="font-mono">useViewTransition</code>, 
            we orchestrate the hand-off between Next.js and the browser, allowing us to swap animation strategies (Slide vs. Morph) dynamically without 
            re-authoring individual component styles.
          </p>
        </footer>

      </div>
    </div>
  );
}
