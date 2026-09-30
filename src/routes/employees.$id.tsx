import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Building2, CalendarDays, Mail, MapPin, Phone, Pencil } from "lucide-react";

import { AppShell, PageHeader } from "@/components/app-shell";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { employees, initials, leaveRequests } from "@/lib/data";
import { employeeStatusTone as statusTone } from "@/lib/ui";

export const Route = createFileRoute("/employees/$id")({
  loader: ({ params }) => {
    const employee = employees.find((e) => e.id === params.id);
    if (!employee) throw notFound();
    return { employee };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Employee unavailable — Northwind HR" }, { name: "robots", content: "noindex" }] };
    }
    const { employee } = loaderData;
    return {
      meta: [
        { title: `${employee.name} — Northwind HR` },
        { name: "description", content: `${employee.title} in ${employee.department}, based in ${employee.location}.` },
        { property: "og:title", content: `${employee.name} — Northwind HR` },
        { property: "og:description", content: `${employee.title} in ${employee.department}.` },
      ],
    };
  },
  component: EmployeeDetail,
});

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border py-3 last:border-0">
      <p className="text-eyebrow">{label}</p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}

function EmployeeDetail() {
  const { employee } = Route.useLoaderData();
  const history = leaveRequests.filter((l) => l.employee === employee.name);

  return (
    <AppShell>
      <Button asChild variant="ghost" size="sm" className="-ml-2 mb-3">
        <Link to="/employees">
          <ArrowLeft /> Back to employees
        </Link>
      </Button>

      <div className="surface-card overflow-hidden">
        <div className="h-20 gradient-brand" />
        <div className="flex flex-col gap-4 px-5 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <span className="-mt-8 grid size-16 shrink-0 place-items-center rounded-2xl border-4 border-surface bg-surface-muted text-lg font-semibold text-foreground">
              {initials(employee.name)}
            </span>
            <div className="pb-1">
              <h1 className="text-xl font-semibold text-foreground">{employee.name}</h1>
              <p className="text-sm text-muted-foreground">
                {employee.title} · {employee.department}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 pb-1">
            <StatusPill tone={statusTone[employee.status]}>{employee.status}</StatusPill>
            <Button variant="outline" size="sm">
              <Mail /> Message
            </Button>
            <Button variant="brand" size="sm">
              <Pencil /> Edit profile
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <aside className="surface-card h-fit p-5">
          <h2 className="text-sm font-semibold text-foreground">Contact</h2>
          <ul className="mt-3 space-y-2.5 text-sm">
            {[
              [Mail, employee.email],
              [Phone, employee.phone],
              [MapPin, employee.location],
              [Building2, employee.department],
              [CalendarDays, `Joined ${employee.startDate}`],
            ].map(([Icon, text], i) => {
              const I = Icon as typeof Mail;
              return (
                <li key={i} className="flex items-center gap-2.5 text-muted-foreground">
                  <I className="size-4 shrink-0" />
                  <span className="truncate text-foreground">{text as string}</span>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="leave">Leave</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="surface-card mt-3 p-5">
              <h2 className="text-sm font-semibold text-foreground">Profile summary</h2>
              <div className="mt-2 grid gap-x-8 sm:grid-cols-2">
                <Field label="Reports to" value={employee.manager} />
                <Field label="Employment type" value={employee.type} />
                <Field label="Location" value={employee.location} />
                <Field label="Employee ID" value={employee.id.toUpperCase()} />
              </div>
            </TabsContent>

            <TabsContent value="employment" className="surface-card mt-3 p-5">
              <h2 className="text-sm font-semibold text-foreground">Employment history</h2>
              <ol className="mt-4 space-y-4 border-l border-border pl-5">
                {[
                  [employee.startDate, `Joined as ${employee.title}`],
                  ["2024-04-01", "Annual compensation review completed"],
                  ["2025-10-15", "Promoted within " + employee.department],
                ].map(([date, text]) => (
                  <li key={date} className="relative">
                    <span className="absolute -left-[26px] top-1.5 size-2.5 rounded-full border-2 border-surface bg-primary" />
                    <p className="text-sm text-foreground">{text}</p>
                    <p className="tabular text-xs text-muted-foreground">{date}</p>
                  </li>
                ))}
              </ol>
            </TabsContent>

            <TabsContent value="leave" className="surface-card mt-3 p-5">
              <h2 className="text-sm font-semibold text-foreground">Leave requests</h2>
              {history.length ? (
                <ul className="mt-3 divide-y divide-border">
                  {history.map((l) => (
                    <li key={l.id} className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-foreground">
                        {l.type} · {l.days} days
                      </span>
                      <span className="tabular text-xs text-muted-foreground">
                        {l.from} → {l.to}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  No leave requests on record.
                </p>
              )}
            </TabsContent>

            <TabsContent value="documents" className="surface-card mt-3 p-5">
              <h2 className="text-sm font-semibold text-foreground">Documents</h2>
              <ul className="mt-3 divide-y divide-border text-sm">
                {["Employment contract.pdf", "NDA signed.pdf", "Right to work.pdf"].map((d) => (
                  <li key={d} className="flex items-center justify-between py-2.5">
                    <span className="text-foreground">{d}</span>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  );
}
