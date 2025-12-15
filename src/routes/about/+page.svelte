<svelte:head>
	<title>About - My Research Blog</title>
</svelte:head>

<div class="page-wrapper">
<div class="about">
	<h1>About This Blog</h1>

	<p>
		This is a template blog built with SvelteKit and MDsveX. It demonstrates a clean,
		timeline-based layout inspired by modern research websites.
	</p>

	<h2>Features</h2>

	<ul>
		<li>Timeline-based blog post listing</li>
		<li>Frontmatter support for title, blurb, and date</li>
		<li>Rich media positioning (left, right, center, inline, blocked)</li>
		<li>SVG chart and diagram examples</li>
		<li>Clean, monospace typography</li>
		<li>Responsive design</li>
	</ul>

	<h2>Usage</h2>

	<p>
		To create a new blog post, add a markdown file to the <code>src/docs</code> directory
		with frontmatter at the top:
	</p>

	<pre><code>---
title: Your Post Title
blurb: A short description of your post
date: 2025-12-14
---

Your content here...</code></pre>

	<h2>Media Positioning</h2>

	<p>Use the following HTML classes to position media elements:</p>

	<ul>
		<li><code>.media-left</code> - Float media to the left with text wrapping</li>
		<li><code>.media-right</code> - Float media to the right with text wrapping</li>
		<li><code>.media-center</code> - Center media as a block element</li>
		<li><code>.media-inline</code> - Display media inline with text</li>
		<li><code>.media-blocked</code> - Display media as a block with border and shadow</li>
	</ul>
</div>
</div>

<style>
	.page-wrapper {
		max-width: 600px;
		margin: 0 auto;
	}

	.about {
		padding: 2rem 0;
	}

	.about h1 {
		font-family: var(--font-serif);
		margin-bottom: 1.5rem;
	}

	.about h2 {
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.about p {
		margin: 1rem 0;
		line-height: 1.6;
	}

	.about ul {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.about li {
		margin: 0.5rem 0;
	}

	.about code {
		background: var(--color-code-bg);
		color: var(--color-code-text);
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-size: 0.9em;
	}

	.about pre {
		background: var(--color-code-bg);
		padding: 1rem;
		overflow-x: auto;
		border-radius: 5px;
		margin: 1rem 0;
		border: 1px solid var(--color-border);
	}

	.about pre code {
		background: none;
		padding: 0;
		color: var(--color-code-text);
	}
</style>
