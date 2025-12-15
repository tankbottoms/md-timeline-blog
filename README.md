# Markdown Template Blog

A beautiful, timeline-based blog template built with SvelteKit and MDsveX using **Bun**. Features light/dark mode, rich media support, animated SVG icons, and comprehensive examples.

![Screenshot of the Timeline Blog Landing Page](/static/images/screenshot.png)

## ✨ Features

### Core Features

- **Bun Runtime** - Fast JavaScript runtime and package manager
- **Light/Dark Mode** - Toggle between themes with persistent localStorage
- **Timeline Layout** - Clean, chronological blog presentation with featured posts
- **Frontmatter Support** - Title, blurb, date metadata
- **Responsive Design** - Mobile-first with 600px timeline, 1200px detail pages
- **MDsveX Integration** - Markdown with Svelte components
- **Cookie Consent** - GDPR-compliant modal on first visit
- **Date-based Naming** - YYYYMMDD-short-title.md convention

### Content Types

- **Blog Posts** - Rich blog entries with various layouts
- **Research Documents** - Academic papers with PDF embedding and ASCII diagram support
- **Team Page** - Showcase your team members
- **About Page** - Company information
- **Rich Media Support**:
  - SVG graphics (static and animated)
  - Images (PNG, JPG)
  - Audio players
  - Video players
  - PDF viewers
  - ASCII diagrams in code blocks
  - HTML tables
  - Syntax-highlighted code blocks

### Layout Options

- `.media-left` - Float media left with text wrapping (45% max-width)
- `.media-right` - Float media right with text wrapping (45% max-width)
- `.media-center` - Center media as block (100% max-width, centered)
- `.media-inline` - Inline with text (200px max-width)
- `.media-blocked` - Featured block with border/shadow (centered, fit-content)
- `.md-viewer` - Markdown/ASCII diagram viewer (transparent background, centered, footnotesize)

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

```bash
cd md-template-blog
bun install
```

### Development

```bash
bun run dev
```

Visit `http://localhost:5173`

### Building for Production

```bash
bun run build
bun run preview
```

## 📁 Project Structure

```
md-timeline-blog/
├── src/
│   ├── docs/
│   │   ├── posts/              # Blog post markdown files (YYYYMMDD-title.md)
│   │   └── research/           # Research document markdown files (YYYYMMDD-title.md)
│   ├── routes/
│   │   ├── research/           # Research listing and detail pages
│   │   │   ├── [slug]/        # Dynamic research doc pages
│   │   │   ├── +page.svelte   # Research listing (timeline)
│   │   │   └── +page.ts
│   │   ├── team/              # Team page
│   │   ├── about/             # About page
│   │   ├── [slug]/            # Dynamic blog post pages
│   │   ├── +layout.svelte     # Main layout with theme toggle & navigation
│   │   ├── +layout.ts         # Loads blog posts
│   │   └── +page.svelte       # Homepage timeline
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ThemeToggle.svelte
│   │   │   └── CookieConsent.svelte
│   │   └── stores/
│   │       └── theme.ts       # Theme state management
│   └── app.css               # Global styles with dark mode & media classes
├── static/
│   ├── images/
│   │   ├── svg-icons/         # SVG icon files for animations
│   │   └── favicon.svg
│   ├── md/                    # Markdown files for embedding (e.g., diagrams)
│   ├── audio/                 # Audio files
│   ├── video/                 # Video files
│   └── pdfs/                  # PDF documents
├── package.json
├── bunfig.toml               # Bun configuration
├── svelte.config.js
├── remark.config.js           # Markdown processing configuration
├── tailwind.config.js
└── .gitignore
```

## 📝 Creating Content

### Blog Posts

Create markdown files in `src/docs/posts/` using the naming convention `YYYYMMDD-short-title.md`:

```markdown
---
title: Your Post Title
blurb: Short description for timeline
date: 2025-12-14
---

Your content here with full markdown support...

### Media Examples

<div class="media-center">
<img src="/images/example.png" alt="Description" />
</div>
```

### Research Documents

Create markdown files in `src/docs/research/` using the naming convention `YYYYMMDD-short-title.md`:

```markdown
---
title: Research Paper Title
filename: paper.pdf
blurb: Paper abstract or summary
date: 2025-12-14
contents: Additional metadata
---

## Abstract

Your content...

## ASCII Diagram

<!-- Content source: static/md/diagram.md -->
<div class="md-viewer">
<div class="diagram-caption">
<strong>Diagram Title</strong> (2025-11-30)<br/>
<em>Diagram description</em>
</div>

```
Your ASCII art diagram here...
```

## PDF Viewer

<div class="pdf-viewer">
<embed src="/pdfs/your-paper.pdf" type="application/pdf" width="100%" height="800" />
</div>
```

## 🎨 Theme System

### Light Mode (Default)

- Background: `#fafafa`
- Text: `#111111`
- Clean, bright appearance

### Dark Mode

- Background: `#1a1a1a`
- Text: `#e5e5e5`
- Easy on the eyes

Theme persists via localStorage and can be toggled with the sun/moon icon in the header.

## 🖼️ Media Examples

### Images

```html
<!-- Centered -->
<div class="media-center">
<img src="/images/example.png" alt="Description" />
</div>

<!-- Left-floated with text wrap -->
<div class="media-left">
<img src="/images/example.png" alt="Description" width="300" />
</div>
<div class="clearfix">
Your text content wraps around the image...
</div>
```

### Audio

```html
<audio controls>
  <source src="/audio/sample.mp3" type="audio/mpeg">
  Your browser does not support audio.
</audio>
```

### Video

```html
<video controls width="100%">
  <source src="/video/sample.mp4" type="video/mp4">
  Your browser does not support video.
</video>
```

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

## 📊 SVG Visualizations

The template includes numerous SVG examples:

1. **Data Visualization** - Bar charts, pie charts
2. **Network Diagrams** - Architecture flows
3. **Algorithm Complexity** - Complexity graphs
4. **Geographic Maps** - Data distributions
5. **ML Pipelines** - Process flows
6. **UX Journeys** - User flows
7. **API Architecture** - System diagrams
8. **Performance Metrics** - KPI dashboards
9. **Security Flows** - Authentication diagrams
10. **CI/CD Pipelines** - Deployment flows

All SVGs are responsive and support dark mode automatically.

## 👥 Team Page

Features team members from Christopher Nolan films:
- Leadership: Dom Cobb, Bruce Wayne, Cooper
- Core Team: Arthur, Ariadne, Leonard Shelby, and more
- Advisors: Professor Brand, Miles, Yusuf

Customize by editing `src/routes/team/+page.svelte`

## 🔧 Customization

### Colors

Edit CSS variables in `src/app.css`:

```css
:root {
  --color-bg: #fafafa;
  --color-text: #111111;
  /* ... */
}

[data-theme='dark'] {
  --color-bg: #1a1a1a;
  --color-text: #e5e5e5;
  /* ... */
}
```

### Typography

```css
:root {
  --font-mono: ui-monospace, 'Cascadia Code', ...;
  --font-serif: 'Georgia', 'Times New Roman', serif;
}
```

### Layout

- Modify `src/routes/+layout.svelte` for header/footer
- Adjust `src/routes/+page.svelte` for timeline styling
- Edit media positioning classes in `src/app.css`

## 📦 Example Content

The template includes 11 example blog posts:

1. Data Visualization Techniques
2. Network Architecture Design
3. Algorithm Complexity Analysis
4. Geographic Data Analysis
5. Machine Learning Pipelines
6. User Experience Design
7. RESTful API Design
8. Database Optimization
9. Security Architecture
10. CI/CD Pipeline Design
11. Rich Media Examples

Plus 3 research documents with PDF viewers.

## 🛠️ Technology Stack

- **Bun** - Runtime and package manager
- **SvelteKit** - Web framework
- **Svelte 5** - Latest reactive framework
- **MDsveX** - Markdown processor
- **Tailwind CSS** - Utility-first CSS
- **TypeScript** - Type safety
- **Vite** - Build tool

## 📖 Documentation

### Remark Plugins
- `remark-gfm` - GitHub Flavored Markdown
- `remark-frontmatter` - YAML frontmatter
- `rehype-slug` - Heading IDs
- `rehype-autolink-headings` - Heading links
- `rehype-raw` - HTML in markdown

### Positioning Classes

```css
.media-left      /* Float left, 45% max-width */
.media-right     /* Float right, 45% max-width */
.media-center    /* Block center, 100% max-width, centered */
.media-inline    /* Inline, 200px max-width */
.media-blocked   /* Block with border/shadow, centered, fit-content */
.md-viewer       /* Markdown viewer, transparent background, centered, 0.7rem font */
.clearfix        /* Clear floats */
```

### Page Width Strategy

The template uses a dual-width approach:
- **Timeline pages** (home, research listing, about, team): `max-width: 600px`
- **Detail pages** (blog posts, research docs): `max-width: 1200px` (double the timeline width)
- **Mobile** (< 768px): Full width with responsive adjustments
- **Header/Footer**: Always constrained to 600px regardless of page type

## 🎯 Best Practices

1. **Images** - Use descriptive alt text
2. **SVGs** - Keep code readable, use semantic IDs
3. **Tables** - Use headers, keep data organized
4. **Media** - Optimize file sizes
5. **Dark Mode** - Test all content in both themes
6. **Accessibility** - Maintain ARIA labels

## 🚀 Performance Tips

- Optimize images before uploading
- Use lazy loading for media
- Keep SVGs simple and efficient
- Minimize JavaScript in markdown
- Use system fonts when possible

## 📝 Notes

- Theme preference persists in localStorage
- All example posts use lorem ipsum placeholder text
- SVG diagrams work in both light and dark modes
- PDF viewers require browser support
- Mobile responsive by default

## 🤝 Contributing

Feel free to customize this template for your needs! The codebase is well-documented and modular.

## 📄 License

This template is free to use for personal and commercial projects.

## 🙏 Credits

- Layout inspiration: Physical Intelligence research blog
- Framework: SvelteKit and MDsveX
- Runtime: Bun
- Typography: System fonts
- Team names: Christopher Nolan films
- Developer: Claude Code
- Prompted by: Tankbottoms

---

**Ready to start?** Run `bun install && bun run dev` and visit `localhost:5173`
