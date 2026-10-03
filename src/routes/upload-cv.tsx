import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/upload-cv")({
  head: () => ({
    meta: [
      { title: "Upload CV — Northwind HR" },
      { name: "description", content: "Upload CV in the Northwind HR & AI Talent Platform." },
      { property: "og:title", content: "Upload CV — Northwind HR" },
      { property: "og:description", content: "Upload CV in the Northwind HR & AI Talent Platform." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader title="Upload CV" subtitle="This page will be redesigned once your existing app is brought in." />
      <div className="surface-card px-6 py-16 text-center text-sm text-muted-foreground">Coming soon</div>
    </AppShell>
  );
}
