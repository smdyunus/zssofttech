"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline";
type Size = "default" | "xl";

export function buttonClassName(options?: {
  variant?: Variant;
  size?: Size;
  className?: string;
}): string {
  const { variant = "default", size = "xl", className } = options ?? {};
  return cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
    variant === "default" &&
      "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark",
    variant === "outline" &&
      "border border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white",
    size === "xl" ? "min-h-[52px] px-8 py-4 text-base" : "px-4 py-2 text-sm",
    className
  );
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "xl", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonClassName({ variant, size }), "disabled:pointer-events-none disabled:opacity-50", className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
