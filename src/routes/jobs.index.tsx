import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/jobs/")({
  head: () => ({
    meta: [
      { title: "Job positions — Northwind HR" },
      { name: "description", content: "Job positions in the Northwind HR & AI Talent Platform." },
      { property: "og:title", content: "Job positions — Northwind HR" },
      { property: "og:description", content: "Job positions in the Northwind HR & AI Talent Platform." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader title="Job positions" subtitle="This page will be redesigned once your existing app is brought in." />
      <div className="surface-card px-6 py-16 text-center text-sm text-muted-foreground">Coming soon</div>
    </AppShell>
  );
}
