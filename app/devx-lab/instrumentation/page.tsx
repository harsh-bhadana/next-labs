import { telemetry } from "@/lib/telemetry";
import Link from "next/link";
import { ArrowLeft, Terminal, AlertTriangle, Activity, RefreshCcw, HardDrive } from "lucide-react";
import { redirect } from "next/navigation";

// Server Action to simulate events
async function triggerEvent(formData: FormData) {
  "use server";
  
  const type = formData.get("type") as string;
  
  if (type === "slow") {
    const start = performance.now();
    // Simulate slow work
    await new Promise(resolve => setTimeout(resolve, 800));
    telemetry.record({
      type: "action",
      name: "Slow Database Query Simulation",
      duration: performance.now() - start,
      metadata: { query: "SELECT * FROM heavy_data", rows: 15302 }
    });
  } else if (type === "error") {
    // This will trigger onRequestError in instrumentation.ts
    throw new Error("Simulated Server-Side Crash");
  }
  
  redirect("/devx-lab/instrumentation");
}

export default async function InstrumentationPage() {
  // Record page render
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build' || process.env.NEXT_PHASE === 'phase-production-server';
  // eslint-disable-next-line react-hooks/purity
  const renderStart = isBuild ? 0 : performance.now();
  const traces = telemetry.getTraces();
  
  // Record this render event
  // Note: This will show up on the NEXT refresh since this is an RSC that already started rendering
  telemetry.record({
    type: "render",
    name: "Instrumentation Dashboard Render",
    // eslint-disable-next-line react-hooks/purity
    duration: isBuild ? 0 : performance.now() - renderStart,
    metadata: { path: "/devx-lab/instrumentation" }
  });

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
            Instrumentation Hook Specimen
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Observability at the Core
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Next.js <code>instrumentation.ts</code> allows you to hook into the server lifecycle. This specimen captures render timings and server-side errors into a mock OpenTelemetry stream.
          </p>
        </header>

        {/* Controls */}
        <section className="w-full flex flex-wrap gap-4">
          <form action={triggerEvent}>
            <input type="hidden" name="type" value="slow" />
            <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-zinc-50 rounded-xl hover:bg-zinc-800 transition-all font-medium border border-zinc-700">
              <Activity className="w-4 h-4" />
              Trigger Slow Action
            </button>
          </form>

          <form action={triggerEvent}>
            <input type="hidden" name="type" value="error" />
            <button className="flex items-center gap-2 px-6 py-3 bg-rose-600/10 text-rose-600 rounded-xl hover:bg-rose-600/20 transition-all font-medium border border-rose-600/20 border-dashed">
              <AlertTriangle className="w-4 h-4" />
              Simulate Server Error
            </button>
          </form>

          <Link href="/devx-lab/instrumentation" className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all font-medium">
            <RefreshCcw className="w-4 h-4" />
            Refresh Logs
          </Link>
        </section>

        {/* Traces Dashboard */}
        <section className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-indigo-500" />
              Recent Traces
            </h3>
            <span className="text-xs text-zinc-500 font-mono">{traces.length} events captured</span>
          </div>

          <div className="flex flex-col gap-3">
            {traces.length === 0 ? (
              <div className="p-12 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-zinc-500">
                No traces recorded yet. Try triggering an action above.
              </div>
            ) : (
              traces.map((trace) => (
                <div 
                  key={trace.id} 
                  className={`p-5 rounded-2xl border transition-all ${
                    trace.type === 'error' 
                      ? 'bg-rose-500/5 border-rose-500/20' 
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                      trace.type === 'render' ? 'bg-blue-500/10 text-blue-600' :
                      trace.type === 'action' ? 'bg-emerald-500/10 text-emerald-600' :
                      trace.type === 'error' ? 'bg-rose-500/10 text-rose-600' :
                      'bg-zinc-500/10 text-zinc-600'
                    }`}>
                      {trace.type}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {new Date(trace.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{trace.name}</h4>
                    {trace.duration && (
                      <span className="text-xs font-mono text-zinc-500">
                        {trace.duration.toFixed(2)}ms
                      </span>
                    )}
                  </div>
                  {trace.metadata && (
                    <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg overflow-x-auto">
                       <pre className="text-[10px] text-zinc-500 font-mono leading-tight">
                        {JSON.stringify(trace.metadata, null, 2)}
                       </pre>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
