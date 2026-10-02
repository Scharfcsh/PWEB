# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Blog

Posts live in `src/content/blog/` as markdown files — the file name is the URL slug (`/blog/<slug>`). Each post starts with frontmatter:

```md
---
title: Post title
description: One-sentence summary used for the meta description and cards.
category: Authentication
tags: [Node.js, Express]
publishedAt: 2026-10-01
updatedAt: 2026-10-05          # optional
coverImage: https://...        # optional
coverImageAlt: Describe the image
author: aman-adhikari          # key in src/constants/site.js
draft: true                    # optional, hidden from production builds
---
```

`##` and `###` headings become the "On this page" navigation automatically. Fenced code blocks accept a file name: ```` ```js title="app.js" ````.

`npm run build` prerenders every blog page to static HTML (meta tags, Open Graph, JSON-LD) and also writes `sitemap.xml`, `robots.txt`, `rss.xml`, a JSON API under `/api/blogs.json` and `/api/blogs/<slug>.json`, and its OpenAPI 3.0 spec at `/openapi.json`. Set `SITE_URL` (e.g. `https://example.com`) so canonical URLs are absolute; on Vercel it defaults to the project's production domain.
