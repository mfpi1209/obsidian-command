import * as React from "react";
import { cn } from "@/lib/utils";

interface SmartInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  icon?: React.ReactNode;
}

/**
 * Smart Input — floating contextual label, fluid focus ring,
 * subtle luminous edge on focus.
 */
export const SmartInput = React.forwardRef<HTMLInputElement, SmartInputProps>(
  ({ className, label, hint, icon, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const [focused, setFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(
      Boolean(props.defaultValue || props.value),
    );
    const float = focused || hasValue;

    return (
      <div className="group relative">
        <div
          className={cn(
            "relative flex items-center rounded-xl border bg-[var(--surface)]/60 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            focused
              ? "border-primary/60 shadow-[0_0_0_4px_oklch(0.72_0.15_232/0.12),0_0_30px_-8px_oklch(0.72_0.15_232/0.5)]"
              : "border-border hover:border-border-strong",
          )}
        >
          {icon && (
            <span className="pl-4 text-muted-foreground transition-colors group-focus-within:text-primary">
              {icon}
            </span>
          )}
          <label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute left-4 origin-left text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              icon && "left-11",
              float
                ? "top-1.5 scale-75 text-[11px] uppercase tracking-[0.14em] text-primary/80"
                : "top-1/2 -translate-y-1/2 text-sm",
            )}
          >
            {label}
          </label>
          <input
            ref={ref}
            id={inputId}
            {...props}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              setHasValue(Boolean(e.target.value));
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(Boolean(e.target.value));
              props.onChange?.(e);
            }}
            className={cn(
              "h-14 w-full bg-transparent px-4 pt-5 pb-1 text-sm text-foreground outline-none placeholder:text-transparent",
              icon && "pl-0",
              className,
            )}
          />
        </div>
        {hint && (
          <p className="mt-1.5 px-1 text-[11px] text-muted-foreground">{hint}</p>
        )}
      </div>
    );
  },
);
SmartInput.displayName = "SmartInput";
