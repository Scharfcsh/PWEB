import { Link, useParams } from "react-router-dom";
import { getPostBySlug, getMoreArticles, formatDate } from "../../lib/blog";
import { blogPostSeo } from "../../lib/seo";
import { useSeo } from "../../hooks/useSeo";
import { BLOG_TITLE } from "../../constants/site";
import BlogShell from "../../Components/blog/BlogShell";
import Breadcrumbs from "../../Components/blog/Breadcrumbs";
import TableOfContents from "../../Components/blog/TableOfContents";
import { useActiveHeading } from "../../hooks/useActiveHeading";
import Markdown from "../../Components/blog/Markdown";
import TagList from "../../Components/blog/TagList";
import AuthorCard from "../../Components/blog/AuthorCard";
import HireCard from "../../Components/blog/HireCard";
import MoreArticles from "../../Components/blog/MoreArticles";
import NotFoundPage from "../NotFoundPage";

const BlogPost = ({ post }) => {
  useSeo(blogPostSeo(post));
  const activeId = useActiveHeading(post.headings.map((heading) => heading.id));
  const moreArticles = getMoreArticles(post.slug);
  const isUpdated = post.updatedAt !== post.publishedAt;

  return (
    <BlogShell>
      {/* xl: TOC | article | sidebar · lg: article | sidebar · below: stacked */}
      <div className="max-w-7xl mx-auto px-6 pt-10 lg:pt-14 pb-20 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[220px_minmax(0,1fr)_280px]">
        <aside className="hidden xl:block">
          <TableOfContents
            headings={post.headings}
            activeId={activeId}
            className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain pr-2 pb-4"
          />
        </aside>

        <article className="min-w-0 w-full max-w-[680px] mx-auto lg:mx-0">
          <header>
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: BLOG_TITLE, to: "/blog" },
                { label: post.title, to: post.url },
              ]}
            />
            <p className="mt-8 text-xs font-medium tracking-wider uppercase text-emerald-400">
              {post.category}
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-white">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500">
              <span>
                By{" "}
                <Link to="/" rel="author" className="font-medium text-neutral-200 hover:text-white transition-colors">
                  {post.author.name}
                </Link>
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
              {isUpdated && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                  </span>
                </>
              )}
            </div>
            {post.coverImage && (
              <img
                src={post.coverImage.src}
                alt={post.coverImage.alt}
                width="1600"
                height="900"
                decoding="async"
                className="mt-8 aspect-[16/9] w-full rounded-xl border border-neutral-800 object-cover"
              />
            )}
          </header>

          {post.headings.length > 0 && (
            <div className="mt-8 xl:hidden">
              <TableOfContents headings={post.headings} activeId={activeId} variant="collapsible" />
            </div>
          )}

          <div className="mt-10">
            <Markdown content={post.content} />
          </div>

          <footer className="mt-14 space-y-10 border-t border-neutral-800 pt-8">
            {post.tags.length > 0 && <TagList tags={post.tags} />}
            <AuthorCard author={post.author} />
          </footer>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <HireCard />
          <MoreArticles posts={moreArticles} />
        </aside>
      </div>
    </BlogShell>
  );
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  if (!post) return <NotFoundPage />;
  // Keyed so per-post state (active heading) resets when navigating between posts.
  return <BlogPost key={post.slug} post={post} />;
};

export default BlogPostPage;
