import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft, Cpu, Globe, Clock, Activity, AlertCircle, Languages } from "lucide-react";

export default async function NodeRuntimePage() {
  const start = performance.now();
  const headersList = await headers();
  
  // Simulation of some small work to ensure we track real measurement
  await new Promise(resolve => setTimeout(resolve, 5)); 
  
  const country = headersList.get("x-vercel-ip-country") || "Unknown";
  const city = headersList.get("x-vercel-ip-city") || "Unknown";
  const region = headersList.get("x-vercel-ip-country-region") || "Unknown";
  const userLanguage = headersList.get("accept-language")?.split(",")[0] || "en-US";
  
  const end = performance.now();
  const ttfb = (end - start).toFixed(2);

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black selection:bg-orange-500/30">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.05)_0%,transparent_50%)] pointer-events-none"></div>

      <main className="relative flex w-full max-w-4xl flex-col items-start justify-start py-20 px-6 sm:px-12 gap-10">
        
        <Link 
          href="/i18n-edge-lab"
          className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Lab
        </Link>

        <header className="flex flex-col gap-6 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 self-start rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            Node.js Runtime (Baseline)
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Standard Compute
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This page is running on the <strong>Node.js Runtime</strong>. It typically runs in a specific datacenter, which may be farther from your location.
          </p>
        </header>

        {/* Hero Performance Card */}
        <div className="w-full p-8 bg-zinc-900 text-zinc-50 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl -mr-20 -mt-20 rounded-full"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">Measured Latency (TTFB)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black tabular-nums">{ttfb}</span>
                <span className="text-2xl text-zinc-500">ms</span>
              </div>
            </div>

            <div className="h-px w-full sm:h-16 sm:w-px bg-zinc-800"></div>

            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-zinc-800">
                    <Globe className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Detected Location</p>
                    <p className="text-lg font-semibold">{city}, {region}, {country}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-zinc-800">
                    <Languages className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Detected Language</p>
                    <p className="text-lg font-semibold">{userLanguage}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Comparison Panel */}
        <section className="w-full flex flex-col gap-6">
          <div className="flex items-center gap-3">
             <Activity className="w-5 h-5 text-zinc-500" />
             <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Runtime Comparison</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Edge Card */}
            <Link 
              href="/i18n-edge-lab/edge-runtime"
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col gap-4 group"
            >
               <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest group-hover:text-blue-500 transition-colors">Edge (Optimized)</span>
                  <div className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-bold uppercase">Target</div>
               </div>
               <ul className="flex flex-col gap-3">
                  <li className="text-sm flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    Faster TTFB for dynamic content
                  </li>
                  <li className="text-sm flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    Reduced network latency
                  </li>
                  <li className="text-sm flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    Limited Node.js APIs
                  </li>
               </ul>
            </Link>

            {/* Node Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-orange-500 shadow-sm flex flex-col gap-4">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">Node.js (Current)</span>
                  <div className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase">Baseline</div>
               </div>
               <ul className="flex flex-col gap-3">
                  <li className="text-sm flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                    Standard server latency
                  </li>
                  <li className="text-sm flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                    Full access to Node.js ecosystem
                  </li>
                  <li className="text-sm flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                    Heavier cold starts
                  </li>
               </ul>
            </div>
          </div>
        </section>

        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex gap-4 items-center">
          <AlertCircle className="w-5 h-5 text-blue-500" />
          <p className="text-xs text-blue-700 dark:text-blue-500/80 italic">
            Did you know? Edge Runtime is often used for redirects, A/B testing, and localized rendering because it lives "closer" to the user.
          </p>
        </div>

      </main>
    </div>
  );
}
