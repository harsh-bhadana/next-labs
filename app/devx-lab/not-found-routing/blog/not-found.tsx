import Link from 'next/link';
import { SearchX, FileCode2 } from 'lucide-react';

export default function BlogNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-orange-50 font-sans dark:bg-[#120a00] selection:bg-orange-500/30 px-6 border-t-[12px] border-orange-500">
      
      <div className="relative flex flex-col items-center text-center gap-6 max-w-lg z-10">
        <div className="flex items-center justify-center w-24 h-24 bg-white dark:bg-black rounded-3xl border-2 border-orange-200 dark:border-orange-900/50 shadow-xl mb-4 transform -rotate-6">
           <SearchX className="w-12 h-12 text-orange-500" />
        </div>
        
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-orange-950 dark:text-orange-50">
          Post Not Found
        </h2>
        
        <p className="text-lg leading-relaxed text-orange-800/80 dark:text-orange-200/60 font-medium">
          This is the <strong className="text-orange-900 dark:text-orange-100">nested blog 404 boundary</strong>. It overrides the root specimen 404 because it is placed closer to the error source in the file system tree.
        </p>

        <div className="p-4 bg-white dark:bg-black border border-orange-200 dark:border-orange-900/50 rounded-xl w-full text-left flex items-start gap-3 mt-4 shadow-sm">
          <FileCode2 className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
          <div className="text-sm text-orange-900 dark:text-orange-100 font-mono">
            File: <span className="opacity-70">app/devx-lab/not-found-routing/blog/not-found.tsx</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-8 w-full flex-col sm:flex-row">
            <Link 
            href="/devx-lab/not-found-routing" 
            className="flex-1 w-full px-6 py-4 bg-white text-orange-900 border border-orange-200 dark:bg-[#1f1100] dark:border-orange-900/50 dark:text-orange-50 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all font-bold inline-flex items-center justify-center"
            >
            Back to Specimen
            </Link>
            <Link 
            href="/devx-lab/not-found-routing/blog/existing-post" 
            className="flex-1 w-full px-6 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-bold inline-flex items-center justify-center shadow-lg hover:shadow-orange-500/20"
            >
            View Valid Post
            </Link>
        </div>
      </div>
    </div>
  );
}
