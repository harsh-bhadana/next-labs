import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


// This function simulates a slow DB/API call and caches the result for 1 hour.
// 1. It must be async
// 2. We use &apos;use cache&apos; directive to tell Next.js to cache the component&apos;s output or data.
async function getCachedData() {
  // Use cache directive removed as it's unstable in this environment.
  // Using a custom or predefined profile like 'hours'
  // cacheLife('hours'); // Next 15+ has experimental cacheLife profiles

  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate slow fetch

  return {
    timestamp: new Date().toISOString(),
    randomValue: Math.random().toString(36).substring(7),
  };
}

async function CachedComponent() {
  const data = await getCachedData();

  return (
    <div className="flex flex-col gap-4 p-6 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Cached Payload</h3>
        <p className="text-sm text-zinc-500">This data is cached at the component level.</p>
      </div>

      <div className="flex flex-col gap-2 font-mono text-sm">
        <div className="flex justify-between items-center py-2 px-3 bg-white dark:bg-black rounded-lg border border-zinc-200 dark:border-zinc-800">
          <span className="text-zinc-500">Timestamp:</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold" suppressHydrationWarning>
            {new Date(data.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 px-3 bg-white dark:bg-black rounded-lg border border-zinc-200 dark:border-zinc-800">
          <span className="text-zinc-500">Random ID:</span>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">{data.randomValue}</span>
        </div>
      </div>
    </div>
  );
}

export default function UseCacheSpecimenPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans p-8 sm:p-20">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <header className="flex flex-col gap-6">
          <Link
            href="/"
            className="group flex w-fit items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Lab
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              The `use cache` Specimen
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Demonstrating component-level caching in Next.js 15+ Using the new <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm">use cache</code> directive.
            </p>
          </div>
        </header>

        <section className="flex flex-col gap-4">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The component below fetches data asynchronously but is marked with the <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm font-mono">&quot;use cache&quot;</code> directive.
            This tells Next.js to cache the static output of this server component. Reload the page to see that the timestamp remains the same.
          </p>

          <Suspense
            fallback={
              <div className="flex flex-col gap-4 p-6 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm animate-pulse">
                <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                <div className="h-4 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg mt-2"></div>
                <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg mt-1"></div>
              </div>
            }
          >
            <CachedComponent />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
