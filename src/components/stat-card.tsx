import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  icon?: LucideIcon;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="surface-card group relative overflow-hidden p-4 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <p className="text-eyebrow">{label}</p>
        {Icon && (
          <span className="grid size-8 place-items-center rounded-lg bg-primary-soft text-primary">
            <Icon className="size-4" />
          </span>
        )}
      </div>
      <p className="tabular mt-3 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <div className="mt-1.5 flex items-center gap-2 text-xs">
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              up ? "text-success" : "text-destructive",
            )}
          >
            {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {Math.abs(delta)}%
          </span>
        )}
        {hint && <span className="truncate text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
}
