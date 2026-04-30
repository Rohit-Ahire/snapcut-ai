import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { 
  User, 
  CreditCard, 
  Crown, 
  History, 
  LogOut, 
  ChevronRight, 
  Zap,
  LayoutDashboard
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    if (!isSupabaseConfigured || !supabase) {
      throw redirect({ to: "/login" });
    }

    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({ to: "/login" });
    }
  },
  head: () => ({
    meta: [
      { title: "Dashboard — SnapCut AI" },
      { name: "description", content: "View your SnapCut AI account details and history." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase!.auth.getUser();
      setUser(user);

      // Load history from localStorage (matching UploadZone.tsx)
      const saved = localStorage.getItem("snapcut_history");
      if (saved) {
        try {
          setHistory(JSON.parse(saved).slice(0, 5));
        } catch (e) {
          console.error("Failed to parse history", e);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    await supabase!.auth.signOut();
    window.location.href = "/login";
  };

  if (!user) return null;

  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Account Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your account and view usage.</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {/* Profile Card */}
          <div className="md:col-span-2 rounded-3xl border border-border bg-card/50 p-8 shadow-lg backdrop-blur-sm">
            <div className="flex items-start gap-6">
              <div className="h-20 w-20 rounded-2xl bg-gradient-brand flex items-center justify-center text-white shadow-xl shadow-primary/20">
                <User className="h-10 w-10" />
              </div>
              <div className="space-y-1 flex-1">
                <h2 className="text-2xl font-bold">{user.email?.split('@')[0]}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center gap-1.5 border border-primary/20">
                    ID: {user.id.slice(0, 8)}...
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/20">
                    Active Session
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Credits Card */}
          <div className="rounded-3xl border border-border bg-gradient-brand p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 opacity-80 mb-1">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">Credits Remaining</span>
                </div>
                <div className="text-5xl font-black mt-2">5</div>
                <p className="text-white/60 text-sm mt-1">Refreshes daily at midnight</p>
              </div>
              <Button asChild variant="secondary" className="w-full mt-6 bg-white text-primary hover:bg-white/90">
                <Link to="/pricing">Get More Credits</Link>
              </Button>
            </div>
            <Zap className="absolute -bottom-6 -right-6 h-32 w-32 text-white/10 rotate-12" />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Plan Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-400" /> Current Plan
            </h3>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-black">Free Plan</h4>
                  <p className="text-muted-foreground mt-1">Perfect for casual use and testing.</p>
                </div>
                <span className="px-4 py-2 rounded-xl bg-muted font-bold text-sm">CURRENT</span>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "5 AI removals per day",
                  "Standard processing speed",
                  "Up to 10MB file size",
                  "72-hour history storage"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full mt-8 bg-gradient-brand">
                <Link to="/pricing">Upgrade to Pro</Link>
              </Button>
            </div>
          </div>

          {/* Recent History */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <History className="h-5 w-5 text-primary" /> Recent Activity
              </h3>
              <Link to="/history" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-md">
              {history.length > 0 ? (
                <div className="divide-y divide-border">
                  {history.map((item) => (
                    <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                      <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden">
                        <img src={item.resultUrl} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.originalName}</p>
                        <p className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleDateString()}</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                         <Link to="/app">Edit</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <History className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">No recent activity yet.</p>
                  <Button asChild variant="link" className="mt-2">
                    <Link to="/app">Start creating</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 p-8 rounded-4xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Ready to remove more backgrounds?</h4>
              <p className="text-muted-foreground text-sm">Jump back into the workspace and continue your projects.</p>
            </div>
          </div>
          <Button asChild size="lg" className="rounded-2xl px-10 bg-gradient-brand shadow-xl shadow-primary/20">
            <Link to="/app">Go to Workspace</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
