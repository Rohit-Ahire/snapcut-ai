import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Zap, Shield, ImageIcon, Code2, CreditCard, Sparkles, Layers, Gauge, Users } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — SnapCut AI" },
      { name: "description", content: "Studio-quality AI background removal, developer API, bulk processing, and secure ephemeral storage." },
      { property: "og:title", content: "SnapCut AI Features" },
      { property: "og:description", content: "Everything you need for production-grade background removal." },
    ],
  }),
  component: FeaturesPage,
});

const groups = [
  {
    title: "Core Engine",
    items: [
      { icon: Zap, title: "Sub-5s processing", desc: "Optimized inference pipeline with global edge delivery." },
      { icon: ImageIcon, title: "Up to 5000×5000 px", desc: "Full-resolution outputs, no quality loss." },
      { icon: Sparkles, title: "Edge-perfect masks", desc: "Hair, fur, glass, transparent objects — handled gracefully." },
    ],
  },
  {
    title: "For Teams & Developers",
    items: [
      { icon: Code2, title: "REST API", desc: "Authenticated endpoints with rate limits and usage analytics." },
      { icon: Layers, title: "Bulk processing", desc: "Process thousands of product images via dashboard or API." },
      { icon: Users, title: "Team workspaces", desc: "Share quota and history across your team (coming soon)." },
    ],
  },
  {
    title: "Trust & Operations",
    items: [
      { icon: Shield, title: "Auto-delete in 24h", desc: "No permanent storage. HTTPS everywhere. OWASP-aligned." },
      { icon: Gauge, title: "99.5% uptime SLA", desc: "Monitored end-to-end with retry-on-failure." },
      { icon: CreditCard, title: "Transparent pricing", desc: "Free daily quota, monthly Pro, or pay-as-you-go credits." },
    ],
  },
];

function FeaturesPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold">Everything in <span className="text-gradient-brand">one tool</span></h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Built for creators, e-commerce teams and developers who need reliable cutouts at scale.</p>
        </div>
        <div className="space-y-16">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="text-2xl font-semibold mb-6">{g.title}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {g.items.map((it) => (
                  <div key={it.title} className="glass-card rounded-2xl p-6">
                    <div className="h-11 w-11 rounded-xl bg-gradient-brand flex items-center justify-center mb-4">
                      <it.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1">{it.title}</h3>
                    <p className="text-sm text-muted-foreground">{it.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}