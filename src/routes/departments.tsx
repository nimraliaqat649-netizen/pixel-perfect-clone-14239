import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Plus, Users } from "lucide-react";

import { AppShell, PageHeader } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { departments, initials } from "@/lib/data";

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: "Departments — Northwind HR" },
      {
        name: "description",
        content: "Department headcount, open roles, budget usage and attrition at a glance.",
      },
      { property: "og:title", content: "Departments — Northwind HR" },
      { property: "og:description", content: "Headcount, open roles, budget and attrition by department." },
    ],
  }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Departments"
        subtitle="Structure, ownership and capacity across the organisation."
        actions={
          <Button variant="brand" size="sm">
            <Plus /> New department
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Departments" value="7" icon={Building2} />
        <StatCard label="Total headcount" value="369" delta={3.1} icon={Users} />
        <StatCard label="Open roles" value="32" delta={8.4} />
        <StatCard label="Avg. attrition" value="5.1%" delta={-1.2} hint="rolling 12 months" />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {departments.map((d) => (
          <article
            key={d.id}
            className="surface-card group p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-foreground">{d.name}</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Led by {d.lead}</p>
              </div>
              <span className="grid size-9 place-items-center rounded-lg bg-primary-soft text-[11px] font-semibold text-primary">
                {initials(d.lead)}
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-3">
              {[
                ["Headcount", d.headcount],
                ["Open", d.openRoles],
                ["Attrition", `${d.attrition}%`],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <dt className="text-eyebrow">{k}</dt>
                  <dd className="tabular mt-0.5 text-lg font-semibold text-foreground">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Budget used</span>
                <span className="tabular font-medium text-foreground">{d.budgetUsed}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-muted">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-500"
                  style={{ width: `${d.budgetUsed}%` }}
                />
              </div>
            </div>

            <Button asChild variant="ghost" size="sm" className="mt-4 -ml-2">
              <Link to="/employees">
                View team <ArrowUpRight />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
