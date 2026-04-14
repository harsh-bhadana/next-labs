import Image from "next/image";
import { notFound } from "next/navigation";
import { getPhotoById } from "../../../data";
import { Modal } from "../../../modal";
import { Info, Maximize, Share2 } from "lucide-react";
import { photos } from "../../../data";

export function generateStaticParams() {
  return photos.map((photo) => ({ id: photo.id }));
}


export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = getPhotoById(id);

  if (!photo) {
    notFound();
  }

  return (
    <Modal>
      <div className="flex flex-col lg:flex-row gap-0">
        {/* Left: Image */}
        <div className="relative aspect-[4/5] lg:w-[60%] flex-shrink-0">
          <Image
            src={photo.url}
            alt={photo.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col gap-8 p-10 lg:p-14 bg-zinc-50 dark:bg-zinc-950 flex-1">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-500 font-bold">
               Ref: #{photo.id}
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              {photo.title}
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed font-medium mt-2">
              {photo.description}
            </p>
          </div>

          <div className="flex gap-4 mt-auto">
             <button className="flex-1 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95">
               <Maximize className="w-4 h-4" />
               Purchase Print
             </button>
             <button className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
               <Share2 className="w-4 h-4" />
             </button>
          </div>

          <div className="mt-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-4">
            <div className={`w-2 h-2 rounded-full bg-indigo-500 mt-1.5 animate-pulse`} />
            <div className="flex flex-col gap-1">
               <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                 <Info className="w-3 h-3" />
                 Parallel Route Active
               </h4>
               <p className="text-[11px] text-zinc-500 leading-normal">
                 This content is served by the <strong>Intercepting Segment</strong>. 
                 The browser URL is matching <code className="text-indigo-400">/photo/[id]</code>, 
                 but Next.js has intercepted the navigation to overlay this modal.
               </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
