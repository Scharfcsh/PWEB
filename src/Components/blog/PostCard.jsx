import { Link } from "react-router-dom";
import { formatDate } from "../../lib/blog";

// Post preview used on the blog index and the home page. The whole card is
// clickable through the title link's stretched ::after.
const PostCard = ({ post, headingLevel = 2, showCover = true }) => {
  const Heading = `h${headingLevel}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all duration-200">
      {showCover && post.coverImage && (
        <img
          src={post.coverImage.src}
          alt={post.coverImage.alt}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover border-b border-neutral-800"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-medium tracking-wider uppercase text-emerald-400">
          {post.category}
        </p>
        <Heading className="mt-2 text-base font-medium leading-snug text-neutral-100 group-hover:text-white transition-colors">
          <Link to={post.url} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400 line-clamp-3">
          {post.description}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-neutral-500">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
