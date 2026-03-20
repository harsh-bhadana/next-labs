import { headers } from "next/headers";
import { Shield, Fingerprint, Globe, RefreshCcw, ArrowLeft, Lock, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";

export default async function ProxySpecimenPage() {
  const headerList = await headers();
  
  // Extract data injected by proxy.ts
  const fingerprint = headerList.get("x-lab-fingerprint") || "Not Generated";
  const geo = headerList.get("x-lab-geo") || "Undisclosed";
  const isRotated = headerList.get("x-token-rotated") === "true";
  const prevToken = headerList.get("x-prev-token") || "None";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-500/30">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <main className="relative max-w-4xl mx-auto py-16 px-6 sm:px-12 flex flex-col gap-12">
        
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group w-fit"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Lab
        </Link>

        {/* Header */}
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Shield className="w-6 h-6" />
             </div>
             <span className="text-blue-600 dark:text-blue-400 font-mono text-sm tracking-widest uppercase">Specimen 03</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            The proxy.ts Interceptor
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Next.js 16 introduces a centralized proxy layer that operates at the network boundary. This specimen demonstrates intercepting request metadata for security, geo-fencing, and automated credential rotation.
          </p>
        </header>

        {/* Interactive Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card: Request Fingerprinting */}
          <div className="group p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500">
            <div className="flex items-start justify-between mb-8">
              <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-400 transition-colors duration-500">
                <Fingerprint className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 uppercase tracking-tighter">Verified</div>
            </div>
            <h3 className="text-xl font-bold mb-2">Request Fingerprint</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Generated at the edge from IP and platform metadata.</p>
            <code className="block w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-blue-600 dark:text-blue-400 break-all lg:text-lg">
              {fingerprint}
            </code>
          </div>

          {/* Card: Geo-Fencing */}
          <div className="group p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500">
            <div className="flex items-start justify-between mb-8">
              <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-400 transition-colors duration-500">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 uppercase tracking-tighter">Boundaried</div>
            </div>
            <h3 className="text-xl font-bold mb-2">Geo-Fencing Analysis</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Determining request origin to enforce regional compliance.</p>
            <div className="flex flex-col gap-2">
               <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs text-zinc-500 uppercase font-mono">Location</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Globe className="w-3 h-3 text-emerald-500" />
                    {geo}
                  </span>
               </div>
               <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 uppercase font-mono">Policy</span>
                  <span className="font-semibold text-emerald-600">Access Granted</span>
               </div>
            </div>
          </div>

          {/* Card: JWT Rotation */}
          <div className="md:col-span-2 group p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-500 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-500"></div>
            
            <div className="flex items-start justify-between mb-8 relative z-10">
              <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700 group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-400 transition-colors duration-500">
                <RefreshCcw className="w-6 h-6" />
              </div>
              <div className={`p-2 rounded-full flex items-center gap-1.5 transition-all duration-500 ${isRotated ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border border-amber-500/20"}`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{isRotated ? "Rotation Synchronized" : "Pending Rotation"}</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-2">Centralized JWT Rotation</h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mb-8">The proxy transparently manages token lifecycle across the network layer, preventing stale credentials from reaching the server runtime.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
               <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase">
                     <Lock className="w-3 h-3" />
                     Inbound Signature (Previous)
                  </div>
                  <div className="font-mono text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
                     ...{prevToken}
                  </div>
               </div>
               <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-mono text-[10px] uppercase">
                     <RefreshCcw className="w-3 h-3 animate-spin-slow" />
                     Outbound Signature (Rotated)
                  </div>
                  <div className="font-mono text-purple-600 dark:text-purple-400 bg-white dark:bg-zinc-900 p-3 rounded-lg border border-purple-500/20 shadow-sm shadow-purple-500/5 underline decoration-dotted underline-offset-4">
                     {isRotated ? "Verified & Re-signed" : "Processing..."}
                  </div>
               </div>
            </div>
          </div>

        </div>

        {/* Informational Section */}
        <section className="mt-8 p-10 rounded-[40px] bg-gradient-to-br from-zinc-900 to-zinc-950 text-zinc-400 border border-zinc-800 shadow-2xl">
           <h4 className="text-zinc-100 font-bold text-lg mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              Architectural Benefit
           </h4>
           <p className="leading-relaxed mb-6">
              By moving these cross-cutting concerns to the <code className="text-blue-400">proxy.ts</code> layer, your business logic remains decoupled from infrastructure-level security and session management. This creates a <strong>hardened perimeter</strong> that processes 100% of traffic before a single React component is instantiated.
           </p>
           <div className="flex flex-wrap gap-3">
              {['Auto-Healing Tokens', 'Regional Sharding', 'L7 Filtering'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  {tag}
                </span>
              ))}
           </div>
        </section>

      </main>
    </div>
  );
}
