import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Shield, ImageIcon, Code2, CreditCard, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnapCut AI — Studio-quality background removal in 5 seconds" },
      { name: "description", content: "Upload any image and get a clean transparent cutout in under 5 seconds. Powered by AI. Free plan available." },
      { property: "og:title", content: "SnapCut AI — AI Background Removal" },
      { property: "og:description", content: "Studio-quality cutouts powered by AI. Try it free." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.35_0.18_280/0.4),transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs text-muted-foreground mb-10 animate-fade-in">
            <Sparkles className="h-3 w-3 text-secondary" /> AI-Powered Background Removal
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.2] mb-6">
            Remove Backgrounds <br />
            <span className="text-gradient-brand">In Seconds</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your images instantly with our advanced AI technology. <br className="hidden md:block" />
            Perfect for e-commerce, design projects, and creative work.
          </p>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-brand text-primary-foreground hover:opacity-90 glow-primary text-base h-14 px-8 rounded-xl transition-all hover:scale-105">
              <Link to="/app">Start Removing Backgrounds <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base h-14 px-8 rounded-xl glass-card hover:bg-white/5 transition-all">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground/80">
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-secondary/70" /> 5 Free Images Daily</span>
            <span className="flex items-center gap-2"><ImageIcon className="h-4 w-4 text-primary/70" /> No Signup Required</span>
            <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-accent/70" /> HD Quality Output</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">Built for <span className="text-gradient-brand">speed and scale</span></h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Everything you need to ship clean cutouts at scale — from one-off edits to bulk product catalogs.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass-card rounded-2xl p-6 hover:glow-primary transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-gradient-brand flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">From upload to download in <span className="text-gradient-brand">3 steps</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="relative glass-card rounded-2xl p-8">
              <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-gradient-brand text-primary-foreground flex items-center justify-center text-sm font-bold glow-primary">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl glass-card p-12 text-center">
          <div className="absolute inset-0 -z-10 bg-gradient-brand opacity-20" />
          <h2 className="text-4xl md:text-5xl font-bold">Ready to cut some backgrounds?</h2>
          <p className="mt-4 text-muted-foreground">Start with 5 free images today. Upgrade anytime.</p>
          <Button size="lg" asChild className="mt-8 bg-gradient-brand text-primary-foreground hover:opacity-90 glow-primary text-base h-12 px-8">
            <Link to="/app">Open workspace <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}

const features = [
  { icon: Zap, title: "Sub-5 second processing", desc: "Optimized AI inference returns transparent PNGs faster than your browser can refresh." },
  { icon: ImageIcon, title: "Pixel-perfect edges", desc: "Hair, fur, fabric, glass — our model handles the hard cases other tools fail on." },
  { icon: Shield, title: "Secure & ephemeral", desc: "All uploads auto-delete after 24 hours. HTTPS everywhere, encrypted secrets, OWASP-aligned." },
  { icon: Code2, title: "Developer API", desc: "REST endpoint with API keys, rate limits and usage analytics. Drop into any pipeline." },
  { icon: CreditCard, title: "Pay-as-you-go", desc: "Free daily quota, monthly Pro plan, or buy credits in bulk. No surprise bills." },
  { icon: Sparkles, title: "Bulk & batch ready", desc: "Process catalogs of thousands of product images via the dashboard or API." },
];

const steps = [
  { title: "Upload your image", desc: "Drag & drop a JPG, PNG or WEBP up to 10 MB. Validation happens instantly." },
  { title: "AI removes the background", desc: "Our model isolates the subject and returns a clean transparent cutout." },
  { title: "Preview & download", desc: "Inspect the result, then download a transparent PNG ready for any workflow." },
];
