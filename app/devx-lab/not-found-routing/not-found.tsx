import Link from 'next/link';
import { Terminal, AlertCircle } from 'lucide-react';

export default function SpecimenNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black selection:bg-indigo-500/30 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05)_0%,transparent_50%)] pointer-events-none"></div>
      
      <div className="relative flex flex-col items-center text-center gap-6 max-w-lg z-10">
        <div className="flex items-center justify-center w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm mb-2">
           <AlertCircle className="w-10 h-10 text-indigo-500" />
        </div>
        
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Not Found
        </h2>
        
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          This is the <strong className="text-zinc-900 dark:text-zinc-200">root-level 404 boundary</strong> for this specimen. It caught the `notFound()` error because no closer boundary existed.
        </p>

        <div className="p-4 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl w-full text-left flex items-start gap-3 mt-2">
          <Terminal className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
          <div className="text-sm text-zinc-600 dark:text-zinc-400 font-mono">
            File: <span className="text-zinc-900 dark:text-zinc-300">app/devx-lab/not-found-routing/not-found.tsx</span>
          </div>
        </div>
        
        <Link 
          href="/devx-lab/not-found-routing" 
          className="mt-6 px-8 py-3 bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all font-medium inline-flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95"
        >
          Return to Specimen
        </Link>
      </div>
    </div>
  );
}
