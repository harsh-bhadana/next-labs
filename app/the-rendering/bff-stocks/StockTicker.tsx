"use client";

import React, { useSyncExternalStore } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Server, 
  Zap,
  Globe,
  Radio,
  History
} from "lucide-react";

// --- The External Store Logic ---
// This is a "Zero-React" store that polls the BFF every 2s
let data: any = null;
let listeners: Array<() => void> = [];

const stockStore = {
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return data;
  },
  async startPolling() {
    const fetchStocks = async () => {
      try {
        const res = await fetch("/api/stocks", { cache: "no-store" });
        const json = await res.json();
        data = json;
        listeners.forEach(l => l());
      } catch (e) {
        console.error("BFF Polling Failed", e);
      }
    };

    fetchStocks();
    const interval = setInterval(fetchStocks, 2000);
    return () => clearInterval(interval);
  }
};

// Start polling immediately when the module loads (for this demo)
if (typeof window !== "undefined") {
  stockStore.startPolling();
}

export function StocksDashboard() {
  const store = useSyncExternalStore(stockStore.subscribe, stockStore.getSnapshot);

  if (!store) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 animate-pulse">
        <Zap className="w-8 h-8 text-amber-500 mb-4" />
        <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Connecting to Market BFF...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Real-time Ticker Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {store.stocks.map((stock: any) => (
          <div 
            key={stock.symbol}
            className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl flex flex-col gap-1 hover:shadow-lg transition-all group"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-black tracking-tighter text-zinc-400 group-hover:text-amber-500 transition-colors">
                {stock.symbol}
              </span>
              <div className={`p-1.5 rounded-lg ${stock.change > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                {stock.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </div>
            </div>
            <div className="text-3xl font-bold tracking-tight">
              ${stock.price.toFixed(2)}
            </div>
            <div className={`text-xs font-bold uppercase ${stock.change > 0 ? "text-emerald-500" : "text-red-500"}`}>
              {stock.change > 0 ? "+" : ""}{stock.change}%
            </div>
          </div>
        ))}
      </div>

      {/* Aggregate Status Panel */}
      <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Globe className="w-32 h-32 text-white" />
        </div>

        <div className="relative flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-500" />
                Live BFF Aggregation Feed
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400">
               <Clock className="w-3.3 h-3.3" />
               Last Sync: {new Date(store.timestamp).toLocaleTimeString()}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {store.sources.map((source: any) => (
              <div key={source.name} className="flex flex-col gap-2">
                 <div className="flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="text-xs font-bold text-zinc-200">{source.name}</span>
                 </div>
                 <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${source.status === 'ok' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${(source.latency / 500) * 100}%` }}
                    />
                 </div>
                 <span className="text-[10px] font-mono text-zinc-500">{source.latency}ms latency</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 italic">
            <span className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Auto-Polling Enabled (2000ms)
            </span>
            <span className="flex items-center gap-2">
              <History className="w-3.5 h-3.5" />
              Source: Edge Cached API
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
