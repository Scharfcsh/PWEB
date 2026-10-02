import { Link } from "react-router-dom";
import { Icons } from "../icons";

const AuthorCard = ({ author }) => (
  <section
    aria-labelledby="about-author-heading"
    className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-6"
  >
    <h2
      id="about-author-heading"
      className="text-[11px] font-medium tracking-wider uppercase text-neutral-500"
    >
      About the author
    </h2>
    <div className="mt-4 flex items-start gap-4">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 font-semibold text-emerald-400"
      >
        {author.name.charAt(0)}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/"
            rel="author"
            className="font-medium text-neutral-100 underline decoration-neutral-700 underline-offset-4 hover:decoration-emerald-400 transition-colors"
          >
            {author.name}
          </Link>
          <span className="text-emerald-400 text-[10px] px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            {author.role}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">{author.bio}</p>
        <div className="mt-3 flex items-center gap-4 text-neutral-500">
          <a
            href={author.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${author.name} on GitHub`}
            className="hover:text-neutral-200 transition-colors"
          >
            {Icons.github}
          </a>
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${author.name} on LinkedIn`}
            className="hover:text-neutral-200 transition-colors"
          >
            {Icons.linkedin}
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default AuthorCard;
