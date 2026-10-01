import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Client-side navigations keep the previous scroll position by default; reset
// it on page changes but leave in-page #anchor jumps alone.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
