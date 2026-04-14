export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  position: number;
};

// Simple in-memory store. 
// In a real app, this would be a database.
// We use a global variable to persist data across fast-refreshes in development.
let todos: Todo[] = [
  { id: "1", text: "Learn Server Actions", completed: true, position: 0 },
  { id: "2", text: "Master revalidatePath", completed: false, position: 1 },
  { id: "3", text: "Build zero-state CRUD", completed: false, position: 2 },
];

export async function getTodos(): Promise<Todo[]> {
  // Simulate DB latency
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...todos].sort((a, b) => a.position - b.position);
}

export async function addTodo(text: string): Promise<Todo> {
  const newTodo: Todo = {
    id: Math.random().toString(36).substring(7),
    text,
    completed: false,
    position: todos.length,
  };
  todos.push(newTodo);
  return newTodo;
}

export async function toggleTodo(id: string): Promise<Todo | undefined> {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
  return todo;
}

export async function deleteTodo(id: string): Promise<void> {
  todos = todos.filter((t) => t.id !== id);
  // Re-normalize positions after deletion
  todos.forEach((todo, index) => {
    todo.position = index;
  });
}

export async function reorderTodo(id: string, direction: "up" | "down"): Promise<void> {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return;

  const newIndex = direction === "up" ? index - 1 : index + 1;
  if (newIndex < 0 || newIndex >= todos.length) return;

  // Swap positions
  const currentTodo = todos[index];
  const targetTodo = todos[newIndex];

  const tempPos = currentTodo.position;
  currentTodo.position = targetTodo.position;
  targetTodo.position = tempPos;

  // Re-sort the array for consistency
  todos.sort((a, b) => a.position - b.position);
}
