# Zero-JS Data Table

An advanced server-side data filtering implementation that requires **0kb of client-side JavaScript** to function. It perfectly works before hydration and under environments where JavaScript is disabled.

## Features
- Uses a standard HTML `<form>` with a `GET` method.
- Realizes data mutations entirely via URL `searchParams`.
- Next.js 15+ asynchronous `searchParams` pattern.

## How it works
Typing into the search bar and submitting the form reloads the page with a `?q=` search parameter. The server reads this parameter directly, filters the specimen data natively, and returns statically rendered HTML containing only the matched rows.
