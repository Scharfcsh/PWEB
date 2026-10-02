import { personal } from "../../constants/data";
import { Icons } from "../icons";
import { StatusDot } from "../ui";

// Sidebar call-to-action shown next to every article.
const HireCard = () => (
  <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-neutral-900/60 to-neutral-950 p-5">
    <div className="flex items-center gap-2.5">
      <StatusDot />
      <span className="text-emerald-400 text-xs font-medium">Available for work</span>
    </div>
    <p className="mt-4 text-neutral-100 font-medium">Need this built into your product?</p>
    <p className="mt-2 text-sm leading-relaxed text-neutral-400">
      I design, build and ship production web apps end to end — auth, real-time features,
      APIs and everything in between.
    </p>
    <a
      href={`mailto:${personal.email}`}
      className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-900 bg-white rounded hover:bg-neutral-100 transition-colors"
    >
      Get in touch {Icons.arrow}
    </a>
  </div>
);

export default HireCard;
