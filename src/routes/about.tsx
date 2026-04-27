import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Sparkles, Shield, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-5xl font-bold mb-8">About <span className="text-gradient-brand">SnapCut AI</span></h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            SnapCut AI was born out of a simple frustration: background removal should be instant, high-quality, and accessible to everyone without complex software.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass-card p-6 rounded-2xl">
              <Zap className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
              <p className="text-sm text-muted-foreground">To provide studio-quality AI image processing tools that work in seconds, not hours.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <Shield className="h-8 w-8 text-secondary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Our Privacy</h3>
              <p className="text-sm text-muted-foreground">We believe your data is yours. All uploads are auto-deleted and never used for training without consent.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <Sparkles className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Our Tech</h3>
              <p className="text-sm text-muted-foreground">Powered by state-of-the-art deep learning models optimized for edge inference and pixel-perfect results.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">The Story</h2>
          <p className="text-muted-foreground mb-6">
            Started by a small team of AI researchers and designers, SnapCut AI has grown from a weekend project to a tool used by thousands of creators, photographers, and e-commerce businesses worldwide.
          </p>
          <p className="text-muted-foreground">
            We're constantly refining our models to handle the toughest cases — like fine hair, transparent objects, and complex lighting — so you can focus on what matters most: your creativity.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
