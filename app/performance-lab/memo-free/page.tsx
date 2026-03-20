"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Zap,
  Cpu,
  Activity,
  RefreshCw,
  ArrowLeft,
  Maximize2,
  Gauge,
  Timer,
  LayoutGrid
} from "lucide-react";
import Link from "next/link";

// --- Types & Constants ---
const GRID_SIZE = 50;
const TICK_RATE = 16;  // ~60fps

type SensorData = {
  id: number;
  value: number;
  status: 'active' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
};

// --- Helpers (Static to avoid compiler re-compute) ---
const generateInitialData = (random = false): SensorData[] =>
  Array.from({ length: GRID_SIZE }, (_, i) => ({
    id: i,
    value: random ? Math.random() * 100 : 0,
    status: 'active',
    trend: 'stable'
  }));

const getStatusColor = (status: string) => {
  switch (status) {
    case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20 shadow-red-500/10';
    case 'warning': return 'text-amber-500 bg-amber-500/10 border-amber-500/20 shadow-amber-500/10';
    default: return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10';
  }
};

// --- Main Specimen Page ---
export default function MemoFreeLab() {
  const [hasMounted, setHasMounted] = useState(false);
  const [sensors, setSensors] = useState<SensorData[]>(() => generateInitialData(false));
  const [tick, setTick] = useState(0);
  const [fps, setFps] = useState(0);

  const frameCount = useRef(0);
  const lastTime = useRef(0);

  // High-frequency update loop
  useEffect(() => {
    setHasMounted(true);
    let animationFrameId: number;
    let lastTick = performance.now();
    let batchOffset = 0;

    const loop = (time: number) => {
      setTick(t => t + 1);

      setSensors(prev => {
        const next = [...prev];
        // Optimization: Update a small batch per frame to minimize churn
        const updateCount = Math.min(8, GRID_SIZE);
        for (let i = 0; i < updateCount; i++) {
          const idx = (batchOffset + i) % GRID_SIZE;
          const delta = (Math.random() - 0.5) * 6;
          const newValue = Math.max(0, Math.min(100, next[idx].value + delta));
          next[idx] = {
            ...next[idx],
            value: newValue,
            trend: delta > 0 ? 'up' : 'down',
            status: newValue > 85 ? 'critical' : newValue > 65 ? 'warning' : 'active'
          };
        }
        batchOffset = (batchOffset + updateCount) % GRID_SIZE;
        return next;
      });

      // FPS Calculation
      frameCount.current++;
      if (time - lastTime.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastTime.current = time;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (!hasMounted) {
    return <div className="min-h-screen bg-zinc-950" />;
  }

  // --- HANDLER ---
  const handleReset = () => {
    setSensors(generateInitialData());
    setTick(0);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 overflow-hidden flex flex-col">

      {/* Dynamic Background Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,#1d4ed808_0%,transparent_70%)] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Header */}
      <nav className="relative z-10 border-b border-zinc-900 bg-black/50 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="p-2 hover:bg-zinc-900 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500 fill-blue-500" />
              Specimen 06: The Memo-Free UI
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Performance Lab / React Compiler</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono">
            <Activity className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-zinc-400">FPS:</span>
            <span className={fps > 55 ? "text-emerald-500 font-bold" : "text-amber-500"}>{fps}</span>
          </div>
          <button
            onClick={handleReset}
            className="p-2 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-px bg-zinc-900 h-[calc(100vh-65px)]">

        {/* Sensor Grid Workspace */}
        <section className="bg-zinc-950 p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-3">
            {sensors.map((sensor) => (
              <SensorCard
                key={sensor.id}
                sensor={sensor}
              />
            ))}
          </div>
        </section>

        {/* Analytics Sidebar */}
        <aside className="bg-black/40 backdrop-blur-xl p-8 flex flex-col gap-8 border-l border-zinc-900 overflow-y-auto">

          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Gauge className="w-3 h-3" />
              System Architecture
            </h3>
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold mb-1">Compiler-Optimized</p>
                <p className="text-xs text-zinc-500 leading-relaxed">This page contains zero manually memoized components or values. Every frame is optimized automatically at build-time.</p>
              </div>
              <div className="h-px bg-zinc-800"></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] text-zinc-600 uppercase mb-1">Nodes</span>
                  <span className="text-xl font-bold">{GRID_SIZE}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-600 uppercase mb-1">State Ticks</span>
                  <span className="text-xl font-bold" suppressHydrationWarning>{tick.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Timer className="w-3 h-3" />
              Live Telemetry
            </h3>
            <div className="space-y-3">
              {sensors.slice(0, 5).map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
                  <span className="text-xs font-mono text-zinc-500">SN-{s.id.toString().padStart(3, '0')}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 origin-left" style={{ transform: `scaleX(${s.value / 100})` }}></div>
                    </div>
                    <span className="text-xs font-bold w-8 text-right italic">{Math.round(s.value)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto p-6 rounded-3xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
            <Cpu className="w-8 h-8 mb-4 opacity-50" />
            <h4 className="font-bold mb-1">React 19 Core</h4>
            <p className="text-xs leading-relaxed opacity-80">
              Proving that expensive re-render cycles are a thing of the past. The compiler understands your component tree and only updates what truly changed.
            </p>
          </div>

        </aside>

      </main>
    </div>
  );
}

// --- Sub-Component (NOT Memoized) ---
function SensorCard({ sensor }: { sensor: SensorData }) {
  const colorClass = getStatusColor(sensor.status);

  return (
    <div className={`p-4 rounded-2xl border flex flex-col gap-4 group hover:ring-2 hover:ring-blue-500/50 ${colorClass} bg-black/40`}>
      <div className="flex items-center justify-between">
        <svg className="w-4 h-4 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
        <span className="text-[10px] font-mono opacity-60">#{sensor.id}</span>
      </div>

      <div className="flex flex-col">
        <span className="text-2xl font-black tracking-tighter tabular-nums drop-shadow-sm">
          {Math.round(sensor.value)}%
        </span>
        <span className="text-[9px] uppercase font-bold tracking-widest opacity-80">
          Power Throughput
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="flex-1 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-current origin-left"
            style={{ transform: `scaleX(${sensor.value / 100})` }}
          />
        </div>
        <div className={`w-1.5 h-1.5 rounded-full bg-current opacity-50`} />
      </div>
    </div>
  );
}
