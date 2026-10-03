import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports & analytics — Northwind HR" },
      { name: "description", content: "Reports & analytics in the Northwind HR & AI Talent Platform." },
      { property: "og:title", content: "Reports & analytics — Northwind HR" },
      { property: "og:description", content: "Reports & analytics in the Northwind HR & AI Talent Platform." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader title="Reports & analytics" subtitle="This page will be redesigned once your existing app is brought in." />
      <div className="surface-card px-6 py-16 text-center text-sm text-muted-foreground">Coming soon</div>
    </AppShell>
  );
}
