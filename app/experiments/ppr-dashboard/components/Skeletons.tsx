export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-900 shadow-sm animate-pulse">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}

export function UserCardSkeleton() {
  return (
    <div className="h-48 mb-8 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-900 shadow-sm animate-pulse flex items-center gap-6">
      <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
      <div className="flex flex-col gap-3 flex-1">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function RecentActivitySkeleton() {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm animate-pulse overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4"></div>
      </div>
      <div className="flex flex-col p-4 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0"></div>
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
              <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
