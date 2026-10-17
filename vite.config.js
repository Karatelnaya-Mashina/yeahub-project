import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		react(),
		svgr({
			include: '**/*.svg',
			svgrOptions: {
				icon: true,
			},
		}),
		visualizer({
			filename: 'stats.html', // куда сохранить отчёт
			open: true, // автоматически открыть в браузере
			gzipSize: true, // показать gzip-размер
			brotliSize: true, // показать brotli-размер
			template: 'treemap', // treemap | sunburst | network
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
