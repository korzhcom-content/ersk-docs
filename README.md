# EasyReport Starter Kit Documentation

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

The official documentation site for the **EasyReport Starter Kit (ERSK)** — an ASP.NET Core solution template by Korzh that implements a basic ad-hoc reporting web application. This repository contains the documentation content (overview, getting started, basic concepts, solution structure, startup class explanation, and tutorials) together with the Astro project that builds it into a static site.

The published site is served as part of **[korzh.com](https://korzh.com)** at **https://korzh.com/easy-report-starter-kit/docs**.

## Approach

The site is a static documentation site built with [Astro](https://astro.build) and the [Starlight](https://starlight.astro.build) docs framework. It is **content-driven**: you add and edit Markdown/MDX under `src/content/docs/` and the build assembles the site around it.

- All content lives under `src/content/docs/` as `.md` / `.mdx` files (the `docs` collection, defined in `src/content.config.ts`).
- During the build, **section landing pages (`index.md`) are generated** from each folder's `__section.md` marker (`tools/add-indexes.js`), including auto-built "In this section" and "Subsections" link lists. Articles are ordered by `sidebar.order` in their frontmatter.
- A small **rehype plugin rewrites internal links** to the deployment base path (`/easy-report-starter-kit/docs`), so links are authored root-relative and the prefix is added at build time (`plugins/rehype-links.js`).
- The **sidebar** is defined explicitly in `astro.config.mjs`. A filesystem-based generator (`tools/get-sidebar.js`) that derives the nav from the folder tree is available and can be enabled per-section (currently commented out in the config).

The site is built under the base path `easy-report-starter-kit/docs` and output to `./dist/easy-report-starter-kit/docs`. This base path must match the rewrite rule on korzh.com (see [Integration](#integration-into-korzhcom)).

### Folder conventions

- **`__section.md`** — a folder marker, not a published page. Its first `# Heading` line provides the section label/title used when generating that folder's `index.md`.
- Files and folders whose names **start with `_`** are excluded from the generated navigation.
- `sidebar.order` in a page's frontmatter controls its position; `index.md` sorts first.

## Local development

Requires **Node.js 22+** and **npm**. (Astro 5 supports `^18.20.8 || ^20.3 || >=22`, but Node 22 is the recommended/expected version for this project.) All commands run from the repository root:

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run start` | Same as `dev`, but opens the browser |
| `npm run build` | Generate section indexes (`tools/add-indexes.js`), then build the production site to `./dist/easy-report-starter-kit/docs` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Crawl the **running** dev server for broken links (`@olton/spider`) — start `npm run dev` in another terminal first |

## Dependencies

This is a self-contained Astro project — there are **no git submodules and no sibling repositories required** to build it. All dependencies are npm packages declared in `package.json`, most notably:

- `astro` + `@astrojs/starlight` — site framework and docs theme.
- Starlight plugins: `starlight-theme-rapide`, `starlight-image-zoom`, `starlight-showcases`, `starlight-links-validator`.
- Build/content tooling: `gray-matter`, `glob`, `fs-extra`, `unist-util-visit`, `@olton/spider` (link crawler), `@olton/terminal`.

The repository it depends on at runtime is, in effect, the **korzh.com site**, which embeds this documentation via a Netlify rewrite (see below).

## Contributing & branching

- **Never push directly to `main`.** All changes to `main` must go through a **Pull Request**.
- Day-to-day work happens on `dev` (and feature branches), which is also deployed for preview/review.

## Deployment

Deployment is handled by **Netlify** and triggered automatically on branch changes. Two branches are deployed:

- **`main`** — production documentation.
- **`dev`** — staging/preview of in-progress docs.

Both branches build with `npm run build` and publish `./dist/easy-report-starter-kit/docs`.

### Integration into korzh.com

The deployed Netlify site is surfaced on the main korzh.com domain through a **Netlify rewrite (proxy) rule with a `200!` status**. Rather than redirecting the visitor, korzh.com proxies requests for `/easy-report-starter-kit/docs/*` to this site, so the documentation appears seamlessly under `https://korzh.com/easy-report-starter-kit/docs` while remaining a separate repository and deploy.

This is why the project is built under the `easy-report-starter-kit/docs` base path — the paths must line up with the rewrite rule on korzh.com.

## Redirects

URL-level redirects are configured in the root `netlify.toml`:

- `/` → `/easy-report-starter-kit/docs/overview` (the documentation entry page).
- Relocated articles are mapped to their new paths (e.g. `setting-multi-tenancy` → `tutorials/setting-multi-tenancy`).

Add new entries here when an article is moved or renamed so existing links keep working.
