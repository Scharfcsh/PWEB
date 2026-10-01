import { personal } from "../constants/data";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  BLOG_TITLE,
  BLOG_DESCRIPTION,
} from "../constants/site";

const TWITTER_HANDLE = "@amanadhikari49";

export function absoluteUrl(path) {
  return new URL(path, `${SITE_URL}/`).href;
}

function personSchema(author = { name: personal.name, url: SITE_URL }) {
  return {
    "@type": "Person",
    name: author.name,
    url: author.url,
    sameAs: [author.github || personal.github, author.linkedin || personal.linkedin],
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.to),
    })),
  };
}

export function homeSeo() {
  return {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    path: "/",
    type: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        ...personSchema(),
        jobTitle: personal.role,
      },
    ],
  };
}

export function blogIndexSeo(posts) {
  return {
    title: `${BLOG_TITLE} — ${personal.name}`,
    description: BLOG_DESCRIPTION,
    path: "/blog",
    type: "website",
    image: posts[0]?.coverImage?.src,
    imageAlt: posts[0]?.coverImage?.alt,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: `${personal.name} — ${BLOG_TITLE}`,
        description: BLOG_DESCRIPTION,
        url: absoluteUrl("/blog"),
        author: personSchema(),
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          url: absoluteUrl(post.url),
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
        })),
      },
      breadcrumbSchema([
        { label: "Home", to: "/" },
        { label: BLOG_TITLE, to: "/blog" },
      ]),
    ],
  };
}

export function blogPostSeo(post) {
  const url = absoluteUrl(post.url);
  const image = post.coverImage ? absoluteUrl(post.coverImage.src) : undefined;

  return {
    title: `${post.title} | ${personal.name}`,
    description: post.description,
    path: post.url,
    type: "article",
    image,
    imageAlt: post.coverImage?.alt,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      author: post.author.name,
      section: post.category,
      tags: post.tags,
    },
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        image: image ? [image] : undefined,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: personSchema(post.author),
        publisher: personSchema(),
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        url,
        articleSection: post.category,
        keywords: post.tags.join(", "),
        wordCount: post.wordCount,
        timeRequired: `PT${post.readingTime}M`,
        inLanguage: "en",
      },
      breadcrumbSchema([
        { label: "Home", to: "/" },
        { label: BLOG_TITLE, to: "/blog" },
        { label: post.title, to: post.url },
      ]),
    ],
  };
}

export function notFoundSeo(path) {
  return {
    title: `Page not found | ${personal.name}`,
    description: "The page you are looking for does not exist.",
    path,
    type: "website",
    robots: "noindex, follow",
  };
}

// Flattens a page's SEO description into the tags that go in <head>. Shared by
// the client (useSeo) and the build-time prerenderer so both emit the same markup.
export function buildHeadTags(seo) {
  const url = absoluteUrl(seo.path);
  const tags = [
    { tag: "meta", attrs: { name: "description", content: seo.description } },
    { tag: "link", attrs: { rel: "canonical", href: url } },
    { tag: "meta", attrs: { property: "og:site_name", content: SITE_NAME } },
    { tag: "meta", attrs: { property: "og:locale", content: "en_US" } },
    { tag: "meta", attrs: { property: "og:type", content: seo.type } },
    { tag: "meta", attrs: { property: "og:title", content: seo.title } },
    { tag: "meta", attrs: { property: "og:description", content: seo.description } },
    { tag: "meta", attrs: { property: "og:url", content: url } },
    {
      tag: "meta",
      attrs: { name: "twitter:card", content: seo.image ? "summary_large_image" : "summary" },
    },
    { tag: "meta", attrs: { name: "twitter:creator", content: TWITTER_HANDLE } },
    { tag: "meta", attrs: { name: "twitter:title", content: seo.title } },
    { tag: "meta", attrs: { name: "twitter:description", content: seo.description } },
    {
      tag: "link",
      attrs: {
        rel: "alternate",
        type: "application/rss+xml",
        title: `${personal.name} — ${BLOG_TITLE}`,
        href: absoluteUrl("/rss.xml"),
      },
    },
  ];

  if (seo.robots) {
    tags.push({ tag: "meta", attrs: { name: "robots", content: seo.robots } });
  }

  if (seo.image) {
    const image = absoluteUrl(seo.image);
    tags.push(
      { tag: "meta", attrs: { property: "og:image", content: image } },
      { tag: "meta", attrs: { name: "twitter:image", content: image } }
    );
    if (seo.imageAlt) {
      tags.push(
        { tag: "meta", attrs: { property: "og:image:alt", content: seo.imageAlt } },
        { tag: "meta", attrs: { name: "twitter:image:alt", content: seo.imageAlt } }
      );
    }
  }

  if (seo.article) {
    const { publishedTime, modifiedTime, author, section, tags: articleTags } = seo.article;
    tags.push(
      { tag: "meta", attrs: { property: "article:published_time", content: publishedTime } },
      { tag: "meta", attrs: { property: "article:modified_time", content: modifiedTime } },
      { tag: "meta", attrs: { property: "article:author", content: author } },
      { tag: "meta", attrs: { property: "article:section", content: section } },
      ...articleTags.map((tag) => ({
        tag: "meta",
        attrs: { property: "article:tag", content: tag },
      }))
    );
  }

  for (const schema of seo.jsonLd || []) {
    tags.push({ tag: "script", attrs: { type: "application/ld+json" }, json: schema });
  }

  return tags;
}

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// JSON-LD must not be able to close its own <script> tag.
export const serializeJsonLd = (json) => JSON.stringify(json).replace(/</g, "\\u003c");

export function renderHeadTags(seo) {
  const tags = buildHeadTags(seo).map(({ tag, attrs, json }) => {
    const attributes = Object.entries(attrs)
      .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
      .join(" ");
    if (tag === "script") return `<script ${attributes} data-seo>${serializeJsonLd(json)}</script>`;
    return `<${tag} ${attributes} data-seo>`;
  });
  return [`<title>${escapeHtml(seo.title)}</title>`, ...tags].join("\n    ");
}
