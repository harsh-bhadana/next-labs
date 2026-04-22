"use client";

import { useOptimistic, useTransition, useState } from "react";
import { KanbanColumn, updateKanbanState } from "./actions";
import KanbanBoard from "./KanbanBoard";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function KanbanClient({ initialData }: { initialData: KanbanColumn[] }) {
  const [data, setData] = useState(initialData);
  const [isPending, startTransition] = useTransition();

  const [optimisticData, addOptimisticData] = useOptimistic(
    data,
    (state: KanbanColumn[], newData: KanbanColumn[]) => newData
  );

  const handleUpdate = async (newData: KanbanColumn[]) => {
    // 1. Update UI optimistically
    startTransition(async () => {
      addOptimisticData(newData);
      
      // 2. Perform Server Action
      try {
        const result = await updateKanbanState(newData);
        // 3. Confirm with permanent state
        setData(result);
      } catch (error) {
        console.error("Failed to update kanban:", error);
        // State will automatically roll back if setData isn't called
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 h-8 text-sm font-medium">
        {isPending ? (
          <div className="flex items-center gap-2 text-cyan-400 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Syncing with server...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>All changes persisted</span>
          </div>
        )}
      </div>

      <KanbanBoard columns={optimisticData} onUpdate={handleUpdate} />
    </div>
  );
}
