import { getAllPosts } from "../../lib/blog";
import { blogIndexSeo } from "../../lib/seo";
import { useSeo } from "../../hooks/useSeo";
import { BLOG_TITLE, BLOG_DESCRIPTION } from "../../constants/site";
import BlogShell from "../../Components/blog/BlogShell";
import Breadcrumbs from "../../Components/blog/Breadcrumbs";
import PostCard from "../../Components/blog/PostCard";
import { SectionHeader } from "../../Components/ui";

const BlogIndexPage = () => {
  const posts = getAllPosts();
  useSeo(blogIndexSeo(posts));

  return (
    <BlogShell>
      <div className="max-w-5xl mx-auto px-6 pt-10 lg:pt-14 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: BLOG_TITLE, to: "/blog" },
          ]}
        />
        <header className="mt-10 mb-16 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            {BLOG_TITLE}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-neutral-400">{BLOG_DESCRIPTION}</p>
        </header>

        <section>
          <SectionHeader number="01" title="Latest posts" />
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} headingLevel={3} />
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">No posts yet — check back soon.</p>
          )}
        </section>
      </div>
    </BlogShell>
  );
};

export default BlogIndexPage;
