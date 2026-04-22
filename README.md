# 🧪 NextJS Labs

A high-performance laboratory for experimental Next.js 15/16 and React 19 specimens. This repository isolates advanced architectural patterns, performance optimization primitives, and new API demonstrations.

---

## 🔬 The Specimens

### 🎭 Interactive & UI Lab
Focus on buttery-smooth transitions and modern browser APIs.
*   **[View Transitions API](app/interactive-ui-lab/view-transitions/page.tsx)**: Native layout morphing across Next.js routing.

### ⚡ Performance Lab
Zero-latency patterns and React Compiler proof-of-concepts.
*   **[Streaming useFormStatus Form](app/performance-lab/form-status/page.tsx)**: 🚀 **New** Zero-useState multi-step forms using React 19 status primitives.
*   **[Specimen 07: Zero-State Server CRUD](app/performance-lab/server-crud/page.tsx)**: A CRUD application with 0kb client-side state, powered entirely by Server Actions and `revalidatePath()`.
*   **[Optimistic Mutations](app/performance-lab/optimistic-like/page.tsx)**: Leveraging React 19's `useOptimistic` for instant feedback on server roundtrips.
*   **[Search-as-you-go](app/performance-lab/search-as-you-go/page.tsx)**: Fluid search filtering using `useDeferredValue` to maintain 60fps under heavy load.
*   **[The Memo-Free Dashboard](app/performance-lab/memo-free/page.tsx)**: Proving the power of the **React Compiler** without manual `useMemo` or `useCallback`.

### 🧬 The Rendering Lab
Server-side innovations and edge-computing experiments.
*   **[Specimen 08: BFF Stock Ticker](app/the-rendering/bff-stocks/page.tsx)**: The Backend-for-Frontend pattern using `useSyncExternalStore` for real-time aggregated feeds.
*   **[Zero-JS Data Table](app/the-rendering/zero-js-table/page.tsx)**: High-performance server-filtered tables using asynchronous `searchParams`.
*   **[PPR Dashboard](app/the-rendering/ppr-dashboard/page.tsx)**: **Partial Prerendering** (PPR) for instant static shells with streamed dynamic content.
*   **[The `use cache` Directive](app/the-rendering/use-cache-specimen/page.tsx)**: Experimental component-level caching.
*   **[Infinite Scroll Native](app/the-rendering/infinite-scroll/page.tsx)**: Progressive enhancement for infinite feeds using `useActionState`.
*   **[Proxy Interceptors](app/the-rendering/proxy-specimen/page.tsx)**: Next.js 16 Proxy layer for JWT rotation and geo-fencing.

### 🛣️ Routing Lab
Advanced routing patterns and internationalization.
*   **[Modal Gallery](app/routing-lab/modal-gallery/page.tsx)**: Implementation of Parallel & Intercepting Routes for a sub-frame modal experience.
*   **[Pure Next.js i18n](app/routing-lab/i18n/[locale]/page.tsx)**: Scalable multi-language routing without external libraries.

### 🌍 i18n & Edge Lab
Global distribution and edge-runtime optimization.
*   **[Edge Runtime RSC](app/i18n-edge-lab/edge-runtime/page.tsx)**: Sub-50ms TTFB using globally distributed Edge Runtime.

### 🛠️ DevX & Tooling Lab
Observability, error handling, and developer experience.
*   **[Instrumentation & Tracing](app/devx-lab/instrumentation/page.tsx)**: Server-side observability and lifecycle hooking with `instrumentation.ts`.
*   **[Custom 404 Routing](app/devx-lab/not-found-routing/page.tsx)**: Contextual 404 designs using nested `not-found.tsx` boundaries.

---

## 🛠️ Tech Stack & Pillars

- **Next.js 16+**: Utilizing Turbopack, Partial Prerender, and Cache Components.
- **React 19**: Powered by the React Compiler (Auto-memoization).
- **Architecture**: Zero-JS where possible, Server Action driven mutations.
- **Styling**: Tailwind CSS for responsive, immersive aesthetics.

---

## 🚀 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run the lab**:
    ```bash
    npm run dev
    ```
3.  **Build production profile**:
    ```bash
    npm run build
    ```

Open [http://localhost:3000](http://localhost:3000) to dive into the dashboard.
