# Search-as-you-go (No-Flicker)

Showcases the power of React 19's `useDeferredValue` hook with initial value support to maintain a responsive UI even when running heavy synchronous filtering operations on large datasets (10,000 items).

## Features
- Demonstrates filtering 10,000 mocked items with artificially delayed rendering.
- Prevents UI blocking during typing.
- Implements visual feedback (stale state dimming and loading indicators) when the deferred query is lagging behind the active query.

## How it works
The active user input (`query`) updates instantly. The `filteredItems` array relies on `useDeferredValue(query, "")`. React defers the heavy re-render of the item list until the main thread is available, ensuring the search input remains snappy and unblocked.
