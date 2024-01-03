import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Everywhere Computer',
			social: {
				github: 'https://github.com/everywhere-computer',
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
