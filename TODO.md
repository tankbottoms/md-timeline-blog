# TODO - Template Requirements

This document tracks pending tasks and improvements for the MD Timeline Blog template.

## Asset Sourcing

### Icons and Favicons

All icon files currently use transparent PNG placeholders. These should be replaced with proper branded assets:

- [ ] `static/favicon.ico` - Main favicon for browsers
- [ ] `static/apple-touch-icon.png` - Default Apple touch icon (180x180)
- [ ] `static/apple-touch-icon-precomposed.png` - Apple touch icon without gloss
- [ ] `static/apple-touch-icon-120x120.png` - iPhone retina (120x120)
- [ ] `static/apple-touch-icon-120x120-precomposed.png`
- [ ] `static/apple-touch-icon-152x152.png` - iPad retina (152x152)
- [ ] `static/apple-touch-icon-152x152-precomposed.png`
- [ ] `static/apple-touch-icon-180x180.png` - iPhone 6 Plus (180x180)
- [ ] `static/apple-touch-icon-180x180-precomposed.png`
- [ ] `static/favicon-16x16.png` - Small favicon variant
- [ ] `static/favicon-32x32.png` - Standard favicon variant
- [ ] `static/favicon-96x96.png` - Large favicon variant
- [ ] `static/android-chrome-192x192.png` - Android home screen icon
- [ ] `static/android-chrome-512x512.png` - Android splash screen icon

**Recommended Tools:**

- Design icons at the largest size (512x512) and scale down
- Use tools like [RealFaviconGenerator](https://realfavicongenerator.net/)
- Ensure icons work well in both light and dark modes

### Additional Static Assets

- [ ] `static/robots.txt` - Currently basic, may need customization for SEO
- [ ] `static/sitemap.xml` - Auto-generated, verify it includes all routes
- [ ] Social media preview images (Open Graph, Twitter Cards)
- [ ] Brand logo files for the header/footer

## Accessibility Improvements

- [ ] Remove `autofocus` attribute from search input (`src/routes/search/+page.svelte:64`)
  - Accessibility warning: Autofocus can be disruptive for screen reader users
  - Alternative: Use programmatic focus on user interaction

## SEO Enhancements

- [ ] Add meta descriptions to all routes
- [ ] Implement Open Graph tags for social media sharing
- [ ] Add structured data (JSON-LD) for blog posts and research papers
- [ ] Create proper 404 page with helpful navigation
- [ ] Add canonical URLs to prevent duplicate content issues

## Analytics Enhancements

- [ ] Add date range filtering to `/stats` dashboard
- [ ] Implement log file rotation strategy (currently daily, consider archiving old logs)
- [ ] Add export functionality (CSV/JSON) for analytics data
- [ ] Add real-time visitor count
- [ ] Add user journey tracking (page flow visualization)

## Content Management

- [ ] Document markdown frontmatter schema in CLAUDE.md or README
- [ ] Create example templates for new posts and research documents
- [ ] Add validation for required frontmatter fields
- [ ] Consider adding tags/categories to posts for better organization

## Performance Optimizations

- [ ] Implement image optimization pipeline (webp conversion, responsive images)
- [ ] Add service worker for offline support
- [ ] Consider implementing RSS feed for blog posts
- [ ] Optimize SVG.js bundle size (consider tree-shaking or CDN alternatives)

## Development Workflow

- [ ] Add pre-commit hooks for:
  - Linting (eslint, prettier)
  - Type checking (svelte-check)
  - Markdown formatting validation
- [ ] Add GitHub Actions workflow for:
  - Automated testing
  - Build verification
  - Deployment preview
- [ ] Create contribution guidelines (CONTRIBUTING.md)

## Testing

- [ ] Add unit tests for utility functions
- [ ] Add integration tests for data loading routes
- [ ] Add E2E tests for critical user flows (Playwright)
- [ ] Test analytics dashboard with various data volumes
- [ ] Test responsive layouts across device sizes

## Documentation

- [ ] Expand README.md with:
  - Full setup instructions
  - Deployment guides (Vercel, Netlify, self-hosted)
  - Customization guide
  - Troubleshooting section
- [ ] Add inline code comments for complex logic
- [ ] Document environment variables (if any are added)
- [ ] Create architecture diagram showing data flow

## Security

- [ ] Review and harden analytics log file permissions
- [ ] Implement rate limiting for /stats route
- [ ] Add Content Security Policy headers
- [ ] Review CORS settings if API routes are added
- [ ] Sanitize user input in search functionality

## Nice to Have Features

- [ ] Dark mode toggle animation improvements
- [ ] Search results highlighting
- [ ] Reading progress indicator on blog posts
- [ ] Estimated reading time for posts
- [ ] Related posts suggestions
- [ ] Comments system integration
- [ ] Newsletter subscription form
- [ ] Print stylesheet for blog posts

---

**Last Updated:** 2025-12-18

**Template Version:** 1.0.0
