import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { UploadZone } from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Workspace — SnapCut AI" },
      { name: "description", content: "Upload an image and get a transparent cutout in seconds." },
    ],
  }),
  component: AppPage,
});

function AppPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Workspace</h1>
            <p className="text-sm text-muted-foreground mt-1">Drop an image to remove the background.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-full glass-card text-xs flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-secondary" />
              <span className="text-muted-foreground">Free tier:</span>
              <span className="font-medium">5 / 5 today</span>
            </div>
            <Button asChild size="sm" className="bg-gradient-brand text-primary-foreground hover:opacity-90">
              <Link to="/pricing">Upgrade</Link>
            </Button>
          </div>
        </div>
        <UploadZone />
      </section>
    </SiteShell>
  );
}