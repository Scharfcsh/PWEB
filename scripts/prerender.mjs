// Post-build step: renders the blog pages to static HTML (with per-page meta
// tags and JSON-LD) and writes sitemap.xml, robots.txt, rss.xml and the blog
// JSON API described by openapi.json. Runs after the client and SSR builds.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildOpenApiSpec } from "./openapi.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const {
  render,
  getAllPosts,
  blogIndexSeo,
  blogPostSeo,
  renderHeadTags,
  absoluteUrl,
  SITE_URL,
  SITE_NAME,
  BLOG_TITLE,
  BLOG_DESCRIPTION,
} = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const template = await fs.readFile(path.join(distDir, "index.html"), "utf8");
const ROOT_DIV = '<div id="root"></div>';
if (!template.includes(ROOT_DIV)) throw new Error(`dist/index.html is missing ${ROOT_DIV}`);

const posts = getAllPosts();

async function write(file, contents) {
  const target = path.join(distDir, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, contents);
  console.log(`  ✓ ${file}`);
}

// Function replacers keep `$` sequences in rendered content from being
// interpreted as replacement patterns.
function renderPage(url, seo) {
  const appHtml = render(url);
  return template
    .replace(/\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<(meta|link)\b[^>]*\bdata-seo\b[^>]*>/g, "")
    .replace("</head>", () => `    ${renderHeadTags(seo)}\n  </head>`)
    .replace(ROOT_DIV, () => `<div id="root">${appHtml}</div>`);
}

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function toSummary(post) {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    tags: post.tags,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    readingTime: post.readingTime,
    wordCount: post.wordCount,
    url: absoluteUrl(post.url),
    coverImage: post.coverImage
      ? { src: absoluteUrl(post.coverImage.src), alt: post.coverImage.alt }
      : null,
    author: { id: post.author.id, name: post.author.name, url: post.author.url },
  };
}

console.log(`Prerendering blog for ${SITE_URL}`);

// HTML pages — served extensionless thanks to `cleanUrls` in vercel.json.
await write("blog.html", renderPage("/blog", blogIndexSeo(posts)));
for (const post of posts) {
  await write(`blog/${post.slug}.html`, renderPage(post.url, blogPostSeo(post)));
}

// Sitemap & robots
const latestUpdate = posts.map((post) => post.updatedAt).sort().at(-1);
const sitemapEntries = [
  { loc: absoluteUrl("/"), lastmod: latestUpdate },
  { loc: absoluteUrl("/blog"), lastmod: latestUpdate },
  ...posts.map((post) => ({ loc: absoluteUrl(post.url), lastmod: post.updatedAt })),
];
await write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    ({ loc, lastmod }) =>
      `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n  </url>`
  )
  .join("\n")}
</urlset>
`
);
await write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`);

// RSS feed
await write(
  "rss.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} — ${BLOG_TITLE}`)}</title>
    <link>${escapeXml(absoluteUrl("/blog"))}</link>
    <description>${escapeXml(BLOG_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${escapeXml(absoluteUrl("/rss.xml"))}" rel="self" type="application/rss+xml" />
${posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(absoluteUrl(post.url))}</link>
      <guid isPermaLink="true">${escapeXml(absoluteUrl(post.url))}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>
`
);

// JSON API + OpenAPI 3.0 spec
await write(
  "api/blogs.json",
  JSON.stringify({ data: posts.map(toSummary), total: posts.length }, null, 2)
);
for (const post of posts) {
  await write(
    `api/blogs/${post.slug}.json`,
    JSON.stringify(
      {
        ...toSummary(post),
        headings: post.headings,
        contentFormat: "markdown",
        content: post.content,
      },
      null,
      2
    )
  );
}
await write(
  "openapi.json",
  JSON.stringify(
    buildOpenApiSpec({ siteUrl: SITE_URL, title: `${SITE_NAME} — ${BLOG_TITLE}`, description: BLOG_DESCRIPTION }),
    null,
    2
  )
);

await fs.rm(ssrDir, { recursive: true, force: true });
