import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CalendarPlus, Inbox, X } from "lucide-react";
import { toast } from "sonner";

import { AppShell, PageHeader } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { leaveRequests, initials, type LeaveStatus } from "@/lib/data";
import { leaveStatusTone } from "@/lib/ui";

export const Route = createFileRoute("/leave")({
  head: () => ({
    meta: [
      { title: "Leave management — Northwind HR" },
      { name: "description", content: "Review leave requests, approvals and team balances in one workflow." },
      { property: "og:title", content: "Leave management — Northwind HR" },
      { property: "og:description", content: "Review leave requests, approvals and balances." },
    ],
  }),
  component: LeavePage,
});

function LeavePage() {
  const [decided, setDecided] = useState<Record<string, LeaveStatus>>({});
  const statusOf = (id: string, fallback: LeaveStatus) => decided[id] ?? fallback;

  const decide = (id: string, employee: string, status: LeaveStatus) => {
    setDecided((d) => ({ ...d, [id]: status }));
    toast.success(`${status === "approved" ? "Approved" : "Rejected"} leave for ${employee}`);
  };

  const groups: Array<[LeaveStatus | "all", string]> = [
    ["pending", "Pending"],
    ["approved", "Approved"],
    ["rejected", "Rejected"],
    ["all", "All requests"],
  ];

  return (
    <AppShell>
      <PageHeader
        title="Leave"
        subtitle="Approvals, balances and upcoming absence across the company."
        actions={
          <Button variant="brand" size="sm">
            <CalendarPlus /> Request leave
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Awaiting approval" value="4" hint="oldest 3 days ago" icon={Inbox} />
        <StatCard label="Approved this month" value="27" delta={11} />
        <StatCard label="Days booked in Q4" value="412" delta={6.8} />
        <StatCard label="Avg. balance remaining" value="9.4 days" hint="per employee" />
      </div>

      <Tabs defaultValue="pending" className="mt-4">
        <TabsList>
          {groups.map(([k, label]) => (
            <TabsTrigger key={k} value={k}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {groups.map(([k]) => {
          const rows = leaveRequests.filter(
            (l) => k === "all" || statusOf(l.id, l.status) === k,
          );
          return (
            <TabsContent key={k} value={k} className="mt-3">
              {rows.length === 0 ? (
                <div className="surface-card flex flex-col items-center gap-2 px-4 py-16 text-center">
                  <span className="grid size-10 place-items-center rounded-xl bg-surface-muted text-muted-foreground">
                    <Inbox className="size-5" />
                  </span>
                  <p className="text-sm font-medium text-foreground">Nothing here</p>
                  <p className="text-xs text-muted-foreground">All caught up on this queue.</p>
                </div>
              ) : (
                <ul className="grid gap-3 md:grid-cols-2">
                  {rows.map((l) => {
                    const status = statusOf(l.id, l.status);
                    return (
                      <li key={l.id} className="surface-card p-4 transition-shadow hover:shadow-md">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="grid size-9 place-items-center rounded-lg bg-primary-soft text-[11px] font-semibold text-primary">
                              {initials(l.employee)}
                            </span>
                            <div>
                              <p className="text-sm font-medium text-foreground">{l.employee}</p>
                              <p className="text-xs text-muted-foreground">{l.department}</p>
                            </div>
                          </div>
                          <StatusPill tone={leaveStatusTone[status]}>{status}</StatusPill>
                        </div>

                        <dl className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-surface-muted p-3">
                          {[
                            ["Type", l.type],
                            ["Dates", `${l.from.slice(5)} → ${l.to.slice(5)}`],
                            ["Days", String(l.days)],
                          ].map(([a, b]) => (
                            <div key={a}>
                              <dt className="text-eyebrow">{a}</dt>
                              <dd className="tabular mt-0.5 text-[13px] font-medium text-foreground">
                                {b}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        {status === "pending" && (
                          <div className="mt-3 flex gap-2">
                            <Button
                              size="sm"
                              variant="brand"
                              className="flex-1"
                              onClick={() => decide(l.id, l.employee, "approved")}
                            >
                              <Check /> Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => decide(l.id, l.employee, "rejected")}
                            >
                              <X /> Reject
                            </Button>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </AppShell>
  );
}
