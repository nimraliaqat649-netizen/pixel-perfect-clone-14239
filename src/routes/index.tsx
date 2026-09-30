import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  Brain,
  Briefcase,
  CalendarClock,
  Clock3,
  Download,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";

import { AppShell, PageHeader } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import {
  activity,
  candidates,
  headcountTrend,
  leaveRequests,
  pipelineFunnel,
  sourceMix,
  stageMeta,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Executive dashboard — Northwind HR" },
      {
        name: "description",
        content:
          "Headcount, hiring velocity, pipeline health and pending approvals in one executive view.",
      },
      { property: "og:title", content: "Executive dashboard — Northwind HR" },
      {
        property: "og:description",
        content: "Headcount, hiring velocity, pipeline health and pending approvals.",
      },
    ],
  }),
  component: Dashboard,
});

const chartTooltip = {
  contentStyle: {
    background: "var(--color-popover)",
    border: "1px solid var(--color-border)",
    borderRadius: "10px",
    boxShadow: "var(--shadow-lg)",
    fontSize: "12px",
    color: "var(--color-popover-foreground)",
  },
  labelStyle: { color: "var(--color-muted-foreground)", fontSize: "11px" },
} as const;

function Dashboard() {
  const pending = leaveRequests.filter((l) => l.status === "pending");
  const topMatches = [...candidates].sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);

  return (
    <AppShell>
      <PageHeader
        title="Good afternoon, Sofia"
        subtitle="Wednesday, 30 September 2026 · Here's how Northwind is performing today."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download /> Export
            </Button>
            <Button asChild variant="brand" size="sm">
              <Link to="/jobs/new">
                <Briefcase /> Post a job
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total headcount" value="369" delta={3.1} hint="vs last month" icon={Users} />
        <StatCard label="Open positions" value="32" delta={8.4} hint="9 in Engineering" icon={Briefcase} />
        <StatCard label="Avg. time to hire" value="28 days" delta={-9.7} hint="fastest this year" icon={Clock3} />
        <StatCard label="AI-matched candidates" value="147" delta={22.5} hint="last 30 days" icon={Brain} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <section className="surface-card p-5 xl:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Workforce growth</h2>
              <p className="text-xs text-muted-foreground">Headcount, hires and exits by month</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-chart-1" /> Headcount
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-chart-3" /> Hires
              </span>
            </div>
          </div>
          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={headcountTrend} margin={{ left: -18, right: 6, top: 6 }}>
                <defs>
                  <linearGradient id="gHead" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-muted-foreground)" />
                <RTooltip {...chartTooltip} />
                <Area
                  type="monotone"
                  dataKey="headcount"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  fill="url(#gHead)"
                />
                <Area
                  type="monotone"
                  dataKey="hires"
                  stroke="var(--color-chart-3)"
                  strokeWidth={2}
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="surface-card p-5">
          <h2 className="text-base font-semibold text-foreground">Candidate sources</h2>
          <p className="text-xs text-muted-foreground">Share of applicants this quarter</p>
          <div className="mt-2 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={70}
                  paddingAngle={3}
                  stroke="none"
                >
                  {sourceMix.map((_, i) => (
                    <Cell key={i} fill={`var(--color-chart-${i + 1})`} />
                  ))}
                </Pie>
                <RTooltip {...chartTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1.5">
            {sourceMix.map((s, i) => (
              <li key={s.name} className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: `var(--color-chart-${i + 1})` }}
                  />
                  {s.name}
                </span>
                <span className="tabular font-medium text-foreground">{s.value}%</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <section className="surface-card p-5">
          <h2 className="text-base font-semibold text-foreground">Recruitment funnel</h2>
          <p className="text-xs text-muted-foreground">Active candidates by stage</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineFunnel} layout="vertical" margin={{ left: 12, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="stage"
                  tickLine={false}
                  axisLine={false}
                  width={72}
                  fontSize={11}
                  stroke="var(--color-muted-foreground)"
                />
                <RTooltip {...chartTooltip} cursor={{ fill: "var(--color-accent)" }} />
                <Bar dataKey="count" fill="var(--color-chart-1)" radius={[0, 6, 6, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="surface-card flex flex-col p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">Pending approvals</h2>
              <p className="text-xs text-muted-foreground">{pending.length} leave requests waiting</p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/leave">
                All <ArrowRight />
              </Link>
            </Button>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {pending.slice(0, 4).map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-foreground">{l.employee}</p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {l.type} · {l.days} days · {l.from}
                  </p>
                </div>
                <StatusPill tone="warning">Pending</StatusPill>
              </li>
            ))}
          </ul>
        </section>

        <section className="surface-card flex flex-col p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">Top AI matches</h2>
              <p className="text-xs text-muted-foreground">Highest scoring active candidates</p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/ai-matching">
                Open <ArrowRight />
              </Link>
            </Button>
          </div>
          <ul className="mt-3 space-y-2.5">
            {topMatches.map((c) => (
              <li key={c.id} className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-muted text-[11px] font-semibold text-foreground">
                  {c.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-foreground">{c.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{c.role}</p>
                </div>
                <StatusPill tone={c.matchScore >= 90 ? "success" : "info"} dot={false}>
                  {c.matchScore}
                </StatusPill>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="surface-card mt-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">Recent activity</h2>
            <p className="text-xs text-muted-foreground">Across people operations and recruiting</p>
          </div>
        </div>
        <ul className="mt-4 space-y-3">
          {activity.map((a) => {
            const Icon =
              a.kind === "ai"
                ? Sparkles
                : a.kind === "leave"
                  ? CalendarClock
                  : a.kind === "job"
                    ? Briefcase
                    : UserPlus;
            return (
              <li key={a.id} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-surface-muted text-muted-foreground">
                  <Icon className="size-3.5" />
                </span>
                <p className="text-[13px] text-muted-foreground">
                  <span className="font-medium text-foreground">{a.who}</span> {a.what}
                  <span className="ml-2 text-[11px] text-muted-foreground/70">{a.when}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="mt-6 text-center text-[11px] text-muted-foreground">
        Figures shown are placeholder data for design review.{" "}
        <Link to="/settings" className="text-primary hover:underline">
          Connect a data source
        </Link>{" "}
        to show live records. Stage reference: {Object.keys(stageMeta).length} pipeline stages.
      </p>
    </AppShell>
  );
}
