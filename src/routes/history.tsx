import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon, Download, Trash2, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/history")({
  component: HistoryPage,
});

interface HistoryItem {
  id: string;
  originalName: string;
  resultUrl: string;
  timestamp: number;
}

const STORAGE_KEY = "snapcut_history";

function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const deleteItem = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
      window.open(url, "_blank");
    }
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <Link to="/app" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Workspace
          </Link>
          <h1 className="text-4xl font-bold">Your Processing History</h1>
          <p className="text-muted-foreground mt-2">View and manage all your previously processed images</p>
        </div>

        {history.length === 0 ? (
          <div className="py-24 text-center glass-card rounded-3xl">
            <HistoryIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-10" />
            <h3 className="text-xl font-medium mb-2">No history yet</h3>
            <p className="text-muted-foreground mb-8">Start by removing the background from an image.</p>
            <Button asChild className="bg-gradient-brand text-primary-foreground hover:opacity-90 glow-primary">
              <Link to="/app">Go to Workspace</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {history.map((item) => (
              <div key={item.id} className="glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row items-center p-6 gap-8 group">
                {/* Image Preview */}
                <div className="w-full md:w-48 aspect-square relative bg-[conic-gradient(from_0deg,#1f1240,#0b0820,#1f1240)] rounded-xl flex items-center justify-center overflow-hidden border border-white/5">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                  <img src={item.resultUrl} alt={item.originalName} className="max-h-full max-w-full object-contain p-2 relative z-10" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 text-center md:text-left">
                  <h3 className="text-lg font-semibold truncate mb-1">{item.originalName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.timestamp).toLocaleDateString("en-GB")} at {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={() => handleDownload(item.resultUrl, `snapcut-${item.originalName}.png`)}
                    className="bg-gradient-brand text-primary-foreground hover:opacity-90 glow-primary"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => deleteItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
