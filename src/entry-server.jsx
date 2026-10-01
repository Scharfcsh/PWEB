import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import BlogIndex from "./pages/blog/BlogIndexPage";
import BlogPost from "./pages/blog/BlogPostPage";

export { getAllPosts, getPostBySlug } from "./lib/blog";
export { blogIndexSeo, blogPostSeo, renderHeadTags, absoluteUrl } from "./lib/seo";
export { SITE_URL, SITE_NAME, BLOG_TITLE, BLOG_DESCRIPTION } from "./constants/site";

// Used by scripts/prerender.mjs at build time.
export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App pages={{ BlogIndex, BlogPost }} />
      </StaticRouter>
    </StrictMode>
  );
}
