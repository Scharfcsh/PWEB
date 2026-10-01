import { useEffect, useRef } from "react";
import { Icons } from "../icons";

const HeadingList = ({ headings, activeId, onNavigate }) => (
  <ol className="border-l border-neutral-800 text-[13px]">
    {headings.map((heading) => {
      const isActive = heading.id === activeId;
      return (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            onClick={onNavigate}
            aria-current={isActive ? "location" : undefined}
            className={`-ml-px block border-l py-1.5 leading-snug transition-colors ${
              heading.depth === 3 ? "pl-7" : "pl-4"
            } ${
              isActive
                ? "border-emerald-400 text-emerald-400"
                : "border-transparent text-neutral-500 hover:text-neutral-200 hover:border-neutral-600"
            }`}
          >
            {heading.text}
          </a>
        </li>
      );
    })}
  </ol>
);

// Desktop column. When the list is taller than its scroll container, keep the
// active entry in view as the reader moves through the article.
const SidebarToc = ({ headings, activeId, className }) => {
  const navRef = useRef(null);

  useEffect(() => {
    const container = navRef.current;
    const link = container?.querySelector('[aria-current="location"]');
    if (!link || container.scrollHeight <= container.clientHeight) return;

    const margin = 48;
    const top = link.offsetTop;
    const bottom = top + link.offsetHeight;
    if (top < container.scrollTop + margin || bottom > container.scrollTop + container.clientHeight - margin) {
      container.scrollTo({ top: top - container.clientHeight / 3, behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <nav ref={navRef} aria-labelledby="toc-heading" className={className}>
      <p
        id="toc-heading"
        className="mb-4 text-[11px] font-medium tracking-wider uppercase text-neutral-500"
      >
        On this page
      </p>
      <HeadingList headings={headings} activeId={activeId} />
    </nav>
  );
};

// `sidebar` for the sticky desktop column, `collapsible` for small screens
// where it sits inline above the article body.
const TableOfContents = ({ headings, activeId, variant = "sidebar", className }) => {
  if (!headings.length) return null;

  if (variant === "collapsible") {
    return (
      <details className="group rounded border border-neutral-800 bg-neutral-900/30">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm text-neutral-300 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            {Icons.list}
            On this page
          </span>
          <span className="text-neutral-500 transition-transform group-open:rotate-90">
            {Icons.chevronRight}
          </span>
        </summary>
        <nav aria-label="On this page" className="px-4 pb-4">
          <HeadingList
            headings={headings}
            activeId={activeId}
            onNavigate={(e) => e.currentTarget.closest("details")?.removeAttribute("open")}
          />
        </nav>
      </details>
    );
  }

  return <SidebarToc headings={headings} activeId={activeId} className={className} />;
};

export default TableOfContents;
