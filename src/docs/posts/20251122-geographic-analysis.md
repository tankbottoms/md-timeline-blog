---
title: Geographic Expansion and Market Penetration
blurb: Animated visualization of our nationwide expansion strategy, zooming from coast-to-coast coverage down to key metropolitan markets.
date: 2025-11-22
---

## National Presence

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet. Ut suscipit accusantium et facilis odit qui exercitationem numquam sed temporibus unde qui optio quod ea ducimus necessitatibus. Et magnam magni et cumque possimus ea veniam temporibus ex galisum molestiae ea alias earum quo officiis architecto.

Non nostrum perspiciatis qui quia doloribus ea nostrum optio eum possimus itaque et officia quod. Et sint ratione ut odit vitae non omnis unde ut incidunt voluptatem ad doloremque deserunt. Qui quia consectetur non consequuntur impedit ut voluptas voluptatibus est nisi sunt. Et obcaecati ratione eum exercitationem quidem aut nihil necessitatibus et iusto dignissimos ut aliquam necessitatibus?

Ut nemo vitae est fuga cumque quo dolorum quos et omnis nemo est quasi quos. Et beatae quae a aspernatur laboriosam ex minima ipsa et similique vero est architecto doloremque ut nobis itaque! 

Our expansion strategy focuses on establishing strong presences in major metropolitan areas across the United States.

### Market Penetration Animation

<div class="media-center">
  <div id="us-map-zoom" style="max-width: 800px; margin: 0 auto;"></div>
</div>

## Market Strategy

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet. Ut suscipit accusantium et facilis odit qui exercitationem numquam sed temporibus unde qui optio quod ea ducimus necessitatibus. Et magnam magni et cumque possimus ea veniam temporibus ex galisum molestiae ea alias earum quo officiis architecto.

Non nostrum perspiciatis qui quia doloribus ea nostrum optio eum possimus itaque et officia quod. Et sint ratione ut odit vitae non omnis unde ut incidunt voluptatem ad doloremque deserunt. Qui quia consectetur non consequuntur impedit ut voluptas voluptatibus est nisi sunt. Et obcaecati ratione eum exercitationem quidem aut nihil necessitatibus et iusto dignissimos ut aliquam necessitatibus?

Ut nemo vitae est fuga cumque quo dolorum quos et omnis nemo est quasi quos. Et beatae quae a aspernatur laboriosam ex minima ipsa et similique vero est architecto doloremque ut nobis itaque!  

The animated map above demonstrates our strategic focus on major metropolitan areas with high population density and strong market potential.

### Target Markets Analysis

<div class="clearfix">

**Los Angeles**: With 13 million people in the metro area, LA represents our largest West Coast market. We've achieved 85% coverage through a combination of direct partnerships and regional distribution centers.

**New York City**: The NYC metropolitan area, home to 20 million people, is our most challenging but rewarding market. Current coverage stands at 78%, with aggressive expansion plans for the coming quarters.

**Las Vegas**: A smaller but highly concentrated market of 2.2 million, Vegas offers exceptional coverage at 92% due to the compact urban geography and strong local partnerships.

</div>

## Expansion Timeline

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Lorem ipsum dolor sit amet. Ut suscipit accusantium et facilis odit qui exercitationem numquam sed temporibus unde qui optio quod ea ducimus necessitatibus. Et magnam magni et cumque possimus ea veniam temporibus ex galisum molestiae ea alias earum quo officiis architecto.

Non nostrum perspiciatis qui quia doloribus ea nostrum optio eum possimus itaque et officia quod. Et sint ratione ut odit vitae non omnis unde ut incidunt voluptatem ad doloremque deserunt. Qui quia consectetur non consequuntur impedit ut voluptas voluptatibus est nisi sunt. Et obcaecati ratione eum exercitationem quidem aut nihil necessitatibus et iusto dignissimos ut aliquam necessitatibus?

Ut nemo vitae est fuga cumque quo dolorum quos et omnis nemo est quasi quos. Et beatae quae a aspernatur laboriosam ex minima ipsa et similique vero est architecto doloremque ut nobis itaque!

<div class="media-center">
<svg width="700" height="200" viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">
  <style>
    @keyframes timelinePulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
    .timeline-marker { animation: timelinePulse 3s ease-in-out infinite; }
  </style>

  <text x="350" y="30" text-anchor="middle" font-size="16" font-weight="bold">
    Market Entry Timeline
  </text>

  <!-- Timeline line -->
  <line x1="100" y1="100" x2="600" y2="100" stroke="#ddd" stroke-width="4"/>

  <!-- Markers -->
  <circle class="timeline-marker" cx="150" cy="100" r="12" fill="#e74c3c" style="animation-delay: 0s"/>
  <text x="150" y="140" text-anchor="middle" font-size="12" font-weight="600">LA</text>
  <text x="150" y="160" text-anchor="middle" font-size="10">Q2 2023</text>

  <circle class="timeline-marker" cx="350" cy="100" r="12" fill="#f39c12" style="animation-delay: 0.5s"/>
  <text x="350" y="140" text-anchor="middle" font-size="12" font-weight="600">Vegas</text>
  <text x="350" y="160" text-anchor="middle" font-size="10">Q4 2023</text>

  <circle class="timeline-marker" cx="550" cy="100" r="12" fill="#2ecc71" style="animation-delay: 1s"/>
  <text x="550" y="140" text-anchor="middle" font-size="12" font-weight="600">NYC</text>
  <text x="550" y="160" text-anchor="middle" font-size="10">Q2 2024</text>
</svg>
</div>

<script>
  import { onMount } from 'svelte';

  onMount(() => {
    async function initUSMapZoom() {
      if (typeof SVG === 'undefined') {
        setTimeout(initUSMapZoom, 50);
        return;
      }

      const WIDTH = 800;
      const HEIGHT = 600;

      // Fetch the US SVG
      const response = await fetch('/images/us.svg');
      const svgText = await response.text();

      // Create SVG container with transparent background
      const draw = SVG().addTo('#us-map-zoom').size(WIDTH, HEIGHT);

      // Parse and add the US map SVG
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      const svgElement = svgDoc.documentElement;

      // Extract all state paths and add to SVG.js
      const states = svgElement.querySelectorAll('path[data-id]');
      const stateElements = {};

      states.forEach((state) => {
        const stateId = state.getAttribute('data-id');
        const pathData = state.getAttribute('d');
        const statePath = draw.path(pathData)
          .fill('#e3f2fd')
          .stroke({ color: '#666', width: 0.3 })
          .attr({ 'data-state': stateId });
        stateElements[stateId] = statePath;
      });

      // Define all state tour stops with viewBox coordinates
      const allStates = [
        { viewBox: '0 0 1000 589', state: null, color: null },
        { viewBox: '50 250 200 200', state: 'CA', color: '#e74c3c' },
        { viewBox: '50 50 150 150', state: 'WA', color: '#3498db' },
        { viewBox: '150 150 150 150', state: 'OR', color: '#1abc9c' },
        { viewBox: '100 100 150 150', state: 'ID', color: '#16a085' },
        { viewBox: '200 150 150 150', state: 'NV', color: '#e67e22' },
        { viewBox: '250 250 150 150', state: 'AZ', color: '#d35400' },
        { viewBox: '350 250 150 150', state: 'NM', color: '#e74c3c' },
        { viewBox: '300 150 150 150', state: 'CO', color: '#c0392b' },
        { viewBox: '350 200 150 150', state: 'KS', color: '#f39c12' },
        { viewBox: '450 200 150 150', state: 'OK', color: '#e67e22' },
        { viewBox: '450 280 150 150', state: 'TX', color: '#d35400' },
        { viewBox: '400 100 150 150', state: 'NE', color: '#f1c40f' },
        { viewBox: '500 150 150 150', state: 'MO', color: '#f39c12' },
        { viewBox: '550 200 150 150', state: 'AR', color: '#e67e22' },
        { viewBox: '600 250 150 150', state: 'LA', color: '#d35400' },
        { viewBox: '700 400 150 150', state: 'FL', color: '#e74c3c' },
        { viewBox: '650 300 150 150', state: 'GA', color: '#c0392b' },
        { viewBox: '600 250 150 150', state: 'AL', color: '#e74c3c' },
        { viewBox: '650 200 150 150', state: 'TN', color: '#d35400' },
        { viewBox: '700 200 150 150', state: 'NC', color: '#e67e22' },
        { viewBox: '750 180 120 120', state: 'VA', color: '#c0392b' },
        { viewBox: '750 180 100 100', state: 'DC', color: '#9b59b6' },
        { viewBox: '780 150 120 120', state: 'MD', color: '#8e44ad' },
        { viewBox: '750 100 150 150', state: 'NY', color: '#2ecc71' },
        { viewBox: '800 80 120 120', state: 'MA', color: '#27ae60' },
        { viewBox: '650 150 150 150', state: 'OH', color: '#16a085' },
        { viewBox: '600 100 150 150', state: 'MI', color: '#1abc9c' },
        { viewBox: '550 100 150 150', state: 'WI', color: '#27ae60' },
        { viewBox: '500 80 150 150', state: 'MN', color: '#2ecc71' }
      ];

      // Shuffle and pick random states
      function getRandomTour() {
        const nationalView = allStates[0];
        const stateStops = allStates.slice(1);
        // Shuffle states
        for (let i = stateStops.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [stateStops[i], stateStops[j]] = [stateStops[j], stateStops[i]];
        }
        // Pick first 8 random states
        return [nationalView, ...stateStops.slice(0, 8)];
      }

      let tourStops = getRandomTour();
      let currentStop = 0;

      function animateTour() {
        const stop = tourStops[currentStop];

        // Reset all states to default color
        Object.values(stateElements).forEach((path) => {
          path.animate(300).fill('#e3f2fd');
        });

        // Highlight current state and calculate centered viewBox
        let viewBoxValues;
        if (stop.state && stateElements[stop.state]) {
          const statePath = stateElements[stop.state];
          statePath.animate(300).fill(stop.color);

          // Get the bounding box of the highlighted state
          const bbox = statePath.bbox();

          // Add padding around the state (20% of dimensions)
          const padding = Math.max(bbox.width, bbox.height) * 0.3;
          const centeredX = bbox.x - padding;
          const centeredY = bbox.y - padding;
          const centeredWidth = bbox.width + (padding * 2);
          const centeredHeight = bbox.height + (padding * 2);

          viewBoxValues = [centeredX, centeredY, centeredWidth, centeredHeight];
        } else {
          // Use the predefined viewBox for national view
          viewBoxValues = stop.viewBox.split(' ').map(Number);
        }

        // Animate viewBox to zoom with proper centering
        draw.animate(800).ease('<>').viewbox(viewBoxValues[0], viewBoxValues[1], viewBoxValues[2], viewBoxValues[3]);

        // Move to next stop after delay
        setTimeout(() => {
          currentStop = (currentStop + 1) % tourStops.length;
          if (currentStop === 0) {
            // Generate new random tour when we complete a cycle
            tourStops = getRandomTour();
          }
          animateTour();
        }, 1200);
      }

      // Start the tour
      animateTour();

      return () => {
        draw.remove();
      };
    }

    const cleanup = initUSMapZoom();
    return cleanup;
  });
</script>

## Future Outlook

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.  Lorem ipsum dolor sit amet. Ut suscipit accusantium et facilis odit qui exercitationem numquam sed temporibus unde qui optio quod ea ducimus necessitatibus. Et magnam magni et cumque possimus ea veniam temporibus ex galisum molestiae ea alias earum quo officiis architecto.

Non nostrum perspiciatis qui quia doloribus ea nostrum optio eum possimus itaque et officia quod. Et sint ratione ut odit vitae non omnis unde ut incidunt voluptatem ad doloremque deserunt. Qui quia consectetur non consequuntur impedit ut voluptas voluptatibus est nisi sunt. Et obcaecati ratione eum exercitationem quidem aut nihil necessitatibus et iusto dignissimos ut aliquam necessitatibus?

Ut nemo vitae est fuga cumque quo dolorum quos et omnis nemo est quasi quos. Et beatae quae a aspernatur laboriosam ex minima ipsa et similique vero est architecto doloremque ut nobis itaque!
