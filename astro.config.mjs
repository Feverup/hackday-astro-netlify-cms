import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import NetlifyCMS from 'astro-netlify-cms'
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(),
    sitemap(),
    NetlifyCMS({
      config: {
        backend: {
          name: 'git-gateway',
          branch: 'master',
        },
        collections: [
        // Define a blog post collection
		{
			name: 'posts',
			label: 'Blog Posts',
			folder: 'src/content/blog',
			create: true,
			delete: true,
			fields: [
			{ name: 'title', widget: 'string', label: 'Post Title' },
			{ name: 'body', widget: 'markdown', label: 'Post Body' },
			],
		},
		{
			name: 'Cities',
			label: 'Cities Content',
			folder: 'src/content/city',
			filter: {field: "filter", value: "city"},
			create: true,
			delete: true,
			slug: "{{fields.name}}",
			fields: [
				{ name: 'name', widget: 'string', label: 'City Name' },
				{ name: 'language', widget: 'string', label: 'Language' },
				{ name: 'info', widget: 'markdown', label: 'City Info' }
			],
		},
        ],
      },
    }),
  ],
});