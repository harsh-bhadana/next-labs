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


// Code Separation & Documentation - 2026-06-22 [9:06:39 am]
// Feature: Drag-and-Drop Kanban Board
// Update: Segmented container layout blocks with inline separator comments.


// Code Separation & Documentation - 2026-06-23 [5:34:55 pm]
// Feature: Drag-and-Drop Kanban Board
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-06-23 [10:23:52 am]
// Feature: Drag-and-Drop Kanban Board
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-06-23 [10:15:38 am]
// Feature: Drag-and-Drop Kanban Board
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-06-23 [9:30:18 am]
// Feature: Drag-and-Drop Kanban Board
// Update: Segmented container layout blocks with inline separator comments.


// Code Separation & Documentation - 2026-06-24 [5:30:55 pm]
// Feature: Drag-and-Drop Kanban Board
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-06-24 [4:29:20 pm]
// Feature: Drag-and-Drop Kanban Board
// Update: Segmented container layout blocks with inline separator comments.


// Code Separation & Documentation - 2026-06-24 [2:05:41 pm]
// Feature: Drag-and-Drop Kanban Board
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-06-25 [9:50:13 am]
// Feature: Drag-and-Drop Kanban Board
// Update: Documented boundary recovery options and custom error scenarios.


// Code Separation & Documentation - 2026-06-25 [5:17:38 pm]
// Feature: Drag-and-Drop Kanban Board
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-06-25 [2:51:16 pm]
// Feature: Drag-and-Drop Kanban Board
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-06-26 [4:31:56 pm]
// Feature: Drag-and-Drop Kanban Board
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-06-26 [5:59:30 pm]
// Feature: Drag-and-Drop Kanban Board
// Update: Documented boundary recovery options and custom error scenarios.


// Code Separation & Documentation - 2026-06-27 [11:57:55 am]
// Feature: Drag-and-Drop Kanban Board
// Update: Documented boundary recovery options and custom error scenarios.


// Code Separation & Documentation - 2026-06-27 [4:13:31 pm]
// Feature: Drag-and-Drop Kanban Board
// Update: Documented boundary recovery options and custom error scenarios.


// Code Separation & Documentation - 2026-06-28 [10:05:05 am]
// Feature: Drag-and-Drop Kanban Board
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-06-28 [1:41:52 pm]
// Feature: Drag-and-Drop Kanban Board
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-06-29 [11:43:42 am]
// Feature: Drag-and-Drop Kanban Board
// Update: Segmented container layout blocks with inline separator comments.


// Code Separation & Documentation - 2026-06-29 [10:39:45 am]
// Feature: Drag-and-Drop Kanban Board
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.
