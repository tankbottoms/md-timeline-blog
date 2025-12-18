import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

interface AccessLog {
	timestamp: string;
	timestampMs: number;
	method: string;
	path: string;
	query: string;
	origin: string;
	userAgent: string;
	referer: string;
	ip: string;
	cfRay: string | null;
	country: string | null;
	responseTime: number;
	statusCode: number;
}

interface PageView {
	path: string;
	views: number;
	uniqueVisitors: number;
}

interface Referrer {
	source: string;
	visits: number;
}

interface CountryStats {
	country: string;
	visits: number;
}

interface TimeSeriesPoint {
	date: string;
	views: number;
	uniqueVisitors: number;
}

interface AnalyticsData {
	totalViews: number;
	uniqueVisitors: number;
	topPages: PageView[];
	topReferrers: Referrer[];
	countries: CountryStats[];
	timeSeries: TimeSeriesPoint[];
	avgResponseTime: number;
	statusCodeBreakdown: Record<string, number>;
}

// Read all log files
async function readLogFiles(): Promise<AccessLog[]> {
	const logsDir = join(process.cwd(), 'logs');

	if (!existsSync(logsDir)) {
		return [];
	}

	const files = await readdir(logsDir);
	const logFiles = files.filter((f) => f.startsWith('access-') && f.endsWith('.jsonl'));

	const allLogs: AccessLog[] = [];

	for (const file of logFiles) {
		const content = await readFile(join(logsDir, file), 'utf-8');
		const lines = content.trim().split('\n').filter(Boolean);

		for (const line of lines) {
			try {
				const log = JSON.parse(line);
				allLogs.push(log);
			} catch (error) {
				console.error('Failed to parse log line:', error);
			}
		}
	}

	return allLogs;
}

// Aggregate analytics data
function aggregateAnalytics(logs: AccessLog[]): AnalyticsData {
	// Filter out /stats requests to avoid tracking the analytics page itself
	const filteredLogs = logs.filter((log) => !log.path.startsWith('/stats'));

	// Total views
	const totalViews = filteredLogs.length;

	// Unique visitors (by IP)
	const uniqueIPs = new Set(filteredLogs.map((log) => log.ip));
	const uniqueVisitors = uniqueIPs.size;

	// Top pages
	const pageViews = new Map<string, Set<string>>();
	filteredLogs.forEach((log) => {
		if (!pageViews.has(log.path)) {
			pageViews.set(log.path, new Set());
		}
		pageViews.get(log.path)!.add(log.ip);
	});

	const topPages: PageView[] = Array.from(pageViews.entries())
		.map(([path, ips]) => ({
			path,
			views: filteredLogs.filter((log) => log.path === path).length,
			uniqueVisitors: ips.size
		}))
		.sort((a, b) => b.views - a.views)
		.slice(0, 10);

	// Top referrers
	const referrers = new Map<string, number>();
	filteredLogs.forEach((log) => {
		const ref = log.referer === 'direct' ? 'Direct' : new URL(log.referer).hostname;
		referrers.set(ref, (referrers.get(ref) || 0) + 1);
	});

	const topReferrers: Referrer[] = Array.from(referrers.entries())
		.map(([source, visits]) => ({ source, visits }))
		.sort((a, b) => b.visits - a.visits)
		.slice(0, 10);

	// Country stats
	const countries = new Map<string, number>();
	filteredLogs.forEach((log) => {
		const country = log.country || 'Unknown';
		countries.set(country, (countries.get(country) || 0) + 1);
	});

	const countryStats: CountryStats[] = Array.from(countries.entries())
		.map(([country, visits]) => ({ country, visits }))
		.sort((a, b) => b.visits - a.visits)
		.slice(0, 10);

	// Time series (daily)
	const dailyStats = new Map<string, { views: Set<string>; uniqueIPs: Set<string> }>();
	filteredLogs.forEach((log) => {
		const date = log.timestamp.split('T')[0];
		if (!dailyStats.has(date)) {
			dailyStats.set(date, { views: new Set(), uniqueIPs: new Set() });
		}
		const stats = dailyStats.get(date)!;
		stats.views.add(log.timestampMs.toString());
		stats.uniqueIPs.add(log.ip);
	});

	const timeSeries: TimeSeriesPoint[] = Array.from(dailyStats.entries())
		.map(([date, stats]) => ({
			date,
			views: stats.views.size,
			uniqueVisitors: stats.uniqueIPs.size
		}))
		.sort((a, b) => a.date.localeCompare(b.date));

	// Average response time
	const totalResponseTime = filteredLogs.reduce((sum, log) => sum + log.responseTime, 0);
	const avgResponseTime = filteredLogs.length > 0 ? totalResponseTime / filteredLogs.length : 0;

	// Status code breakdown
	const statusCodeBreakdown: Record<string, number> = {};
	filteredLogs.forEach((log) => {
		const code = log.statusCode.toString();
		statusCodeBreakdown[code] = (statusCodeBreakdown[code] || 0) + 1;
	});

	return {
		totalViews,
		uniqueVisitors,
		topPages,
		topReferrers,
		countries: countryStats,
		timeSeries,
		avgResponseTime,
		statusCodeBreakdown
	};
}

export async function load() {
	const logs = await readLogFiles();
	const analytics = aggregateAnalytics(logs);

	return {
		analytics
	};
}

export const prerender = false;
