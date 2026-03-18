# Partial Prerendering (PPR) Dashboard

This experiment demonstrates the use of Partial Prerendering (PPR) in Next.js 15+ to create a lightning-fast dashboard experience. It combines a static outer "shell" with dynamically streamed inner content using React Suspense.

## Core Concepts

- **Static Shell**: The layout, sidebar, and headers are pre-rendered at build time. This ensures an instantaneous initial page load (First Contentful Paint).
- **Dynamic Content**: Data-heavy components like statistics, recent activity, and user profiles are rendered dynamically on the server and streamed to the client as soon as they are ready.
- **Suspense Boundaries**: React `<Suspense>` components are used to wrap the dynamic parts of the dashboard. While the server fetches data, the static shell is displayed alongside loading skeletons.

## Structure

- `page.tsx`: The main dashboard page combining the static layout elements with dynamically imported components wrapped in `<Suspense>`.
- `components/Sidebar.tsx`: The static navigation shell.
- `components/DynamicStats.tsx`, `components/DynamicRecentActivity.tsx`, `components/DynamicUserCard.tsx`: Server components that simulate fetching personalized data with artificial delays before rendering.
- `components/Skeletons.tsx`: Loading placeholders that mimic the shape of the dynamic content while it is being streamed.

## How to use

1. Run the development server (`npm run dev`).
2. Navigate to `http://localhost:3000/experiments/ppr-dashboard`.
3. Notice how the sidebar and page header appear instantly, while the statistics and activity sections show loading skeletons before popping in.
