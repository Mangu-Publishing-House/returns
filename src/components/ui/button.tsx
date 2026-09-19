import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-bg-elevated hover:bg-ink-soft shadow-[var(--shadow-border)]",
        secondary:
          "bg-bg-elevated text-ink shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
        ghost: "bg-transparent text-ink hover:bg-surface",
        rail: "bg-transparent text-rail-fg hover:bg-rail-active",
        sage: "bg-sage text-sage-fg hover:opacity-90",
        danger: "bg-brick text-bg-elevated hover:opacity-90",
        outline: "border border-line bg-transparent text-ink hover:bg-surface",
      },
      size: {
        sm: "h-9 rounded-md px-3",
        md: "h-11 rounded-md px-4",
        lg: "h-12 rounded-lg px-5 text-base",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";
