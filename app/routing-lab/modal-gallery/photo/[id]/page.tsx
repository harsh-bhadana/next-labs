import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPhotoById } from "../../data";
import { ArrowLeft, Download, Share2, Info } from "lucide-react";
import { photos } from "../../data";

export function generateStaticParams() {
  return photos.map((photo) => ({ id: photo.id }));
}


export default async function PhotoPage({
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
    <main className="min-h-screen bg-white dark:bg-black flex flex-col items-center py-20 px-6">
      <div className="w-full max-w-5xl flex flex-col gap-12">
        {/* Navigation */}
        <Link
          href="/routing-lab/modal-gallery"
          className="group flex w-fit items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Gallery
        </Link>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Main Image */}
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <Image
              src={photo.url}
              alt={photo.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-10 py-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {photo.title}
              </h1>
              <p className="text-xl text-zinc-500 leading-relaxed italic">
                {photo.description}
              </p>
            </div>

            <div className="flex gap-4">
               <button className="flex-1 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                 <Download className="w-5 h-5" />
                 Download HD
               </button>
               <button className="p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                 <Share2 className="w-5 h-5" />
               </button>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <Info className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Deep Link State</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                You are currently viewing the **Full Page Route**. This view is served by <code className="text-indigo-500 font-mono">app/routing-lab/photo/[id]/page.tsx</code>. 
                If you navigate back to the gallery and click another photo, this UI will be replaced by the modal version.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
