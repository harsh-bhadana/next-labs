# Infinite Scroll Native

A server-side focused infinite scrolling implementation that requires zero client-side data fetching libraries (no SWR, React Query, etc).

## Features
- Fetches paginated data entirely using Server Actions and `useActionState`.
- Manages pending and loading states natively in React 19.

## How it works
The initial page state is loaded synchronously on the server and passed as an initial state to a client component. The client component orchestrates subsequent batches of data by triggering a server action, appending the returned items to the existing list state natively without client-side API calls.
