import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login / Signup — SnapCut AI" },
      { name: "description", content: "Login or create your SnapCut AI account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignup = mode === "signup";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!isSupabaseConfigured || !supabase) {
      setError("Supabase is not configured.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Add a 15-second timeout to prevent the form from getting "stuck"
      const authPromise = isSignup 
        ? supabase.auth.signUp({ email, password })
        : supabase.auth.signInWithPassword({ email, password });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Request timed out. Please check your internet and try again.")), 15000)
      );

      const { data, error: authError } = await Promise.race([authPromise, timeoutPromise]) as any;

      if (authError) throw authError;

      if (isSignup) {
        setSuccess("Account created! Check your email for verification.");
      } else {
        await navigate({ to: "/app" });
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err instanceof Error ? err.message : "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteShell>
      <div className="container mx-auto max-w-lg px-6 py-20">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">{isSignup ? "Join SnapCut AI" : "Welcome Back"}</h1>
            <p className="mt-2 text-muted-foreground">
              {isSignup ? "Create an account to get started" : "Sign in to your account"}
            </p>
          </div>

          <div className="mb-6 flex rounded-lg bg-muted p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition ${!isSignup ? "bg-background shadow-sm" : "text-muted-foreground"}`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition ${isSignup ? "bg-background shadow-sm" : "text-muted-foreground"}`}
            >
              Signup
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
            {success && <p className="text-sm text-emerald-500">{success}</p>}

            <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-brand">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignup ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              &larr; Back to home
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
