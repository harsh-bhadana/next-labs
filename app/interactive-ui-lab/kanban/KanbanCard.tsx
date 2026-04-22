"use client";

import { Reorder, useDragControls, motion } from "framer-motion";
import { KanbanCard as KanbanCardType } from "./actions";
import { GripVertical, ArrowRightLeft } from "lucide-react";

interface KanbanCardProps {
  card: KanbanCardType;
  onMove: (toColId: string) => void;
  otherColumnIds: string[];
}

export default function KanbanCard({ card, onMove, otherColumnIds }: KanbanCardProps) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={card}
      dragListener={false}
      dragControls={controls}
      layoutId={card.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative group bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/50 hover:border-indigo-500/50 rounded-xl p-4 shadow-lg backdrop-blur-md transition-colors cursor-default select-none"
    >
      <div className="flex items-start gap-3">
        <div
          onPointerDown={(e) => controls.start(e)}
          className="mt-1 text-neutral-500 hover:text-neutral-300 cursor-grab active:cursor-grabbing transition-colors"
        >
          <GripVertical className="w-4 h-4" />
        </div>
        
        <div className="flex-1">
          <p className="text-sm text-neutral-200 leading-relaxed">
            {card.content}
          </p>
        </div>
      </div>

      {/* Quick Move Actions */}
      <div className="mt-4 pt-3 border-t border-neutral-700/30 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-1">
          {otherColumnIds.map((colId) => (
            <button
              key={colId}
              onClick={() => onMove(colId)}
              className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-neutral-700/50 hover:bg-indigo-600/50 text-neutral-400 hover:text-white rounded transition-all"
            >
              To {colId.split("-")[0]}
            </button>
          ))}
        </div>
        <ArrowRightLeft className="w-3 h-3 text-neutral-600" />
      </div>

      {/* Decorative Glow */}
      <div className="absolute inset-0 rounded-xl pointer-events-none border border-white/0 group-hover:border-white/5 transition-all" />
    </Reorder.Item>
  );
}
