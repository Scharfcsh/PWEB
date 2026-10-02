import GithubSlugger from "github-slugger";
import { authors, DEFAULT_AUTHOR } from "../constants/site";

// Every markdown file in src/content/blog becomes a post. The file name is the slug.
const files = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const WORDS_PER_MINUTE = 200;
const REQUIRED_FIELDS = ["title", "description", "category", "publishedAt"];

function unquote(value) {
  return value.replace(/^(['"])(.*)\1$/, "$2");
}

function parseValue(raw) {
  const value = raw.trim();
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => unquote(item.trim()))
      .filter(Boolean);
  }
  if (value === "true") return true;
  if (value === "false") return false;
  return unquote(value);
}

// Minimal frontmatter parser: `key: value` pairs and `[a, b]` lists.
function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (field) data[field[1]] = parseValue(field[2]);
  }
  return { data, body: raw.slice(match[0].length) };
}

// Plain text of a heading, matching what rehype-slug sees once markdown is rendered.
function headingText(markdown) {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .trim();
}

// Mirrors rehype-slug: one slugger walks every heading in document order, so
// duplicate titles get the same `-1`, `-2` suffixes as the rendered ids.
function extractHeadings(body) {
  const slugger = new GithubSlugger();
  const headings = [];
  let fence = null;

  for (const line of body.split(/\r?\n/)) {
    const fenceMatch = /^\s*(`{3,}|~{3,})/.exec(line);
    if (fenceMatch) {
      if (!fence) fence = fenceMatch[1][0];
      else if (fenceMatch[1][0] === fence) fence = null;
      continue;
    }
    if (fence) continue;

    const heading = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!heading) continue;

    const text = headingText(heading[2]);
    const id = slugger.slug(text);
    const depth = heading[1].length;
    if (depth === 2 || depth === 3) headings.push({ depth, text, id });
  }
  return headings;
}

function countWords(body) {
  return body
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function toPost(path, raw) {
  const slug = path.split("/").pop().replace(/\.md$/, "");
  const { data, body } = parseFrontmatter(raw);

  const missing = REQUIRED_FIELDS.filter((field) => !data[field]);
  if (missing.length) {
    throw new Error(`Blog post "${slug}" is missing frontmatter: ${missing.join(", ")}`);
  }

  const authorKey = data.author || DEFAULT_AUTHOR;
  const author = authors[authorKey];
  if (!author) throw new Error(`Blog post "${slug}" references unknown author "${authorKey}"`);

  const wordCount = countWords(body);

  return {
    slug,
    url: `/blog/${slug}`,
    title: data.title,
    description: data.description,
    category: data.category,
    tags: Array.isArray(data.tags) ? data.tags : [],
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt || data.publishedAt,
    coverImage: data.coverImage
      ? { src: data.coverImage, alt: data.coverImageAlt || data.title }
      : null,
    author: { id: authorKey, ...author },
    draft: data.draft === true,
    wordCount,
    readingTime: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
    headings: extractHeadings(body),
    content: body,
  };
}

const posts = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post) => !post.draft || import.meta.env.DEV)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) || null;
}

// Other posts, ranked by shared tags/category, newest first on ties.
export function getMoreArticles(slug, limit = 4) {
  const current = getPostBySlug(slug);
  if (!current) return posts.slice(0, limit);

  const score = (post) =>
    post.tags.filter((tag) => current.tags.includes(tag)).length +
    (post.category === current.category ? 1 : 0);

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({ post, score: score(post) }))
    .sort((a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt))
    .slice(0, limit)
    .map(({ post }) => post);
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

// Fixed locale and time zone so prerendered HTML matches the client render.
export function formatDate(isoDate) {
  return dateFormatter.format(new Date(isoDate));
}
