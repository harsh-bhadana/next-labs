# Infinite Scroll with useActionState

This experiment demonstrates how to build an infinite scrolling list in React 19 / Next.js utilizing Server Actions and the `useActionState` hook, entirely without relying on client-side data fetching libraries like React Query or SWR.

## Core Concepts

- **`useActionState`**: Manages the state and pending status of the Server Action natively.
- **Server Actions**: Fetches the next page of items securely from the server.
- **IntersectionObserver**: Automatically triggers the Server Action (via `requestSubmit` on a hidden form) when the user scrolls to the bottom of the list.

## Structure

- `page.tsx`: A Server Component that performs the initial data fetch and renders the list, functioning as the entry point.
- `actions.ts`: Contains the `fetchMoreItems` Server Action, managing state appending logic and simulating a database query delay.
- `infinite-scroll-list.tsx`: A Client Component handling the UI, `IntersectionObserver` logic, and `useActionState`.

## How to use

1. Run the development server (`npm run dev`).
2. Navigate to `http://localhost:3000/experiments/infinite-scroll`.
3. Scroll to the bottom of the page to observe new items being fetched and appended automatically.
