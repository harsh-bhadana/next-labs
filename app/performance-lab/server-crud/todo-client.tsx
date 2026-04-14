"use client";

import { useFormStatus } from "react-dom";
import { 
  Plus, 
  Trash2, 
  Check, 
  ChevronUp, 
  ChevronDown, 
  Loader2 
} from "lucide-react";
import { toggleTodoAction, deleteTodoAction, reorderTodoAction } from "./actions";

export function FormStatusButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl
        transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
      Add Task
    </button>
  );
}

export function ToggleButton({ id, completed }: { id: string; completed: boolean }) {
  const { pending } = useFormStatus();
  
  return (
    <form action={() => toggleTodoAction(id)}>
      <button
        type="submit"
        disabled={pending}
        className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
          ${completed 
            ? "bg-emerald-500 border-emerald-500 text-white" 
            : "border-zinc-300 dark:border-zinc-700 hover:border-indigo-500"
          }
          ${pending ? "opacity-50 cursor-wait" : ""}
        `}
      >
        {completed && <Check className="w-4 h-4" />}
      </button>
    </form>
  );
}

export function DeleteButton({ id }: { id: string }) {
  return (
    <form action={() => deleteTodoAction(id)}>
      <DeleteButtonInner />
    </form>
  );
}

function DeleteButtonInner() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all disabled:opacity-50"
    >
      {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}

export function ReorderButton({ 
  id, 
  direction, 
  disabled, 
  icon 
}: { 
  id: string; 
  direction: "up" | "down"; 
  disabled: boolean;
  icon: React.ReactNode;
}) {
  return (
    <form action={() => reorderTodoAction(id, direction)}>
      <button
        type="submit"
        disabled={disabled}
        className={`
          p-1 text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 
          hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded transition-all
          disabled:opacity-0 disabled:pointer-events-none
        `}
      >
        {icon}
      </button>
    </form>
  );
}
