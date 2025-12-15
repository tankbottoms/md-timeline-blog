---
title: Advanced Data Visualization Techniques
blurb: Exploring modern approaches to visualizing complex datasets with interactive SVG charts and responsive design patterns.
date: 2025-12-01
---

## Introduction to Data Visualization

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.  Lorem ipsum dolor sit amet. Ut suscipit accusantium et facilis odit qui exercitationem numquam sed temporibus unde qui optio quod ea ducimus necessitatibus. Et magnam magni et cumque possimus ea veniam temporibus ex galisum molestiae ea alias earum quo officiis architecto.

Non nostrum perspiciatis qui quia doloribus ea nostrum optio eum possimus itaque et officia quod. Et sint ratione ut odit vitae non omnis unde ut incidunt voluptatem ad doloremque deserunt. Qui quia consectetur non consequuntur impedit ut voluptas voluptatibus est nisi sunt. Et obcaecati ratione eum exercitationem quidem aut nihil necessitatibus et iusto dignissimos ut aliquam necessitatibus?

Ut nemo vitae est fuga cumque quo dolorum quos et omnis nemo est quasi quos. Et beatae quae a aspernatur laboriosam ex minima ipsa et similique vero est architecto doloremque ut nobis itaque!

<div class="media-center">
  <div id="bar-chart" style="max-width: 500px; margin: 0 auto;"></div>
</div>

<script>
  import { onMount } from 'svelte';

  onMount(() => {
    // Initialize Bar Chart
    function initBarChart() {
      if (typeof SVG === 'undefined') {
        setTimeout(() => {
          initBarChart();
          initProgressCircle();
        }, 50);
        return;
      }

      const WIDTH = 500;
      const HEIGHT = 300;
      const barData = [
        { month: 'Jan', value: 50 },
        { month: 'Feb', value: 90 },
        { month: 'Mar', value: 110 },
        { month: 'Apr', value: 150 },
        { month: 'May', value: 130 }
      ];

      const draw = SVG().addTo('#bar-chart').size(WIDTH, HEIGHT);
      draw.rect(WIDTH, HEIGHT).fill('#f8f9fa');

      draw.text('Monthly Performance Chart').font({ size: 18, family: 'sans-serif', weight: 'bold' }).fill('#333').move(250 - 90, 20);

      // Y-axis
      draw.line(40, 90, 40, 260).stroke({ color: '#333', width: 2 });
      draw.text('100').font({ size: 10 }).fill('#333').move(20, 95);
      draw.text('50').font({ size: 10 }).fill('#333').move(20, 170);
      draw.text('0').font({ size: 10 }).fill('#333').move(20, 250);

      // Create bars and labels
      const bars = [];
      barData.forEach((data, i) => {
        const x = 50 + (i * 80);
        const barHeight = data.value;
        const y = 250 - barHeight;

        // Create bar starting at height 0
        const bar = draw.rect(60, 0).fill('#4a90e2').move(x, 250);
        bars.push({ bar, finalHeight: barHeight, finalY: y });

        // Labels
        draw.text(data.month).font({ size: 12 }).fill('#333').center(x + 30, 270);
      });

      function animateBars() {
        bars.forEach((item, i) => {
          item.bar.animate(1000, i * 150, 'now').ease('<>').attr({ height: item.finalHeight, y: item.finalY }).loop(3000, 0);
        });
      }

      animateBars();

      return () => {
        draw.remove();
      };
    }

    // Initialize Progress Circle
    function initProgressCircle() {
      if (typeof SVG === 'undefined') {
        setTimeout(initProgressCircle, 50);
        return;
      }

      const SIZE = 250;
      const radius = 100;
      const circumference = 2 * Math.PI * radius;
      const targetPercent = 75;
      const targetOffset = circumference - (targetPercent / 100) * circumference;

      const draw = SVG().addTo('#progress-circle').size(SIZE, SIZE);

      // Background circle
      draw.circle(radius * 2).fill('none').stroke({ color: '#e5e5e5', width: 20 }).center(SIZE / 2, SIZE / 2);

      // Progress circle (starts full, animates to target)
      const progressCircle = draw.circle(radius * 2)
        .fill('none')
        .stroke({ color: '#4a90e2', width: 20 })
        .center(SIZE / 2, SIZE / 2)
        .attr({
          'stroke-dasharray': circumference,
          'stroke-dashoffset': circumference,
          'transform': 'rotate(-90 125 125)'
        });

      // Text elements
      const percentText = draw.text('0%')
        .font({ size: 32, family: 'sans-serif', weight: 'bold' })
        .fill('#333')
        .center(SIZE / 2, SIZE / 2 - 5);

      draw.text('Success Rate')
        .font({ size: 14, family: 'sans-serif' })
        .fill('#666')
        .center(SIZE / 2, SIZE / 2 + 25);

      function animateProgress() {
        progressCircle.animate(2000, 0, 'now').ease('<>').attr({ 'stroke-dashoffset': targetOffset }).during((pos) => {
          const currentPercent = Math.floor(pos * targetPercent);
          percentText.text(currentPercent + '%').center(SIZE / 2, SIZE / 2 - 5);
        }).loop(1500, 0);
      }

      animateProgress();

      return () => {
        draw.remove();
      };
    }

    const cleanupBar = initBarChart();
    const cleanupCircle = initProgressCircle();

    return () => {
      if (cleanupBar) cleanupBar();
      if (cleanupCircle) cleanupCircle();
    };
  });
</script>

## Understanding the Data

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Lorem ipsum dolor sit amet. Ut suscipit accusantium et facilis odit qui exercitationem numquam sed temporibus unde qui optio quod ea ducimus necessitatibus. Et magnam magni et cumque possimus ea veniam temporibus ex galisum molestiae ea alias earum quo officiis architecto.

Non nostrum perspiciatis qui quia doloribus ea nostrum optio eum possimus itaque et officia quod. Et sint ratione ut odit vitae non omnis unde ut incidunt voluptatem ad doloremque deserunt. Qui quia consectetur non consequuntur impedit ut voluptas voluptatibus est nisi sunt. Et obcaecati ratione eum exercitationem quidem aut nihil necessitatibus et iusto dignissimos ut aliquam necessitatibus?

Ut nemo vitae est fuga cumque quo dolorum quos et omnis nemo est quasi quos. Et beatae quae a aspernatur laboriosam ex minima ipsa et similique vero est architecto doloremque ut nobis itaque!

### Key Insights

- Lorem ipsum dolor sit amet, consectetur adipiscing elit
- Sed do eiusmod tempor incididunt ut labore et dolore
- Magna aliqua ut enim ad minim veniam

## Comparative Analysis

<div class="media-left">
  <div id="progress-circle" style="max-width: 250px;"></div>
</div>

<div class="clearfix">

Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.  Lorem ipsum dolor sit amet. Ut suscipit accusantium et facilis odit qui exercitationem numquam sed temporibus unde qui optio quod ea ducimus necessitatibus. Et magnam magni et cumque possimus ea veniam temporibus ex galisum molestiae ea alias earum quo officiis architecto.

Non nostrum perspiciatis qui quia doloribus ea nostrum optio eum possimus itaque et officia quod. Et sint ratione ut odit vitae non omnis unde ut incidunt voluptatem ad doloremque deserunt. Qui quia consectetur non consequuntur impedit ut voluptas voluptatibus est nisi sunt. Et obcaecati ratione eum exercitationem quidem aut nihil necessitatibus et iusto dignissimos ut aliquam necessitatibus?

Ut nemo vitae est fuga cumque quo dolorum quos et omnis nemo est quasi quos. Et beatae quae a aspernatur laboriosam ex minima ipsa et similique vero est architecto doloremque ut nobis itaque!

</div>

## Conclusion

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.  Lorem ipsum dolor sit amet. Ut suscipit accusantium et facilis odit qui exercitationem numquam sed temporibus unde qui optio quod ea ducimus necessitatibus. Et magnam magni et cumque possimus ea veniam temporibus ex galisum molestiae ea alias earum quo officiis architecto.

Non nostrum perspiciatis qui quia doloribus ea nostrum optio eum possimus itaque et officia quod. Et sint ratione ut odit vitae non omnis unde ut incidunt voluptatem ad doloremque deserunt. Qui quia consectetur non consequuntur impedit ut voluptas voluptatibus est nisi sunt. Et obcaecati ratione eum exercitationem quidem aut nihil necessitatibus et iusto dignissimos ut aliquam necessitatibus?

Ut nemo vitae est fuga cumque quo dolorum quos et omnis nemo est quasi quos. Et beatae quae a aspernatur laboriosam ex minima ipsa et similique vero est architecto doloremque ut nobis itaque!
