import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.everywhere.computer',
	integrations: [
		starlight({
			title: 'Everywhere Computer',
			logo: {
				light: '/src/assets/logo-light.svg',
    			dark: './src/assets/logo-dark.svg',
				replacesTitle: true,
			},
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/custom.css',
			],
			favicon: './src/assets/favicon.svg',
			head: [
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content: './src/assets/open-graph.png',
					},
				},
			],
			social: {
				github: 'https://github.com/everywhere-computer',
				discord: 'https://discord.gg/yU6y8XMGaY',
				'x.com': 'https://x.com/everywherecomp',
			},
			sidebar: [
				{ label: '👋 Welcome', link: '/' },
				{ label: '🤔 Why Choose It?', link: '/why-choose' },
				{ label: '🤝 Who Participates?', link: '/who-participates' },
				{
					label: '🏗️ Getting Started',
					autogenerate: { directory: 'getting-started' },
				},
				// {
				// 	label: '🎛️ Control Panel',
				// 	autogenerate: { directory: 'control-panel' },
				// },
				// {
				// 	label: '🪡 Workflows',
				// 	autogenerate: { directory: 'workflows' },
				// },
				{
					label: '💫 Homestar',
					autogenerate: { directory: 'homestar' },
				},
				// {
				// 	label: '🔌 Integrations',
				// 	autogenerate: { directory: 'integrations' },
				// },
				// {
				// 	label: '👥 Accounts',
				// 	autogenerate: { directory: 'integrations' },
				// },
			],
		}),
	],
});
