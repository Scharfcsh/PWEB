import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Portfolio from "./Portfolio";
import NotFoundPage from "./pages/NotFoundPage";
import ScrollToTop from "./Components/ScrollToTop";

// Blog pages are split out of the main bundle. The prerenderer passes the eager
// versions instead so the HTML it writes contains the full article.
const lazyPages = {
  BlogIndex: lazy(() => import("./pages/blog/BlogIndexPage")),
  BlogPost: lazy(() => import("./pages/blog/BlogPostPage")),
};

function App({ pages = lazyPages }) {
  const { BlogIndex, BlogPost } = pages;

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-neutral-950" />}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Analytics />
    </>
  );
}

export default App;
