import { useEffect, useState } from "react";
import { Icons } from "../icons";

const CodeBlock = ({ code, language, title }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // Clipboard access can be denied (e.g. insecure context); nothing to do.
    }
  };

  return (
    <figure className="my-6 overflow-hidden rounded border border-neutral-800 bg-neutral-900/60">
      <figcaption className="flex items-center justify-between gap-4 border-b border-neutral-800 px-4 py-2 text-xs text-neutral-500">
        <span className="truncate text-neutral-400">{title || language || "code"}</span>
        <span className="flex shrink-0 items-center gap-4">
          {title && language && <span>{language}</span>}
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Copied to clipboard" : "Copy code"}
            className="inline-flex items-center gap-1.5 hover:text-neutral-200 transition-colors"
          >
            {copied ? Icons.check : Icons.copy}
            <span aria-hidden="true">{copied ? "Copied" : "Copy"}</span>
          </button>
        </span>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[13px] leading-6 text-neutral-200">
        <code className={language ? `language-${language}` : undefined}>{code}</code>
      </pre>
    </figure>
  );
};

export default CodeBlock;
