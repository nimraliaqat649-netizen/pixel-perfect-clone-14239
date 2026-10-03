import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/candidates")({
  head: () => ({
    meta: [
      { title: "Applicants — Northwind HR" },
      { name: "description", content: "Applicants in the Northwind HR & AI Talent Platform." },
      { property: "og:title", content: "Applicants — Northwind HR" },
      { property: "og:description", content: "Applicants in the Northwind HR & AI Talent Platform." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader title="Applicants" subtitle="This page will be redesigned once your existing app is brought in." />
      <div className="surface-card px-6 py-16 text-center text-sm text-muted-foreground">Coming soon</div>
    </AppShell>
  );
}
