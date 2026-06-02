"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Pause, RefreshCw, Cpu, Gauge } from "lucide-react";

// Canvas Particle Class for the background simulation
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.radius = Math.random() * 2.5 + 1.5;
    this.color = `hsla(${340 + Math.random() * 20}, 85%, 65%, ${Math.random() * 0.4 + 0.3})`;
  }

  update(width: number, height: number, mouse: { x: number; y: number; active: boolean }) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off walls
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Interactive mouse repulsion
    if (mouse.active) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        this.vx += (dx / dist) * force * 0.5;
        this.vy += (dy / dist) * force * 0.5;
      }
    }

    // Speed limits
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > 3) {
      this.vx = (this.vx / speed) * 3;
      this.vy = (this.vy / speed) * 3;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow for efficiency
  }
}

export default function PrioritySchedulerPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [jankMode, setJankMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [fps, setFps] = useState(60);
  const [fpsHistory, setFpsHistory] = useState<number[]>(Array(40).fill(60));

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const frameCountRef = useRef(0);
  const fpsIntervalRef = useRef<number>(0);

  // Initialize and run Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Particle[] = Array.from({ length: 60 }).map(
      () => new Particle(canvas.clientWidth, canvas.clientHeight)
    );

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
        fpsIntervalRef.current = timestamp;
      }

      // Compute FPS
      frameCountRef.current++;
      const elapsed = timestamp - fpsIntervalRef.current;
      if (elapsed >= 500) {
        const currentFps = Math.min(60, Math.round((frameCountRef.current * 1000) / elapsed));
        setFps(currentFps);
        setFpsHistory((prev) => [...prev.slice(1), currentFps]);
        frameCountRef.current = 0;
        fpsIntervalRef.current = timestamp;
      }

      lastTimeRef.current = timestamp;

      // Clear Canvas
      ctx.fillStyle = "rgba(9, 9, 11, 0.2)"; // trailing fade effect
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      // Draw Connection Lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(244, 63, 94, ${0.15 * (1 - dist / 80)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Update and Draw Particles
      particles.forEach((p) => {
        if (isPlaying) {
          p.update(canvas.clientWidth, canvas.clientHeight, mouseRef.current);
        }
        p.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  // Mock list items for Commit 1 layout
  const mockItems = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    name: `System Log Node #${1000 + i}`,
    status: i % 3 === 0 ? "healthy" : i % 2 === 0 ? "warning" : "critical",
    load: `${Math.round(20 + Math.random() * 60)}%`,
  }));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans p-6 sm:p-12 md:p-20 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto flex flex-col gap-8 relative z-10">
        
        {/* Navigation & Header */}
        <header className="flex flex-col gap-4">
          <Link
            href="/performance-lab"
            className="group flex w-fit items-center gap-2 text-sm font-medium text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Performance Lab
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
                  React 19 Concurrent Specimen
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Concurrent Priority Scheduler
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm sm:text-base">
                An interactive experiment demonstrating how concurrent rendering priority shields frame rates.
                Toggle **Jank Mode** to observe how heavy computations block synchronous state updates and freeze the canvas.
              </p>
            </div>
            
            {/* Real-time FPS Badge */}
            <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm self-start md:self-auto">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Main Loop FPS</span>
                <span className={`text-3xl font-extrabold font-mono transition-colors duration-300 ${
                  fps >= 55 ? "text-emerald-500" : fps >= 40 ? "text-amber-500" : "text-rose-500 animate-pulse"
                }`}>
                  {fps}
                </span>
              </div>
              <Gauge className={`w-10 h-10 ${
                fps >= 55 ? "text-emerald-500" : fps >= 40 ? "text-amber-500" : "text-rose-500"
              }`} />
            </div>
          </div>
        </header>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls & Search Pane */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-6 rounded-3xl shadow-sm">
            
            <h2 className="text-lg font-semibold border-b border-zinc-100 dark:border-zinc-900 pb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-rose-500" />
              Scheduler Controls
            </h2>

            {/* Mode Selectors */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-zinc-500">Execution Scheduling Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setJankMode(false)}
                  className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                    !jankMode
                      ? "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold"
                      : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span>Concurrent Mode</span>
                  <span className="text-[10px] opacity-75 font-normal">useTransition (Smooth)</span>
                </button>
                <button
                  onClick={() => setJankMode(true)}
                  className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                    jankMode
                      ? "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold"
                      : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span>Sync (Jank) Mode</span>
                  <span className="text-[10px] opacity-75 font-normal">State Blocking (Freeze)</span>
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-500">Filter Dataset</label>
              <input
                type="text"
                placeholder="Search server log codes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all font-medium"
              />
              <p className="text-[11px] text-zinc-500 leading-normal">
                {jankMode
                  ? "⚠️ Typing runs heavy synchronous filtering immediately, locking the main thread."
                  : "💡 Typing schedules rendering at a lower priority, keeping the animation thread fluid."}
              </p>
            </div>

            {/* Simulation Log Stream */}
            <div className="flex-1 flex flex-col gap-3 min-h-[250px]">
              <span className="text-sm font-semibold text-zinc-500">Processed Logs (Sample View)</span>
              <div className="flex-1 border border-zinc-100 dark:border-zinc-900 rounded-2xl p-4 bg-zinc-50/50 dark:bg-zinc-950 overflow-y-auto max-h-[300px] flex flex-col gap-2 scrollbar-thin">
                {mockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 text-xs font-mono"
                  >
                    <span className="text-zinc-600 dark:text-zinc-400 font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] capitalize ${
                        item.status === "healthy" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                        item.status === "warning" ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" :
                        "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-zinc-400 font-bold">{item.load}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Canvas & Graph Pane */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Visualizer Canvas */}
            <div className="relative h-[320px] sm:h-[400px] bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-6">
              
              {/* Canvas element */}
              <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="absolute inset-0 w-full h-full cursor-crosshair"
              />

              {/* Top Controls Overlay */}
              <div className="relative z-10 flex justify-between items-center w-full">
                <span className="text-xs font-semibold bg-zinc-900/80 text-zinc-300 border border-zinc-800 px-3 py-1 rounded-full backdrop-blur-sm">
                  Interactive Core Loop
                </span>
                
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 transition-colors backdrop-blur-sm"
                  title={isPlaying ? "Pause Simulation" : "Start Simulation"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>

              {/* Bottom Instructions Overlay */}
              <div className="relative z-10 self-start text-left bg-zinc-900/80 border border-zinc-800/80 px-4 py-2.5 rounded-2xl max-w-sm backdrop-blur-sm">
                <p className="text-[11px] text-zinc-400 leading-normal">
                  Hover your cursor inside the canvas. The particles will react to mouse coordinates at 60Hz. Under synchronous load, the animation will freeze.
                </p>
              </div>
            </div>

            {/* Sparkline Graph Card */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-6 rounded-3xl shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Frame Stability Profile</span>
                  <span className="text-xs text-zinc-500">Live delta trace of the last 40 frames</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>Target: 60fps</span>
                </div>
              </div>

              {/* Simple SVG Sparkline */}
              <div className="h-16 w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900 rounded-xl px-2 py-3">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                  <path
                    d={`M ${fpsHistory.map((val, idx) => {
                      const x = (idx / (fpsHistory.length - 1)) * 100;
                      // Mapping 0-60 fps to height (40 to 0)
                      const y = 40 - (val / 60) * 35;
                      return `${x} ${y}`;
                    }).join(" L ")}`}
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
