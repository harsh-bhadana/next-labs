"use server";

import { revalidatePath } from "next/cache";

export type KanbanCard = {
  id: string;
  content: string;
};

export type KanbanColumn = {
  id: string;
  title: string;
  cards: KanbanCard[];
};

export async function updateKanbanState(newState: KanbanColumn[]): Promise<KanbanColumn[]> {
  // Simulate database latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, you would persist this to a database here
  // For this demo, we'll just return the state as if it were confirmed
  
  revalidatePath("/interactive-ui-lab/kanban");
  return newState;
}
