import { TransitionLink } from "@/components/TransitionLink";
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";
import { galleryItems } from "../page";
import { Suspense } from "react";

// --- Dynamic Content Component ---
async function DetailContent({ params }: { params: Promise<{ id: string }> }) {
  const awaitedParams = await params;
  const item = galleryItems.find((i) => i.id === awaitedParams.id);

  if (!item) {
    return <div className="p-20 text-center text-zinc-500">Item not found.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Left Side: Massive Image Morph */}
      <section 
        className="relative h-[40vh] lg:h-screen w-full lg:w-1/2 flex-shrink-0"
        style={{ viewTransitionName: `card-${item.id}` }}
      >
        <Image 
          src={item.url} 
          alt={item.title}
          fill 
          className="object-cover"
          style={{ viewTransitionName: `image-${item.id}` }}
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="absolute top-6 left-6 z-10">
          <TransitionLink
            href="/interactive-ui-lab/view-transitions"
            className="flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-sm font-medium text-white hover:bg-black/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </TransitionLink>
        </div>
      </section>

      {/* Right Side: Details Fading In */}
      <section className="flex-1 flex flex-col justify-center p-8 sm:p-20 overflow-y-auto w-full">
        <div className="max-w-xl flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
          
          <span 
            className={`px-4 py-2 text-sm font-bold uppercase tracking-wider w-fit rounded-full ${item.color} text-white`}
            style={{ viewTransitionName: `badge-${item.id}` }}
          >
            Featured Product
          </span>
          
          <h1 
            className="text-5xl sm:text-7xl font-black tracking-tight text-zinc-900 dark:text-white"
            style={{ viewTransitionName: `title-${item.id}` }}
          >
            {item.title}
          </h1>
          
          <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 mt-4">
            This detailed view demonstrates how elements from the previous page seamlessly warp and expand into their new layouts. Notice how the image takes up the entire left pane while the title dynamically positions itself.
          </p>

          <div className="p-6 bg-zinc-100 dark:bg-zinc-900 rounded-2xl mt-8">
            <h3 className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Magic Breakdown
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><strong className="text-zinc-900 dark:text-white">viewTransitionName:</strong> Unique IDs bind the card, image, text, and badge across routes.</li>
              <li><strong className="text-zinc-900 dark:text-white">document.startViewTransition:</strong> Captured in our custom <code>&lt;TransitionLink&gt;</code> component before resolving Next's router path.</li>
            </ul>
          </div>
          
        </div>
      </section>
    </div>
  );
}

// --- Static Params ---
export async function generateStaticParams() {
  return galleryItems.map((item) => ({
    id: item.id,
  }));
}

// --- Main Page ---
export default function ViewTransitionDetail({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans">
      
      {/* Morph Style Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        ::view-transition-group(*) {
          animation-duration: 0.5s;
          animation-timing-function: cubic-bezier(0.8, 0, 0.2, 1);
        }
      `}} />

      <main className="h-full w-full">
        <Suspense fallback={
          <div className="h-screen w-full flex items-center justify-center">
             <Loader2 className="w-10 h-10 animate-spin text-zinc-400" />
          </div>
        }>
          <DetailContent params={params} />
        </Suspense>
      </main>

    </div>
  );
}
