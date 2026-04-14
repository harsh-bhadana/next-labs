"use server";

import { revalidatePath } from "next/cache";
import * as db from "./data";

export async function addTodoAction(formData: FormData) {
  const text = formData.get("text") as string;
  if (!text || text.trim() === "") return;

  await db.addTodo(text);
  
  // The heart of the "Zero-State" pattern:
  // Purge the cache for this path and trigger a server re-render.
  revalidatePath("/performance-lab/server-crud");
}

export async function toggleTodoAction(id: string) {
  await db.toggleTodo(id);
  revalidatePath("/performance-lab/server-crud");
}

export async function deleteTodoAction(id: string) {
  await db.deleteTodo(id);
  revalidatePath("/performance-lab/server-crud");
}

export async function reorderTodoAction(id: string, direction: "up" | "down") {
  await db.reorderTodo(id, direction);
  revalidatePath("/performance-lab/server-crud");
}
