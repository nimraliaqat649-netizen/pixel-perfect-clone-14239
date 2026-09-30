import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "border-border bg-surface-muted text-muted-foreground",
        primary: "border-primary/20 bg-primary-soft text-primary",
        success: "border-success/25 bg-success-soft text-success",
        warning: "border-warning/30 bg-warning-soft text-warning-foreground",
        info: "border-info/25 bg-info-soft text-info",
        destructive: "border-destructive/25 bg-destructive-soft text-destructive",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

type Props = VariantProps<typeof pillVariants> & {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
};

export function StatusPill({ tone, children, dot = true, className }: Props) {
  return (
    <span className={cn(pillVariants({ tone }), className)}>
      {dot && <span className="size-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}
