"use client";

import { useState, useDeferredValue, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

// Generate stable mocked data
const MOCK_ITEMS = Array.from({ length: 10000 }).map((_, i) => ({
  id: i,
  title: `Performance Item ${i}`,
  category: i % 3 === 0 ? "Fast" : i % 2 === 0 ? "Medium" : "Heavy",
  value: `VAL-${i.toString(36).padStart(4, '0')}`,
}));

export default function PerformanceLabPage() {
  const [query, setQuery] = useState("");
  
  // React 19: useDeferredValue(value, initialValue)
  // The initialValue lets us provide a value for the initial render so the component isn't blocked.
  const deferredQuery = useDeferredValue(query, "");

  // An artificially heavy filtering operation
  const filteredItems = useMemo(() => {
    if (!deferredQuery) return MOCK_ITEMS.slice(0, 100); // just show some

    const start = performance.now();
    while (performance.now() - start < 20) {
      // Artificially block the thread for 20ms to simulate complex logic per render
    }

    return MOCK_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(deferredQuery.toLowerCase()) ||
        item.value.includes(deferredQuery) ||
        item.category.toLowerCase().includes(deferredQuery.toLowerCase())
    ).slice(0, 100);
  }, [deferredQuery]);

  const isStale = query !== deferredQuery;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans p-8 sm:p-20">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        <header className="flex flex-col gap-6">
          <Link
            href="/"
            className="group flex w-fit items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Rendering Labs
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              The Performance Lab
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Showcasing the <strong className="text-zinc-900 dark:text-zinc-100">Search-as-you-type (No-Flicker)</strong> pattern. 
              Utilizing <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm">useDeferredValue</code> with the new React 19 initial value support to remain responsive during a heavy 10,000-item filter.
            </p>
          </div>
        </header>

        <section className="flex flex-col gap-6">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search 10,000 heavy items..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
            />
            {isStale && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            )}
          </div>

          <div 
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transition-opacity duration-200 ${isStale ? "opacity-50" : "opacity-100"}`}
          >
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl"
              >
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</span>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full border ${
                    item.category === "Fast" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                    item.category === "Medium" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                    "bg-rose-500/10 text-rose-600 border-rose-500/20"
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">Vol: {item.value}</span>
                </div>
              </div>
            ))}
            
            {filteredItems.length === 0 && (
              <div className="col-span-full py-12 text-center text-zinc-500">
                No items matched your search query.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
