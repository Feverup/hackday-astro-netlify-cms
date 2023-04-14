## How does it work?

It uses Astro Content Collections just like we use `settings.yml`, `content.yml` and `faqs.yml`.

This means every collection is treated as an entrypoint in the CMS.

The necessary config to integrate this is done at `astro.config.mjs`.

## How does config work?

Inside `astro.config.mjs` at `export default defineConfig({ integrations: [...] )}` we need to set:

```
NetlifyCMS({
      config: {
        backend: {
          name: 'git-gateway',
          branch: 'master',
        },
        collections: [
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

```
We can see two main properties, backend and collections. We will take a look the options inside collecitons:

The main options we have to consider are `create: true`, `delete: true` and `slug: "{{fields.name}}"`. Create and Delete properties allow us to enable/disable item creation inside the collection, and slug works just like field summary we have been using in `landings-cms > landing-* > config.json`.

We have also set `filter: {field: "filter", value: "city"}` as a workaround to use nested content-collections which is not a possible option by default. By default we would have needed to set manually all possible collections. Let's see what nested collections can look like:

```
├── public/
├── src/
│   ├── content/
│       ├── city/
│           └── en/
│               └── madrid.md
│           └── fr/
│               └── paris.md
```

Finally, fields property is an array of objects with the default NetlifyCMS options we know `name: ...`, `label: ...` ...
Be careful to set the same name in fields config to the field in markdown.

## How are new collections created?

If `create: true`, users will be able to add new items inside a collection.

By setting a slug just like mentioned before, we can set field value as file name.

## How are changes made?

This works as expected, the value from the modified field is updated. In workflow by default we have three options:

```
- Publish now
- Publish and create new
- Publish and duplicate
```

# Astro Netlify-CMS Integration

Created with
```
npm init astro || npm create astro@latest
npm i astro-netlify-cms
```

### Start the project locally
Run `npm run dev`

To visualize admin dashboard navigate to `/admin/` and login. You will see both blod and cities collections defined in `astro.config.mjs`


Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
