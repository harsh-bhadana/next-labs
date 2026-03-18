import { TransitionLink } from "@/components/TransitionLink";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const galleryItems = [
  { id: "1", title: "Neon Cyberpunk", color: "bg-fuchsia-500", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" },
  { id: "2", title: "Minimal Zenith", color: "bg-sky-500", url: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop" },
  { id: "3", title: "Abstract Terra", color: "bg-emerald-500", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
];

export default function ViewTransitionsGallery() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans p-8 sm:p-20">
      
      {/* Required for view transitions: Add a global style just for the morph effect */}
      <style dangerouslySetInnerHTML={{__html: `
        ::view-transition-group(*) {
          animation-duration: 0.5s;
          animation-timing-function: cubic-bezier(0.8, 0, 0.2, 1);
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
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              View Transition Gallery
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Showcasing Native CSS <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm">View Transitions API</code> seamlessly morphing layouts alongside Next.js routing.
              Click on a card to see the fluid motion.
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <TransitionLink 
              key={item.id} 
              href={`/interactive-ui-lab/view-transitions/${item.id}`}
              className="group flex flex-col relative overflow-hidden rounded-3xl aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-transform hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20"
              // Assigning view transition names inline using style. Supported on modern Chromium.
              style={{ viewTransitionName: `card-${item.id}` }}
            >
              <div className="absolute inset-0 z-0">
                <Image 
                  src={item.url} 
                  alt={item.title}
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  // Link specific component morph using viewTransitionName
                  style={{ viewTransitionName: `image-${item.id}` }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              
              <div className="relative z-10 mt-auto p-6 flex flex-col gap-2">
                <span 
                  className={`px-3 py-1 text-xs font-bold uppercase tracking-wider w-fit rounded-full ${item.color} text-white`}
                  style={{ viewTransitionName: `badge-${item.id}` }}
                >
                  Featured
                </span>
                <h2 
                  className="text-2xl font-bold text-white drop-shadow-md"
                  style={{ viewTransitionName: `title-${item.id}` }}
                >
                  {item.title}
                </h2>
              </div>
            </TransitionLink>
          ))}
        </section>

      </div>
    </div>
  );
}
