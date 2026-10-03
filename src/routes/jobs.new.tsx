import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/jobs/new")({
  head: () => ({
    meta: [
      { title: "Create job — Northwind HR" },
      { name: "description", content: "Create job in the Northwind HR & AI Talent Platform." },
      { property: "og:title", content: "Create job — Northwind HR" },
      { property: "og:description", content: "Create job in the Northwind HR & AI Talent Platform." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader title="Create job" subtitle="This page will be redesigned once your existing app is brought in." />
      <div className="surface-card px-6 py-16 text-center text-sm text-muted-foreground">Coming soon</div>
    </AppShell>
  );
}
