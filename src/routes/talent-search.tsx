import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/talent-search")({
  head: () => ({
    meta: [
      { title: "Find candidates — Northwind HR" },
      { name: "description", content: "Find candidates in the Northwind HR & AI Talent Platform." },
      { property: "og:title", content: "Find candidates — Northwind HR" },
      { property: "og:description", content: "Find candidates in the Northwind HR & AI Talent Platform." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader title="Find candidates" subtitle="This page will be redesigned once your existing app is brought in." />
      <div className="surface-card px-6 py-16 text-center text-sm text-muted-foreground">Coming soon</div>
    </AppShell>
  );
}
