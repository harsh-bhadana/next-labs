# The `use cache` Specimen

Demonstrates component-level caching introduced in Next.js 15+ using the experimental `"use cache"` directive.

## Features
- Showcases granular caching on specific async server components.
- Caches the entire static output and data fetching result of the component to bypass repeated slow queries.
- Demonstrates the use of a simple suspense skeleton.

## How it works
An artificially slow simulated database query requires 2 seconds to resolve. By adding the `"use cache"` directive to the data fetching function, Next.js caches the result. Subsequent page reloads use the cached payload immediately, bypassing the 2-second delay.
