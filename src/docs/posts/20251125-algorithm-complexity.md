---
title: Resource Allocation and Budget Distribution
blurb: Dynamic visualization of how our team resources and budget allocation evolve across different departments and projects throughout the fiscal year.
date: 2025-11-25
---

## Resource Overview

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Our resource allocation strategy adapts quarterly based on project priorities and business objectives.

### Quarterly Budget Allocation

<div class="media-center">
<svg width="600" height="450" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
  <text x="300" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#333">
    Budget Distribution by Department (Q4)
  </text>

  <!-- Pie slices: Engineering 30%, Product 28%, Operations 25%, Marketing 17% -->
  <!-- Engineering (30%) - starts at top, goes 108 degrees clockwise -->
  <path d="M 300 200 L 300 80 A 120 120 0 0 1 410 155 Z" fill="#4a90e2"/>

  <!-- Product (28%) - 100.8 degrees -->
  <path d="M 300 200 L 410 155 A 120 120 0 0 1 400 320 Z" fill="#e74c3c"/>

  <!-- Operations (25%) - 90 degrees -->
  <path d="M 300 200 L 400 320 A 120 120 0 0 1 200 320 Z" fill="#2ecc71"/>

  <!-- Marketing (17%) - remaining 61.2 degrees -->
  <path d="M 300 200 L 200 320 A 120 120 0 0 1 300 80 Z" fill="#f39c12"/>

  <!-- Center circle -->
  <circle cx="300" cy="200" r="50" fill="white" stroke="#ddd" stroke-width="2"/>
  <text x="300" y="195" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">Total</text>
  <text x="300" y="215" text-anchor="middle" font-size="16" font-weight="bold" fill="#111">$10M</text>

  <!-- Labels on slices -->
  <text x="340" y="140" font-size="13" font-weight="600" fill="white">30%</text>
  <text x="400" y="230" font-size="13" font-weight="600" fill="white">28%</text>
  <text x="300" y="300" font-size="13" font-weight="600" fill="white">25%</text>
  <text x="240" y="180" font-size="13" font-weight="600" fill="white">17%</text>

  <!-- Legend -->
  <rect x="50" y="360" width="500" height="70" fill="#f8f8f8" stroke="#ddd" stroke-width="1" rx="5"/>

  <rect x="70" y="375" width="18" height="18" fill="#4a90e2"/>
  <text x="95" y="388" font-size="12" font-weight="600">Engineering (30%)</text>

  <rect x="230" y="375" width="18" height="18" fill="#e74c3c"/>
  <text x="255" y="388" font-size="12" font-weight="600">Product (28%)</text>

  <rect x="390" y="375" width="18" height="18" fill="#2ecc71"/>
  <text x="415" y="388" font-size="12" font-weight="600">Operations (25%)</text>

  <rect x="70" y="400" width="18" height="18" fill="#f39c12"/>
  <text x="95" y="413" font-size="12" font-weight="600">Marketing (17%)</text>
</svg>
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
<svg width="600" height="250" viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg">
  <style>
    @keyframes barPulse {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 1; }
    }
    .dept-bar { animation: barPulse 2s ease-in-out infinite; }
  </style>

  <text x="300" y="25" text-anchor="middle" font-size="16" font-weight="bold">
    Average Team Sizes by Department
  </text>

  <!-- Bars -->
  <rect class="dept-bar" x="50" y="80" width="100" height="140" fill="#4a90e2" rx="4"/>
  <text x="100" y="230" text-anchor="middle" font-size="12" font-weight="600">Engineering</text>
  <text x="100" y="110" text-anchor="middle" font-size="20" font-weight="bold" fill="white">45</text>

  <rect class="dept-bar" x="180" y="110" width="100" height="110" fill="#e74c3c" rx="4" style="animation-delay: 0.5s"/>
  <text x="230" y="230" text-anchor="middle" font-size="12" font-weight="600">Product</text>
  <text x="230" y="140" text-anchor="middle" font-size="20" font-weight="bold" fill="white">32</text>

  <rect class="dept-bar" x="310" y="130" width="100" height="90" fill="#2ecc71" rx="4" style="animation-delay: 1s"/>
  <text x="360" y="230" text-anchor="middle" font-size="12" font-weight="600">Operations</text>
  <text x="360" y="160" text-anchor="middle" font-size="20" font-weight="bold" fill="white">25</text>

  <rect class="dept-bar" x="440" y="150" width="100" height="70" fill="#f39c12" rx="4" style="animation-delay: 1.5s"/>
  <text x="490" y="230" text-anchor="middle" font-size="12" font-weight="600">Marketing</text>
  <text x="490" y="180" text-anchor="middle" font-size="20" font-weight="bold" fill="white">18</text>

  <!-- Baseline -->
  <line x1="40" y1="220" x2="550" y2="220" stroke="#ddd" stroke-width="2"/>
</svg>
</div>

## Future Planning

Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
