import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from "recharts";
import { CalendarCheck, Clock3, Download, LaptopMinimal, TriangleAlert } from "lucide-react";

import { AppShell, PageHeader } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { attendance, departments } from "@/lib/data";
import { chartTooltipProps, type Tone } from "@/lib/ui";

export const Route = createFileRoute("/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance — Northwind HR" },
      { name: "description", content: "Daily attendance, remote working patterns and hours logged across teams." },
      { property: "og:title", content: "Attendance — Northwind HR" },
      { property: "og:description", content: "Daily attendance, remote patterns and hours logged." },
    ],
  }),
  component: AttendancePage,
});

const tone: Record<string, Tone> = {
  present: "success",
  remote: "info",
  late: "warning",
  absent: "destructive",
};

const weekly = [
  { day: "Mon", onsite: 214, remote: 121, absent: 34 },
  { day: "Tue", onsite: 238, remote: 108, absent: 23 },
  { day: "Wed", onsite: 244, remote: 99, absent: 26 },
  { day: "Thu", onsite: 221, remote: 126, absent: 22 },
  { day: "Fri", onsite: 162, remote: 181, absent: 26 },
];

function AttendancePage() {
  const [dept, setDept] = useState("all");
  const rows = attendance.filter((r) => dept === "all" || r.department === dept);

  return (
    <AppShell>
      <PageHeader
        title="Attendance"
        subtitle="Wednesday, 30 September 2026 · live attendance across all locations."
        actions={
          <Button variant="outline" size="sm">
            <Download /> Export day
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Present on site" value="244" delta={2.6} icon={CalendarCheck} />
        <StatCard label="Working remotely" value="99" delta={-4.1} icon={LaptopMinimal} />
        <StatCard label="Late arrivals" value="12" hint="over 15 minutes" icon={Clock3} />
        <StatCard label="Unplanned absence" value="6" delta={-18} icon={TriangleAlert} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <section className="surface-card p-5 xl:col-span-2">
          <h2 className="text-base font-semibold text-foreground">This week</h2>
          <p className="text-xs text-muted-foreground">On site vs remote vs absent</p>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekly} margin={{ left: -18, right: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-muted-foreground)" />
                <RTooltip {...chartTooltipProps} cursor={{ fill: "var(--color-accent)" }} />
                <Bar dataKey="onsite" stackId="a" fill="var(--color-chart-1)" radius={[0, 0, 0, 0]} barSize={26} />
                <Bar dataKey="remote" stackId="a" fill="var(--color-chart-2)" barSize={26} />
                <Bar dataKey="absent" stackId="a" fill="var(--color-chart-4)" radius={[6, 6, 0, 0]} barSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="surface-card p-5">
          <h2 className="text-base font-semibold text-foreground">September</h2>
          <p className="text-xs text-muted-foreground">Attendance heat by day</p>
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i} className="text-center text-[10px] text-muted-foreground">
                {d}
              </span>
            ))}
            {Array.from({ length: 30 }).map((_, i) => {
              const level = i % 7 >= 5 ? 0 : ((i * 7) % 4) + 1;
              return (
                <span
                  key={i}
                  title={`Sept ${i + 1}`}
                  className="tabular grid aspect-square place-items-center rounded-md text-[10px] text-foreground/70"
                  style={{
                    background:
                      level === 0
                        ? "var(--color-surface-muted)"
                        : `color-mix(in oklab, var(--color-primary) ${level * 22}%, var(--color-surface))`,
                  }}
                >
                  {i + 1}
                </span>
              );
            })}
          </div>
        </section>
      </div>

      <div className="surface-card mt-4 overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-border p-3">
          <h2 className="text-sm font-semibold text-foreground">Today's log</h2>
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger className="h-9 w-44">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d.id} value={d.name}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-muted/60 text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
                <th className="px-4 py-2.5 font-semibold">Employee</th>
                <th className="px-4 py-2.5 font-semibold">Department</th>
                <th className="px-4 py-2.5 font-semibold">Clock in</th>
                <th className="px-4 py-2.5 font-semibold">Clock out</th>
                <th className="px-4 py-2.5 font-semibold">Hours</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-accent/50">
                  <td className="px-4 py-2.5 font-medium text-foreground">{r.employee}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{r.department}</td>
                  <td className="tabular px-4 py-2.5 text-muted-foreground">{r.clockIn}</td>
                  <td className="tabular px-4 py-2.5 text-muted-foreground">{r.clockOut}</td>
                  <td className="tabular px-4 py-2.5 text-foreground">{r.hours ? `${r.hours}h` : "—"}</td>
                  <td className="px-4 py-2.5">
                    <StatusPill tone={tone[r.status]}>{r.status}</StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
