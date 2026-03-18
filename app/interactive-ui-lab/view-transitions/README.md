# View Transitions Gallery

Demonstrates the use of the native CSS View Transitions API integrated seamlessly alongside Next.js routing. 

## Features
- Showcases smooth layout morphing between gallery items.
- Uses inline `style={{ viewTransitionName: ... }}` for individual component transition tracking.
- Demonstrates handling custom `::view-transition-group(*)` animations for fluid motion curves.

## How it works
Through Next.js routing, when a user navigates from the gallery to an individual item, the browser captures the outgoing state and transitions it to the incoming state using elements tagged with `viewTransitionName`.
