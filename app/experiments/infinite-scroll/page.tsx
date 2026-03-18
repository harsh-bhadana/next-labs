import { InfiniteScrollList } from "./infinite-scroll-list";
import { fetchMoreItems } from "./actions";

export default async function InfiniteScrollPage() {
  const initialState = await fetchMoreItems({
    items: [],
    page: -1,
    hasMore: true,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-2xl mx-auto px-6 py-24 space-y-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Infinite Scroll
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            A list that fetches more items using Server Actions and `useActionState`, managing pending state natively without any client-side data fetching library.
          </p>
        </div>

        <InfiniteScrollList initialState={initialState} />
      </div>
    </div>
  );
}
