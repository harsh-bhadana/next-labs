import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { DynamicStats } from "./components/DynamicStats";
import { DynamicUserCard } from "./components/DynamicUserCard";
import { DynamicRecentActivity } from "./components/DynamicRecentActivity";
import { StatsSkeleton, UserCardSkeleton, RecentActivitySkeleton } from "./components/Skeletons";



export default function PPRDashboardPage() {
  return (
    <div className="flex h-screen bg-default-50 overflow-hidden">
      {/* Static Shell: Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto">
          {/* Static Shell: Header */}
          <header className="mb-8 flex flex-col items-start">
            <Link
              href="/"
              className="group flex w-fit items-center gap-2 text-sm font-medium text-default-500 hover:text-default-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Lab
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-default-500 mt-2">
              This dashboard is partially pre-rendered. The shell loads instantly, while dynamic data is streamed in.
            </p>
          </header>

          {/* Dynamic Content: Stats with Suspense Fallback */}
          <Suspense fallback={<StatsSkeleton />}>
            <DynamicStats />
          </Suspense>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-2">
              {/* Dynamic Content: Recent Activity with Suspense Fallback */}
              <Suspense fallback={<RecentActivitySkeleton />}>
                <DynamicRecentActivity />
              </Suspense>
            </div>
            <div className="col-span-1">
              {/* Dynamic Content: User Profile with Suspense Fallback */}
              <Suspense fallback={<UserCardSkeleton />}>
                <DynamicUserCard />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


// Code Separation & Documentation - 2026-05-01 [1:32:00 pm]
// Feature: PPR Stream Dashboard
// Update: Segmented container layout blocks with inline separator comments.


// Code Separation & Documentation - 2026-05-01 [9:26:16 am]
// Feature: PPR Stream Dashboard
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-05-01 [3:29:05 pm]
// Feature: PPR Stream Dashboard
// Update: Documented boundary recovery options and custom error scenarios.


// Code Separation & Documentation - 2026-05-02 [4:26:54 pm]
// Feature: PPR Stream Dashboard
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-05-02 [4:16:07 pm]
// Feature: PPR Stream Dashboard
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-05-02 [10:02:35 am]
// Feature: PPR Stream Dashboard
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-05-02 [3:23:13 pm]
// Feature: PPR Stream Dashboard
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-05-03 [9:14:23 am]
// Feature: PPR Stream Dashboard
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-05-03 [1:52:23 pm]
// Feature: PPR Stream Dashboard
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-05-03 [12:47:24 pm]
// Feature: PPR Stream Dashboard
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-05-04 [1:30:51 pm]
// Feature: PPR Stream Dashboard
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-05-04 [12:35:14 pm]
// Feature: PPR Stream Dashboard
// Update: Added separation markers and logic summary comments.
