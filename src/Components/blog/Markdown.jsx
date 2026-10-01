import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Link } from "react-router-dom";
import CodeBlock from "./CodeBlock";

const isExternal = (href = "") => /^https?:\/\//.test(href);

const textContent = (node) =>
  node?.type === "text" ? node.value : (node?.children || []).map(textContent).join("");

const HeadingAnchor = ({ id }) => (
  <a
    href={`#${id}`}
    aria-label="Link to this section"
    className="ml-2 text-neutral-600 no-underline opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-emerald-400 transition-opacity"
  >
    #
  </a>
);

// Article styling lives here so every post renders with the same typography.
// `node` is stripped from props so it never reaches the DOM.
const components = {
  h2: ({ node: _node, children, id, ...props }) => (
    <h2
      id={id}
      {...props}
      className="group scroll-mt-24 mt-14 mb-4 text-xl sm:text-2xl font-semibold tracking-tight text-white"
    >
      {children}
      <HeadingAnchor id={id} />
    </h2>
  ),
  h3: ({ node: _node, children, id, ...props }) => (
    <h3
      id={id}
      {...props}
      className="group scroll-mt-24 mt-10 mb-3 text-lg font-semibold text-neutral-100"
    >
      {children}
      <HeadingAnchor id={id} />
    </h3>
  ),
  h4: ({ node: _node, ...props }) => (
    <h4 {...props} className="scroll-mt-24 mt-8 mb-2 text-base font-semibold text-neutral-200" />
  ),
  p: ({ node: _node, ...props }) => (
    <p {...props} className="mb-5 text-[15px] leading-7 text-neutral-300" />
  ),
  a: ({ node: _node, href, children, ...props }) => {
    const className =
      "text-emerald-400 underline decoration-emerald-400/30 underline-offset-4 hover:decoration-emerald-400 transition-colors";
    if (href?.startsWith("/")) {
      return (
        <Link to={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={className}
        {...(isExternal(href) && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ node: _node, ...props }) => (
    <ul
      {...props}
      className="mb-5 list-disc space-y-2 pl-5 text-[15px] text-neutral-300 marker:text-emerald-400/70"
    />
  ),
  ol: ({ node: _node, ...props }) => (
    <ol
      {...props}
      className="mb-5 list-decimal space-y-2 pl-5 text-[15px] text-neutral-300 marker:text-neutral-500"
    />
  ),
  li: ({ node: _node, ...props }) => <li {...props} className="pl-1 leading-7" />,
  blockquote: ({ node: _node, ...props }) => (
    <blockquote
      {...props}
      className="my-6 rounded-r border-l-2 border-emerald-500/50 bg-emerald-500/5 px-5 py-4 text-neutral-300 [&>p:last-child]:mb-0"
    />
  ),
  strong: ({ node: _node, ...props }) => (
    <strong {...props} className="font-semibold text-neutral-100" />
  ),
  code: ({ node: _node, ...props }) => (
    <code
      {...props}
      className="rounded bg-neutral-800/70 px-1.5 py-0.5 text-[0.85em] text-emerald-300"
    />
  ),
  // Fenced code: ```js title="auth.js"
  pre: ({ node }) => {
    const codeEl = node?.children?.find((child) => child.tagName === "code");
    const language = (codeEl?.properties?.className || [])
      .map(String)
      .find((name) => name.startsWith("language-"))
      ?.slice("language-".length);
    const title = /title="([^"]+)"/.exec(codeEl?.data?.meta || "")?.[1];
    return (
      <CodeBlock code={textContent(codeEl).replace(/\n$/, "")} language={language} title={title} />
    );
  },
  table: ({ node: _node, ...props }) => (
    <div className="my-6 overflow-x-auto rounded border border-neutral-800">
      <table {...props} className="w-full text-left text-sm" />
    </div>
  ),
  thead: ({ node: _node, ...props }) => (
    <thead {...props} className="bg-neutral-900/60 text-neutral-200" />
  ),
  th: ({ node: _node, ...props }) => (
    <th {...props} className="border-b border-neutral-800 px-4 py-2.5 font-medium" />
  ),
  td: ({ node: _node, ...props }) => (
    <td {...props} className="border-b border-neutral-800/60 px-4 py-2.5 align-top text-neutral-400" />
  ),
  hr: () => <hr className="my-12 border-neutral-800" />,
  img: ({ node: _node, alt, ...props }) => (
    <img
      {...props}
      alt={alt || ""}
      loading="lazy"
      decoding="async"
      className="my-6 w-full rounded border border-neutral-800"
    />
  ),
};

const Markdown = ({ content }) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
    {content}
  </ReactMarkdown>
);

export default Markdown;
