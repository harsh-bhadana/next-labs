# Zero-JS Data Table Experiment

This experiment demonstrates a powerful "Server-First" approach to data management in Next.js 15+. It provides a reactive data table with filtering capabilities that work entirely without client-side JavaScript for the core logic.

## Core Concepts

### 1. Server-Side Filtering
Instead of using React `useState` and `useEffect` to filter data on the client, this component uses the URL as the single source of truth.
- **Form Submission**: Uses a standard HTML `<form method="GET">`.
- **URL Parameters**: The browser performs a standard GET request, updating the `?q=` parameter in the URL.
- **RSC Re-render**: Next.js detects the URL change and re-renders the Server Component with the new `searchParams`.

### 2. Zero-JS Logic
Because the filtering happens during the server-side render (React Server Components), no JavaScript bundle is required to process the search query or filter the array. This results in:
- **Instant TTI**: The table is interactive as soon as the HTML is parsed.
- **SEO Friendly**: All filtered states are uniquely linkable and indexable.
- **Robustness**: The feature works even if JavaScript is disabled or fails to load.

## Implementation Details

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Data Source**: Mocked static array (easily replaceable with a database query)
- **Pattern**: `async searchParams` (Next.js 15 requirement)

## How to Use
1. Enter a search term in the "Search experiments..." field.
2. Click "Filter" or press Enter.
3. The page will reload with the filtered results, maintaining the search term in the input field via `defaultValue`.
