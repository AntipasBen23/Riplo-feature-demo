import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          "h-10 px-4 py-2",
          variant === 'primary' && "bg-[var(--color-accent-primary)] text-[#000] hover:bg-[var(--color-accent-hover)]",
          variant === 'secondary' && "bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:bg-[var(--color-card)]",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-[var(--color-border-default)] bg-[var(--color-app-bg)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent-primary)] disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export const Badge = ({ className, variant = 'default', children, ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'goal' | 'problem' | 'hypothesis' | 'insight' | 'recommendation' }) => {
  const variants = {
    default: "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border-default)]",
    goal: "bg-[var(--color-surface)] text-[var(--color-accent-primary)] border-[var(--color-border-default)]",
    problem: "bg-[var(--color-surface)] text-[var(--color-warning)] border-[var(--color-border-default)]",
    hypothesis: "bg-[var(--color-surface)] text-[var(--color-text-primary)] border-[var(--color-border-default)]",
    insight: "bg-[var(--color-surface)] text-[var(--color-success)] border-[var(--color-border-default)]",
    recommendation: "bg-[var(--color-accent-soft)] text-[var(--color-accent-primary)] border-[var(--color-accent-primary)]",
  };

  return (
    <div className={cn("inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-semibold tracking-wide uppercase", variants[variant], className)} {...props}>
      {children}
    </div>
  );
};

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-xl border border-[var(--color-border-default)] bg-[var(--color-card)] text-[var(--color-text-primary)] shadow-sm", className)} {...props} />
);
