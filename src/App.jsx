import Backgroung from "./pages/Backgroung";
import Hero from "./pages/Hero";
import { Analytics } from "@vercel/analytics/react";

function App() {
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
