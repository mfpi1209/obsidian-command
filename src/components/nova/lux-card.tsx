import * as React from "react";
import { cn } from "@/lib/utils";

interface LuxCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "primary" | "amber" | "cyan" | "none";
  as?: "div" | "article" | "section";
}

/**
 * Signature card of the NOVA OS design system.
 * - Tracks cursor for a luminous radial highlight
 * - Magnetic lift on hover
 * - Premium border + depth
 */
export const LuxCard = React.forwardRef<HTMLDivElement, LuxCardProps>(
  ({ className, glow = "none", children, onMouseMove, ...props }, ref) => {
    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
      e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      onMouseMove?.(e);
    };
    return (
      <div
        ref={ref}
        onMouseMove={handleMove}
        className={cn(
          "lux-card p-6",
          glow === "primary" && "shadow-[var(--elev-2),var(--glow-primary)]",
          glow === "amber" && "shadow-[var(--elev-2),var(--glow-amber)]",
          glow === "cyan" && "shadow-[var(--elev-2),var(--glow-cyan)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
LuxCard.displayName = "LuxCard";
