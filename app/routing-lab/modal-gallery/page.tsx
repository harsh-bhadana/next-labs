import Link from "next/link";
import Image from "next/image";
import { photos } from "./data";
import { ArrowLeft, Camera, ExternalLink, Maximize2 } from "lucide-react";

export default function RoutingLabPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col gap-12">
      {/* Header */}
      <header className="flex flex-col gap-6">
        <Link
          href="/routing-lab"
          className="group flex w-fit items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Routing Lab
        </Link>

        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
            </span>
            Specimen 06: Advanced Routing
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            The <span className="text-zinc-400">Modal</span> Gallery
          </h1>
          
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            A state-of-the-art demonstration of <strong>Parallel & Intercepting Routes</strong>. 
            Clicking a photo opens an intercepted modal overlay, while direct linking or 
            refreshing serves a dedicated full-page experience.
          </p>
        </div>
      </header>

      {/* Gallery Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={`/routing-lab/modal-gallery/photo/${photo.id}`}
            scroll={false}
            className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            <Image
              src={photo.url}
              alt={photo.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                  Ref: #{photo.id}
                </span>
                <Maximize2 className="w-5 h-5 text-white/50" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight leading-none">
                {photo.title}
              </h3>
              <p className="text-sm text-white/60 line-clamp-1">
                {photo.description}
              </p>
            </div>

            {/* Accent Corner */}
            <div className={`absolute top-4 right-4 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all delay-100 scale-90 group-hover:scale-100`}>
              <Camera className="w-4 h-4 text-white" />
            </div>
          </Link>
        ))}
      </section>

      {/* Architecture Alert */}
      <div className="mt-12 p-8 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col gap-4">
        <div className="flex items-center gap-3 text-indigo-400">
           <ExternalLink className="w-5 h-5" />
           <h4 className="font-bold uppercase tracking-wider text-sm">Mental Model: Parallel vs Intercepting</h4>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">
          When you're within the gallery and click a photo, Next.js matches the <strong>intercepting segment</strong> <code className="text-indigo-300">app/routing-lab/@modal/(.)photo/[id]</code>. 
          This renders the content into the <code className="text-indigo-300">@modal</code> slot in the shared layout while keeping the background context intact. 
          However, if you reload or direct link, Next.js ignores the interceptor and renders the <strong>standard route</strong> <code className="text-zinc-100">app/routing-lab/photo/[id]</code> as a full page.
        </p>
      </div>
    </main>
  );
}
