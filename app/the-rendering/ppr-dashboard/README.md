# Partial Prerendering (PPR) Dashboard

An experiment demonstrating Partial Prerendering (PPR). The page serves a statically rendered shell that ships instantly to the client while dynamic components are streamed in seamlessly.

## Features
- Blends Static and Dynamic rendering on the same route.
- A static layout shell (Sidebar, Header) that is served from CDN/Edge immediately.
- Multiple dynamic data widgets (Stats, User Profile, Recent Activity) utilizing `<Suspense>` boundaries.

## How it works
Next.js pre-renders the page until it encounters a `<Suspense>` boundary wrapping a dynamic component. That static shell is returned instantly. The dynamic data inside the boundaries is computed and streamed selectively.
