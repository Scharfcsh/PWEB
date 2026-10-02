// Section header component for consistent styling
export const SectionHeader = ({ number, title, badge }) => (
  <div className="flex items-center gap-4 mb-10">
    <span className="text-neutral-500 text-xs font-medium tracking-wider">
      {number}
    </span>
    <div className="h-px flex-1 bg-neutral-800" />
    <h2 className="text-neutral-300 text-sm font-medium tracking-wide uppercase">
      {title}
    </h2>
    {badge && (
      <span className="text-emerald-400 text-[10px] px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
        {badge}
      </span>
    )}
  </div>
);

// Status indicator component
export const StatusDot = () => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
  </span>
);
