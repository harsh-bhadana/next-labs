import { 
  Plus, 
  ChevronUp, 
  ChevronDown, 
  ArrowLeft,
  Server,
  Database,
  RefreshCw,
  Info
} from "lucide-react";
import Link from "next/link";
import { getTodos } from "./data";
import { 
  addTodoAction, 
} from "./actions";
import { FormStatusButton, ToggleButton, DeleteButton, ReorderButton } from "./todo-client";

export default async function ServerCrudPage() {
  const todos = await getTodos();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6 py-20 flex flex-col gap-12">
        {/* Header */}
        <header className="flex flex-col gap-6">
          <Link
            href="/performance-lab"
            className="group flex w-fit items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Performance Lab
          </Link>

          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
              </span>
              Specimen 07: Zero-State Server CRUD
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight">
              The <span className="text-indigo-600 dark:text-indigo-400">Zero-State</span> Todo
            </h1>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every operation — create, update, delete, and reorder — is a <strong>Server Action</strong>. 
              The page itself is a pure <strong>Server Component</strong> that re-renders with fresh data 
              after each mutation via <code className="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-indigo-600 dark:text-indigo-400 font-mono">revalidatePath()</code>. 
              Zero client-side state. Zero sync logic.
            </p>
          </div>
        </header>

        {/* Add Todo Form */}
        <section>
          <form action={addTodoAction} className="relative group">
            <input
              type="text"
              name="text"
              placeholder="Add a new task..."
              required
              className="w-full pl-12 pr-32 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <Plus className="w-5 h-5" />
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <FormStatusButton />
            </div>
          </form>
        </section>

        {/* Todo List */}
        <section className="flex flex-col gap-3">
          {todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-500 bg-zinc-50/50 dark:bg-zinc-900/20">
              <RefreshCw className="w-8 h-8 mb-4 opacity-20" />
              <p className="text-sm font-medium uppercase tracking-widest opacity-50">Empty Archive</p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div 
                key={todo.id}
                className={`
                  group flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 border rounded-2xl transition-all duration-300
                  ${todo.completed 
                    ? "border-zinc-100 dark:border-zinc-800/50 opacity-60" 
                    : "border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/30 hover:shadow-md"
                  }
                `}
              >
                {/* Reorder Buttons */}
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ReorderButton 
                    id={todo.id} 
                    direction="up" 
                    disabled={index === 0}
                    icon={<ChevronUp className="w-3 h-3" />} 
                  />
                  <ReorderButton 
                    id={todo.id} 
                    direction="down" 
                    disabled={index === todos.length - 1}
                    icon={<ChevronDown className="w-3 h-3" />} 
                  />
                </div>

                {/* Toggle Completion */}
                <ToggleButton id={todo.id} completed={todo.completed} />

                {/* Todo Text */}
                <span className={`flex-1 text-sm font-medium transition-all ${todo.completed ? "line-through text-zinc-500 italic" : "text-zinc-800 dark:text-zinc-200"}`}>
                  {todo.text}
                </span>

                {/* Delete Button */}
                <DeleteButton id={todo.id} />
              </div>
            ))
          )}
        </section>

        {/* Architecture Specs */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-900/5 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Server className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Server Environment</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every single line of this page is generated on the server. There is no `useState` tracking the todo list.
            </p>
          </div>
          
          <div className="p-5 rounded-2xl bg-zinc-900/5 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
              <Database className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Data Hydration</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When an action finishes, Next.js smartly re-fetches only the data needed, resulting in a seamless UX.
            </p>
          </div>
        </section>

        {/* Technical Explainer */}
        <div className="flex items-start gap-3 p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
          <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300">Why this matters?</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In traditional React, you'd need `useEffect`, `useState`, and complex sync logic. Here, the "Mental Model" is significantly simplified: <strong>Form Submission &rarr; Server Mutation &rarr; Page Re-render.</strong> 
              It's as simple as PHP/Rails but with the performance and interactivity of React.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
