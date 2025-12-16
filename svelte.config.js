import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import mdPreprocess from './remark.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdPreprocess()],
	kit: {
		adapter: adapter({
			runtime: 'nodejs22.x'
		})
	},
	extensions: ['.svelte', '.md']
};

export default config;
