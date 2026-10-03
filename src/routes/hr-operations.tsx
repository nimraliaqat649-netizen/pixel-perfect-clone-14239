import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  BookOpen,
  FileText,
  GraduationCap,
  LifeBuoy,
  ShieldCheck,
  Target,
  UserPlus,
} from "lucide-react";

import { AppShell, PageHeader } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/hr-operations")({
  head: () => ({
    meta: [
      { title: "HR operations — Northwind HR" },
      { name: "description", content: "Onboarding, documents, performance cycles and compliance workflows." },
      { property: "og:title", content: "HR operations — Northwind HR" },
      { property: "og:description", content: "Onboarding, documents, performance and compliance workflows." },
    ],
  }),
  component: HrOperations,
});

const workflows = [
  { icon: UserPlus, title: "Onboarding", desc: "6 new joiners this month", progress: 68, tone: "primary" as const },
  { icon: Target, title: "Performance cycle", desc: "H2 reviews in progress", progress: 42, tone: "warning" as const },
  { icon: ShieldCheck, title: "Compliance", desc: "Right-to-work checks", progress: 91, tone: "success" as const },
  { icon: GraduationCap, title: "Learning", desc: "Security training assigned", progress: 76, tone: "info" as const },
];

const documents = [
  ["Employee handbook 2026", "Policy", "Updated 2 days ago"],
  ["Remote work policy", "Policy", "Updated 3 weeks ago"],
  ["Parental leave guide", "Benefit", "Updated 1 month ago"],
  ["Performance review template", "Template", "Updated 6 weeks ago"],
  ["Offer letter template", "Template", "Updated 2 months ago"],
];

function HrOperations() {
  return (
    <AppShell>
      <PageHeader
        title="HR operations"
        subtitle="Workflows, documents and compliance for the People team."
        actions={
          <Button variant="brand" size="sm">
            <FileText /> New document
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open tasks" value="23" hint="7 overdue" icon={LifeBuoy} />
        <StatCard label="Onboarding in flight" value="6" delta={20} icon={UserPlus} />
        <StatCard label="Reviews completed" value="42%" delta={14} icon={BadgeCheck} />
        <StatCard label="Policies up to date" value="18 / 19" icon={BookOpen} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {workflows.map((w) => (
          <article key={w.title} className="surface-card p-5 transition-shadow hover:shadow-md">
            <span className="grid size-9 place-items-center rounded-lg bg-primary-soft text-primary">
              <w.icon className="size-4" />
            </span>
            <h2 className="mt-3 text-sm font-semibold text-foreground">{w.title}</h2>
            <p className="text-xs text-muted-foreground">{w.desc}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${w.progress}%` }} />
            </div>
            <p className="tabular mt-1.5 text-[11px] text-muted-foreground">{w.progress}% complete</p>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <section className="surface-card overflow-hidden lg:col-span-2">
          <div className="border-b border-border p-4">
            <h2 className="text-sm font-semibold text-foreground">Document library</h2>
          </div>
          <ul className="divide-y divide-border">
            {documents.map(([name, type, meta]) => (
              <li key={name} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/50">
                <span className="grid size-8 place-items-center rounded-lg bg-surface-muted text-muted-foreground">
                  <FileText className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-foreground">{name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{meta}</p>
                </div>
                <StatusPill tone="neutral" dot={false}>
                  {type}
                </StatusPill>
                <Button variant="ghost" size="sm">
                  Open
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <section className="surface-card p-5">
          <h2 className="text-sm font-semibold text-foreground">Needs attention</h2>
          <ul className="mt-3 space-y-3">
            {([
              ["3 contracts unsigned", "Engineering · due Friday", "destructive" as const],
              ["2 probation reviews due", "Sales · this week", "warning" as const],
              ["1 policy awaiting legal", "Compliance", "info" as const],
            ] as const).map(([title, meta, tone]) => (
              <li key={title} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-medium text-foreground">{title}</p>
                  <StatusPill tone={tone}>Action</StatusPill>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{meta}</p>
              </li>
            ))}
          </ul>
          <Button asChild variant="soft" size="sm" className="mt-4 w-full">
            <Link to="/employees">Go to employee records</Link>
          </Button>
        </section>
      </div>
    </AppShell>
  );
}
