import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — SnapCut AI" },
      { name: "description", content: "Sign in to your SnapCut AI account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-md px-6 py-20">
        <div className="glass-card rounded-2xl p-8">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to continue.</p>
          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full bg-gradient-brand text-primary-foreground hover:opacity-90 glow-primary">
              Sign in
            </Button>
          </form>
          <p className="text-sm text-center text-muted-foreground mt-6">
            No account? <Link to="/" className="text-foreground hover:text-primary">Try the workspace</Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}