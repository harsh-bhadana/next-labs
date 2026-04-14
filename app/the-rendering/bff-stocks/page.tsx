import Link from "next/link";
import { StocksDashboard } from "./StockTicker";

export default function BffStocksPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-amber-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.03)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="relative max-w-5xl mx-auto px-6 py-20 flex flex-col gap-12">
        {/* Header */}
        <header className="flex flex-col gap-6">
          <Link
            href="/"
            className="group flex w-fit items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ← Back to Labs
          </Link>

          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
              </span>
              Specimen 05: Route Handlers as a BFF
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Backend-for-Frontend <span className="text-amber-500">(BFF)</span>
            </h1>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              This specimen demonstrates how a <strong>Route Handler</strong> aggregates 3 different 
              mock market APIs, caches them for high-performance delivery, and provides a clean interface 
              to the client via <code className="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono italic">useSyncExternalStore</code>.
            </p>
          </div>
        </header>

        {/* Dashboard Component */}
        <StocksDashboard />

        {/* Architecture Specs */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
            <h3 className="font-bold text-sm uppercase tracking-wider">🖥️ Aggregation</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              The BFF combines 3 separate requests into one. The client makes only 1 call, reducing network overhead and complexity.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
            <h3 className="font-bold text-sm uppercase tracking-wider">📦 Edge Caching</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
               Using <code className="text-pink-500">revalidate = 2</code>, the Route Handler caches the aggregated result. Even if 10,000 users poll, the upstream APIs are protected.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
            <h3 className="font-bold text-sm uppercase tracking-wider">🔄 Sync State</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              React 19&apos;s <code className="text-emerald-500">useSyncExternalStore</code> ensures the polling state is synchronized across components with zero re-render flicker.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
