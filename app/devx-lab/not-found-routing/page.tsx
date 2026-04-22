import Link from "next/link";
import { ArrowLeft, Terminal, AlertTriangle, FileQuestion } from "lucide-react";
import { notFound } from "next/navigation";

export default async function NotFoundSpecimenPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ trigger?: string }> 
}) {
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build' || process.env.NEXT_PHASE === 'phase-production-server';
  const params = isBuild ? {} : await searchParams;
  
  if (params.trigger === "root") {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black selection:bg-indigo-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.05)_0%,transparent_50%)] pointer-events-none"></div>

      <main className="relative flex w-full max-w-4xl flex-col items-start justify-start py-20 px-6 sm:px-12 gap-10">
        <Link 
          href="/devx-lab"
          className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Lab
        </Link>

        <header className="flex flex-col gap-6 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 self-start rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            Not Found Specimen
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Contextual 404 Routing
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Next.js allows you to define <code>not-found.tsx</code> at any level of your route tree. This specimen demonstrates how calling <code>notFound()</code> explicitly, or visiting a route that throws a 404, triggers the closest boundary.
          </p>
        </header>

        <section className="w-full flex flex-col gap-6 mt-4">
          
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
               <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-2">
                 <AlertTriangle className="w-5 h-5 text-indigo-500" />
                 Root Level 404
               </h3>
               <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                 Triggers the not-found.tsx component located in the same directory as this page.
               </p>
            </div>
            <Link href="?trigger=root" className="whitespace-nowrap px-6 py-2.5 bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all font-medium inline-flex items-center gap-2 justify-center">
              Trigger Root 404
            </Link>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
               <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-2">
                 <FileQuestion className="w-5 h-5 text-orange-500" />
                 Nested Blog 404
               </h3>
               <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                 Navigates to a dynamic route that calls notFound() internally, triggering a specific Blog 404 design.
               </p>
            </div>
            <Link href="/devx-lab/not-found-routing/blog/missing-post" className="whitespace-nowrap px-6 py-2.5 bg-white text-zinc-900 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-50 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all font-medium inline-flex items-center gap-2 justify-center shadow-sm">
              View Missing Post
            </Link>
          </div>
          
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
               <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-2">
                 <FileQuestion className="w-5 h-5 text-emerald-500" />
                 Valid Blog Post
               </h3>
               <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                 Navigates to a valid dynamic route that renders successfully without triggering a 404.
               </p>
            </div>
            <Link href="/devx-lab/not-found-routing/blog/existing-post" className="whitespace-nowrap px-6 py-2.5 bg-white text-zinc-900 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-50 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all font-medium inline-flex items-center gap-2 justify-center shadow-sm">
              View Valid Post
            </Link>
          </div>

        </section>
      </main>
    </div>
  );
}
