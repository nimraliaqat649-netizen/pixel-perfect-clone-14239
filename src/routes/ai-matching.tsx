import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/ai-matching")({
  head: () => ({
    meta: [
      { title: "AI matching — Northwind HR" },
      { name: "description", content: "AI matching in the Northwind HR & AI Talent Platform." },
      { property: "og:title", content: "AI matching — Northwind HR" },
      { property: "og:description", content: "AI matching in the Northwind HR & AI Talent Platform." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader title="AI matching" subtitle="This page will be redesigned once your existing app is brought in." />
      <div className="surface-card px-6 py-16 text-center text-sm text-muted-foreground">Coming soon</div>
    </AppShell>
  );
}
