"use server";

export interface Item {
  id: string;
  title: string;
  description: string;
  color: string;
}

export interface State {
  items: Item[];
  page: number;
  hasMore: boolean;
}

const ITEMS_PER_PAGE = 10;
const MAX_PAGES = 5;

// Mock database generator
const generateItems = (page: number): Item[] => {
  return Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => {
    const id = (page * ITEMS_PER_PAGE + i).toString();
    const colors = [
      "bg-blue-50 dark:bg-blue-900/20",
      "bg-purple-50 dark:bg-purple-900/20",
      "bg-emerald-50 dark:bg-emerald-900/20",
      "bg-rose-50 dark:bg-rose-900/20",
      "bg-amber-50 dark:bg-amber-900/20",
    ];
    return {
      id,
      title: `Item ${parseInt(id) + 1}`,
      description: `This is a dynamically loaded item showcasing infinite scrolling with Server Actions. The item ID is ${id}.`,
      color: colors[i % colors.length],
    };
  });
};

export async function fetchMoreItems(prevState: State): Promise<State> {
  // Simulate network delay to make the loading state visible
  await new Promise((resolve) => setTimeout(resolve, 800));

  const nextPage = prevState.page + 1;
  const newItems = generateItems(nextPage);

  return {
    items: [...prevState.items, ...newItems],
    page: nextPage,
    hasMore: nextPage < MAX_PAGES - 1,
  };
}
