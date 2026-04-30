import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const links = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/app", label: "Workspace" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 backdrop-blur-xl bg-background/70">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <button onClick={handleSignOut} className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
              Sign out
            </button>
          ) : (
            <Link to="/login" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
              Sign in
            </Link>
          )}
          <Button asChild className="bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] text-white hover:opacity-90 shadow-lg shadow-primary/20 rounded-full px-6">
            <Link to="/app">Get Started Free</Link>
          </Button>
        </div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border/50 bg-background/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm text-muted-foreground">
                {l.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button onClick={handleSignOut} className="text-left text-sm text-muted-foreground">
                Sign out
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">
                Sign in
              </Link>
            )}
            <Button asChild className="bg-gradient-brand text-primary-foreground">
              <Link to="/app" onClick={() => setOpen(false)}>Try free</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}