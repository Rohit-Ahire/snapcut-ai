import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — SnapCut AI" },
      { name: "description", content: "Free plan with 5 images/day, Pro Monthly with unlimited usage, and pay-as-you-go credit packs." },
      { property: "og:title", content: "SnapCut AI Pricing" },
      { property: "og:description", content: "Start free. Scale as you grow." },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for trying it out.",
    features: ["5 images / day", "Up to 2000×2000 px", "PNG download", "Community support"],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Pro Monthly",
    price: "$19",
    period: "/month",
    desc: "For creators and small teams.",
    features: ["Unlimited images", "Up to 5000×5000 px", "API access", "Priority processing", "Email support"],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    name: "Credit Packs",
    price: "$29",
    period: "/500 credits",
    desc: "Pay-as-you-go for bursts.",
    features: ["500 image credits", "Never expires", "Full API access", "Bulk processing"],
    cta: "Buy credits",
    highlighted: false,
  },
];

function PricingPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold">Simple, <span className="text-gradient-brand">honest pricing</span></h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Start free. Upgrade when you need more. No hidden fees, no surprises.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-8 ${
                p.highlighted
                  ? "glass-card border-2 border-primary glow-primary"
                  : "glass-card"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium bg-gradient-brand text-primary-foreground">
                  Most popular
                </div>
              )}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-8 w-full ${p.highlighted ? "bg-gradient-brand text-primary-foreground hover:opacity-90" : ""}`}
                variant={p.highlighted ? "default" : "outline"}
              >
                <Link to="/app">{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}