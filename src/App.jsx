import React, { useEffect } from "react";
import Backgroung from "./pages/Backgroung";
import Hero from "./pages/Hero";
import { Analytics } from "@vercel/analytics/react";

function App() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 123) {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
      }
      if (e.ctrlKey && e.key === 'U') {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="relative overflow-hidden">
        <Backgroung />
        <Hero />
      </div>
      <Analytics />
    </>
  );
}

export default App;
