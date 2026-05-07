import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium tracking-tight transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground shadow-[var(--elev-2)] [background:var(--gradient-primary)] hover:shadow-[var(--glow-primary)] hover:-translate-y-px",
        secondary:
          "bg-[var(--surface-raised)] text-foreground border border-border hover:border-border-strong hover:bg-[var(--surface-overlay)]",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-white/5",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-white/5 hover:border-primary/50",
        floating:
          "glass-strong text-foreground hover:-translate-y-0.5 hover:shadow-[var(--elev-3),var(--glow-primary)]",
        smart:
          "text-foreground border border-amber/30 bg-[oklch(0.82_0.16_78/0.08)] hover:bg-[oklch(0.82_0.16_78/0.14)] hover:shadow-[var(--glow-amber)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:brightness-110",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
