import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.everywhere.computer",
  integrations: [
    starlight({
      title: "Everywhere Computer",
      components: {
        // Override the default `Head` component.
        Head: "./src/components/Head.astro",
      },
      logo: {
        light: "/src/assets/logo-light.svg",
        dark: "./src/assets/logo-dark.svg",
        replacesTitle: true,
      },
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
      ],
      favicon: "./src/assets/favicon.svg",
      expressiveCode: {
        plugins: [
          {
            name: "Variable Weight",
            baseStyles: `
						pre > code {
							font-variation-settings: 'wght' 550;
						}
					`,
          },
        ],
      },
      social: {
        github: "https://github.com/everywhere-computer",
        discord: "https://discord.gg/yU6y8XMGaY",
        "x.com": "https://x.com/everywherecomp",
      },
      sidebar: [
        { label: "👋 Welcome", link: "/" },
        { label: "🤔 Why Choose It?", link: "/why-choose" },
        { label: "🤝 Who Participates?", link: "/who-participates" },
        { label: "🐇 Quick Start", link: "/quick-start" },
        {
          label: "🧑‍💻 Every CLI",
          autogenerate: { directory: "everycli" },
        },
        // {
        // 	label: '🏗️ Manual Setup',
        // 	autogenerate: { directory: 'manual-setup' },
        // },
        // {
        // 	label: '🎛️ Control Panel',
        // 	autogenerate: { directory: 'control-panel' },
        // },
        // {
        // 	label: '🪡 Workflows',
        // 	autogenerate: { directory: 'workflows' },
        // },
        {
          label: "💫 Homestar",
          autogenerate: { directory: "homestar" },
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
