import { Link, NavLink } from "react-router-dom";
import { personal } from "../../constants/data";
import { Icons } from "../icons";

const navLinkClass = ({ isActive }) =>
  `transition-colors ${isActive ? "text-neutral-100" : "text-neutral-400 hover:text-neutral-100"}`;

// Page chrome shared by every blog page: sticky top bar and footer.
const BlogShell = ({ children }) => (
  <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 selection:bg-emerald-500/20 selection:text-emerald-200">
    <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-neutral-100 font-semibold tracking-tight">
          {personal.name.split(" ")[0].toLowerCase()}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/blog" className={navLinkClass}>
            Blog
          </NavLink>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            {Icons.github}
          </a>
        </nav>
      </div>
    </header>

    <main className="flex-1">{children}</main>

    <footer className="w-full max-w-7xl mx-auto px-6 pb-12">
      <div className="pt-12 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-sm">
        <p>© {new Date().getFullYear()} {personal.name}</p>
        <p>Built with React & Motion</p>
      </div>
    </footer>
  </div>
);

export default BlogShell;
