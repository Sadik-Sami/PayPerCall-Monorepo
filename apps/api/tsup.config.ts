import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['api/index.ts'],
	format: ['esm'],
	target: 'node20',
	outDir: 'api',
	outExtension() {
		return {
			js: '.js',
		};
	},
	clean: false, // Keep the .ts file, just add .js
	splitting: false,
	sourcemap: false,
	bundle: true,
	// Keep @vercel/node external as it's provided by Vercel
	external: ['@vercel/node'],
	esbuildOptions(options) {
		// Resolve path aliases - this fixes the ERR_MODULE_NOT_FOUND error
		options.alias = {
			'@': './src',
		};
	},
});

