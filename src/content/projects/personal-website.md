---
title: Personal Website
summary: This site, a static Astro site on GitHub Pages for showing projects and posting weekly updates.
status: in-progress
order: 1
repo: https://github.com/achang2/achang2.github.io
demo: https://achang2.github.io
---

## Why

I want to show my projects while they're still in progress instead of waiting until they're
"done", and use weekly updates to keep myself accountable.

## How it's built

- [Astro](https://astro.build), generating plain static HTML. No server code runs anywhere.
- Projects and weekly updates are Markdown files, so adding one is a single new file.
- Deployed to GitHub Pages by a GitHub Actions workflow on every push to `main`.
- Built with accessibility in mind: keyboard navigation, screen reader landmarks, and status and
  tags shown with icons and text, never color alone.
