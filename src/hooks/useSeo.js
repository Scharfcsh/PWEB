import { useEffect } from "react";
import { buildHeadTags } from "../lib/seo";

// Keeps <head> in sync with the current page during client-side navigation.
// Prerendered pages already ship the same tags (marked with data-seo), which
// are swapped out here on route changes.
export function useSeo(seo) {
  const serialized = JSON.stringify({ title: seo.title, tags: buildHeadTags(seo) });

  useEffect(() => {
    const { title, tags } = JSON.parse(serialized);
    document.title = title;
    document.head.querySelectorAll("[data-seo]").forEach((el) => el.remove());

    for (const { tag, attrs, json } of tags) {
      const el = document.createElement(tag);
      Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
      if (json) el.textContent = JSON.stringify(json);
      el.setAttribute("data-seo", "");
      document.head.appendChild(el);
    }
  }, [serialized]);
}
