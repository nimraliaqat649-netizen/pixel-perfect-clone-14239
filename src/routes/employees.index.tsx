import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Filter, Mail, Plus, Search, UserRound } from "lucide-react";

import { AppShell, PageHeader } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departments, employees, initials, type EmploymentStatus } from "@/lib/data";

export const Route = createFileRoute("/employees/")({
  head: () => ({
    meta: [
      { title: "Employee directory — Northwind HR" },
      {
        name: "description",
        content: "Search, filter and manage every employee record across departments and locations.",
      },
      { property: "og:title", content: "Employee directory — Northwind HR" },
      { property: "og:description", content: "Search, filter and manage every employee record." },
    ],
  }),
  component: EmployeesPage,
});

export const statusTone: Record<EmploymentStatus, "success" | "info" | "warning" | "destructive"> = {
  active: "success",
  probation: "info",
  "on-leave": "warning",
  offboarding: "destructive",
};

const statusLabel: Record<EmploymentStatus, string> = {
  active: "Active",
  probation: "Probation",
  "on-leave": "On leave",
  offboarding: "Offboarding",
};

function EmployeesPage() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");

  const rows = useMemo(
    () =>
      employees.filter(
        (e) =>
          (dept === "all" || e.department === dept) &&
          (status === "all" || e.status === status) &&
          (e.name + e.title + e.location).toLowerCase().includes(query.toLowerCase()),
      ),
    [query, dept, status],
  );

  return (
    <AppShell>
      <PageHeader
        title="Employees"
        subtitle="369 people across 7 departments and 14 countries."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download /> Export CSV
            </Button>
            <Button variant="brand" size="sm">
              <Plus /> Add employee
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active" value="341" delta={2.4} hint="92% of workforce" icon={UserRound} />
        <StatCard label="On probation" value="17" hint="avg. 46 days remaining" />
        <StatCard label="On leave" value="9" hint="2 parental" />
        <StatCard label="Offboarding" value="2" delta={-33} hint="vs last month" />
      </div>

      <div className="surface-card mt-4 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-border p-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, role or location"
              aria-label="Search employees"
              className="h-9 w-full rounded-lg border border-border bg-surface-muted pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary/40 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-ring/25"
            />
          </label>
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger className="h-9 w-full sm:w-44">
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
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-9 w-full sm:w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {Object.entries(statusLabel).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" aria-label="More filters">
            <Filter />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-muted/60 text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
                <th className="px-4 py-2.5 font-semibold">Employee</th>
                <th className="px-4 py-2.5 font-semibold">Department</th>
                <th className="px-4 py-2.5 font-semibold">Location</th>
                <th className="px-4 py-2.5 font-semibold">Type</th>
                <th className="px-4 py-2.5 font-semibold">Start date</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((e) => (
                <tr key={e.id} className="transition-colors hover:bg-accent/50">
                  <td className="px-4 py-2.5">
                    <Link
                      to="/employees/$id"
                      params={{ id: e.id }}
                      className="flex items-center gap-3"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-[11px] font-semibold text-primary">
                        {initials(e.name)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-foreground">{e.name}</span>
                        <span className="block truncate text-[12px] text-muted-foreground">
                          {e.title}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{e.department}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{e.location}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{e.type}</td>
                  <td className="tabular px-4 py-2.5 text-muted-foreground">{e.startDate}</td>
                  <td className="px-4 py-2.5">
                    <StatusPill tone={statusTone[e.status]}>{statusLabel[e.status]}</StatusPill>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <Button variant="ghost" size="icon-sm" aria-label={`Email ${e.name}`}>
                      <Mail />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <div className="flex flex-col items-center gap-2 px-4 py-14 text-center">
            <span className="grid size-10 place-items-center rounded-xl bg-surface-muted text-muted-foreground">
              <UserRound className="size-5" />
            </span>
            <p className="text-sm font-medium text-foreground">No employees match those filters</p>
            <p className="text-xs text-muted-foreground">Try clearing the search or status filter.</p>
            <Button
              variant="soft"
              size="sm"
              className="mt-2"
              onClick={() => {
                setQuery("");
                setDept("all");
                setStatus("all");
              }}
            >
              Reset filters
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
          <span>
            Showing {rows.length} of {employees.length} records
          </span>
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
