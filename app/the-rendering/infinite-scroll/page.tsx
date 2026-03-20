import { InfiniteScrollList } from "./infinite-scroll-list";
import { fetchMoreItems } from "./actions";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Suspense } from "react";

// --- Dynamic Content Component ---
async function InfiniteScrollContent() {
  const initialState = await fetchMoreItems({
    items: [],
    page: -1,
    hasMore: true,
  });

  return <InfiniteScrollList initialState={initialState} />;
}

// --- Main Page ---
export default function InfiniteScrollPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-2xl mx-auto px-6 py-24 space-y-12">
        <div className="space-y-4 flex flex-col items-start">
          <Link
            href="/"
            className="group flex w-fit items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Lab
          </Link>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Infinite Scroll
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              A list that fetches more items using Server Actions and `useActionState`, managing pending state natively without any client-side data fetching library.
            </p>
          </div>
        </div>

        <Suspense fallback={
          <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
             <Loader2 className="w-8 h-8 animate-spin text-zinc-400 mb-2" />
             <p className="text-sm text-zinc-500">Retrieving stream...</p>
          </div>
        }>
          <InfiniteScrollContent />
        </Suspense>
      </div>
    </div>
  );
}
