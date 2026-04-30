import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useMemo, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const AUTH_TIMEOUT_MS = 10000;

function withTimeout<T>(promise: Promise<T>, timeoutMs = AUTH_TIMEOUT_MS): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      timer = setTimeout(() => reject(new Error("Request timed out. Check your connection and try again.")), timeoutMs);
    }),
  ]).finally(() => {
    if (timer) {
      clearTimeout(timer);
    }
  });
}

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
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignup = mode === "signup";
  const submitLabel = useMemo(() => {
    if (isSubmitting) {
      return isSignup ? "Creating account..." : "Signing in...";
    }
    return isSignup ? "Create account" : "Sign in";
  }, [isSignup, isSubmitting]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!isSupabaseConfigured || !supabase) {
      setError("Authentication is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local or .env.");
      return;
    }

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isSignup) {
        const { error: signUpError } = await withTimeout(
          supabase.auth.signUp({
            email,
            password,
          }),
        );

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        setSuccess("Account created. Please verify your email, then sign in.");
        return;
      }

      const { error: signInError } = await withTimeout(
        supabase.auth.signInWithPassword({
          email,
          password,
        }),
      );

      if (signInError) {
        setError(signInError.message);
        return;
      }

      await navigate({ to: "/app" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to authenticate right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteShell>
      <section className="mx-auto flex w-full max-w-4xl items-center px-6 py-16 relative z-10">
        <div className="grid w-full gap-6 rounded-3xl border border-border/60 bg-card/70 p-6 shadow-2xl md:grid-cols-2 md:p-10 relative overflow-hidden">
          {/* Add a subtle background glow to replace backdrop-blur if it was causing issues */}
          <div className="absolute inset-0 bg-background/20 -z-10" />
          
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">SnapCut AI Account</p>
            <h1 className="text-3xl font-bold leading-tight">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignup
                ? "Sign up to save processing history and continue in workspace."
                : "Sign in to access your workspace and image history."}
            </p>
            <div className="rounded-xl border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
              Use your Supabase email/password account. Login redirects directly to `Workspace`.
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/60 p-5 relative z-20">
            <div className="mb-5 grid grid-cols-2 rounded-lg bg-muted p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                  setSuccess(null);
                }}
                className={`rounded-md px-3 py-2 text-sm transition ${!isSignup ? "bg-background text-foreground shadow" : "text-muted-foreground"}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError(null);
                  setSuccess(null);
                }}
                className={`rounded-md px-3 py-2 text-sm transition ${isSignup ? "bg-background text-foreground shadow" : "text-muted-foreground"}`}
              >
                Signup
              </button>
            </div>

            <form className="space-y-4 relative z-30" onSubmit={handleSubmit}>
              <div className="relative">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1.5 bg-background/50"
                  autoComplete="email"
                  autoFocus
                  required
                />
              </div>
              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <div className="mt-1.5 flex gap-2">
                  <Input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    className="bg-background/50"
                    minLength={6}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                  >
                    {isPasswordVisible ? "Hide" : "Show"}
                  </Button>
                </div>
              </div>
              {isSignup && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="mt-1.5 flex gap-2">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      autoComplete="new-password"
                      minLength={6}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                    >
                      {isConfirmPasswordVisible ? "Hide" : "Show"}
                    </Button>
                  </div>
                </div>
              )}
              {!isSupabaseConfigured && (
                <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  Supabase is not configured. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`.
                </p>
              )}
              {error && <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
              {success && <p className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">{success}</p>}
              <Button
                type="submit"
                disabled={isSubmitting || !isSupabaseConfigured}
                className="w-full bg-gradient-brand text-primary-foreground hover:opacity-90"
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {submitLabel}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              <Link to="/" className="text-foreground hover:text-primary">Back to home</Link>
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}