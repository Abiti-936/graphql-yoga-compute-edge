import { build } from 'esbuild';

(async () => {
	await build({
		entryPoints: ['src/index.ts'],
		bundle: true,
		minify: true,
		platform: 'browser',
		target: ['chrome95', 'es2020'],
		outfile: 'bin/index.js',
	});
})();
