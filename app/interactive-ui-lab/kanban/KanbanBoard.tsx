"use client";

import { LayoutGroup } from "framer-motion";
import { KanbanColumn as KanbanColumnType, KanbanCard as KanbanCardType } from "./actions";
import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {
  columns: KanbanColumnType[];
  onUpdate: (newData: KanbanColumnType[]) => void;
}

export default function KanbanBoard({ columns, onUpdate }: KanbanBoardProps) {
  const handleReorderCards = (columnId: string, newCards: KanbanCardType[]) => {
    const nextColumns = columns.map((col) =>
      col.id === columnId ? { ...col, cards: newCards } : col
    );
    onUpdate(nextColumns);
  };

  const handleMoveCard = (cardId: string, fromColId: string, toColId: string) => {
    const card = columns
      .find((c) => c.id === fromColId)
      ?.cards.find((k) => k.id === cardId);

    if (!card) return;

    const nextColumns = columns.map((col) => {
      if (col.id === fromColId) {
        return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
      }
      if (col.id === toColId) {
        return { ...col, cards: [...col.cards, card] };
      }
      return col;
    });

    onUpdate(nextColumns);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <LayoutGroup>
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onReorder={(newCards) => handleReorderCards(column.id, newCards)}
            onMove={(cardId, toColId) => handleMoveCard(cardId, column.id, toColId)}
            allColumnIds={columns.map((c) => c.id)}
          />
        ))}
      </LayoutGroup>
    </div>
  );
}
