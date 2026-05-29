import type { ReactNode } from "react";

/**
 * A subtle browser/window frame used to present the product mockups so they
 * read as real screenshots of a real app.
 */
export function WindowChrome({
  children,
  label = "beamday.app",
  className = "",
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-surface shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-border bg-surface-2/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#3a3f49]" />
          <span className="h-3 w-3 rounded-full bg-[#3a3f49]" />
          <span className="h-3 w-3 rounded-full bg-[#3a3f49]" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-md border border-border bg-bg/60 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
          <span className="text-xs text-text-faint">{label}</span>
        </div>
        <div className="w-12" />
      </div>
      {children}
    </div>
  );
}
