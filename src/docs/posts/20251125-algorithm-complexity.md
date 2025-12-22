---
title: Resource Allocation and Budget Distribution
blurb: Dynamic visualization of how our team resources and budget allocation evolve across different departments and projects throughout the fiscal year.
date: 2025-11-25
---

## Resource Overview

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Our resource allocation strategy adapts quarterly based on project priorities and business objectives.

### Quarterly Budget Allocation

<div class="media-center">
  <div id="budget-pie" style="max-width: 600px; margin: 0 auto;"></div>
</div>

## Allocation Strategy

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. The pie chart above demonstrates our Q4 budget allocation across departments based on strategic priorities.

### Quarterly Shifts

<div class="clearfix">

**Q1**: Initial allocation focuses heavily on Engineering (35%) as we build out core infrastructure and product features. Marketing receives the smallest allocation (15%) as we're still in development phase.

**Q2**: Product team allocation increases to 30% as we prepare for launch and need more design and product management resources. Engineering maintains a strong 33% allocation.

**Q3**: Operations grows to 25% as we scale infrastructure and customer support. Marketing increases to 18% as we begin our go-to-market campaigns.

**Q4**: More balanced distribution with Engineering at 30%, Product at 28%, Operations at 25%, and Marketing ramping up to 20% for end-of-year growth initiatives.

</div>

## Department Breakdown

<div class="media-center">
  <div id="dept-bars" style="max-width: 600px; margin: 0 auto;"></div>
</div>

<script>
  import { onMount } from 'svelte';

  onMount(() => {
    // Initialize Pie Chart
    function initBudgetPie() {
      if (typeof SVG === 'undefined') {
        setTimeout(() => {
          initBudgetPie();
          initDeptBars();
        }, 50);
        return;
      }

      const isMobile = window.innerWidth < 640;
      const WIDTH = isMobile ? Math.min(window.innerWidth - 32, 600) : 600;
      const HEIGHT = 480; // Increased to prevent legend clipping
      const centerX = WIDTH / 2;
      const centerY = 200;
      const radius = isMobile ? 100 : 120;

      const segments = [
        { percent: 30, color: '#4a90e2', label: 'Engineering (30%)' },
        { percent: 28, color: '#e74c3c', label: 'Product (28%)' },
        { percent: 25, color: '#2ecc71', label: 'Operations (25%)' },
        { percent: 17, color: '#f39c12', label: 'Marketing (17%)' }
      ];

      const draw = SVG().addTo('#budget-pie').size(WIDTH, HEIGHT);
      draw.rect(WIDTH, HEIGHT).fill('#fafafa');

      draw.text('Budget Distribution by Department (Q4)')
        .font({ size: isMobile ? 14 : 18, family: 'sans-serif', weight: 'bold' })
        .fill('#333')
        .center(centerX, 20);

      let currentAngle = -90; // Start from top
      const slices = [];

      segments.forEach((seg) => {
        const angle = (seg.percent / 100) * 360;
        const endAngle = currentAngle + angle;

        const slice = draw.path()
          .fill(seg.color)
          .attr({ opacity: 0 });

        slices.push({ slice, startAngle: currentAngle, endAngle, percent: seg.percent, color: seg.color });
        currentAngle = endAngle;
      });

      // Center circle
      draw.circle(100).fill('white').stroke({ color: '#ddd', width: 2 }).center(centerX, centerY);
      draw.text('Total').font({ size: 14, weight: 'bold' }).fill('#333').center(centerX, centerY - 10);
      draw.text('$10M').font({ size: 16, weight: 'bold' }).fill('#111').center(centerX, centerY + 10);

      // Legend - responsive layout
      const legendY = 360;
      const legendWidth = isMobile ? WIDTH - 40 : Math.min(500, WIDTH - 100);
      const legendX = (WIDTH - legendWidth) / 2;

      draw.rect(legendWidth, 70).fill('#f8f8f8').stroke({ color: '#ddd', width: 1 }).radius(5).move(legendX, legendY);

      segments.forEach((seg, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = legendX + 20 + col * (legendWidth / 2);
        const y = legendY + 15 + row * 25;
        draw.rect(18, 18).fill(seg.color).move(x, y);
        draw.text(seg.label).font({ size: isMobile ? 10 : 12, weight: '600' }).fill('#333').move(x + 25, y + 4);
      });

      function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
        return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
        };
      }

      function describeArc(x, y, radius, startAngle, endAngle) {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return [
          "M", x, y,
          "L", start.x, start.y,
          "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
          "Z"
        ].join(" ");
      }

      function animateSlices() {
        slices.forEach((item, i) => {
          setTimeout(() => {
            const path = describeArc(centerX, centerY, radius, item.startAngle, item.endAngle);
            item.slice.animate(800).ease('<>').attr({ opacity: 1 }).plot(path);
          }, i * 300);
        });

        setTimeout(() => {
          slices.forEach((item) => {
            item.slice.animate(500).attr({ opacity: 0 });
          });
          setTimeout(animateSlices, 800);
        }, 3000);
      }

      animateSlices();

      return () => {
        draw.remove();
      };
    }

    // Initialize Department Bars
    function initDeptBars() {
      if (typeof SVG === 'undefined') {
        setTimeout(initDeptBars, 50);
        return;
      }

      const isMobile = window.innerWidth < 640;
      const WIDTH = isMobile ? window.innerWidth - 32 : 600; // Responsive width
      const HEIGHT = 280; // Increased to prevent label clipping
      const barWidth = isMobile ? 60 : 100;
      const spacing = isMobile ? (WIDTH - 80) / 3 : 130;

      const depts = [
        { name: 'Engineering', value: 45, color: '#4a90e2', x: 40 },
        { name: 'Product', value: 32, color: '#e74c3c', x: 40 + spacing },
        { name: 'Operations', value: 25, color: '#2ecc71', x: 40 + spacing * 2 },
        { name: 'Marketing', value: 18, color: '#f39c12', x: 40 + spacing * 3 }
      ];

      const draw = SVG().addTo('#dept-bars').size(WIDTH, HEIGHT);
      draw.rect(WIDTH, HEIGHT).fill('#fafafa');

      draw.text('Average Team Sizes by Department')
        .font({ size: isMobile ? 14 : 16, family: 'sans-serif', weight: 'bold' })
        .fill('#333')
        .center(WIDTH / 2, 20);

      // Baseline
      const baseline = HEIGHT - 60;
      draw.line(30, baseline, WIDTH - 30, baseline).stroke({ color: '#ddd', width: 2 });

      const bars = [];
      depts.forEach((dept, i) => {
        const x = leftMargin + (barSpacing * (i + 0.5)) - (barWidth / 2);
        const maxHeight = 140;
        const barHeight = (dept.value / 45) * maxHeight;
        const y = baseline - barHeight;

        const bar = draw.rect(barWidth, 0).fill(dept.color).radius(4).move(dept.x, baseline);
        bars.push({ bar, targetHeight: barHeight, targetY: y, baseline });

        draw.text(dept.name).font({ size: isMobile ? 10 : 12, weight: '600' }).fill('#333').center(dept.x + barWidth / 2, HEIGHT - 45);
        draw.text(dept.value.toString())
          .font({ size: isMobile ? 16 : 20, weight: 'bold' })
          .fill('white')
          .center(dept.x + barWidth / 2, y + barHeight / 2);
      });

      function animateBars() {
        bars.forEach((item, i) => {
          item.bar.animate(1000, i * 200).ease('<>').attr({ height: item.targetHeight, y: item.targetY }).after(() => {
            if (i === bars.length - 1) {
              setTimeout(() => {
                bars.forEach((b) => {
                  b.bar.animate(500).attr({ height: 0, y: b.baseline });
                });
                setTimeout(animateBars, 1000);
              }, 2000);
            }
          });
        });
      }

      animateBars();

      return () => {
        draw.remove();
      };
    }

    const cleanupPie = initBudgetPie();
    const cleanupBars = initDeptBars();

    return () => {
      if (cleanupPie) cleanupPie();
      if (cleanupBars) cleanupBars();
    };
  });
</script>

## Future Planning

Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
