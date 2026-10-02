import { Link } from "react-router-dom";
import { Icons } from "../icons";

const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={item.to} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && (
              <span aria-hidden="true" className="text-neutral-700">
                {Icons.chevronRight}
              </span>
            )}
            {isLast ? (
              <span aria-current="page" className="text-neutral-300 truncate">
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="hover:text-neutral-200 transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
