import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'search_history';
const MAX_HISTORY = 3;

// Load initial search history from localStorage
function loadSearchHistory(): string[] {
	if (browser) {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : [];
		} catch (error) {
			console.error('Failed to load search history:', error);
			return [];
		}
	}
	return [];
}

// Create the store
function createSearchHistoryStore() {
	const { subscribe, set, update } = writable<string[]>(loadSearchHistory());

	return {
		subscribe,
		addSearch: (term: string) => {
			// Trim and validate
			const cleanTerm = term.trim();
			if (!cleanTerm) return;

			update((history) => {
				// Remove the term if it already exists
				const filtered = history.filter((t) => t !== cleanTerm);
				// Add to the beginning
				const newHistory = [cleanTerm, ...filtered].slice(0, MAX_HISTORY);

				// Save to localStorage
				if (browser) {
					try {
						localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
					} catch (error) {
						console.error('Failed to save search history:', error);
					}
				}

				return newHistory;
			});
		},
		clear: () => {
			set([]);
			if (browser) {
				try {
					localStorage.removeItem(STORAGE_KEY);
				} catch (error) {
					console.error('Failed to clear search history:', error);
				}
			}
		}
	};
}

export const searchHistory = createSearchHistoryStore();
