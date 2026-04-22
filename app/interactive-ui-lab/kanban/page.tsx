import { KanbanColumn } from "./actions";
import KanbanClient from "./KanbanClient";

const INITIAL_DATA: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      { id: "1", content: "Implement Server Actions" },
      { id: "2", content: "Setup Framer Motion" },
      { id: "3", content: "Style with Glassmorphism" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      { id: "4", content: "React 19 Hooks Exploration" },
      { id: "5", content: "Performance Benchmarking" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "6", content: "Initial Project Setup" },
      { id: "7", content: "Define Feature Roadmap" },
    ],
  },
];

export default function KanbanPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 p-8 md:p-12">
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Interactive Kanban Lab
        </h1>
        <p className="text-neutral-400 max-w-2xl text-lg">
          A high-performance task board demonstrating <span className="text-cyan-400">useOptimistic</span>, 
          <span className="text-indigo-400">Server Actions</span>, and <span className="text-purple-400">Framer Motion</span> reordering.
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <KanbanClient initialData={INITIAL_DATA} />
      </main>
    </div>
  );
}
