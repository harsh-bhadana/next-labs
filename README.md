# NextJS Labs

A collection of experiments and demonstrations exploring modern Next.js and React 19 capabilities. This repository isolates unique edge-cases, performance optimization techniques, and new API specimens.

## 🧪 The Labs

### 🎭 Interactive UI Lab
- **[View Transitions](app/interactive-ui-lab/view-transitions/page.tsx)**: Utilizing the native CSS View Transitions API for seamless layout morphing across Next.js routing.

### ⚡ Performance Lab
- **[Optimistic Like Button](app/performance-lab/optimistic-like/page.tsx)**: Leveraging React 19's `useOptimistic` hook paired with Server Actions to create a highly responsive user interface.
- **[Search-as-you-go](app/performance-lab/search-as-you-go/page.tsx)**: Showcasing the power of React 19's `useDeferredValue` hook to maintain a snappy UI while processing heavy operations.
- **[Specimen 06: The Memo-Free UI](app/performance-lab/memo-free/page.tsx)**: A high-density dashboard proving 60fps performance via the React Compiler without `useMemo` or `useCallback`.

### 🧬 The Rendering Lab
- **[Infinite Scroll Native](app/the-rendering/infinite-scroll/page.tsx)**: Server-side focused infinite scrolling using Server Actions and `useActionState` without client-side data fetching libraries.
- **[PPR Dashboard](app/the-rendering/ppr-dashboard/page.tsx)**: Demonstrating Partial Prerendering (PPR) to stream dynamic data into instantly loaded static shells.
- [x] **[The `use cache` Specimen](app/the-rendering/use-cache-specimen/page.tsx)**: Exploring component-level caching introduced in Next.js 15+ using the `"use cache"` directive.
- **[Specimen 03: The proxy.ts Interceptor](app/the-rendering/proxy-specimen/page.tsx)**: Utilizing the new Next.js 16 Proxy layer for centralized JWT rotation, geo-fencing, and request fingerprinting.
- **[Zero-JS Data Table](app/the-rendering/zero-js-table/page.tsx)**: A high-performance server-filtered data table using Next.js 15 asynchronous searchParams, requiring 0kb of client-side JavaScript.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or yarn dev / pnpm dev / bun dev
```

Open [http://localhost:3000] with your browser to explore the root lab selection menu.
