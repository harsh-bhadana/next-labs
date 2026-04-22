"use client";

import { Reorder } from "framer-motion";
import { KanbanColumn as KanbanColumnType, KanbanCard as KanbanCardType } from "./actions";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  column: KanbanColumnType;
  onReorder: (newCards: KanbanCardType[]) => void;
  onMove: (cardId: string, toColId: string) => void;
  allColumnIds: string[];
}

export default function KanbanColumn({
  column,
  onReorder,
  onMove,
  allColumnIds,
}: KanbanColumnProps) {
  return (
    <div className="flex flex-col gap-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between px-2 mb-2">
        <h2 className="font-semibold text-neutral-200 flex items-center gap-2">
          {column.title}
          <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full">
            {column.cards.length}
          </span>
        </h2>
      </div>

      <Reorder.Group
        axis="y"
        values={column.cards}
        onReorder={onReorder}
        className="flex flex-col gap-3 min-h-[150px]"
      >
        {column.cards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            onMove={(toColId) => onMove(card.id, toColId)}
            otherColumnIds={allColumnIds.filter((id) => id !== column.id)}
          />
        ))}
      </Reorder.Group>
    </div>
  );
}
