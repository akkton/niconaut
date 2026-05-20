// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://nicolasneumann.blog',
	i18n: {
		locales: ['en', 'pt', 'de'],
		defaultLocale: 'en',
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [
		mdx(),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: { en: 'en', pt: 'pt-BR', de: 'de-DE' },
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		build: {
			rollupOptions: {
				output: {
					assetFileNames: 'assets/[name]-[hash][extname]',
				},
			},
		},
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-inter',
			fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
			weights: ['400', '500', '600', '700'],
			styles: ['normal'],
			subsets: ['latin'],
		},
		{
			provider: fontProviders.google(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
			weights: ['400', '500', '700'],
			styles: ['normal'],
			subsets: ['latin'],
		},
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
