import { Link, useLocation } from "react-router-dom";
import { notFoundSeo } from "../lib/seo";
import { useSeo } from "../hooks/useSeo";
import BlogShell from "../Components/blog/BlogShell";
import { Icons } from "../Components/icons";

const NotFoundPage = () => {
  const { pathname } = useLocation();
  useSeo(notFoundSeo(pathname));

  return (
    <BlogShell>
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <p className="text-emerald-400 text-sm font-medium">404</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Page not found
        </h1>
        <p className="mt-4 text-neutral-400">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-neutral-900 bg-white rounded hover:bg-neutral-100 transition-colors"
          >
            {Icons.arrowLeft} Back home
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-neutral-300 bg-neutral-800 rounded border border-neutral-700 hover:bg-neutral-700 transition-colors"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </BlogShell>
  );
};

export default NotFoundPage;
