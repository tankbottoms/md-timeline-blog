<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();
	let analytics = $derived(data.analytics);

	// Format numbers with commas
	function formatNumber(num: number): string {
		return num.toLocaleString();
	}

	// Format response time
	function formatResponseTime(ms: number): string {
		return `${ms.toFixed(0)}ms`;
	}

	// Format date for display
	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	onMount(() => {
		// Initialize time series chart
		function initTimeSeriesChart() {
			if (typeof SVG === 'undefined') {
				setTimeout(initTimeSeriesChart, 50);
				return;
			}

			const container = document.getElementById('timeseries-chart');
			if (!container || analytics.timeSeries.length === 0) return;

			const isMobile = window.innerWidth < 640;
			const WIDTH = isMobile ? window.innerWidth - 32 : 800;
			const HEIGHT = 300;
			const MARGIN = { top: 40, right: 40, bottom: 60, left: 60 };
			const chartWidth = WIDTH - MARGIN.left - MARGIN.right;
			const chartHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

			const draw = SVG().addTo('#timeseries-chart').size(WIDTH, HEIGHT);
			draw.rect(WIDTH, HEIGHT).fill('var(--color-bg-secondary)');

			// Title
			draw
				.text('Page Views Over Time')
				.font({ size: 16, family: 'var(--font-mono)', weight: 'bold' })
				.fill('var(--color-text)')
				.move(MARGIN.left, 15);

			// Calculate scales
			const maxViews = Math.max(...analytics.timeSeries.map((d) => d.views));
			const xStep = chartWidth / (analytics.timeSeries.length - 1 || 1);

			// Draw grid lines
			const gridLines = 5;
			for (let i = 0; i <= gridLines; i++) {
				const y = MARGIN.top + (chartHeight / gridLines) * i;
				draw
					.line(MARGIN.left, y, MARGIN.left + chartWidth, y)
					.stroke({ color: 'var(--color-border)', width: 1, dasharray: '2,2' });

				// Y-axis labels
				const value = Math.round(maxViews - (maxViews / gridLines) * i);
				draw
					.text(value.toString())
					.font({ size: 10, family: 'var(--font-mono)' })
					.fill('var(--color-text-muted)')
					.move(MARGIN.left - 35, y - 7);
			}

			// Draw line chart
			const points = analytics.timeSeries.map((d, i) => ({
				x: MARGIN.left + i * xStep,
				y: MARGIN.top + chartHeight - (d.views / maxViews) * chartHeight
			}));

			// Draw area fill
			let areaPath = `M ${points[0].x} ${MARGIN.top + chartHeight}`;
			points.forEach((p) => {
				areaPath += ` L ${p.x} ${p.y}`;
			});
			areaPath += ` L ${points[points.length - 1].x} ${MARGIN.top + chartHeight} Z`;

			draw
				.path(areaPath)
				.fill('var(--color-link)')
				.opacity(0.1)
				.stroke({ width: 0 });

			// Draw line
			let linePath = `M ${points[0].x} ${points[0].y}`;
			points.slice(1).forEach((p) => {
				linePath += ` L ${p.x} ${p.y}`;
			});

			draw
				.path(linePath)
				.fill('none')
				.stroke({ color: 'var(--color-link)', width: 2 });

			// Draw points
			points.forEach((p, i) => {
				draw.circle(6).fill('var(--color-link)').center(p.x, p.y);
			});

			// X-axis labels (show every nth label on mobile)
			const labelStep = isMobile ? Math.ceil(analytics.timeSeries.length / 4) : 1;
			analytics.timeSeries.forEach((d, i) => {
				if (i % labelStep === 0 || i === analytics.timeSeries.length - 1) {
					draw
						.text(formatDate(d.date))
						.font({ size: 10, family: 'var(--font-mono)' })
						.fill('var(--color-text-muted)')
						.center(points[i].x, HEIGHT - 30);
				}
			});
		}

		// Initialize top pages bar chart
		function initTopPagesChart() {
			if (typeof SVG === 'undefined') {
				setTimeout(initTopPagesChart, 50);
				return;
			}

			const container = document.getElementById('toppages-chart');
			if (!container || analytics.topPages.length === 0) return;

			const isMobile = window.innerWidth < 640;
			const WIDTH = isMobile ? window.innerWidth - 32 : 600;
			const HEIGHT = 50 + analytics.topPages.slice(0, 5).length * 50;

			const draw = SVG().addTo('#toppages-chart').size(WIDTH, HEIGHT);
			draw.rect(WIDTH, HEIGHT).fill('var(--color-bg-secondary)');

			const maxViews = Math.max(...analytics.topPages.map((p) => p.views));
			const barMaxWidth = WIDTH - 180;

			analytics.topPages.slice(0, 5).forEach((page, i) => {
				const y = 30 + i * 50;
				const barWidth = (page.views / maxViews) * barMaxWidth;

				// Background bar
				draw
					.rect(barMaxWidth, 30)
					.fill('var(--color-hover-bg)')
					.radius(3)
					.move(150, y);

				// Actual bar
				draw
					.rect(barWidth, 30)
					.fill('var(--color-link)')
					.opacity(0.8)
					.radius(3)
					.move(150, y);

				// Path label
				const pathText = page.path === '/' ? 'Home' : page.path;
				draw
					.text(pathText.substring(0, 20))
					.font({ size: 12, family: 'var(--font-mono)' })
					.fill('var(--color-text)')
					.move(10, y + 9);

				// Views count
				draw
					.text(formatNumber(page.views))
					.font({ size: 12, family: 'var(--font-mono)', weight: 'bold' })
					.fill('var(--color-text)')
					.move(WIDTH - 60, y + 9);
			});
		}

		initTimeSeriesChart();
		initTopPagesChart();

		return () => {
			const timeseriesContainer = document.getElementById('timeseries-chart');
			const toppagesContainer = document.getElementById('toppages-chart');
			if (timeseriesContainer) timeseriesContainer.innerHTML = '';
			if (toppagesContainer) toppagesContainer.innerHTML = '';
		};
	});
</script>

<svelte:head>
	<title>Analytics - Site Statistics</title>
	<script src="https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js@3.0/dist/svg.min.js"></script>
</svelte:head>

<div class="stats-page">
	<div class="page-header">
		<h1>Site Analytics</h1>
		<p class="subtitle">Privacy-focused analytics dashboard</p>
	</div>

	<!-- Key Metrics -->
	<div class="metrics-grid">
		<div class="metric-card">
			<div class="metric-label">Total Views</div>
			<div class="metric-value">{formatNumber(analytics.totalViews)}</div>
		</div>

		<div class="metric-card">
			<div class="metric-label">Unique Visitors</div>
			<div class="metric-value">{formatNumber(analytics.uniqueVisitors)}</div>
		</div>

		<div class="metric-card">
			<div class="metric-label">Avg Response Time</div>
			<div class="metric-value">{formatResponseTime(analytics.avgResponseTime)}</div>
		</div>

		<div class="metric-card">
			<div class="metric-label">Pages Tracked</div>
			<div class="metric-value">{formatNumber(analytics.topPages.length)}</div>
		</div>
	</div>

	<!-- Time Series Chart -->
	<div class="chart-section">
		<div id="timeseries-chart" class="chart-container"></div>
	</div>

	<!-- Two Column Layout -->
	<div class="two-column">
		<!-- Top Pages -->
		<div class="section">
			<h2>Top Pages</h2>
			<div id="toppages-chart" class="chart-container"></div>
		</div>

		<!-- Top Referrers -->
		<div class="section">
			<h2>Top Referrers</h2>
			<div class="list-container">
				{#each analytics.topReferrers.slice(0, 5) as referrer}
					<div class="list-item">
						<div class="list-item-label">{referrer.source}</div>
						<div class="list-item-value">{formatNumber(referrer.visits)}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Countries and Status Codes -->
	<div class="two-column">
		<div class="section">
			<h2>Top Countries</h2>
			<div class="list-container">
				{#each analytics.countries.slice(0, 5) as country}
					<div class="list-item">
						<div class="list-item-label">{country.country}</div>
						<div class="list-item-value">{formatNumber(country.visits)}</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="section">
			<h2>Status Codes</h2>
			<div class="list-container">
				{#each Object.entries(analytics.statusCodeBreakdown)
					.sort((a, b) => b[1] - a[1])
					.slice(0, 5) as [code, count]}
					<div class="list-item">
						<div class="list-item-label">
							<span class="status-code" class:success={code.startsWith('2')} class:error={code.startsWith('4') || code.startsWith('5')}>
								{code}
							</span>
						</div>
						<div class="list-item-value">{formatNumber(count)}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.stats-page {
		padding: 2rem 1rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.page-header {
		margin-bottom: 2rem;
	}

	.page-header h1 {
		font-family: var(--font-serif);
		font-size: 2.5rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
		color: var(--color-text);
	}

	.subtitle {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		margin: 0;
	}

	/* Metrics Grid */
	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.metric-card {
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.metric-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		margin-bottom: 0.5rem;
	}

	.metric-value {
		font-family: var(--font-mono);
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-text);
	}

	/* Chart Section */
	.chart-section {
		margin-bottom: 2rem;
	}

	.chart-container {
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 1rem;
		overflow-x: auto;
	}

	/* Two Column Layout */
	.two-column {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.section {
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.section h2 {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
		color: var(--color-text);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* List Container */
	.list-container {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		background: var(--color-hover-bg);
		border-radius: 4px;
	}

	.list-item-label {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--color-text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
	}

	.list-item-value {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text);
		margin-left: 1rem;
	}

	.status-code {
		padding: 0.25rem 0.5rem;
		border-radius: 3px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.status-code.success {
		background: #d4edda;
		color: #155724;
	}

	.status-code.error {
		background: #f8d7da;
		color: #721c24;
	}

	/* Dark mode adjustments */
	:global([data-theme='dark']) .status-code.success {
		background: #1e4620;
		color: #4caf50;
	}

	:global([data-theme='dark']) .status-code.error {
		background: #4a1e1e;
		color: #f44336;
	}

	@media (max-width: 640px) {
		.stats-page {
			padding: 1rem 0.5rem;
		}

		.page-header h1 {
			font-size: 2rem;
		}

		.metrics-grid {
			grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		}

		.metric-value {
			font-size: 1.5rem;
		}

		.two-column {
			grid-template-columns: 1fr;
		}
	}
</style>
