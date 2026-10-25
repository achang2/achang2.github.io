# Personal Website

Source for [achang2.github.io](https://achang2.github.io): an About page, a showcase of the projects I'm working on, and weekly self-accountability updates.

Built with [Astro](https://astro.build) as a fully static site and deployed to GitHub Pages with GitHub Actions. No server code runs anywhere.

## Run it locally

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check, then build to dist/
npm run preview   # serve the built site
```

## Adding content

Everything lives in Markdown under `src/content/`. Pushing to `main` redeploys the site.

### A project

Create `src/content/projects/<slug>.md`. The slug becomes the URL (`/projects/<slug>/`) and the project shows up automatically on the Projects page and in the Projects menu.

```md
---
title: My Project
summary: One sentence shown on the Projects page.
status: in-progress # planned | in-progress | paused | complete
order: 1            # lower numbers are listed first
repo: https://github.com/achang2/my-project   # optional
demo: https://example.com                     # optional
---

Longer description in Markdown.
```

### A weekly update

Create `src/content/updates/YYYY-MM-DD.md` (any filename works; the date in the frontmatter decides the order).

```md
---
title: Week of October 26
date: 2026-11-01
summary: One sentence shown in the list.
tags: [website, astro]
---

## Progress this week

- ...

## Goals for next week

- ...
```

Tags are free-form. Each new tag shows up in the filter on the Weekly Updates page automatically.

## Accessibility notes

- Skip link, landmarks (`header`, `nav`, `main`, `footer`), and one `h1` per page.
- The Projects menu is a disclosure button (`aria-expanded`), works with Tab, Enter/Space, and Escape, and is never hover-only.
- The current page is marked with `aria-current="page"` and a visible underline, not just color.
- Status and tags always pair an icon with text. Icons are decorative (`aria-hidden`).
- Search and tag filtering announce the number of results through a polite live region.
- Light and dark themes follow the OS setting; animations are off for `prefers-reduced-motion`.
- Without JavaScript every page still works. Only the search and tag filter need it.
