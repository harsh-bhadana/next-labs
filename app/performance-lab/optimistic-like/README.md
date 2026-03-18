# Optimistic Like Button

Demonstrates the new React 19 `useOptimistic` hook paired with Server Actions to create a highly responsive user interface that doesn't wait for server round-trips.

## Features
- Uses `useOptimistic` hook to update the UI instantly.
- Simulates a slow (1.5s) Server Action to prove seamless optimistic updates and state reconciliation.
- Provides a detailed "State Inspector" to visualize the underlying sync state vs the optimistic state real-time.

## How it works
When the user clicks the like button, `useOptimistic` instantly increments the counter shown on the UI. Simultaneously, a Server Action is started in a transition. If successful, the real database state replaces the optimistic state.
