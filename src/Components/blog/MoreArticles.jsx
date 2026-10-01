import { Link } from "react-router-dom";
import { formatDate } from "../../lib/blog";
import { Icons } from "../icons";

const MoreArticles = ({ posts }) => (
  <section
    aria-labelledby="more-articles-heading"
    className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-5"
  >
    <h2
      id="more-articles-heading"
      className="mb-4 text-[11px] font-medium tracking-wider uppercase text-neutral-500"
    >
      More articles
    </h2>

    {posts.length > 0 ? (
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.url} className="group block">
              <span className="block text-sm font-medium leading-snug text-neutral-200 group-hover:text-emerald-400 transition-colors">
                {post.title}
              </span>
              <span className="mt-1 block text-xs text-neutral-500">
                {formatDate(post.publishedAt)} · {post.readingTime} min read
              </span>
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm leading-relaxed text-neutral-500">
        More write-ups are on the way.
      </p>
    )}

    <Link
      to="/blog"
      className="mt-5 inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
    >
      View all {Icons.arrowRight}
    </Link>
  </section>
);

export default MoreArticles;
