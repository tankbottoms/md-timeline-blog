---
title: Rich Media and Interactive Content Examples
blurb: Comprehensive showcase of all supported media types including images, audio, video, tables, and interactive elements.
date: 2025-12-14
---

## Introduction to Rich Media

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This post demonstrates all the different types of rich content you can embed in your blog posts.

## Image Examples

### Centered Image

<div class="media-center">
<img src="/images/placeholder.svg" alt="Sample centered image" width="600" />
</div>

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Floated Image with Text Wrap

<div class="media-left">
<img src="/images/placeholder.svg" alt="Sample left-floated image" width="300" />
</div>

<div class="clearfix">

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. The image floats to the left with text wrapping around it naturally.

</div>

## Audio Player

Listen to our sample audio track:

<div class="media-center">
<audio controls>
  <source src="/audio/sample.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
</div>

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.

## Video Player

Watch the demonstration video:

<div class="media-center">
<video controls width="100%" style="max-width: 640px;">
  <source src="/video/sample.mp4" type="video/mp4">
  <source src="/video/sample.webm" type="video/webm">
  Your browser does not support the video element.
</video>
</div>

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

## Data Tables

### Performance Metrics

| Metric | Q1 2025 | Q2 2025 | Q3 2025 | Change |
|--------|---------|---------|---------|--------|
| Response Time | 245ms | 198ms | 156ms | -36% |
| Throughput | 1,250/s | 1,680/s | 2,100/s | +68% |
| Error Rate | 0.8% | 0.5% | 0.3% | -63% |
| Uptime | 99.2% | 99.6% | 99.8% | +0.6% |

<div class="clearfix">

The table above shows our performance improvements over the past three quarters. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

</div>

### Feature Comparison

| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| Storage | 10 GB | 100 GB | Unlimited |
| Users | 5 | 50 | Unlimited |
| API Calls | 1,000/day | 10,000/day | Unlimited |
| Support | Email | Priority | 24/7 Dedicated |
| Price | $9/mo | $49/mo | Custom |

## Interactive SVG Chart

<div class="media-center">
<svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
  <text x="250" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="var(--color-text, #333)">User Growth Trend</text>

  <!-- Background -->
  <rect x="40" y="40" width="420" height="220" fill="var(--color-bg, #f8f9fa)" stroke="var(--color-border, #ddd)" stroke-width="1"/>

  <!-- Grid lines -->
  <line x1="50" y1="250" x2="450" y2="250" stroke="var(--color-border, #ddd)" stroke-width="1"/>
  <line x1="50" y1="200" x2="450" y2="200" stroke="var(--color-border, #ddd)" stroke-width="1" stroke-dasharray="5,5"/>
  <line x1="50" y1="150" x2="450" y2="150" stroke="var(--color-border, #ddd)" stroke-width="1" stroke-dasharray="5,5"/>
  <line x1="50" y1="100" x2="450" y2="100" stroke="var(--color-border, #ddd)" stroke-width="1" stroke-dasharray="5,5"/>

  <!-- Axes -->
  <line x1="50" y1="50" x2="50" y2="250" stroke="var(--color-text, #333)" stroke-width="2"/>
  <line x1="50" y1="250" x2="450" y2="250" stroke="var(--color-text, #333)" stroke-width="2"/>

  <!-- Data line -->
  <polyline points="50,220 100,200 150,180 200,150 250,130 300,110 350,90 400,80 450,70"
            fill="none" stroke="#4a90e2" stroke-width="3"/>

  <!-- Area under line -->
  <polygon points="50,220 100,200 150,180 200,150 250,130 300,110 350,90 400,80 450,70 450,250 50,250"
           fill="#4a90e2" opacity="0.2"/>

  <!-- Data points -->
  <circle cx="50" cy="220" r="5" fill="#4a90e2" stroke="white" stroke-width="2"/>
  <circle cx="100" cy="200" r="5" fill="#4a90e2" stroke="white" stroke-width="2"/>
  <circle cx="150" cy="180" r="5" fill="#4a90e2" stroke="white" stroke-width="2"/>
  <circle cx="200" cy="150" r="5" fill="#4a90e2" stroke="white" stroke-width="2"/>
  <circle cx="250" cy="130" r="5" fill="#4a90e2" stroke="white" stroke-width="2"/>
  <circle cx="300" cy="110" r="5" fill="#4a90e2" stroke="white" stroke-width="2"/>
  <circle cx="350" cy="90" r="5" fill="#4a90e2" stroke="white" stroke-width="2"/>
  <circle cx="400" cy="80" r="5" fill="#4a90e2" stroke="white" stroke-width="2"/>
  <circle cx="450" cy="70" r="5" fill="#4a90e2" stroke="white" stroke-width="2"/>

  <!-- Labels -->
  <text x="250" y="280" text-anchor="middle" font-size="12" fill="var(--color-text, #333)">Month</text>
  <text x="20" y="150" text-anchor="middle" font-size="12" fill="var(--color-text, #333)" transform="rotate(-90, 20, 150)">Users (k)</text>

  <!-- X-axis labels -->
  <text x="50" y="270" text-anchor="middle" font-size="10" fill="var(--color-text-muted, #666)">1</text>
  <text x="150" y="270" text-anchor="middle" font-size="10" fill="var(--color-text-muted, #666)">3</text>
  <text x="250" y="270" text-anchor="middle" font-size="10" fill="var(--color-text-muted, #666)">5</text>
  <text x="350" y="270" text-anchor="middle" font-size="10" fill="var(--color-text-muted, #666)">7</text>
  <text x="450" y="270" text-anchor="middle" font-size="10" fill="var(--color-text-muted, #666)">9</text>

  <!-- Y-axis labels -->
  <text x="40" y="255" text-anchor="end" font-size="10" fill="var(--color-text-muted, #666)">0</text>
  <text x="40" y="205" text-anchor="end" font-size="10" fill="var(--color-text-muted, #666)">25</text>
  <text x="40" y="155" text-anchor="end" font-size="10" fill="var(--color-text-muted, #666)">50</text>
  <text x="40" y="105" text-anchor="end" font-size="10" fill="var(--color-text-muted, #666)">75</text>
  <text x="40" y="55" text-anchor="end" font-size="10" fill="var(--color-text-muted, #666)">100</text>
</svg>
</div>

## Code Examples

Here's a sample code block with syntax:

```javascript
function calculateGrowth(data) {
  const initial = data[0];
  const final = data[data.length - 1];
  const growth = ((final - initial) / initial) * 100;

  return {
    absolute: final - initial,
    percentage: growth.toFixed(2),
    trend: growth > 0 ? 'increasing' : 'decreasing'
  };
}
```

## Blocked Media with Shadow

<div class="media-blocked">
<svg width="100%" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#f0f9ff"/>
  <text x="300" y="40" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e40af">Key Performance Indicators</text>

  <!-- KPI Cards -->
  <g>
    <rect x="20" y="70" width="130" height="100" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
    <text x="85" y="100" text-anchor="middle" font-size="32" font-weight="bold" fill="#1e40af">2.4M</text>
    <text x="85" y="125" text-anchor="middle" font-size="12" fill="#64748b">Total Users</text>
    <text x="85" y="145" text-anchor="middle" font-size="11" fill="#10b981">↑ 24%</text>
  </g>

  <g>
    <rect x="165" y="70" width="130" height="100" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" rx="5"/>
    <text x="230" y="100" text-anchor="middle" font-size="32" font-weight="bold" fill="#15803d">99.9%</text>
    <text x="230" y="125" text-anchor="middle" font-size="12" fill="#64748b">Uptime</text>
    <text x="230" y="145" text-anchor="middle" font-size="11" fill="#10b981">↑ 0.2%</text>
  </g>

  <g>
    <rect x="310" y="70" width="130" height="100" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
    <text x="375" y="100" text-anchor="middle" font-size="32" font-weight="bold" fill="#b45309">156ms</text>
    <text x="375" y="125" text-anchor="middle" font-size="12" fill="#64748b">Avg Latency</text>
    <text x="375" y="145" text-anchor="middle" font-size="11" fill="#10b981">↓ 22%</text>
  </g>

  <g>
    <rect x="455" y="70" width="130" height="100" fill="#fce7f3" stroke="#ec4899" stroke-width="2" rx="5"/>
    <text x="520" y="100" text-anchor="middle" font-size="32" font-weight="bold" fill="#9f1239">$2.1M</text>
    <text x="520" y="125" text-anchor="middle" font-size="12" fill="#64748b">Revenue</text>
    <text x="520" y="145" text-anchor="middle" font-size="11" fill="#10b981">↑ 34%</text>
  </g>
</svg>
</div>

## Comparison Table with Inline Charts

| Category | Current | Previous | Trend |
|----------|---------|----------|-------|
| Performance | 8.5/10 | 7.2/10 | 📈 +18% |
| Reliability | 9.2/10 | 8.9/10 | 📈 +3% |
| Security | 9.8/10 | 9.5/10 | 📈 +3% |
| Scalability | 8.1/10 | 7.8/10 | 📈 +4% |

## Inline SVG Icons

We support <div class="media-inline"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" fill="#10b981"/><path d="M6 10 L9 13 L14 7" stroke="white" stroke-width="2" fill="none"/></svg></div> inline SVG icons in the text flow. You can also use <div class="media-inline"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" fill="#ef4444"/><line x1="6" y1="6" x2="14" y2="14" stroke="white" stroke-width="2"/><line x1="14" y1="6" x2="6" y2="14" stroke="white" stroke-width="2"/></svg></div> multiple icons for status indicators and <div class="media-inline"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" fill="#f59e0b"/><text x="10" y="15" text-anchor="middle" font-size="14" font-weight="bold" fill="white">!</text></svg></div> warning signs inline with your content.

## Conclusion

This post demonstrates the wide variety of rich media types supported in the blog template. You can combine text, images, audio, video, tables, SVG graphics, code blocks, and interactive players to create engaging and informative content.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
